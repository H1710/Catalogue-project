import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import AdminSidebar from "../components/AdminSidebar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import AuthenticationForm from "../components/AuthenticationForm";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState(false);

  const user = useSelector((state) => state.auth.auth);

  return (
    <div className={`w-full min-h-[90vh]`}>
      <div className="w-full !fixed top-0 z-50 h-[56px]">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          user={user}
          setOpenAuthForm={setOpenAuthForm}
        />
      </div>
      <div className="w-full mt-[60px] h-full">
        <div className={`w-full h-full grid grid-cols-3`}>
          <Outlet context={[user, setOpenAuthForm]} />
        </div>
      </div>
      {/* <div className="w-full h-10">
        <Footer />
      </div> */}
      {showSidebar && (
        <div
          className="w-full h-full fixed z-10 top-0 left-0"
          style={{ background: "rgba(0, 0, 0, 0.4)" }}
        >
          <div className={`shadow-xl fixed w-[230px] z-40 top-10`}>
            {/* <UserSidebar /> */}
            <AdminSidebar />
          </div>
        </div>
      )}
      {openAuthForm && (
        <AuthenticationForm
          openAuthForm={openAuthForm}
          setOpenAuthForm={setOpenAuthForm}
        />
      )}
      <ThemeSwitcher />
    </div>
  );
};

export default MainLayout;
