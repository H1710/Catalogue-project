import React from "react";

const DesignTable = ({
  state,
  setShow,
  createShape,
  createText,
  uploadImage,
  createImage,
  images,
  setImage,
}) => {
  return (
    <div
      // className={`${
      //   show ? "px-8 left-[75px] py-5" : "p-0 -left-[350px]"
      // } bg-white h-full fixed transition-all w-[350px] duration-700 z-[5]`}
      className="bg-white h-full w-[350px] p-4"
    >
      <div
        onClick={() => setShow(false)}
        className="flex absolute justify-center items-center rounded-sm bg-green-100 w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] text-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-black"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div>
        {state === "shape" && (
          <div className="grid grid-cols-3 gap-2">
            <div
              onClick={() => createShape("shape", "rect")}
              className="h-[100px] bg-[#3c3c3d] cursor-pointer"
            ></div>
            <div
              onClick={() => createShape("shape", "circle")}
              className="h-[100px] bg-[#3c3c3d] cursor-pointer rounded-full"
            ></div>
            <div
              onClick={() => createShape("shape", "triangle")}
              style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
              className="h-[100px] bg-[#3c3c3d] cursor-pointer"
            ></div>
          </div>
        )}
        {state === "text" && (
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Default text styles</p>
            <div
              onClick={() =>
                createText("text", 28, 700, "Open Sans", "Add a heading")
              }
              className="cursor-pointer bg-[#3c3c3d] cursor--pointer font-bold p-3 text-white text-xl rounded-sm"
            >
              <p className="font-bold text-[28px]">Add a heading</p>
            </div>
            <div
              onClick={() =>
                createText("text", 16, 700, "Open Sans", "Add a subheading")
              }
              className="cursor-pointer bg-[#3c3c3d] cursor--pointer font-bold p-3 text-white text-xl rounded-sm"
            >
              <p className="font-bold text-[16px]">Add a subheading</p>
            </div>
            <div
              onClick={() =>
                createText(
                  "text",
                  12,
                  400,
                  "Open Sans",
                  "Add a little bit of body text"
                )
              }
              className="cursor-pointer bg-[#3c3c3d] cursor--pointer font-bold p-3 text-white text-xl rounded-sm"
            >
              <p className="font-normal text-[12px]">
                Add a little bit of body text
              </p>
            </div>
          </div>
        )}

        {state === "upload" && (
          <div className="grid grid-cols-1 gap-2">
            <input
              // onClick={() => createText("text")}
              type="file"
              onChange={uploadImage}
              className=""
              placeholder="Add Image"
            />
            <div className="grid grid-cols-2 gap-2">
              {images &&
                images.map((img, i) => (
                  <div
                    onClick={() => createImage(img.content)}
                    className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
                    key={i}
                  >
                    <img
                      className="w-full h-full object-fill"
                      src={`${img.content}`}
                      alt=""
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignTable;
