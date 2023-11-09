import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueStatitic({ year }) {
  const [data, setData] = useState([])
   
  
 
  
  // const data = [
  //   { name: "Jan", customer: 400, designer: 100 },
  //   { name: "Feb", customer: 200, designer: 20 },
  //   { name: "Mar", customer: 600, designer: 10 },
  //   { name: "Apr", customer: 400, designer: 40 },
  //   { name: "May", customer: 500, designer: 100 },
  //   { name: "Jun", customer: 400, designer: 180 },
  //   { name: "Jul", customer: 100, designer: 90 },
  //   { name: "Aug", customer: 0, designer: 70 },
  //   { name: "Sep", customer: 200, designer: 20 },
  //   { name: "Oct", customer: 700, designer: 40 },
  //   { name: "Nov", customer: 400, designer: 0 },
  //   { name: "Dec", customer: 900, designer: 120 },
  // ];
  useEffect(() => {
      const handleAPI = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/order/get-order-by-year?year=${year}`);
        setData(res.data);
      };
      handleAPI();
    }, [year]);
  
 data&& console.log(data)
  return (
    <div className="col-span-full flex gap-4 px-10  py-4">
      <AreaChart
        width={800}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="coloruv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorpv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid
          strokeDasharray="5 5"
          horizontal={true}
          vertical={false}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="customer"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#coloruv)"
        />{" "}
        <Area
          type="monotone"
          dataKey="designer"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorpv)"
        />
      </AreaChart>
      <div className="ring-1 w-[316px]  items-center justify-center flex flex-col">
        <div className="font-bold  ">TOTAL REVENUE</div>
        <h1 className="text-[50px]">{data[0].yearly_revenue}$</h1>
        <span className="text-[30px]">In {year} : 5000$</span>
      </div>
    </div>
  );
}
