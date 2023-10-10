import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/AdminSidebar";
import ThemeSwitcher from "../components/ThemeSwitcher";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className="w-full relative">
      <div className="w-full !fixed top-0 z-10 h-[60px]">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <div className="grid grid-cols-15 mt-[100px] px-[16px]">
        {showSidebar && (
          <div className="col-start-1 col-span-3 border-r-2 border-gray-100">
            {/* <AdminSidebar /> */}
            <UserSidebar />
          </div>
        )}
        <div
          className={`grid ${
            showSidebar ? "col-start-4 grid-cols-3" : "col-start-1 grid-cols-4"
          } col-span-12  `}
        >
          <Outlet />
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default MainLayout;
