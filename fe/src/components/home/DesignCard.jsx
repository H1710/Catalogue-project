import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postAPI } from "../../utils/FetchData";
import { saveProductNameRoute } from "../../utils/APIRoute";

const DesignCard = ({ info, handleSaveName }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const inputNameRef = useRef();

  return (
    <div>
      <div
        className="w-full flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]"
        onClick={() => {
          navigate(`/design/${info.id}`);
        }}
      >
        <div className="h-full w-full flex items-center justify-center group cursor-pointer rounded-md ">
          <img
            src={info.thumbnail}
            alt=""
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
      <div
        className="flex items-center mt-[10px] group gap-2"
        onDoubleClick={() => {
          setIsEditing(true);
          inputNameRef.current.value = info.name;
        }}
        onBlur={() => {
          handleSaveName(info.id, inputNameRef.current.value);
          setIsEditing(false);
        }}
      >
        <input
          type="text"
          ref={inputNameRef}
          defaultValue={info.name}
          className={`font-semibold text-[15px] bg-white outline-none`}
          disabled={!isEditing}
        />
        <svg
          className="hidden group-hover:block"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          notmarqueeselectable=""
        >
          <path
            fill="currentColor"
            d="m6.1 17.8.73.73 1.3-.49a4.5 4.5 0 0 0 1.48-.91L7.5 15.01c-.4.43-.7.94-.91 1.48L6.1 17.8zm2.46-3.85 2.12 2.12 7.39-7.4-2.12-2.11-7.4 7.4zM17 5.5l2.12 2.12.83-.83a1.5 1.5 0 0 0-2.12-2.12L17 5.5zm4.01-1.9a3 3 0 0 1 0 4.25L10.8 18.07a6 6 0 0 1-2.14 1.38l-4 1.49a.75.75 0 0 1-.97-.97l1.5-4a6 6 0 0 1 1.37-2.15L16.78 3.61a3 3 0 0 1 4.24 0z"
          ></path>
        </svg>
      </div>
      <p className=" font-normal text-[14px] mt-2">A5 - horizontal</p>
    </div>
  );
};

export default DesignCard;
