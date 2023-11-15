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
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct","Nov", "Dec"];

export default function RevenueStatitic({ year }) {
  const [data, setData] = useState([])
  useEffect(() => {
      const handleAPI = async () => {
        const res = await axios.get(`http://localhost:5000/api/v1/order/get-order-by-year/${year}`,);
        setData(res.data);
      };
      handleAPI();
    }, [year]);
    console.log(data)
    if (data && data?.orders?.length > 0){
      for (var i = 0; i < data?.orders?.length; i++) {
        data.orders[i].monthName = monthNames[i];
      }
    }
  console.log(data)
  return (
    <div className="col-span-full flex flex-col gap-4 px-10  py-4">
       <div className="   rounded-xl border-teal-400 items-center justify-center flex flex-col">
        <div className="font-bold  ">TOTAL REVENUE</div>
        <h1 className="text-[50px]">{data[0]?.yearly_revenue}$</h1>
        <span className="text-[30px]">In {year} : 5000$</span>
      </div>
      <AreaChart
        width={400}
        height={250}
        data={data?.orders}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="coloruv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
           
        </defs>
        <XAxis dataKey={'monthName'} />
        <YAxis />
        <CartesianGrid
          strokeDasharray="5 5"
          horizontal={true}
          vertical={false}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="order_count"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#coloruv)"
        /> 
        
      </AreaChart>
      
    </div>
  );
}
