import React, { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getTemplateRoute } from "../utils/APIRoute";
import axios from "axios";

import Search from "../components/Search";
import Slider from "../components/homepage/Slider";
import Footer from "../components/Footer";
import { templateList } from "../shared/Template";
import { productList } from "../shared/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";

const HomePage = () => {
  // const showSidebar = useContext(ShowSidebarContext)
  const [input, setInput] = useState("");
  // const [templateList, setTemplateList] = useState("");
  // const [templateNumber, setTemplateNumber] = useState(0);
  const [template, setTemplate] = useState("");
  // useEffect(() => {
  //   const handleAPI = async () => {
  //     const res = await axios.get(`${getTemplateRoute}/1`);
  //     setTemplateList(res.data.data);
  //   };
  //   handleAPI();
  // }, []);
  const handleSubmit = () => {
    console.log(input);
  };

  return (
    <>
      <div className="h-[250px] pt-0 pl-8 pr-8 pb-0 col-span-full">
        <div className="rounded-[5px] w-full h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 flex justify-center items-center justify-items-center">
          <Search />
        </div>
      </div>

      <div className="pt-6 pr-8 pb-12 pl-8 col-span-full">
        <Slider templateList={templateList} />
      </div>
      <div className="content col-span-full text-[18px] flex justify-start pb-2 ml-5 font-semibold">
        Current Design
      </div>

      {productList.map((product, index) => (
        <div
          className=" ml-5 border-slate-300 h-[250px] w-[320px] object-cover justify-center relative flex bg-stone-100 rounded-[5px] "
          key={index}
        >
         <Link to={`/product/:id`}>
            <img src={product.thumbnailUrl} alt="" className="h-[170px] mt-3" />
            <div className="absolute bg-white h-14 bottom-0 w-full left-0">
              <p className="py-2  px-4">{product.name}</p>
            </div>
         </Link>
        </div>
      ))}

      <div className="col-span-full">
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
