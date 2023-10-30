import React, { useState } from 'react';
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
} from 'recharts';
 
const COLORS = ['#00C49F', '#FFBB28'];
export default function UserStats() {
  const data = [
    { name: 'Jan', customer: 400 ,designer: 100 },
    { name: 'Feb', customer: 200 ,designer: 20 },
    { name: 'Mar', customer: 600 ,designer: 10},
    { name: 'Apr', customer: 400 ,designer:40 },
    { name: 'May', customer: 500 ,designer: 100 },
    { name: 'Jun', customer: 400 ,designer: 180 },
    { name: 'Jul', customer: 100 ,designer: 90 },
    { name: 'Aug',customer : 0 ,designer: 70 },
    { name: 'Sep', customer: 200 ,designer: 20},
    { name: 'Oct', customer: 700 ,designer: 40 },
    { name: 'Nov',customer : 400 ,designer: 0 },
    { name: 'Dec', customer: 900 ,designer: 120 },
  ];
  const dataUsers = [
    { name: 'customer', value: 10 },
    { name: 'designer', value: 12 },
  ];
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
        /> <Area
          type="monotone"
          dataKey="designer"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorpv)"
        />
      </AreaChart>
      <div className="ring-1 ">
        <div className="p-2 flex flex-col justify-center items-center">
          <div className="text-[20px] font-semibold ">TOTAL USER</div>
          <PieChart width={300} height={150}>
            <Pie
              data={dataUsers}
              cx={150}
              cy={130}
              startAngle={180}
              endAngle={0}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label
            >
              {dataUsers.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          <div>
            <div className='flex items-center '>
              <div className="w-3 h-3 rounded-full bg-[#00C49F] "></div>
              <span className="px-2 ">Customer</span>
            </div>
            <div className='flex items-center  '>
              <div className="w-3 h-3 rounded-full bg-[#FFBB28] "></div>
              <span className="px-2 ">Designer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
