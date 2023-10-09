import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import React, { useEffect,useCallback, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from '@mui/material/Rating';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import { templateList } from '/shared/Template';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function Slider({templateList, isNotFullScreen,}) {
  const sliderRef = useRef(null);
  const [star, setStar] = useState(3.4);
  // const [slidesPerView, setSlidePerView] = useState(false)
  // useEffect(() => {
  //   setSlidePerView(!slidesPerView);
  // }, [showSidebar]);
 
  return ( 
   <div>
      <div className="content text-[18px] flex justify-start pb-2">
      Most popular catalogue
    </div>
      <div className="h-[300px] relative items-center flex">
        
        <Swiper
          ref={sliderRef}
          className="my-2  h-full "
          modules={[Navigation, Scrollbar]}
          navigation={{
            prevEl: '.prev-arrow',
            nextEl: '.next-arrow',
          }}
          scrollbar={{
            draggable: true,
            hide: true
          }}
          spaceBetween={20}
          slidesPerView={4}
        >
          {templateList.map((template, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col rounded-[4px] border-2 border-gray-200  ">
                <img src={template.thumbnailUrl} alt="" className="w-full p-1  h-[220px] w-[300px] object-cover" />
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
              </div>
            </SwiperSlide>
          ))}
               
        </Swiper>
        <div
          className="prev-arrow flex items-center justify-center cursor-pointer absolute  bg-slate-100 border-2 border-zinc-400 h-10 w-10 rounded-[50%] start-1 z-10 ml-[-22px]"
        >
          <FontAwesomeIcon icon={faChevronLeft} className='text-8' />
        </div>
        <div
          className="next-arrow flex items-center justify-center cursor-pointer absolute  bg-slate-100 border-2 border-zinc-400 h-10 w-10 rounded-[50%] end-1 z-10 mr-[-22px]"
        >
          <FontAwesomeIcon icon={faChevronRight} className='text-8'/>
        </div>
      </div>
   </div>
  );
}

export default Slider;
