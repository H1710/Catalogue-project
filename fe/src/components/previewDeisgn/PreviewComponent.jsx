import React, { useState } from "react";

const PreviewComponent = ({ info, currentComponent, removeComponent }) => {
  const randValue = Math.floor(Math.random() * 100);
  const [readOnly, setReadOnly] = useState(true);
  let html = "";
  if (info.name === "main_frame") {
    html = (
      <div
        className="hover:border-[2px] hover:border-indigo-500 shadow-md"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && <img className="w-full h-full" src={info.image} />}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "rect") {
    html = (
      <div
        id={info.id}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
      >
        <div className="w-full h-full"></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={randValue}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          width: info.width + "px",
          height: info.width + "px",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <div
          style={{
            background: info.color,
            opacity: info.opacity,
          }}
          className="rounded-full w-full h-full"
        ></div>
      </div>
    );
  }

  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={randValue}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
          width: info.width + "px",
          height: info.width + "px",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <div
          style={{
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
          className="w-full h-full"
        ></div>
      </div>
    );
  }

  if (info.name === "text") {
    html = (
      <div
        id={info.id}
        // onMouseDown={() => info.moveElement(randValue, info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: "transparent",
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : "rotate(0deg)",
        }}
        className="absolute group hover:border-[2px] hover:border-indigo-500"
      >
        <textarea
          onChange={info.changeText}
          className="w-full h-full bg-transparent resize-none select-none border-none"
          readOnly={readOnly}
          onCopy={false}
          value={info.text}
        ></textarea>
      </div>
    );
  }

  return html;
};

export default PreviewComponent;
