import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import React, { useCallback, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Rating} from '@mui/material/Rating';import SvgIcon from '@mui/material/SvgIcon';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { templateList } from '../shared/Template';
// import {
//   faChevronLeft,
//   faChevronRight,
// } from '@fortawesome/free-solid-svg-icons';

function Slider() {
  const sliderRef = useRef(null);
  const [star, setStar] = useState(4);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);
  return (
    <div className="flex">
      <div
        className="prev-arrow  text-[50px] w-1/12 items-center justify-center leading-[500px] cursor-pointer"
        onClick={handlePrev}
      >
        {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
      </div>
      <Swiper
        ref={sliderRef}
        className="h-[500px] justify-center items-center w-5/6 grid gap-2 my-2"
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={4}
        pagination={{ clickable: true }}
      >
        {templateList.map((template, index) => (
          <SwiperSlide
            key={index}
            className="flex flex-col  "
          >
            <img src={template.thumbnailUrl} alt="" className=" h-3/4 " />
            <p className="flex text-2xl justify-start p-2 ">{template.name}</p>
              
           <div className='inline-block flex justify-items-end p-1'>
              {/* <Rating
              className=' '
                name="simple-controlled"
                value={star}
                onChange={(event, star) => {
                  setStar(star);
                }}
              /> */}
           </div>
            <button className='bg-sky-500 rounded-[2px] p-1 text-xl bottom-1'>Detail</button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="next-arrow text-[50px] w-1/12 items-center justify-center leading-[500px] cursor-pointer"
        onClick={handleNext}
      >
        {/* <FontAwesomeIcon icon={faChevronRight} /> */}
      </div>
    </div>
  );
}

export default Slider;
