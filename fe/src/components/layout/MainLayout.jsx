import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import UserSidebar from "../sidebar/UserSidebar";
import AdminSidebar from "../sidebar/AdminSidebar";
import ThemeSwitcher from "../common/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationForm from "../authForm/AuthenticationForm";
import { refreshTokenRoute } from "../../utils/APIRoute";
import { getAPI } from "../../utils/FetchData";
import { useQuery } from "react-query";
import { seft } from "../../redux/reducers/authReducer";

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openAuthForm, setOpenAuthForm] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.auth);
  console.log(user);
  const { isLoading } = useQuery({
    queryKey: ["refresh_token"],
    queryFn: () => {
      return getAPI(refreshTokenRoute);
    },
    onSuccess: (data) => {
      dispatch(
        seft({ ...data.data.user, access_token: data.data.access_token })
      );
    },
    onError: (error) => {},
    enabled: localStorage.getItem("signed") === "catalogue-app",
  });
  return (
    <div className={`w-full min-h-[90vh]`}>
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        user={user}
        setOpenAuthForm={setOpenAuthForm}
      />
      <div className="w-full h-full flex">
        {showSidebar &&
          (user.role.name === "Admin" ? (
            <AdminSidebar />
          ) : (
            <UserSidebar user={user} />
          ))}
        <div
          className={`flex justify-center items-center w-full ${
            showSidebar && "ml-[250px]"
          }`}
        >
          <Outlet context={[user, setOpenAuthForm]} />
        </div>
      </div>
      {/* <div className="w-full h-10">
        <Footer />
      </div> */}

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
