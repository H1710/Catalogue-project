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
import { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  const [navList, setNavList] = useState([
    {
      id: 1,
      title: "Home Page",
      to: "/",
      selected: false,
    },
    {
      id: 2,
      title: "Blog Page",
      to: "/blog",
      selected: false,
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

  return (
    <div className="px-[16px] shadow-md w-full top-0 z-40 bg-white   ">
      <div
        className="header flex py-2 h-[72px] items-center"
        style={customFontStyle}
      >
        <div
          className="text-[24px] px-[6px]"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="logo flex ml-2 w-1/5 font-bold">
          <img
            className="  object-cover w-24"
            src="assets/images/logo_final.png"
            alt="logo"
          />
          {/* <p className="text-3xl   text-[#E9168E] ml-4 leading-[50px]"></p> */}
        </div>
        <div className=" nav w-3/5 flex text-xl h-full inline-block ">
          {navList.map((nav) => (
            <Link to={nav.to} key={nav.id}>
              <button
                key={nav.id}
                className={`flex text-xl h-full whitespace-nowrap active:border-b-2 px-1 text-xl font-medium items-center justify-center
                active:border-indigo-600 active:text-indigo-600  border-transparent text-gray-900  ${
                  nav.selected
                    ? "bg-orange-300 bg-opacity-40 border-b-2 border-orange-900 "
                    : "border-transparent text-gray-900"
                }`}
              >
                <p className="px-4">{nav.title}</p>
              </button>
            </Link>
          ))}
        </div>

        <div className="flex text-xl items-center w-1/5 ps-[200px] gap-x-3.5">
          <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
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
