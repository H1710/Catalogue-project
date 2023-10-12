import React from "react";
import PreviewBlog from "../components/blog/PreviewBlog";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
const data = [
  { name: 0, uv: 0 },
  { name: "January", uv: 400 },
  { name: "Febuary", uv: 200 },
  { name: "March", uv: 600 },
  { name: "April", uv: 400 },
];
const StatiticsPage = () => {
  return (
    <div className="col-span-full shadow-lg flex flex-col gap-12 px-32">
      <LineChart width={400} height={200} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <XAxis dataKey="name" className="text-green-400" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default StatiticsPage;
