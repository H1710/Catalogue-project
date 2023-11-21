import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllOrderRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { Pagination } from "@mui/material";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

const OrderListPage = () => {
  const [searchParams] = useSearchParams();
  const [user] = useOutletContext();
  const page = searchParams.get("page");
  const navigate = useNavigate();
  const {
    data: orderList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", page, user?.access_token],
    queryFn: () => {
      return getAPI(`${getAllOrderRoute}?page=${page}`, user?.access_token);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  const handleChangePage = (e, value) => {
    navigate(`/order-list?page=${value}`);
  };
  if (isError) return <NotFoundPage />;
  return (
    <div className="w-full flex flex-col h-full justify-between overflow-auto">
      <div class="p-4 h-full">
        {/* <div class="text-3xl font-bold text-Black text-center mb-6">
          All Users
        </div> */}
        {orderList?.data?.rows && (
          <table class="w-full h-full border rounded text-center">
            <thead>
              <tr class="border-y">
                <th class="p-2 bg-gray-800 text-white">Id</th>
                <th class="p-2 bg-gray-800 text-white">Date</th>
                <th class="p-2 bg-gray-800 text-white">User</th>
                <th class="p-2 bg-gray-800 text-white">Package</th>
                <th class="p-2 bg-gray-800 text-white">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderList?.data?.rows.map((order, id) => (
                <tr class="border-y hover:bg-gray-100">
                  <td class="p-2 text-center font-bold">{order.id}</td>
                  <td class="p-2 text-center">
                    {order.createdAt.slice(0, 10)}
                  </td>
                  <td class="p-2">
                    <div class="text-center">
                      {order.user.name}
                      <br />
                      {order.user.email}
                    </div>
                  </td>
                  <td class="p-2 text-center">{order.service_package.name}</td>
                  <td class="p-2 text-center">{order.service_package.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          className="h-20 flex justify-end"
          count={Math.ceil(orderList?.data.count / 10)}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default OrderListPage;
