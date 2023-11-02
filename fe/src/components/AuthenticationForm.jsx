import React, { Fragment, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { Dialog, Transition } from "@headlessui/react";

const AuthenticationForm = ({ openAuthForm, setOpenAuthForm }) => {
  const [state, setState] = useState("login");
  return (
    <Transition appear show={openAuthForm} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setOpenAuthForm(false)}
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
                {state === "login" ? (
                  <LoginForm
                    setState={setState}
                    setOpenAuthForm={setOpenAuthForm}
                  />
                ) : (
                  <RegisterForm
                    setState={setState}
                    setOpenAuthForm={setOpenAuthForm}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthenticationForm;
