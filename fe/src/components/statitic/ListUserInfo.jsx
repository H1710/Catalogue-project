import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";
export default function ListUserInfo({ dataUsers }) {
  const tableUserRef = useRef(null);

  return (
    <>
      <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={tableUserRef.current}
      >
        <button className="relative bg-[#8884d8]  w-40 border-2 border-slate-100 rounded  py-2 pl-3 pr-10 text-center cursor-pointer mb-4">
          {" "}
          Export excel{" "}
        </button>
      </DownloadTableExcel>
      <table
        ref={tableUserRef}
        className="p-2 table-auto border-collapse border border-slate-400 "
      >
        <thead>
          <tr>
            <th className="border border-slate-300 py-2 px-9">No.</th>
            <th className="border border-slate-300 py-2 px-9">Name</th>
            <th className="border border-slate-300 py-2 px-9">Email</th>
            <th>Country</th>
            <th className="border border-slate-300 py-2 px-9">CreatedAt</th>
          </tr>
        </thead>
        <tbody>
          {dataUsers &&
            dataUsers?.map((user, index) => (
              <tr>
                <td className="border border-slate-300 py-2 px-9">
                  {index + 1}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {user.name}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {user.email}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {user.country}
                </td>
                <td className="border border-slate-300 py-2 px-9">
                  {user.createdAt}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
