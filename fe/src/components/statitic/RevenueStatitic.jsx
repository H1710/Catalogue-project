import {
  faArrowDownLong,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

export default function RevenueStatitic({ year }) {
  const [data, setData] = useState([]);
  let flag = false;
  useEffect(() => {
    const handleAPI = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/order/get-order-by-year/${year}`
      );
      setData(res.data);
    };
    handleAPI();
  }, [year]);
  console.log(data);
  if (data && data?.orders?.length > 0) {
    for (var i = 0; i < data?.orders?.length; i++) {
      data.orders[i].monthName = monthNames[i];
    }
  }
  let rs = 0;
  if (data?.orders) {
    if (data.yearly_revenue_previous_year > data.yearly_revenue_current_year) {
      rs = parseFloat(
        (
          data.yearly_revenue_previous_year / data.yearly_revenue_current_year
        ).toFixed(2)
      );
    } else {
      flag = true;
      rs = parseFloat(
        (
          data.yearly_revenue_current_year / data.yearly_revenue_previous_year
        ).toFixed(2)
      );
    }
  }
  console.log(data);
  return (
    <div className="col-span-full flex flex-col gap-4 px-10  py-4">
      <div className="border-1 items-center justify-center flex flex-col h-[100px]   gap-3 ">
        <div className="   rounded-[15px] justify-center items-center  ">
          <div className="text-[20px] flex flex">
            <p className="font-semibold">Total Revenue</p>:{" "}
            {data.yearly_revenue_current_year}$ in {year}
          </div>
        </div>
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
              {rs} % by {year - 1}
            </div>
          </div>
        )}
      </div>
      <LineChart
        width={550}
        height={300}
        data={data?.orders}
        margin={{ top: 5, right: 40, left: 20, bottom: 0 }}
      >
        <XAxis dataKey={"monthName"} />
        <YAxis />
        <CartesianGrid
          strokeDasharray="5 5"
          horizontal={true}
          vertical={false}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="monthly_revenue"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#coloruv)"
        />
      </LineChart>
    </div>
  );
}
