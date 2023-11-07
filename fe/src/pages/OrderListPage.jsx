import React, { useState } from "react";
import { useQuery } from "react-query";
import { getAllOrderRoute } from "../utils/APIRoute";
import { getAPI } from "../utils/FetchData";
import { Pagination } from "@mui/material";

const OrderListPage = () => {
  const [page, setPage] = useState(1);
  const { data: orderList, isLoading } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => {
      return getAPI(getAllOrderRoute);
    },
    onSuccess: (data) => {},
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });
  console.log(orderList);
  return (
    <div className="w-full flex flex-col min-h-[80vh] px-32 justify-between">
      <div class="p-8">
        {/* <div class="text-3xl font-bold text-Black text-center mb-6">
          All Users
        </div> */}
        <table class="w-full border rounded text-center">
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
            {orderList?.data?.orders &&
              orderList?.data?.orders.map((order, id) => (
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
        <Pagination
          className="h-20 flex justify-end"
          count={10}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
};

export default OrderListPage;
