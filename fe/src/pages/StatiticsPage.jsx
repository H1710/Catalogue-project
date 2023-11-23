import React, { useEffect, useMemo, useState } from "react";
import UserStatitic from "../components/statitic/UserStatitic";
import RevenueStatitic from "../components/statitic/RevenueStatitic";
import { Listbox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ListUserInfo from "../components/statitic/ListUserInfo";
import ListOrder from "../components/statitic/ListOrder";
import { useQuery } from "react-query";
import { getAPI } from "../utils/FetchData";
import { getListYear, getUserAndOrderByYear } from "../utils/APIRoute";
const StatiticsPage = () => {
  const nowYear = useMemo(() => new Date().getFullYear());
  const [year, setYear] = useState(nowYear);
  const [typeInfo, setTypeInfo] = useState("User");
  const [lsYear, setLsYear] = useState([year]);
  const lsType = ["User", "Order"];
  const [minYear, setMinYear] = useState(nowYear);


  const {
    data: dataAPI
  }
= useQuery({
  queryKey: ["dataUserAndOrder", typeInfo, year],
  queryFn: ()=> {
    return getAPI(`${getUserAndOrderByYear}/${year}`)
  },
  onSuccess: (data) => {},
  onError: (error) => {
  },
})

  
  const {
    data: arrYears,
    isLoading
  } 
  = useQuery({
    queryKey: ["year"],
    queryFn: ()=> {
      return getAPI(getListYear);
    },
    onSuccess:(data)=> {
      setLsYear(data.data.years);
      setMinYear(data.data.years[0]);
    },
    onError: ()=> {}
  })
  

  return (
    <div className="flex flex-col col-span-full items-center  ">
      <div className="h-10 px-4 flex flex-row justify-between gap-x-4 items-center mt-4">
        <Listbox value={year} onChange={setYear}>
          <div className="relative">
            <Listbox.Button className="relative bg-[#8884d8]  w-40 border-2 border-slate-100 rounded cursor-default bg-white py-2 pl-3 pr-10 text-left  ">
              <span className="block truncate font-semibold text-black">
                Filter by year
              </span>
              <span className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="font-semibold text-black"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className={"absolute z-10 rounded "}>
              {lsYear &&
                lsYear?.map((year, index) => (
                  <Listbox.Option
                    key={index}
                    value={year}
                    className={({ active }) =>
                      ` select-none py-2 pl-10 pr-5 w-40 hover:bg-[#8884d8]   ${
                        active
                          ? "bg-violet-600 text-white"
                          : "text-white bg-violet-600"
                      } `
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {year}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </div>
        </Listbox>
        <Listbox value={typeInfo} onChange={setTypeInfo}>
          <div className="relative">
            <Listbox.Button className="relative bg-[#8884d8]  w-40 border-2 border-slate-100 rounded cursor-default bg-white py-2 pl-3 pr-10 text-left  ">
              <span className="block truncate font-semibold text-black">
                Data by {year}
              </span>
              <span className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="font-semibold text-black"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className={"absolute z-10 rounded "}>
              {lsType.map((year, index) => (
                <Listbox.Option
                  key={index}
                  value={year}
                  className={({ active }) =>
                    ` select-none py-2 pl-10 pr-5 w-40 hover:bg-[#8884d8]   ${
                      active
                        ? "bg-violet-600 text-white"
                        : "text-white bg-violet-600"
                    } `
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {year}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      <div className="justify-center flex lg:flex-row items-center w-full sm:flex-col md:flex-col">
        <div className="flex flex-col gap-y-4 justify-center items-center  ">
          <span className="flex-1 text-center rounded-md text-white bg-[#8884d8] p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400 w-[15vw] font-semibold">
            User Oveview
          </span>
          <UserStatitic year={year} minYear={minYear} />
        </div>
        <div className="flex flex-col gap-y-4 justify-center items-center">
          <span className="flex-1 text-center rounded-md text-white bg-[#8884d8] p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400 w-[15vw] font-semibold">
            Revenue Overview
          </span>
          <RevenueStatitic year={year} minYear={minYear} />
        </div>
      </div>

      <div>
        { typeInfo === "User" ? (
          <ListUserInfo dataUsers={dataAPI?.data?.users} />
        ) : (
          <ListOrder dataOrders={dataAPI?.data?.orders} />
        )}
      </div>
    </div>
  );
};

export default StatiticsPage;
