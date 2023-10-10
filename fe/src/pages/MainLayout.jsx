import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="w-full relative">
      <div className="w-full !fixed top-0 z-10 h-[60px]">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
      <div className="grid grid-cols-12 mt-[60px]">
        {showSidebar && (
          <div className="col-start-1 col-span-3">
            <Sidebar />
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
    </div>
  );
};

export default MainLayout;
