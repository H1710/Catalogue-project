import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


const MainLayout = () => {
 const [showSidebar, setShowSidebar] = useState(false);
  const divStyle = {
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    gridTemplateRows: "0fr 1fr",
    margin: "0 auto",
    minHeight: "100vh",
  };
  return (
        <div className="w-full" style={divStyle}>
          <div className="col-start-1 col-end-3 row-start-1 row-end-2 w-full  top-0">
            <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          </div>
    
          <div className="col-start-1 col-end-2 row-start-2 row-end-3 pl-4">
            {showSidebar && <Sidebar />}
          </div>
          
          <Outlet/>
        </div>
  );
};

export default MainLayout;
