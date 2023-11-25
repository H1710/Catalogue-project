import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

export default function ListOrder({ dataOrders }) {
  const tableRef = useRef(null);

  return (
    <>
      <DownloadTableExcel
        filename="orders table"
        sheet="orders"
        currentTableRef={tableRef.current}
      >
        <button className="relative bg-[#8884d8] text-white w-50 border-2 border-slate-100 rounded  py-2 pl-3 pr-10 text-center cursor-pointer mb-4">
          {" "}
          Export data to excel{" "}
        </button>
      </DownloadTableExcel>
      <table
        ref={tableRef}
        className="p-2 table-auto border-collapse border border-slate-400 "
      >
        <thead>
          <tr>
            <td className="border border-slate-300 py-2 lg:px-9 sm:px-3">No.</td>
            <td className="border border-slate-300 py-2 lg:px-9 sm:px-3">Username</td>
            <td className="border border-slate-300 py-2 lg:px-9 sm:px-3">Package</td>
            <td className="border border-slate-300 py-2 lg:px-9 sm:px-3">Cost</td>
            <td className="border border-slate-300 py-2 lg:px-9 sm:px-3">CreatedAt</td>
          </tr>
        </thead>
        <tbody>
          {dataOrders &&
            dataOrders?.map((order, index) => (
              <tr key={index}>
                <td className="border border-slate-300 py-2 px-9">
                  {index + 1}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {order?.user?.name}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {order?.service_package?.name}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {order?.service_package?.price}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {order?.createdAt.slice(0,10)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
