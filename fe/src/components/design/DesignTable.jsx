import React from "react";

const DesignTable = ({ state, show, setShow, createShape, createText }) => {
  return (
    <div
      className={`${
        show ? "px-8 left-[75px] py-5" : "p-0 -left-[350px]"
      } bg-white h-full fixed transition-all w-[350px] duration-700 z-[5]`}
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
              className="h-[90px] bg-[#3c3c3d] cursor-pointer"
            ></div>
            <div
              onClick={() => createShape("shape", "circle")}
              className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"
            ></div>
            <div
              onClick={() => createShape("shape", "triangle")}
              style={{ clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }}
              className="h-[90px] bg-[#3c3c3d] cursor-pointer"
            ></div>
          </div>
        )}
        {state === "text" && (
          <div>
            <div className="grid grid-cols-1 gap-2">
              <div
                onClick={() => createText("text")}
                className="cursor-pointer bg-[#3c3c3d] cursor--pointer font-bold p-3 text-white text-xl rounded-sm"
              >
                <h2>Add a Text</h2>
              </div>
            </div>
          </div>
        )}

        {state === "upload" && (
          <div className="h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide">
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4, 5].map((img, i) => (
                <div
                  // onClick={() =>
                  //   setImage(
                  //     "https://unblast.com/wp-content/uploads/2020/02/Bifold-Furniture-Catalog-Template-1.jpg"
                  //   )
                  // }
                  className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
                >
                  <img
                    className="w-full h-full object-fill"
                    src={`https://unblast.com/wp-content/uploads/2020/02/Bifold-Furniture-Catalog-Template-1.jpg`}
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
