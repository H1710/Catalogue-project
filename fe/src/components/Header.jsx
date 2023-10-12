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
  const newNotification = 5;
  const [showNoti, setShowNoti] = useState(false);
  // console.log(showNoti);
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
  useEffect(() => {}, []);
  return (
    <div className="px-[16px] shadow-md h-full w-full top-0 z-40 bg-white   ">
      <div
        className="header flex h-full items-center text-zinc-700"
        // style={customFontStyle}
      >
        <div
          className="text-[24px] px-[6px] cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="logo flex ml-2 w-1/6 font-bold">
          <img
            className="  object-cover w-20"
            src="assets/images/logo_final.png"
            alt="logo"
          />
        </div>
        <div className=" nav w-2/3 flex text-xl h-full inline-block ">
          {navList.map((nav) => (
            <NavLink to={nav.to} key={nav.id}>
              {({ isActive, isPending }) => (
                <span
                  className={
                    isActive
                      ? "active  border-b-4 border-green-400 flex text-xl h-full w-[120px] text-xl font-semibold items-center justify-center"
                      : "flex text-xl h-full w-[120px] text-xl font-semibold items-center justify-center hover:bg-green-100 rounded-[3px]"
                  }
                >
                  {nav.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex text-xl items-center w-1/6  gap-x-3 ">
          <div className="w-1/3"></div>
          <div>
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
              <div className="relative px-2 " onClick={() => setShowNoti(!showNoti)}>
                <FontAwesomeIcon icon={faBell} className="cursor-pointer  " />
                <div className="absolute text-rose-400 text-[14px] font-semibold bottom-3 ml-3">
                  +{newNotification}
                </div>
              </div>
            </Tippy>
          </div>

          <Menu items={userMenu}>
            <img
              src="https://thuthuatnhanh.com/wp-content/uploads/2018/07/anh-dai-dien-dep-652x580.jpg"
              alt=""
              className="w-10 h-10 rounded-[5px] object-cover mx-auto cursor-pointer"
            />
          </Menu>
        </div>
      </div>
    </div>
  );
}
export default Header;
