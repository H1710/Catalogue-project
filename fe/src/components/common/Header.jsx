import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faCircleQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { NotifList } from "../../shared/Notification";
import Tippy from "@tippyjs/react";
import { Menu } from "@headlessui/react";
import MinidenticonImg from "./MinidenticonImg";
import Dropdown from "./Dropdown";

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "Language",
    children: {
      title: "Languge",
      data: [
        {
          code: "en",
          title: "English",
          type: "language",
        },
        {
          code: "vi",
          title: "Vietnamese",
          type: "language",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Help",
    to: "/help",
  },
];

function Header({ setShowSidebar, showSidebar, user, setOpenAuthForm }) {
  const newNotification = 5;
  const [showNoti, setShowNoti] = useState(false);
  const [dropDown, setDropdown] = useState(false);
  const navigate = useNavigate();
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
  const customFontStyle = {
    // fontFamily: " 'Be Vietnam Pro', sans-serif",
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      to: "/profile",
    },
    ...MENU_ITEMS,
  ];
  // const openNoti = () => {
  //   setShowNoti(true);
  // }
  // const closeNoti = () => {
  //   setShowNoti(false);
  // }
  // const notiRef = useRef(null);

  return (
    <div className="p-2 h-[60px] shadow w-full sticky top-0 z-40 bg-white">
      <div
        className="header flex h-full items-center justify-between text-zinc-700 px-2"
        style={customFontStyle}
      >
        <div className="flex text-xl h-full items-center gap-6 ">
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

                {dropDown && <Dropdown user={user} />}
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpenAuthForm(true);
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;