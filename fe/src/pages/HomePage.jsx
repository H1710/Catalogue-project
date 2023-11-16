import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  getProductByUser,
  getAllTemplateRoute,
  cloneTemplateRoute,
  saveProductNameRoute,
  acceptTemplateRoute,
  getAcceptTemplateRoute,
  getAcceptTemplate,
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
import TemplateList from "../components/home/TemplateList";
import ProductList from "../components/home/ProductList";
import { useSelector } from "react-redux";

const HomePage = () => {
  
  const [input, setInput] = useState("");
  const [user, setOpenAuthForm] = useOutletContext();

  const { data: productData, isLoading: isLoadingProductData } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: () => {
      console.log(user.id);
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

  const { data: templateData, isLoading: isLoadingTemplateData } = useQuery({
    queryKey: ["templates"],
    queryFn: () => {
      return getAPI(`${getAcceptTemplate}`);
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

  const { mutate: saveNameProduct, isLoading: loadingSaveName } = useMutation({
    mutationFn: (info) => {
      return postAPI(saveProductNameRoute, info);
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

  const handleSaveName = (productId, newName) => {
    saveNameProduct({ productId, newName });
  };

  console.log("templateData11111111111: ", templateData);

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

      <br />
      <TemplateList
        templateList={templateData?.data.templates}
        isLoadingTemplateData={isLoadingTemplateData}
      />
      {/* <div className="pt-6 pr-8 pb-12 pl-8 col-span-full">
        <Slider templateList={templateList} />
      </div> */}

      <br />
      <ProductList
        productData={productData?.data.products}
        handleNewTemplate={handleNewTemplate}
        loadingCloneTemplate={loadingCloneTemplate}
        handleSaveName={handleSaveName}
        isLoadingProductData={isLoadingProductData}
      />
    </div>
  );
};

export default HomePage;
