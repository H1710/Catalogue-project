// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import React, { useCallback, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-regular-svg-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { templateList } from '../shared/Template';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

function Slider() {
  // const swiper = useSwiper();
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNFext();
  }, []);
  return (
    <div className="flex">
      <Swiper
        ref={sliderRef}
        className="h-[500px] justify-center items-center w-5/6 grid gap-2 my-2"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={4}
        //   navigation
        pagination={{ clickable: true }}

        //   onClick={() => swiper.slideNext()}

        //   onSwiper={(swiper) => console.log(swiper)}
        //   onSlideChange={() => console.log('slide change')}
      >
        {templateList.map((template, index) => (
          <SwiperSlide
            key={index}
            className="inline items-center justify-center"
          >
            <img
              src={template.thumbnailUrl}
              alt=""
              className="object-cover h-3/4 "
            />
            <p>{template.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="prev-arrow  text-[50px] w-1/12 items-center justify-center" onClick={handlePrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className="next-arrow text-[50px] w-1/12 items-center justify-center" onClick={handleNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}

export default Slider;
