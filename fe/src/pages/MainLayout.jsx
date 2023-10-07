import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/homepage/Sidebar";

const MainLayout = () => {
  const divStyle = {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    gridTemplateRows: "0fr 0fr 1fr 0fr",
    margin: "0 auto",
    minHeight: "100vh",
  };
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="w-full relative" style={divStyle}>
      <div className="col-start-1 col-end-3 row-start-1 row-end-2 w-full sticky absolute block">
        <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>

      <div className="col-start-1 col-end-2 row-start-2 row-end-5 pl-4">
        {showSidebar && <Sidebar />}
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
