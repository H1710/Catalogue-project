import React, { useRef, useState } from 'react';

export default function InfoDetail({ info, setInfo, name }) {
  const attr = name.toLowerCase();
  const [inputValue,setInputvalue] = useState(info[attr])
  const [isFix, setIsFix] = useState(false);
  const handleChangeProfile = (e) => {
    setIsFix(false)
    setInfo({ ...info, [attr]: inputValue });
  };
  const handleChange = (e) => {
      setInputvalue(e.target.value);
  }
  
  return (
    <div className="profile-details pb-4 border-b-2 border-slate-50">
      <div className="flex  flex-col justify-start  h-[72px]   w-full relative">
        <div className="font-semibold h-8 ">{name}</div>
        {!isFix && (
          <div className="flex justify-between align-items-center leading-10">
            <div className="">{info[attr]}</div>
            <div
              className="btn bg-slate-50 cursor-pointer  flex justify-center items-center rouned-[5px] w-[150px]  h-10 "
              onClick={() => setIsFix(!isFix)}
            >
              Edit
            </div>
          </div>
        )}

        {isFix && (
          <div className="flex justify-between">
            <input 
            onChange={handleChange}
            name={attr}
            value={inputValue} 
            className="w-[60%] rounded" />
            <div className="grid gap-x-2 grid-cols-2">
              <button
                type="button"
                
                onClick={()=> setIsFix(!isFix) }
                className="border-2 border-slate-100 p-3 rounded bg-slate-50 hover:bg-slate-100 "
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleChangeProfile}
                className="border-2 border-slate-100 p-3 rounded bg-teal-700 hover:bg-teal-800 "
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
