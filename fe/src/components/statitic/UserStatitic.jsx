import {
  faArrowDownLong,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { getAPI } from "../../utils/FetchData";
import { getListUserByYear } from "../../utils/APIRoute";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export default function UserStatitic({ year, minYear }) {
  const [data, setData] = useState([]);
  
  let flag = false;
  useEffect(() => {
    const handleAPI = async () => {
      const res = await axios.get(
       `${getListUserByYear}/${year}`
      );
      setData(res.data);
    };
    handleAPI();
  }, [year]);
  if (data && data?.registrations?.length > 0) {
    for (var i = 0; i < data.registrations.length; i++) {
      data.registrations[i].monthName = monthNames[i];
    }
  }
  let preNum = 0;
  let curNum = 0;
  let rs = 0;
  if (data.total_registrations) {
    preNum = data?.previous_year_total_registrations;
    curNum = data?.total_registrations;
    if (preNum > curNum) {
      rs = parseFloat((preNum / curNum).toFixed(2));
    } else {
      flag = true;
      rs = parseFloat((curNum / preNum).toFixed(2));
    }
  }

  return (
    <div className="col-span-full flex flex-col gap-4 px-10  py-4">
      <div className="border-1 items-center justify-center flex flex-col h-[10vh]   gap-3 ">
        <div className="   rounded-[15px] justify-center items-center  ">
          <div className="text-[20px] flex ">
            <p className="font-semibold">Total user</p>:{" "}
            {data.total_registrations} registrations in {year}
          </div>
        </div>
     {year !== minYear && <div>
          {!flag ? (
            <div className="flex  rounded-[10px]  justify-center items-center    ">
              <FontAwesomeIcon
                icon={faArrowDownLong}
                className="text-[30px]  text-red-500"
              />
              <div className="text-[20px] text-red-500 font-semibold">
                {rs}% by {year - 1}
              </div>
            </div>
          ) : (
            <div className="flex   rounded-[10px]  justify-center items-center    ">
              <FontAwesomeIcon
                icon={faArrowUpLong}
                className="text-[30px]  text-emerald-700"
              />
              <div className="text-[20px] text-emerald-700 font-semibold">
                {rs}% by {year - 1}
              </div>
            </div>
          )}
      </div>}
      </div>
      <LineChart
        width={500}
        height={300}
        data={data.registrations}
        margin={{ top: 5, right: 40, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="coloruv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            {/* <stop offset="95%" stopColor="#8884d8" stopOpacity={0} /> */}
          </linearGradient>
        </defs>
        <XAxis dataKey="monthName" />
        <YAxis />
        <CartesianGrid
          strokeDasharray="5 5"
          horizontal={true}
          vertical={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="registration"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#coloruv)"
        />{" "}
      </LineChart>
    </div>
  );
}
