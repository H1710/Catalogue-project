import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  const [isDisableMenu, setIsDisableMenu] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.auth);

  const { isLoading } = useQuery({
    queryKey: ["refresh_token", dispatch],
    queryFn: () => {
      
      return getAPI(refreshTokenRoute);
    },
    onSuccess: (data) => {
      setIsDisableMenu(true);
      dispatch(
        seft({ ...data.data.user, access_token: data.data.access_token }),
      );
    },
    onError: (error) => {},
    enabled: localStorage.getItem('signed') === 'catalogue-app',
  });
  return (
    <div className={`w-full min-h-[90vh]`}>
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        user={user}
        setOpenAuthForm={setOpenAuthForm}
        isDisableMenu={isDisableMenu}
      />
      <div className="w-full h-full flex">

        {user?.access_token &&
          showSidebar &&
          (user.role.name === "Admin" ? (
            <AdminSidebar />
          ) : (
            <UserSidebar user={user} />
          ))}
        <div
          className={`flex justify-center items-center w-full ${
            showSidebar && 'ml-[250px]'
          }`}
        >
          <Outlet context={[user, setOpenAuthForm]} />
        </div>
      </div>

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
