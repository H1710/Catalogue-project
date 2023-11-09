import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faCircleQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationForm from "./AuthenticationForm";
import { Menu } from "@headlessui/react";
import MinidenticonImg from "./MinidenticonImg";
import Notifications from "./Notifications";

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

function Header({ setShowSidebar, showSidebar, user }) {
  const newNotification = 5;
  const [showNoti, setShowNoti] = useState(false);
  const [openForm, setOpenForm] = useState(false);
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
  useEffect(() => {}, []);
  return (
    <div className="px-[16px] shadow h-full w-full top-0 z-40 bg-white   ">
      <div
        className="header flex h-full items-center justify-between text-zinc-700 px-2"
        style={customFontStyle}
      >
        <div className="flex text-xl h-full items-center gap-6">
          <div className="" onClick={() => setShowSidebar(!showSidebar)}>
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
          <div className="logo flex font-bold">
            <img
              className="  object-cover w-20"
              src="assets/images/logo_final.png"
              alt="logo"
            />
          </div>
          {navList.map((nav) => (
            <NavLink to={nav.to} key={nav.id} className="h-full">
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

        <div className="flex text-xl items-center gap-6 h-full">
          <div>
          <div className="w-1/3"></div>
          <div>
            <Notifications/>
          </div>
          </div>
          <NavLink
            to={"/design"}
            className="bg-[#8b3dff] hover:bg-[#7300e6] text-white px-2 py-[6px] rounded-md text-[16px] font-medium"
          >
            Create a design
          </NavLink>

          <div>
            {user ? (
              <Menu items={userMenu}>
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-10 h-10 rounded-[5px] object-cover mx-auto cursor-pointer"
                  />
                ) : (
                  <MinidenticonImg
                    username={user.name}
                    className="w-10 h-10 rounded-[5px] object-cover mx-auto cursor-pointer"
                  />
                )}
              </Menu>
            ) : (
              <button
                onClick={() => {
                  setOpenForm(true);
                }}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthenticationForm openForm={openForm} setOpenForm={setOpenForm} />
    </div>
  );
}
export default Header;
