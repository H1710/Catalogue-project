import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Pie,
  Cell,
  PieChart,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28"];
export default function UserStatitic({year}) {

     const [data, setData] = useState([])
  useEffect(() => {
    const handleAPI = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/order/get-user-by-year?year=${year}`);
      setData(res.data);
    };
    handleAPI();
  }, [year]);
   
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
         
      </AreaChart>
     
      <div className="border-1 w-[300px]  items-center justify-center flex flex-col">
        <div className="text-[20px] font-semibold ">TOTAL USER</div>
        <div>500 users register</div>
      </div>
      
    </div>
  );
}
