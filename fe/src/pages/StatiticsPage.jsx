import React, { useMemo, useState } from "react";
import UserStatitic from "../components/statitic/UserStatitic";
import RevenueStatitic from "../components/statitic/RevenueStatitic";
import { Listbox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const StatiticsPage = () => {
  const nowYear = useMemo(() => new Date().getFullYear());
  const [year, setYear] = useState(nowYear);
  console.log(year);
  const lsYear = [2020, 2021, 2022, 2023];

  return (
    <div className="flex flex-col col-span-full items-center  ">
      <div className="h-10 px-4 flex flex-row  gap-x-4 items-center my-4">
        <p className=" text-[20px]  font-bold "> DASHBOARD</p>

        <Listbox value={year} onChange={setYear}>
          <div className="relative">
            <Listbox.Button className="relative  w-40 border-2 border-slate-100 rounded cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-md">
              <span className="block truncate font-semibold">Filter by year</span>
              <span className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="font-semibold"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className={"absolute z-10 "}>
              {lsYear.map((year, index) => (
                <Listbox.Option
                  key={index}
                  value={year}
                  className={({ active }) =>
                    ` select-none py-2 pl-10 pr-4 w-40 ${
                      active
                        ? "bg-emerald-100 text-emerald-900"
                        : "text-gray-900"
                    } `
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
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
      <div className="justify-center flex   items-center grid gap-y-6 w-full">
        <div className="flex flex-col gap-y-4">
          <span className="flex-1 ml-3 text-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400 w-[200px] font-semibold">
            User Oveview
          </span>
          <UserStatitic year={year} />
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="flex-1 ml-3 text-center rounded-md text-white bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 p-3 duration-300 rounded-sm hover:from-emerald-400 hover:to-teal-400  w-[200px] font-semibold">
            Revenue Overview
          </span>
          <RevenueStatitic year={year} />
        </div>
      </div>
    </div>
  );
};

export default StatiticsPage;
