import React, { useMemo, useState } from 'react';
import PreviewBlog from '../components/blog/PreviewBlog';
import UserStats from '../components/staticpage/UserStats';
import RevenueStats from '../components/staticpage/RevenueStats';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const StatiticsPage = () => {
  const nowYear = useMemo(() => new Date().getFullYear());
  const [year, setYear] = useState(nowYear);
  console.log(year)
  // const [lsYear, setLsYear] = useState([]);
  const lsYear = [2020, 2021, 2022, 2023];

  return (
    <div className="flex flex-col col-span-full items-center  ">
      <div className="h-10 px-4 flex gap-x-4 items-center justify-center py-8">
        <p className=" text-[20px]  font-bold "> Dashboard</p>

        <Listbox value={year} onChange={setYear}>
          <div className="relative mt-1">
            <Listbox.Button className="relative  w-40 border-2 border-slate-100 rounded cursor-default bg-white py-2 pl-3 pr-10 text-left shadow-md">
              <span className="block truncate">Filter by year</span>
              <span className='"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="font-semibold"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className={'absolute z-10 '}>
              {lsYear.map((year, index) => (
                <Listbox.Option
                  key={index}
                  value={year}
                  className={({ active }) =>
                    ` select-none py-2 pl-10 pr-4 w-40 ${
                      active
                        ? 'bg-emerald-100 text-emerald-900'
                        : 'text-gray-900'
                    } `
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
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
      <div className="justify-center items-center grid gap-y-6">
        <div className="flex flex-col gap-y-4">
          <span className="text-[18px] flex justify-center w-[200px]  font-semibold   bg-emerald-200 rounded p-2 ring-1 ml-4">
            User Oveview
          </span>
          <UserStats year={year}/>
        </div>
        <div className="flex flex-col gap-y-4">
          <span className="text-[18px] flex justify-center font-semibold w-[200px]  bg-emerald-200 rounded p-2 ring-1 ml-4">
            Revenue Overview
          </span>
          <RevenueStats  year={year}/>
        </div>
      </div>
    </div>
  );
};

export default StatiticsPage;
