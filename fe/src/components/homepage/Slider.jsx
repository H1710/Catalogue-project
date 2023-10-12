import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Slider({ templateList, isNotFullScreen }) {
  const sliderRef = useRef(null);
  const [star, setStar] = useState(3.4);
  const [slidesPerView, setSlidePerView] = useState(4);
  
    useEffect(() => {
      const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        if (newWidth > '1200'){
          setSlidePerView(4)
        }else{
          setSlidePerView(3)
        }
        
      }
    });   
      observer.observe(sliderRef.current);
    
    return () => {
        observer.unobserve(sliderRef.current);
      
    };
      
    }, []);

    const handleShowTemplateDetails = () => {


    }
  return (
    <div className="slider w-full ">
      <div className="content text-[18px] flex justify-start pb-2  font-semibold" >
        Most popular catalogue
      </div>
      <div className="h-[300px]   relative flex justify-center items-center ml-6">
       {/* <div className="w-1/7"></div> */}
        <Swiper
          ref={sliderRef}
          className="my-2 h-full"
          modules={[Navigation, Scrollbar]}
          navigation={{
            prevEl: ".prev-arrow",
            nextEl: ".next-arrow",
          }}
          direction="horizontal"
          spaceBetween={20}
          scrollbar={{
            draggable: true,
            hide: true,
          }}
          slidesPerView={slidesPerView}
          loop={false}
        >
          {templateList.map((template, index) => (
            <SwiperSlide key={index} className="">
              <div className="w-[300px] rounded-[4px] border-2 border-gray-200 "
              // to={`/templatedetails/${template.id}`}
              >
                <Link to={`/templatedetails/${template.id}`}> 
                <img
                  src={template.thumbnailUrl}
                  alt=""
                  className="p-1 h-[220px] w-[300px] object-cover"
                />
                <p className=" text-[16px] px-1 pt-[2px] pb-0 start-1">
                  {template.name}
                </p>
                <div className="grid justify-items-end pb-1">
                  <Rating
                    className="pr-2"
                    name="readonly"
                    readOnly={true}
                    precision={0.1}
                    value={star}
                    // onChange={(event, star) => {
                    //   setStar(star);
                    // }}
                  />
                </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="prev-arrow flex items-center justify-center cursor-pointer absolute  bg-slate-100 border-2 border-zinc-400 h-10 w-10 rounded-[50%] start-1 z-10 ml-[-22px]">
          <FontAwesomeIcon icon={faChevronLeft} className="text-8" />
        </div>
        <div className={`next-arrow flex items-center justify-center cursor-pointer absolute  bg-slate-100 border-2 border-zinc-400 h-10 w-10 rounded-[50%] end-1 z-10   ${slidesPerView > 3 ? "mr-[4px]": " mr-[34px]"}  `}>
          <FontAwesomeIcon icon={faChevronRight} className="text-8" />
        </div>
      </div>
    </div>
  );
}

export default Slider;
