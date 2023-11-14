import React, { useCallback } from "react";
import MinidenticonImg from "./MinidenticonImg";
import { postAPI } from "../../utils/FetchData";
import { logoutRoute } from "../../utils/APIRoute";
import { useDispatch } from "react-redux";
import { seft } from "../../redux/reducers/authReducer";
import { Link } from "react-router-dom";

const Dropdown = ({ user }) => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(async () => {
    await postAPI(logoutRoute);
    // dispatch(seft(null));
  }, []);

  return (
    <div className="bg-white absolute right-0 top-14 border border-[#ccc] shadow-lg rounded-md py-4">
      <div className="flex flex-row items-center justify-between gap-4 px-4">
        {user?.avatar ? (
          <img
            src={user.avatar}
            className="w-14 h-14 rounded-full object-cover mx-auto cursor-pointer"
          />
        ) : (
          <MinidenticonImg
            username={user.name}
            className="w-14 h-14 rounded-full object-cover mx-auto cursor-pointer border border-[#ccc]"
          />
        )}
        <div className="flex flex-col truncate">
          <p className="truncate">{user.name}</p>
          <p className="text-sm truncate">{user.email}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2 mt-3">
          <Link to={`/profile/${user.id}`}> 
        <p className="text-[16px] hover:bg-gray-100 py-2 px-4 cursor-pointer">
          Account Setting
        </p>
        </Link>
        <p
          onClick={handleLogout}
          className="text-[16px] hover:bg-gray-100 py-2 px-4 cursor-pointer"
        >
          Logout
        </p>
      </div>
    </div>
  );
};

export default Dropdown;
