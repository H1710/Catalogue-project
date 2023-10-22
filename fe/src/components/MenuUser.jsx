import Tippy from '@tippyjs/react/headless';
import { Fragment, useState } from 'react';
import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faCircleQuestion,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Menu, Transition } from '@headlessui/react';
// const defaultFn = () => {};

// function Menu({ children, items = [], onChange = defaultFn }) {
//   const [history, setHistory] = useState([{ data: items }]);
//   const current = history[history.length - 1];

//   const renderItems = () => {
//     return current.data.map((item, index) => {
//       const isParent = !!item.children;
//       return (
//         <Button
//          to={item.to}
//          icon={item.icon}
//           key={index}
//           data={item}
//           onClick={() => {
//             if (isParent) {
//               setHistory((prev) => [...prev, item.children]);
//             } else {
//               onChange(item);
//             }
//           }}
//         >
//           {item}
//         </Button>
//       );
//     });
//   };

//   return (
//     <Tippy
//     offset={[10, 10]}
//       interactive
//       placement='bottom-end'
//       delay={[0, 700]}
//       // hideOnClick={false}
//       render={(attrs) => (
//         <div tabIndex={-1} {...attrs}
//         className=' shadow bg-white min-w-[160px] text-base cursor-pointer rounded-md '

//         >
//           {history.length > 1 &&
//           <Button icon={<FontAwesomeIcon icon={faChevronLeft}/> }
//           className='bg-white w-[145px] '
//           onClick={()=> {
//             setHistory(prev => prev.slice(0, prev.length - 1))
//           }}
//           >
//             {'Language'}
//           </Button>}
//           {renderItems()}
//         </div>
//       )}
//     >
//       {children}
//     </Tippy>
//   );
// }

// export default Menu;
import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuUser({ children }) {
  return (
    <div className="fixed top-2 right-10   ">
      <Menu as="div" className="relative  ">
        <Menu.Button className="text-right">{children}</Menu.Button>
       <Transition
       as={Fragment}
       enter="transition ease-out duration-100"
       enterFrom="transform opacity-0 scale-95"
       enterTo="transform opacity-100 scale-100"
       leave="transition ease-in duration-75"
       leaveFrom="transform opacity-100 scale-100"
       leaveTo="transform opacity-0 scale-95">
          <Menu.Items
            className={
              'absolute right-0 w-40  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '
            }
          >
            <div className="p-1 text-left flex flex-col text-[17px]">
              <Menu.Item as='div'>
                {({ active }) => (
                  <Link
                    to={'/profile'}
                    className={`${
                      active ? 'bg-emerald-400 text-white' : ''
                    } group flex w-full items-center rounded-md px-2 py-2  `}
                  >
                    <span>
                      <FontAwesomeIcon icon={faUser}  className='h-4 w-4 pr-2'/>
                    </span>
                    <span> View Profile</span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={'/help'}
                    className={`${
                      active ? 'bg-emerald-400 text-white ' : ''
                    } group flex w-full items-center rounded-md px-2 py-2 `}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCircleQuestion} className='h-4 w-4 pr-2'/>
                    </span>
                    <span> Help</span>
                  </Link>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
       </Transition>
      </Menu>
    </div>
  );
}
