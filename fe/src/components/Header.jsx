import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faEarthAsia,
  faCircleQuestion,
  faUser,
  faSignOut,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import Menu from './Menu';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { NotifList } from '../shared/Notification';
import Tippy from '@tippyjs/react';
import { faBellSlash, faUserCircle } from '@fortawesome/free-regular-svg-icons';

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'Language',
    children: {
      title: 'Languge',
      data: [
        {
          code: 'en',
          title: 'English',
          type: 'language',
        },
        {
          code: 'vi',
          title: 'Vietnamese',
          type: 'language',
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Help',
    to: '/help',
  },
];

function Header({ setShowSidebar, showSidebar }) {
  const [showNoti, setShowNoti] = useState(false);
  console.log(showNoti);
  const [navList, setNavList] = useState([
    {
      id: 1,
      title: 'Home',
      to: '/home',
    },
    {
      id: 2,
      title: 'Blog',
      to: '/blog',
    },
  ]);
  const customFontStyle = {
    // fontFamily: " 'Be Vietnam Pro', sans-serif",
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View Profile',
      to: '/profile',
    },
    ...MENU_ITEMS,
    // {
    //   separate: true,
    //   icon: <FontAwesomeIcon icon={faSignOut} />,
    //   title: 'Log out',
    //   to: '/logout',
    // },
  ];
  const newNotification = 12
  useEffect(()=> {
    
  }, [])
  return (
    <div className="pl-[16px] pr-[32px] shadow-md w-full top-0 z-40 bg-white   ">
      <div
        className="header flex h-[70px] items-center text-zinc-700"
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
                      ? 'active border-b-2=4 border-green-400 flex text-xl h-full w-[120px] text-xl font-semibold items-center justify-center rounded-[3px]'
                      : 'flex text-xl h-full w-[120px] text-xl font-semibold items-center justify-center hover:bg-green-100 rounded-[3px]'
                  }
                >
                  {nav.title}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex text-xl items-center w-1/4  gap-x-5 ">
          <div className="w-3/4"></div>
          <div>
            <Tippy
              offset={[90,20]}
              placement="bottom-end"
              interactive
              visible={showNoti}
              interactiveBorder={10}
             
              render={({ ...attrs }) => (
                <div
                  tabIndex="-1"
                  {...attrs}
                  className="min-w-[370px] bg-green-50 inline-block rounded-[3px] z-100 p-2 max-h-[500px] shadow-md overflow-auto z-50"
                >
                  <h2 className='font-semibold  border-b-2 border-slate-500 p-2  mb-2'>Notifications</h2>
                  {NotifList.map((noti, index) => (
                    <div
                      key={index}
                      className="flex flex-col justify-start  boder-neutral-700 cursor-pointer hover:bg-green-100 z-50 rounded-[5px]"
                    >
                     <div className='px-2 text-[15px]'> {noti.value}</div>
                      <div className='text-[10px] flex justify-end px-2 font-semibold h-5 items-center text-sky-700'>{noti.time}</div>
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
              src="data:image/png;base64,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"
              alt=""
              className="w-12 h-12 rounded-[10%] border-2 border-slate-100 object-cover mx-auto cursor-pointer"
            />
          </Menu>
        </div>
      </div>
    </div>
  );
}
export default Header;
