import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full">
      <div className="bg-red-100 w-full h-12"></div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
