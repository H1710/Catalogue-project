import { Dialog, Transition } from "@headlessui/react";
import { Alert } from "@mui/material";
import axios from "axios";
import React, { Fragment } from "react";
import { useMutation } from "react-query";
import { patchAPI } from "../../utils/FetchData";
import { deleteUserRoute } from "../../utils/APIRoute";
import { toast } from "react-toastify";

export default function DeleteUser({
    isShowDelete,
         userInfo,
         setIsShowDelete
}) {
    const toastOptions = {
        position: 'top-right',
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      };
const closeDeletePopup = () => {
    setIsShowDelete(false);
}

const { mutate: deleteUser, isLoading: loadingDeleteUser } = useMutation({
    mutationFn: () => {
      return patchAPI(`${deleteUserRoute}/${userInfo.id}`);
    },
    onError: (error) => {
        closeDeletePopup();
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
        closeDeletePopup();
      toast.success(data.data.message, toastOptions);
    },
  });
    const handleDelete = () => {
        deleteUser()
      };
    
      
  return (

    <Transition appear show={isShowDelete} as={Fragment}>
    <Dialog as="div" className="relative z-10" onClose={closeDeletePopup}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/25" />
      </Transition.Child>
  
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
               <Alert severity="warning"><p className="text-[17px] font-semibold"> Banning account confirm</p></Alert>
              </Dialog.Title>
              <Dialog.Description className={'px-2 py-3'}>Are you sure to want banned account?</Dialog.Description>
             <div className="flex   justify-end mt-4  ">
                  <button 
                  className="text-center bg-gray-100 rounded px-4 py-1 mx-2"
                  onClick={() => handleDelete()}>Confirm</button>
                  <button 
                  className="text-center bg-gray-100  rounded  px-4 py-1 mx-2" 
                  onClick={closeDeletePopup}>Cancel</button>
             </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
//      
  )
}
