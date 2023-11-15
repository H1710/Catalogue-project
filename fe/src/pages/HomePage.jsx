import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  getProductByUser,
  getAllTemplateRoute,
  cloneTemplateRoute,
} from "../utils/APIRoute";
import axios from "axios";

import Search from "../components/home/Search";
import Slider from "../components/home/Slider";
import Footer from "../components/common/Footer";
import { templateList } from "../shared/Template";
import { productList } from "../shared/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import { getAPI, postAPI } from "../utils/FetchData";
import { useMutation, useQuery } from "react-query";
import CustomButton from "../components/common/Button";
import ServicePackage from "../components/ServicePackage";

const HomePage = () => {
  
  const [input, setInput] = useState("");
  const [user, setOpenAuthForm] = useOutletContext();
  // useEffect(() => {
  //   const handleAPI = async () => {
  //     const res = await axios.get(`${getTemplateRoute}/1`);
  //     setTemplateList(res.data.data);
  //   };
  //   handleAPI();
  // }, []);
  const { data: productData, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return getAPI(`${getProductByUser}/${user.id}`);
    },
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const { data: templateData } = useQuery({
    queryKey: ["templates"],
    queryFn: () => {
      return getAPI(`${getAllTemplateRoute}`);
    },
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      // toast.error(error.response.data.message, toastOptions);
    },
    // enabled: logged,
  });

  const { mutate: cloneTemplate, isLoading: loadingCloneTemplate } =
    useMutation({
      mutationFn: (info) => {
        return postAPI(cloneTemplateRoute, info);
      },
      onError: (error) => {
        // toast.error(error.response.data.message, toastOptions);
      },
      onSuccess: (data) => {
        // toast.success(data.data.message, toastOptions);
        // localStorage.setItem("signed", "chat-app");
        // navigate("/");
      },
    });

  const navigate = useNavigate();

  const handleCloneTemplate = (template) => {
    cloneTemplate({ template, userId: user.id });
  };

  const handleNewTemplate = () => {
    const template = {
      template_pages: [
        {
          template_page_details: [
            {
              name: "main_frame",
              type: "rect",
              id: Math.floor(Math.random() * 100 + 1),
              height: 418,
              width: 600,
              z_index: 1,
              color: "#fff",
              image: "",
            },
          ],
        },
      ],
    };
    cloneTemplate({ template, userId: user.id });
  };

  return (
    <div className="w-full h-full items-center justify-center overflow-auto p-4">
      <div
        className="rounded-[5px] w-full mb-2 h-[250px] flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 52.1% -29.6%, rgb(144, 17, 105) 0%, rgb(51, 0, 131) 100.2%)",
        }}
      >
        <Search />
      </div>
      <div className="content col-span-full select-none text-xl flex justify-start pb-2 font-semibold">
        Template
      </div>

      <div className="w-full grid grid-cols-4 gap-6">
        {templateData &&
          templateData.data.data.map((template, index) => (
            <div>
              <div
                className="w-full flex justify-center items-center bg-[#ccc] rounded-[5px] py-[30px] "
                key={index}
                onClick={() => handleCloneTemplate(template)}
              >
                <div className="h-full w-full flex items-center justify-center">
                  <img
                    src={template.thumbnail}
                    alt=""
                    className="w-[250px] h-[150px] object-contain"
                  />
                </div>
              </div>
              <p className="font-semibold text-[14px] mt-2">{template.name}</p>
            </div>
          ))}
      </div>
      {/* <div className="pt-6 pr-8 pb-12 pl-8 col-span-full">
        <Slider templateList={templateList} />
      </div> */}
      <div className="content col-span-full select-none text-xl flex justify-between items-center pb-2 font-semibold">
        <p>Current Design</p>
        <CustomButton
          text={"Create Design"}
          classContent={
            "bg-[--bg-button] text-white text-[14px] font-[600] transition duration-300 hover:bg-[--bg-button-hover]"
          }
          handleClick={() => handleNewTemplate()}
          isLoading={loadingCloneTemplate}
        />
      </div>

      <div className="w-full grid grid-cols-4 gap-6">
        {productData &&
          productData.data.products.map((product, index) => (
            <div>
              <div
                className="w-full flex justify-center items-center bg-[#eeeeef] rounded-md p-[16px]"
                key={index}
                onClick={() => {
                  navigate(`/design/${product.id}`);
                }}
              >
                <div className="h-full w-full flex items-center justify-center group cursor-pointer rounded-md ">
                  <img
                    src={product.thumbnail}
                    alt=""
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
              </div>
              <p className="font-semibold text-[14px] mt-2">{product.name}</p>
            </div>
          ))}
      </div>
      {/* <ServicePackage showServiePackages={showServiePackages} setShowServiePackages={setShowServiePackages}/> */}
    </div>
  );
};

export default HomePage;
