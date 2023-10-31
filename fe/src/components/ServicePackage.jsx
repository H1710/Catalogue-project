import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

const lsPack = [
 
  {
    id: 2,
    name: 'Premium',
    remainingDay: 30,
    cost: 1000,
  },
  {
    id: 3,
    name: 'Premium',
    remainingDay: 365,
    cost: 1000,
  },
];

export default function ServicePackage({
  showServiePackages,
  setShowServiePackages,
}) {
   
  return (
    <Transition appear show={showServiePackages} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setShowServiePackages(false)}
      >
        <div className="fixed top-6 inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full  transform border border-gray-100 overflow-hidden rounded bg-white text-right align-middle shadow-xl transition-all ">
                <div className=" rounded min-w-[600px]  min-h-[400px] rounded text-teal-900 ">
                  <div className="text-[30px] text-center w-full bg-emerald-200 rounded-t bg-emerald-200 py-4 mb-2 font-bold">
                    Service Packages
                  </div>

                  <div className="flex  ">
                    {lsPack.map((pack, i) => (
                      <div className="w-[300px] min-h-1/2 border-2 border-emerald flex  flex-col  mx-6 items-center rounded-[3px]"
                      key={i}>
                        <div className="px-4 py-4 text-[30px] flex font-bold ">{pack.name}</div>
                        <div className="p-2 text-[20px] font-semibold">Remaining day : {pack.remainingDay}</div>
                        <div className="p-2 text-[20px] font-semibold">Cost : {pack.cost}$</div>
                        <div className='rounded-xl ring-1 bg-emerald-700 text-white px-6 py-2 m-4 text-[25px]'
                        onClick={()=> window.alert("Buy successfully")}>Buy now</div>
                      </div>
                    ))}
                  </div>
                  <div className='rounded-xl ring-1 bg-emerald-900 inline-block  text-white px-6 py-2 m-4 text-[25px]  cursor-pointer'
                  onClick={()=> setShowServiePackages(false)}>Close</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
