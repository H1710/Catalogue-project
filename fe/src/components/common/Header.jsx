import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


import MinidenticonImg from "./MinidenticonImg";
import Dropdown from "./Dropdown";


function Header({ setShowSidebar, showSidebar, user, setOpenAuthForm, isDisableMenu }) {
  
  const [showNoti, setShowNoti] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const handleOutsideClick = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setDropdown(false);
  //     }
  //   };
  //   document.addEventListener('click', handleOutsideClick);
  //   return () => {
  //     document.removeEventListener('click', handleOutsideClick);
  //   };
  // }, []);
  
  // console.log(showNoti);
  const navList = [
    {
      id: 1,
      title: "Home",
      to: "/home",
    },
    {
      id: 2,
      title: "Blog",
      to: "/blog",
    },
  ];
  
 
 
  return (
    <div className="p-2 h-[60px] shadow w-full sticky top-0 z-40 bg-white">
      <div
        className="header flex h-full items-center justify-between text-zinc-700 px-2"
       
      >
        <div className="flex text-xl h-full items-center gap-6 ">
          <button
            className="p-2 cursor-pointer hover:bg-gray-100 transition-all ease-in-out delay-50 rounded-sm"
            onClick={() => setShowSidebar(!showSidebar)}
            aria-readonly
           disabled={!isDisableMenu}
           

          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {user?.access_token && (
            <div
              className="p-2 cursor-pointer hover:bg-gray-100 transition-all ease-in-out delay-50 rounded-sm"
              onClick={() => setShowSidebar(!showSidebar)}
              aria-readonly
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
          <div className="logo flex font-bold">
            <img
              className="object-cover w-24 h-6"
              src="assets/images/noto-logo.svg"
              alt="logo"
            />
          </div>
          {navList.map((nav) => (
            <NavLink
              to={nav.to}
              key={nav.id}
              className="h-full flex items-center text-[--primary-text]"
            >
              {({ isActive, isPending }) => (
                <span
                  className={`${
                    isActive
                      ? "bg-[#ededed] font-medium"
                      : "hover:bg-gray-100 transition-all ease-in-out delay-50 font-normal "
                  } flex px-6 py-1 text-lg rounded-sm select-none items-center justify-center`}
                >
                  {nav.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-6 h-full">
         

          <div>
            {user?.access_token ? (
              <div className="relative">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-12 h-12 rounded-[5px] object-cover mx-auto cursor-pointer"
                  />
                ) : (
                  <MinidenticonImg
                    username={user.name}
                    onClick={() => setDropdown((prev) => !prev)}
                    className="w-12 rounded-full object-cover mx-auto cursor-pointer border border-[#ccc]"
                  />
                )}

                {dropDown && <Dropdown user={user}  ref={dropdownRef}/>}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setOpenAuthForm(true);
                    
                  }}
                  className="flex-1 ml-3 text-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[100px] font-semibold"
                >
                  Login
                </button>
              </>

            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
