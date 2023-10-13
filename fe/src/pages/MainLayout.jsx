import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/AdminSidebar";
import ThemeSwitcher from "../components/ThemeSwitcher";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div className={`w-full`}>
      <div className="w-full !fixed top-0 z-50 h-[60px]">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <div className="grid grid-cols-5 lg:grid-cols-12 mt-[80px] px-[16px]">
        {showSidebar && (
          <div
            className={`lg:col-start-1 shadow-xl fixed z-40 top-10 left-1 lg:col-span-2`}
          >
            {/* <UserSidebar /> */}
            <AdminSidebar />
          </div>
        )}
        <div
          className={`grid col-start-1 grid-cols-2 ${
            showSidebar
              ? "lg:col-start-3 lg:grid-cols-3"
              : "lg:col-start-1 lg:grid-cols-4"
          } col-span-full`}
        >
          <Outlet />
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  );
};

export default MainLayout;
