import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faEarthAsia,
  faCircleQuestion,
  faUser,
  faSignOut,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "./Menu";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { NotifList } from "../shared/Notification";
import Tippy from "@tippyjs/react";

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

function Header({ setShowSidebar, showSidebar }) {
  const [showNoti, setShowNoti] = useState(false);
  console.log(showNoti);
  const [navList, setNavList] = useState([
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
  ]);
  const customFontStyle = {
    fontFamily: "'IBM Plex Sans', sans-serif",
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View Profile",
      to: "/profile",
    },
    ...MENU_ITEMS,
    {
      separate: true,
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Log out",
      to: "/logout",
    },
  ];
  // const openNoti = () => {
  //   setShowNoti(true);
  // }
  // const closeNoti = () => {
  //   setShowNoti(false);
  // }
  const notiRef = useRef(null);
  useEffect(() => {}, []);
  return (
    <div className="px-[16px] shadow-md h-full w-full top-0 z-40 bg-white   ">
      <div
        className="header flex h-full items-center text-zinc-700"
        style={customFontStyle}
      >
        <div
          className="text-[24px] px-[6px]"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="logo flex ml-2 w-1/4 font-bold">
          <img
            className="  object-cover w-24"
            src="assets/images/logo_final.png"
            alt="logo"
          />
        </div>
        <div className=" nav w-1/2 flex text-xl h-full inline-block ">
          {navList.map((nav) => (
            <NavLink to={nav.to} key={nav.id}>
              {({ isActive, isPending }) => (
                <span
                  className={
                    isActive
                      ? "active bg-green-400 flex text-xl h-full w-[120px] text-xl font-semibold items-center justify-center rounded-[3px]"
                      : "flex text-xl h-full w-[120px] text-xl font-semibold items-center justify-center hover:bg-green-100 rounded-[3px]"
                  }
                >
                  {nav.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex text-xl items-center w-1/4  gap-x-3 ">
          <div className="w-2/3"></div>
          <div>
            <Tippy
              offset={[0, 5]}
              placement="bottom-end"
              interactive
              visible={showNoti}
              interactiveBorder={10}
              render={({ ...attrs }) => (
                <div
                  tabIndex="-1"
                  {...attrs}
                  className="w-[300px] bg-[#f9fafb] inline-block rounded-[3px] z-100 p-2 max-h-[500px] overflow-auto"
                >
                  <h2 className="font-semibold  border-b-2 border-slate-500 p-2">
                    Notifications
                  </h2>
                  {NotifList.map((noti, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start  boder-neutral-700 cursor-pointer hover:bg-zinc-100  "
                    >
                      <div className="px-4 text-[15px]"> {noti.value}</div>
                      <div className="text-[10px] flex justify-end px-2">
                        {noti.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              onClickOutside={() => setShowNoti(false)}
            >
              <div className="relative " onClick={() => setShowNoti(!showNoti)}>
                <FontAwesomeIcon icon={faBell} className="cursor-pointer  " />
                <div className="absolute text-red-500 text-[14px] font-semibold bottom-3 ml-3">
                  +5
                </div>
              </div>
            </Tippy>
          </div>

          <Menu items={userMenu}>
            <img
              src="https://bookvexe.vn/wp-content/uploads/2023/04/chon-loc-25-avatar-facebook-mac-dinh-chat-nhat_2.jpg"
              alt=""
              className="w-10 h-10 rounded-[50%] object-cover mx-auto cursor-pointer"
            />
          </Menu>
        </div>
      </div>
    </div>
  );
}
export default Header;
