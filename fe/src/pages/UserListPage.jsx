import React from "react";

const UserListPage = () => {
  return <div className="col-span-full shadow-lg flex flex-col px-32">
    <div class="shadow-lg p-8">
      <div class="text-3xl font-bold text-Black text-center mb-6">All Users</div>
      <table class="w-full border">
        <thead>
          <tr class="border-y">
            <th class="p-2 bg-gray-800 text-white">
              <input type="checkbox" />
            </th>
            <th class="p-2 bg-gray-800 text-white">Avatar</th>
            <th class="p-2 bg-gray-800 text-white">Name and Address</th>
            <th class="p-2 bg-gray-800 text-white">Email</th>
            <th class="p-2 bg-gray-800 text-white">Role</th>
            <th class="p-2 bg-gray-800 text-white">Service Package</th>
            <th class="p-2 bg-gray-800 text-white">Edit</th>
            <th class="p-2 bg-gray-800 text-white">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-y">
            <th class="p-2 text-white">
              <input type="checkbox" />
            </th>
            <td class="p-2">
              <div class="flex justify-center">
                <img class="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8LLhtkAErRTuEft82WFo3_VvVmOe5j1dc-ocAJv7ye4_hHOupdayishbr8I7IvIX0CU&usqp=CAU" alt="" />
              </div>
            </td>
            <td class="p-2 text-center">Nguyễn Ngô Thanh Nhã<br />43 Tân Lập Đông Hòa Dĩ An</td>
            <td class="p-2 text-center">nhanntse172587@fpt.edu.vn</td>
            <td class="p-2 text-center">Data 5</td>
            <td class="p-2 text-center">Data 6</td>
            <td class="p-2 text-center">
              <button class="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Edit
              </button>
            </td>
            <td class="p-2 text-center">
              <button class="bg-red-500 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Delete
              </button>
            </td>
          </tr>
          <tr class="border-y">
            <th class="p-2 text-white">
              <input type="checkbox" />
            </th>
            <td class="p-2">
              <div class="flex justify-center">
                <img class="w-8 h-8 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8LLhtkAErRTuEft82WFo3_VvVmOe5j1dc-ocAJv7ye4_hHOupdayishbr8I7IvIX0CU&usqp=CAU" alt="" />
              </div>
            </td>
            <td class="p-2 text-center">Nguyễn Ngô Thanh Nhã<br />43 Tân Lập Đông Hòa Dĩ An</td>
            <td class="p-2 text-center">nhanntse172587@fpt.edu.vn</td>
            <td class="p-2 text-center">Data 5</td>
            <td class="p-2 text-center">Data 6</td>
            <td class="p-2 text-center">
              <button class="bg-blue-500 hover:bg-red-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Edit
              </button>
            </td>
            <td class="p-2 text-center">
              <button class="bg-red-500 hover:bg-blue-500 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>




  </div>;
};

export default UserListPage;
