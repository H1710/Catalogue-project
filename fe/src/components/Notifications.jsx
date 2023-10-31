import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';

import { NotifList } from '../shared/Notification';
export default function Notifications() {
  const [numberOfNewNoti, setNumberOfNewNoti] = useState(2);
  return (
    <div>
      <Menu as='div'>
        <Menu.Button as="div">
          <div className="relative px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            <span className="absolute text-rose-400 text-[14px] font-semibold bottom-3 ml-2">
              +{numberOfNewNoti}
            </span>
          </div>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
          as='div'
            className={
              'absolute top-14 right-4 h-[500px] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto'
            }
          > 
          <div className='font-semibold  border-b-2 border-slate-500 p-2  '>Notifications</div>
            {NotifList.map((noti, index) => (
              <Menu.Item
                as="div"
                key={index}
                className="w-[300px] p-1 text-left flex flex-col text-[17px] hover:bg-emerald-100 "
              >
                <div className="px-2 text-[15px]"> {noti.value}</div>
                <div className="text-[10px] flex justify-end px-2 text-teal-600">
                  {noti.time}
                </div>
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
