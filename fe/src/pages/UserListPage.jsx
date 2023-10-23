import React from "react";
import { minidenticon } from "minidenticons";
import MinidenticonImg from "../components/MinidenticonImg";

const UserListPage = () => {
  return (
    <div className="col-span-full shadow-lg flex flex-col min-h-[80vh] px-32 justify-between">
      <div class="shadow-lg p-8">
        <div class="text-3xl font-bold text-Black text-center mb-6">
          All Users
        </div>
        <table class="w-full border rounded text-center">
          <thead>
            <tr class="border-y">
              <th class="p-2 bg-gray-800 text-white"></th>
              <th class="p-2 bg-gray-800 text-white">Avatar</th>
              <th class="p-2 bg-gray-800 text-white">Name and Email</th>
              <th class="p-2 bg-gray-800 text-white">Country</th>
              <th class="p-2 bg-gray-800 text-white">Role</th>
              <th class="p-2 bg-gray-800 text-white">Package</th>
              <th class="p-2 bg-gray-800 text-white"></th>
              <th class="p-2 bg-gray-800 text-white"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-y hover:bg-gray-100">
              <th class="p-2 text-white">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  class="w-5 h-5 rounded text-blue-600 bg-gray-100 border-yellow-300"
                />
              </th>
              <td class="p-2">
                <div class="flex justify-center">
                  <MinidenticonImg username={"nhanntse17257@fpt.edu.vn"} />
                </div>
              </td>
              <td class="p-2">
                <div class="text-center">
                  Nguyễn Ngô Thanh Nhã
                  <br />
                  nhanntse172587@fpt.edu.vn
                </div>
              </td>
              <td class="p-2 text-center">VietNam</td>
              <td class="p-2 text-center">User</td>
              <td class="p-2 text-center">Month</td>
              <td class="p-2 text-center">
                <div class="flex items-center justify-center">
                  <button class="text-green-500 font-bold py-2 px-4 hover:opacity-50 rounded flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 mr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td class="p-2 text-center">
                <div class="flex items-center justify-center">
                  <button class="text-red-600 font-bold py-2 px-4 hover:opacity-50 rounded flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 mr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr class="border-y hover:bg-gray-100">
              <th class="p-2 text-white">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  class="w-5 h-5 rounded text-blue-600 bg-gray-100 border-yellow-300"
                />
              </th>
              <td class="p-2">
                <div class="flex justify-center">
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu8LLhtkAErRTuEft82WFo3_VvVmOe5j1dc-ocAJv7ye4_hHOupdayishbr8I7IvIX0CU&usqp=CAU"
                    alt=""
                  />
                </div>
              </td>
              <td class="p-2">
                <div class="text-center">
                  Nguyễn Ngô Thanh Nhã
                  <br />
                  nhanntse172587@fpt.edu.vn
                </div>
              </td>
              <td class="p-2 text-center">VietNam</td>
              <td class="p-2 text-center">User</td>
              <td class="p-2 text-center">Month</td>
              <td class="p-2 text-center">
                <div class="flex items-center justify-center">
                  <button class="text-green-500 font-bold py-2 px-4 hover:opacity-50 rounded flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 mr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td class="p-2 text-center">
                <div class="flex items-center justify-center">
                  <button class="text-red-600 font-bold py-2 px-4 hover:opacity-50 rounded flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6 mr-2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListPage;
