import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ openLogin, setOpenLogin }) => {
  console.log(openLogin);
  return (
    <Transition appear show={openLogin} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenLogin(false)}
      >
        <div className="fixed top-6 inset-0 overflow-y-auto ">
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
              <Dialog.Panel className="w-full max-w-md transform border border-gray-100 overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all">
                <div class="px-12 py-6 rounded-xl">
                  <h1 class="font-medium text-2xl text-center">Login</h1>
                  <form class="mt-6">
                    <div class="my-4 text-sm">
                      <label htmlFor="email" class="block text-black">
                        Email
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        class="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Email"
                        name="email"
                        required
                      />
                    </div>
                    <div class="my-4 text-sm">
                      <label class="block text-black">Password</label>
                      <input
                        type="password"
                        class="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        placeholder="Password"
                        name="password"
                        required
                      />
                      <div class="flex justify-end mt-2 text-xs text-gray-600">
                        <a href="#">Forget Password?</a>
                      </div>
                    </div>
                    <div class="flex gap-2 mt-7">
                      <div
                        onClick={() => {
                          setOpenLogin(false);
                        }}
                        className="cursor-pointer rounded-md flex-1 text-center text-black p-3 duration-300 rounded-sm hover:bg-slate-300 w-full border border-green"
                      >
                        Cancel
                      </div>
                      <button
                        onClick={() => {
                          // Add your login logic here.
                        }}
                        className="flex-1 text-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400"
                      >
                        Login
                      </button>
                    </div>
                    <div class="mt-4 text-center flex items-center justify-center">
                      <div class="flex items-center">
                        <p class="flex justify-center text-xs text-gray-600 mt-[3px]">
                          Do you have no account?
                        </p>
                        <a
                          href="#"
                          class="flex justify-center text-[#3386ff] text-sm font-medium ml-1"
                        >
                          Register
                        </a>
                      </div>
                    </div>
                    <div class="bg-gray-200 gap-2 mt-7 flex items-center justify-center">
                      <a
                        href="#"
                        class="flex justify-center text-black p-3 duration-300 rounded-sm hover:bg-gray-300 w-full"
                      >
                        <img
                          class="w-6 h-5 rounded-full mr-2 mt-1"
                          src="https://i.pinimg.com/originals/74/65/f3/7465f30319191e2729668875e7a557f2.png"
                          alt="Google"
                        />
                        Login with Google
                      </a>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoginForm;
