import React, { Fragment, useCallback, useState } from "react";
import MinidenticonImg from "../components/common/MinidenticonImg";
import { useQuery } from "react-query";
import { getAllUserRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { Dialog, Pagination } from "@mui/material";
import UpdateUserForm from "../components/admin/UpdateUserForm";
import { ToastContainer, toast } from "react-toastify";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import { ValidateService } from "../utils/ValidateService";
import DeleteUser from "../components/admin/DeleteUser";
import NotFoundPage from "../pages/NotFoundPage";
import RestoreUser from "../components/admin/RestoreUser";

const UserListPage = () => {
  const [user] = useOutletContext();
  const [userInfo, setUserInfo] = useState(null);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowRestore, setIsShowRestore] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const {
    data: userList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", page, user?.access_token],
    queryFn: () => {
      return getAPI(`${getAllUserRoute}?page=${page}`, user?.access_token);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
  },[]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  },[]);
  const closeModalDelete = useCallback(() => {
    setIsShowDelete(false);
  },[]);

  const openModalDelete = useCallback(() => {
    setIsShowDelete(true);
  },[]);
  const openModelRestore = useCallback(() => {
    setIsShowRestore(true);
  },[]);
  const handleUpdate = (user) => () => {
    openModal();
    setUserInfo(user);
  };
  const handleDeletePopup = (user) => () => {
    openModalDelete();
    setUserInfo(user);
  };
  const handleRestorePopup = (user) => () => {
    openModelRestore();
    setUserInfo(user);
  };

  const handleChangePage = (e, value) => {
    navigate(`/account-list?page=${value}`);
  };

  if (isError) {
    return <NotFoundPage />;
  }
  return (
    <div className="w-full h-full flex flex-col justify-center overflow-auto">
      <div className="p-4 h-full">
        {userList?.data?.rows && (
          <table className="w-full border rounded text-center">
            <thead>
              <tr className="border-y">
                {/* <th className="p-2 bg-gray-800 text-white"></th> */}
                <th className="p-2 bg-gray-800 text-white">Avatar</th>
                <th className="p-2 bg-gray-800 text-white">Name and Email</th>
                <th className="p-2 bg-gray-800 text-white">Country</th>
                <th className="p-2 bg-gray-800 text-white">Role</th>
                <th className="p-2 bg-gray-800 text-white">Package</th>
                <th className="p-2 bg-gray-800 text-white">Status</th>
                <th className="p-2 bg-gray-800 text-white"></th>
                <th className="p-2 bg-gray-800 text-white"></th>
              </tr>
            </thead>
            <tbody>
              {userList?.data?.rows.map((user, index) => (
                <tr className="border-y hover:bg-gray-100 h-[72px]" key={index}>
                  {/* <td className="pl-2 text-white">
                    <input
                      id="link-checkbox"
                      type="checkbox"
                      className="w-5 h-5 rounded text-blue-600 bg-gray-100 border-yellow-300"
                    />
                  </td> */}
                  <td className="">
                    <div className="flex justify-center">
                      {user?.avatar ? (
                        <img src={user.avatar} />
                      ) : (
                        <MinidenticonImg
                          username={user?.email}
                          className="w-12"
                        />
                      )}
                    </div>
                  </td>
                  <td className="">
                    <div className="text-center">
                      {user?.name}
                      <br />
                      {user?.email}
                    </div>
                  </td>
                  <td className=" text-center">{user.country}</td>
                  <td className=" text-center">{user?.role?.name}</td>
                  <td className=" text-center">
                    {/* {user.orders[0]?.service_package?.name} */}
                    {ValidateService(user)}
                  </td>
                  <td className=" text-center">{user.status}</td>
                  <td className=" text-center">
                    <button
                      className="text-green-500 font-bold py-2 px-4 hover:opacity-50 rounded flex items-center"
                      onClick={handleUpdate(user)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="text-end pr-2 ">
                    {user.status === "Active" ? (
                      <button
                        className="text-red-600 font-bold  hover:opacity-50 rounded flex items-center"
                        onClick={handleDeletePopup(user)}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="text-red-600 font-bold  hover:opacity-50 rounded flex items-center"
                        onClick={handleRestorePopup(user)}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="orange"
                          class="bi bi-arrow-counterclockwise"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                          />
                          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          className="h-20 flex justify-end"
          count={Math.ceil(userList?.data.count / 10)}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />

        {isOpen && userInfo && (
          <UpdateUserForm
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            userInfo={userInfo}
            page={page}
          />
        )}

        {isShowDelete && userInfo && (
          <DeleteUser
            isShowDelete={isShowDelete}
            user={user}
            page={page}
            userInfo={userInfo}
            setIsShowDelete={setIsShowDelete}
          />
        )}
        {isShowRestore && userInfo && (
          <RestoreUser
            isShowRestore={isShowRestore}
            user={user}
            page={page}
            userInfo={userInfo}
            setIsShowRestore={setIsShowRestore}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserListPage;
