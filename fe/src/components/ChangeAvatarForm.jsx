import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ChangeAvatarForm = ({ openEditAvatar, setOpenEditAvatar, setImage }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [editImage, setEditImage] = useState("");
  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  useEffect(() => {
    if (!selectedFile) {
      setEditImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setEditImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setImage(editImage);
  };

  return (
    <Transition appear show={openEditAvatar} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenEditAvatar(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit avatar
                </Dialog.Title>

                <form
                  className="mt-4"
                  encType="multipart/form-data"
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div className="my-4 text-sm">
                    <label htmlFor="avatar" className="block text-black">
                      Avatar
                    </label>
                    <input
                      autoComplete="off"
                      type="file"
                      className="rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      placeholder="Avatar"
                      name="avatar"
                      accept=".jpg, .jpeg, .png"
                      //   value={values.firstname}
                      onChange={(e) => handleChange(e)}
                    />
                    {editImage && <img src={editImage} alt="" />}
                  </div>
                  <div className="flex gap-20 mt-4">
                    <div
                      onClick={() => {
                        setOpenEditAvatar(false);
                      }}
                      className="cursor-pointer flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-200 w-full border border-green"
                    >
                      Cancel
                    </div>
                    <button
                      type="submit"
                      className={`flex-1 text-center p-3 duration-300 rounded-sm ${
                        !selectedFile
                          ? "bg-gray-200"
                          : "bg-gray-800 hover:bg-black text-white"
                      }`}
                      disabled={!selectedFile}
                    >
                      <p>Create</p>
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ChangeAvatarForm;
