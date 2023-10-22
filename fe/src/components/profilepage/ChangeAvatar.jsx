import React, { useState } from "react";

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
    <div className="border-b-2 border-slate-50  pb-4">
    <div className="avatar flex items-center  py-2 relative">
      <img
        src= {avatar}
        alt=""
        className="w-16 h-16 rounded-[50%]"
      />
      <div className="flex flex-col pl-5">
        <div className="  min-w-[240px] text-[18px]">
          Upload your profile photo
        </div>
        <div className="min-w-[250px] text-[16px] italic">
          This setting helps team members recognize you on Noto.
        </div>
      </div>
      <div className="flex justify-center items-center absolute right-0 ">
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
