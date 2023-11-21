import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  createBlogRoute,
  postOrderRoute,
  updateUserRoute,
} from "../../utils/APIRoute";
import CustomButton from "../common/Button";
import { Countries } from "../../shared/Countries";
import { patchAPI, postAPI } from "../../utils/FetchData";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { ValidateService } from "../../utils/ValidateService";
import { useOutletContext } from "react-router-dom";

export default function UpdateUserForm({ isOpen, setIsOpen, userInfo, page }) {
  const queryClient = useQueryClient();
  const [user] = useOutletContext();
  const countries = Countries.map((country) => country.name);
  const [selectedRole, setSelectedRole] = useState(userInfo?.role?.id || "");
  const [selectedCountry, setSelectCountry] = useState(userInfo.country);
  const [userInformation, setUserInformation] = useState(userInfo);
  const orderLength = userInfo?.orders?.length;
  const [selectedService, setSelectedService] = useState(
    userInfo?.orders[orderLength - 1]?.servicePackageId
  );
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const handleChange = (e) => {
    setUserInformation({ ...userInformation, [e.target.name]: e.target.value });
  };
  const { mutate: updateUser, isLoading: loadingUpdateUser } = useMutation({
    mutationFn: (info) => {
      return patchAPI(updateUserRoute, info);
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["users", page]);
      toast.success(data.data.message, toastOptions);
    },
  });

  const { mutate: createOrder, isLoading: loadingCreateOrder } = useMutation({
    mutationFn: () => {
      return postAPI(postOrderRoute, {
        userId: userInformation.id,
        packageId: userInformation.service_package,
      });
    },
    onError: (error) => {
      toast.error(error.response.data.message, toastOptions);
    },
    onSuccess: (data) => {
      toast.success(data.data.message, toastOptions);
    },
  });

  const handleUpdate = () => {
    closeModal();
    updateUser(userInformation);
    console.log(userInformation);
    if (
      userInformation.service_package == 2 ||
      userInformation.service_package == 3
    ) {
      createOrder();
    }
  };
  console.log(userInformation);
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
                      <label htmlFor="email" className="block text-black">
                        Name
                      </label>
                      <input
                        autoComplete="off"
                        className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        defaultValue={userInfo.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        required
                      />
                    </div>
                    <div className="my-4 text-sm">
                      <label htmlFor="email" className="block text-black">
                        Email
                      </label>
                      <input
                        type="email"
                        autoComplete="off"
                        className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        defaultValue={userInfo.email}
                        name="email"
                        readOnly
                        required
                      />
                    </div>

                    <div className="my-4 text-sm">
                      <label htmlFor="role" className="block text-black">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        defaultValue={selectedCountry}
                        onChange={(e) => handleChange(e)}
                        className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        required
                      >
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="my-4 text-sm">
                      <label htmlFor="role" className="block text-black">
                        Role
                      </label>
                      {userInfo.id !== user.id ? <select
                        id="role"
                        name="role"
                        defaultValue={selectedRole}
                        onChange={(e) => handleChange(e)}
                        className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                        required
                      >
                        <option value="1">Admin</option>
                        <option value="2">Customer</option>
                        <option value="3">Guest</option>
                      </select>:
                      <input
                      className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      value={userInfo?.role.name}
                      readOnly/>}
                    </div>

                    <div className="my-4 text-sm">
                      <label htmlFor="Service" className="block text-black">
                        Service
                      </label>

                      {userInfo.role.id !== 1 ? (ValidateService(userInfo) === "Free" ? (
                        // selectedService == 1 || selectedService === null
                        <select
                          id="service_package"
                          name="service_package"
                          // defaultValue={selectedService}
                          onChange={(e) => handleChange(e)}
                          className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                          required
                        >
                          <option value="1">Free</option>
                          <option value="2">Monthly Premium</option>
                          <option value="3">Yearly Premium</option>
                        </select>
                      ) : (
                        <input
                          type="service"
                          autoComplete="off"
                          className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                          value={
                            userInfo?.orders[orderLength - 1]?.service_package
                              ?.name
                          }
                          name="service"
                          // onChange={(e) => handleChange(e)}
                          readOnly
                        />
                      ))
                      :
                      <input
                      className="rounded-md px-4 py-3 mt-1 focus:outline-none bg-gray-100 w-full"
                      value={'Free'}
                      readOnly/>}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="mt-4 mr-4">
                      <CustomButton
                        text={"Update"}
                        handleClick={handleUpdate}
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
