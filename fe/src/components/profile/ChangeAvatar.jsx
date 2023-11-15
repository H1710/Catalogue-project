import React, { useState } from "react";
import MinidenticonImg from "../common/MinidenticonImg";

export default function ChangeAvatar({info, setInfo}) {
    const [avatar, setAvatar] = useState(info.avatar);
    const handleFileChange =(e) => {
        const file = (e.target.files[0]); 
         if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
             setAvatar(e.target.result);
             setInfo({...info,avatar: e.target.result});
             
            };
            reader.readAsDataURL(file);
          }
    }
  return  (
    <div className="border-b-2 border-slate-50    pb-4">
    <div className="avatar  text-center max-w-20 py-2 relative">
    {info?.avatar ? (
          <img
            src={info?.avatar}
            className="w-14 h-14 rounded-full object-cover mx-auto cursor-pointer"
          />
        ) : (
          <MinidenticonImg
            username={info?.name}
            className="w-14 h-14 rounded-full object-cover mx-auto cursor-pointer border border-[#ccc]"
          />
        )}
       
      <div className="flex justify-center items-center   ">
        <input
          type="file"
          aria-hidden="true"
          className="set-avatar hidden"
          id="set-avatar"
          onChange={handleFileChange}
        />
        <label
          htmlFor="set-avatar"
          className=" update-btn bg-slate-50 rounded-[5px]  flex justify-center items-center w-[150px] h-10 justify-center items-center flex justify-end cursor-pointer "
        >
          <p>Upload your photo</p>
        </label>
      </div>
    </div>
  </div>
  )
}