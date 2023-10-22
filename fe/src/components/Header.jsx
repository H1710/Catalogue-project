 
import MenuUser from "./MenuUser";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import LoginForm from "./LoginForm";
import Notifications from "./Notifications";
 

function Header({ setShowSidebar, showSidebar }) {
  const newNotification = 5;
  const [showNoti, setShowNoti] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
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
  

 
  useEffect(() => {}, []);
  // console.log(loginForm);
  return (
    <div className="px-[16px] shadow-md h-full w-full top-0 z-40 bg-white   ">
      <div
        className="header flex h-full items-center  "
      >
        <div
          className="text-[24px] px-[6px] cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
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
        <div className="logo flex ml-2 w-1/6 font-bold">
          <img
            className="  object-cover w-20"
            src="assets/images/logo_final.png"
            alt="logo"
          />
        </div>
        <div className="w-2/3 flex text-xl h-full">
          {navList.map((nav) => (
            <NavLink to={nav.to} key={nav.id}>
              {({ isActive, isPending }) => (
                <span
                  className={`${
                    isActive
                      ? "border-b-[2px] px-2 border-green-400 hover:bg-white transition-all ease-in-out delay-150"
                      : "hover:bg-gray-100 hover:rounded-sm"
                  }  flex text-xl h-full w-[120px] font-medium select-none items-center justify-center`}
                >
                  {nav.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex text-xl items-center w-1/6  gap-x-3 text-left ">
          <div className="w-1/3"></div>
          <div>
            <Notifications/>
          </div>
          {/* <div>
            <Tippy
              offset={[0, 10]}
              placement="bottom"
              interactive
              visible={showNoti}
              interactiveBorder={10}
              render={({ ...attrs }) => (
                <div
                  tabIndex="-1"
                  {...attrs}
                  className="w-[300px] shadow-xl bg-white inline-block rounded-[3px] z-100 p-2 max-h-[500px] overflow-auto"
                >
                  <h2 className="font-semibold  border-b-2 border-slate-500 p-2 mb-2">
                    Notifications
                  </h2>
                  {NotifList.map((noti, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start rounded-[5px]  cursor-pointer hover:bg-green-50  "
                    >
                      <div className="px-2 text-[15px]"> {noti.value}</div>
                      <div className="text-[10px] flex justify-end px-2 text-teal-600">
                        {noti.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              onClickOutside={() => setShowNoti(false)}
            >
              <div
                className="relative px-2 "
                onClick={() => setShowNoti(!showNoti)}
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
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>

                <div className="absolute text-rose-400 text-[14px] font-semibold bottom-3 ml-3">
                  +{newNotification}
                </div>
              </div>
            </Tippy>
          </div> */}

          <div>
            <MenuUser >
            <img
              src="https://demoda.vn/wp-content/uploads/2023/01/hinh-anh-avatar-cute-1-600x600.jpg"
              alt=""
              className="w-10 h-10 rounded-[50%] border-2 border-slate-50 object-cover mx-auto cursor-pointer"
            />
            </MenuUser>
            {/* <Menu items={userMenu}>
             
          </Menu> */}
            {/* <button
              onClick={() => {
                setLoginForm(true);
              }}
            >
              Login
            </button> */}
          </div>
        </div>
      </div>
      <LoginForm openLogin={loginForm} setOpenLogin={setLoginForm} />
    </div>
  );
}
export default Header;
