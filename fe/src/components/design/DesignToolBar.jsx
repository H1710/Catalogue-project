import React from "react";
import MyPDF from "./MyPDF";
import { BlobProvider } from "@react-pdf/renderer";
import { createTemplateRoute, saveProductRoute } from "../../utils/APIRoute";
import { postAPI } from "../../utils/FetchData";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const DesignToolBar = ({
  currentComponent,
  setColor,
  components,
  user,
  handleSaveTemplate,
}) => {
  const { mutate: publicTemplate, isLoading } = useMutation({
    mutationFn: (info) => {
      return postAPI(createTemplateRoute, {
        data: { template: [...info], userId: user.id },
      });
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {},
  });

  const handlePublicTemplate = () => {
    publicTemplate(components);
    navigate(`/public-form/${user.id}`);
  };
  return (
    <div className="h-[50px] w-full flex items-center  text-gray-300 bg-white border-b border-gray-100 shadow px-8">
      <BlobProvider document={<MyPDF components={components} />}>
        {({ blob, url, loading, error }) => {
          return (
            <div className="flex w-full gap-4 justify-between items-center">
              <label
                style={{
                  background: `${
                    currentComponent.color && currentComponent.color !== "#fff"
                      ? currentComponent.color
                      : "gray"
                  }`,
                }}
                className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                htmlFor="color"
              ></label>
              <input
                onChange={(e) => setColor(e.target.value)}
                type="color"
                className="invisible"
                id="color"
              />
              {/* {currentComponent.name === "main_frame" && image && (
                  <div>
                    <button
                      className="p-[6px] bg-slate-700 text-white rounded-sm"
                      onClick={removeBackground}
                    >
                      Remove background
                    </button>
                  </div>
                )} */}
              <div className="flex h-full">
                <button
                  onClick={handleSaveTemplate}
                  className="px-3 py-[6px] outline-none text-[--primary-text]"
                >
                  Save
                </button>
                <div className="w-[1px] bg-[#ccc]"></div>
                <button
                  onClick={() => window.open(url, "_blank")}
                  className="px-3 py-[6px] outline-none text-[--primary-text]"
                >
                  View
                </button>
                <div className="w-[1px] bg-[#ccc]"></div>

                <button
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "my-document.pdf";
                    a.click();
                  }}
                  className="px-3 py-[6px] outline-none text-[--primary-text]"
                >
                  Dowload
                </button>
                <div className="w-[1px] bg-[#ccc]"></div>

                <button
                  onClick={handlePublicTemplate}
                  className="px-3 py-[6px] outline-none text-[--primary-text]"
                >
                  Public template
                </button>
              </div>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
};

export default DesignToolBar;
