import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { createBlogRoute } from "../../utils/APIRoute";
import CustomButton from "../common/Button";

export default function UpdateUserForm({ isOpen, setIsOpen, userInfo }) {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleChange() {}
  console.log(userInfo);
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Update form
                  </Dialog.Title>
                  <div className="mt-2 gap-6">
                    <div className="my-4 text-sm">
                      <label htmlFor="email" class="block text-black">
                        Name
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        class="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        value={userInfo.name}
                        name="email"
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>

                    <div className="my-4 text-sm">
                      <label htmlFor="email" class="block text-black">
                        Country
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        class="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        value={userInfo.country}
                        name="email"
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>

                    <div className="my-4 text-sm">
                      <label htmlFor="role" className="block text-black">
                        Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        onChange={(e) => handleChange(e)}
                        className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        required
                      >
                        <option value="" disabled>
                          Select a role
                        </option>
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="2">Designer</option>
                      </select>
                    </div>

                    <div className="my-4 text-sm">
                      <label htmlFor="role" className="block text-black">
                        Service
                      </label>
                      <select
                        id="role"
                        name="role"
                        onChange={(e) => handleChange(e)}
                        className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        required
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option value="1">Free</option>
                        <option value="2">Monthly Premium</option>
                        <option value="2">Yearly Premium</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="mt-4 mr-4">
                      <CustomButton
                        text={"Update"}
                        handleClick={closeModal}
                        classContent={
                          "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        }
                      ></CustomButton>
                    </div>
                    <div className="mt-4">
                      <CustomButton
                        text={"Cancel"}
                        handleClick={closeModal}
                        classContent={
                          "inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        }
                      ></CustomButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
