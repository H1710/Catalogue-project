import React from "react";
import MyPDF from "./MyPDF";
import { BlobProvider } from "@react-pdf/renderer";

const DesignToolBar = ({ currentComponent, setColor, components }) => {
  console.log(components);
  return (
    <div className="h-[50px] w-full flex items-center  text-gray-300 bg-white border-b border-gray-100 shadow px-8">
      <BlobProvider document={<MyPDF components={components} />}>
        {({ blob, url, loading, error }) => {
          return (
            <div className="flex gap-4 justify-start items-start">
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
              <button
                onClick={() => window.open(url, "_blank")}
                className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
              >
                View
              </button>
              <button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "my-document.pdf";
                  a.click();
                }}
                className="px-3 py-[6px] outline-none bg-[#252627] rounded-sm"
              >
                Dowload
              </button>
            </div>
          );
        }}
      </BlobProvider>
    </div>
  );
};

export default DesignToolBar;
