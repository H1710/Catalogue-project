import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';


const lsPack = [
 
  {
    id: 2,
    name: 'Monthly Premium',
    remainingDay: 30,
    cost: 100
  },
  {
    id: 3,
    name: 'Yearly Premium',
    remainingDay: 365,
    cost: 900,
  },
];

export default function ServicePackage({
  showServiePackages,
  setShowServiePackages,
}) {
   
  return (
    <Transition appear show={showServiePackages} as={Fragment} className=" ">
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setShowServiePackages(false)}
      >
        <div className="fixed top-10 inset-0 overflow-y-auto   ">
          <div className=" z-100 flex min-h-full items-center justify-center p-4 text-center   ">
            <Transition.Child
              as="div"
              // enter="ease-out duration-300"
              // enterFrom="opacity-0 scale-95"
              // enterTo="opacity-100 scale-100"
              // leave="ease-in duration-200"
              // leaveFrom="opacity-100 scale-100"
              // leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full  transform border border-gray-100 overflow-hidden rounded bg-white text-right align-middle shadow-xl transition-all ">
                <div className=" rounded min-w-[1000px]  min-h-[600px] rounded   ">
                 <div className='justify-center items-center flex flex-col'>
                    <div className="text-[40px] text-center text-emerald-400  rounded-t p-3 font-bold m-1 border-[1px] border-gray rounded bg-[#F6F7FC]  ">
                     PRICING
                    </div>
                     <div className='text-[15px] px-2  py-1 border-[1px] border-gray rounded bg-[#F6F7FC] text-center inline'>Find the best plan that fits your business</div>
                 </div>

                  <div className="flex items-center justify-center p-[50px]">
                    {lsPack.map((pack, i) => (
                      <div className="w-[300px] min-h-[300px] border-2 border-emerald flex  flex-col  mx-6 items-center rounded-[10px] p-2"
                      key={i}>
                        <div className="px-4 py-4 text-[20px] flex font-bold  text-center border-[1px] border-gray rounded bg-[#F6F7FC] text-emerald-400">{pack.name}</div>
                        <div className="p-2 text-[70px]  text-emerald-700 border-b-2 "> {pack.cost}
                        <span className='text-[25px] font-semibold'>$</span></div>
                        <div className="p-2 text-[20px] font-semibold">Remaining day : {pack.remainingDay}</div>
                        <div className='rounded border-[1px] border-emerald-300  px-6 py-2 m-4 text-[20px] hover:bg-emerald-100 bg-[#F6F7FC]'
                        onClick={()=> window.alert("Buy successfully")}>Buy Now</div>
                      </div>
                    ))}
                  </div>
                  <div className='rounded  inline-block  border-[1px] border-emerald-300   px-6 py-2 m-4 text-[20px] bg-[#F6F7FC] cursor-pointer hover:bg-emerald-100 '
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
