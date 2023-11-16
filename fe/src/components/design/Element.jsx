import React from "react";

const Element = ({ id, info, exId }) => {
  return (
    <>
      {exId ? (
        <>
          <div
            // onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
          <div
            // onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
          <div
            // onMouseDown={() => info.resizeElement(exId, info)}
            className="hidden absolute group-hover:block bottom-[0px] left-[-5px] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
          ></div>
        </>
      ) : (
        <>
          <div
            onMouseDown={() => {
              info.resizeElement(id, info);
            }}
            className="hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] shadow-xl hover:bg-[#9e77f3] border border-[rgba(28,39,48,.5)]"
          ></div>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] shadow-xl hover:bg-[#9e77f3] border border-[rgba(28,39,48,.5)]"
          ></div>
          <div
            onMouseDown={() => info.resizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[5px] -left-[5px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] shadow-xl hover:bg-[#9e77f3] border border-[rgba(28,39,48,.5)]"
          ></div>
        </>
      )}
      <div
        onMouseDown={() => info.rotateElement(id, info)}
        className="hidden absolute group-hover:block -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] shadow-xl hover:bg-[#9e77f3] border border-[rgba(28,39,48,.5)]"
      ></div>

      {/* <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block -top-[3px] left-[50%] translate[-50%,0%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block top-[50%] -left-[3px] translate[0%,50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block top-[50%] -right-[3px] translate[0%,50%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block -bottom-[3px] left-[50%] translate[-50%,0%] w-[10px] h-[10px] cursor-nwse-resize bg-green-500 z-[99999]"
      ></div> */}
    </>
  );
};

export default Element;
