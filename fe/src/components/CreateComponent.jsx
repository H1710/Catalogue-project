import React, { useState } from "react";
import Element from "./Element";

const CreateComponent = ({
  info,
  currentComponent,
  removeComponent,
  setCurrentComponent,
}) => {
  const randValue = Math.floor(Math.random() * 100);
  const [readOnly, setReadOnly] = useState(true);
  let html = "";
  if (info.name === "main_frame") {
    html = (
      <div
        onClick={() => setCurrentComponent(info)}
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
        onClick={() => setCurrentComponent(info)}
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
        <div
          onMouseDown={() => info.moveElement(info.id, info)}
          className="w-full h-full"
        ></div>
        <Element id={info.id} info={info} exId="" />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={randValue}
        onClick={() => setCurrentComponent(info)}
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
        <Element id={randValue} info={info} exId="" />

        <div
          onClick={() => setCurrentComponent(info)}
          style={{
            background: info.color,
            opacity: info.opacity,
          }}
          onMouseDown={() => info.moveElement(randValue, info)}
          className="rounded-full w-full h-full"
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={randValue}
        onClick={() => setCurrentComponent(info)}
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
        <Element id={randValue} info={info} exId="" />

        <div
          onClick={() => setCurrentComponent(info)}
          style={{
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          }}
          className="w-full h-full"
          onMouseDown={() => info.moveElement(randValue, info)}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  if (info.name === "text") {
    html = (
      <div
        id={info.id}
        onClick={() => setCurrentComponent(info)}
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
          onMouseDown={() => info.moveElement(info.id, info)}
          readOnly={readOnly}
          onDoubleClick={() => setReadOnly(false)}
          onBlur={() => setReadOnly(true)}
          onCopy={false}
          value={info.text}
        ></textarea>
        <Element id={info.id} info={info} exId="" />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className="px-3 py-2 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  return html;
};

export default CreateComponent;
