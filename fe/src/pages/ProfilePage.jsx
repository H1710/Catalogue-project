import Header from "../components/common/Header";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {formatDate} from "../utils/FormatDate"
import axios from "axios";
import { getHistoricalOrderRoute } from "../utils/APIRoute";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";

 
function ProfilePage() {
  const [user, setOpenAuthForm] = useOutletContext();
  const {
    data: orders,
    isLoading
  }= useQuery({
    queryKey: ["historical-order", user?.id],
    queryFn: () => {
      return getAPI(`${getHistoricalOrderRoute}/${user?.id}`);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
  })
  
   if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-t-4 border-gray-300 border-solid rounded-full w-10 h-10 animate-spin"></div>
    </div>
   )
   
  
  return (
    <>
     
      <div>
        <div className="  ml-3 mt-4 text-center h-10  rounded-md mb-4 text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-2 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[200px] font-semibold">
          Orders
        </div>
        <table className="p-2 table-auto border-collapse border border-slate-400 ">
          <thead>
            <tr>
              <td className="border border-slate-300 py-2 px-6">No.</td>
              <td className="border border-slate-300 py-2 px-6">Time </td>
              <td className="border border-slate-300 py-2 px-6">Name</td>
              <td className="border border-slate-300 py-2 px-6">Remain day</td>
              <td className="border border-slate-300 py-2 px-6">Price</td>
            </tr>
          </thead>
          <tbody>
            {
            orders &&
             orders?.data?.result.map((order, index) => (
              <tr>
                <td className="border border-slate-300 py-2 px-6">
                  {index + 1}
                </td>
                <td className="border border-slate-300 py-2 px-6">
                  {formatDate(order?.createdAt)}
                </td>
                <td className="border border-slate-300 py-2 px-6">
                  {order?.name}
                </td>
                <td className="border border-slate-300 py-2 px-6">
                  {order?.remain_day}
                </td>
                <td className="border border-slate-300 py-2 px-6">
                  {order?.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProfilePage;
