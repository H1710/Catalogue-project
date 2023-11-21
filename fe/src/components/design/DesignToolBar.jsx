import React from "react";
import MyPDF from "./MyPDF";
import { BlobProvider } from "@react-pdf/renderer";
import { createTemplateRoute, saveProductRoute } from "../../utils/APIRoute";
import { postAPI } from "../../utils/FetchData";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../common/Button";

const DesignToolBar = ({
  currentComponent,
  setColor,
  setFontSize,
  components,
  user,
  handleSaveTemplate,
  loadingSave,
}) => {
  const navigate = useNavigate();

  const handlePublicTemplate = () => {
    navigate(`/public-form/${user.id}`, {
      state: { components: JSON.stringify(components) },
    });
  };

  return (
    <div className="h-[50px] w-full flex items-center text-gray-300 bg-white border-b border-gray-100 shadow px-8">
      <BlobProvider document={<MyPDF components={components} />}>
        {({ blob, url, loading, error }) => {
          return (
            <div className="flex w-full gap-4 justify-between items-center">
              <div className="flex gap-2 items-center">
                <label
                  style={{
                    background: `${
                      currentComponent.color &&
                      currentComponent.color !== "#fff"
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
                <div className="flex border border-[#ccc] items-center rounded-sm text-black">
                  <button
                    onClick={() =>
                      setFontSize((prev) => currentComponent.fontSize - 1)
                    }
                    className="px-3 py-[9px] border-r border-[#ccc] hover:bg-"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 6a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 2 6Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                  <input
                    type="number"
                    className="outline-none w-10 text-center"
                    value={currentComponent?.fontSize || 0}
                  />
                  <button
                    onClick={() =>
                      setFontSize((prev) => currentComponent.fontSize + 1)
                    }
                    className="px-3 py-[9px] border-l border-[#ccc]"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.25 9.25a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
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
              <div className="flex h-full gap-2">
                <CustomButton
                  handleClick={handleSaveTemplate}
                  text={"Save"}
                  isLoading={loadingSave}
                  classContent={
                    "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
                  }
                />
                <CustomButton
                  handleClick={() => window.open(url, "_blank")}
                  text={"View"}
                  classContent={
                    "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
                  }
                />

                <CustomButton
                  handleClick={() => {
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "my-docent.pdf";
                    a.click();
                  }}
                  text={"Dowload"}
                  classContent={
                    "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
                  }
                />
                <CustomButton
                  handleClick={handlePublicTemplate}
                  text={"Public"}
                  classContent={
                    "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
                  }
                />
              </div>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
};

export default DesignToolBar;
