import React, { useRef } from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function ListOrder({ dataOrders }) {
  const tableRef = useRef(null);
  console.log("@",tableRef.current);

  return (
    <>
      <DownloadTableExcel
        filename="orders table"
        sheet="orders"
        currentTableRef={tableRef.current}  
      >
        <button className='relative bg-[#8884d8]  w-40 border-2 border-slate-100 rounded cursor-default bg-white py-2 pl-3 pr-10 text-left text-white text-center cursor-pointer'> Export excel </button>
      </DownloadTableExcel>
      <table ref={tableRef} className='p-2 table-auto border-collapse border border-slate-400 '>
        <thead>
          <tr>
            <td className='border border-slate-300 py-2 px-9'>No.</td>
            <td className='border border-slate-300 py-2 px-9'>Username</td>
            <td className='border border-slate-300 py-2 px-9'>Package</td>
            <td className='border border-slate-300 py-2 px-9'>Cost</td>
            <td className='border border-slate-300 py-2 px-9'>CreatedAt</td>
          </tr>
        </thead>
        <tbody>
          {dataOrders.map((order, index) => (
            <tr>
              <td className='border border-slate-300 py-2 px-9'>{index + 1}</td>
              <td className='border border-slate-300 py-2 px-9'>{order.user.name}</td>
              <td className='border border-slate-300 py-2 px-9'>{order.service_package.name}</td>
              <td className='border border-slate-300 py-2 px-9'>{order.service_package.price}</td>
              <td className='border border-slate-300 py-2 px-9'>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
