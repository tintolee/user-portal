import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './asideCarousel.css';

// import required modules
import { Pagination, Autoplay } from 'swiper';
import Box from '@sendsprint/ui-react/dist/components/Box';
import { AutoplayOptions, PaginationOptions } from 'swiper/types';
import CarouselCard, { CarouselDataI } from './CarouselCard';
import { illustration1, illustration2, illustration3 } from '@src/layouts/auth/assets';

const data: CarouselDataI[] = [
  {
    header: 'Send money ',
    image: illustration1,
    paragraph: `A safer and more reliable way to send
        money home to friends and family`
  },
  {
    header: 'Send Gifts',
    image: illustration2,
    paragraph: `A safer and more reliable way to send
    gifts home to friends and family`
  },
  {
    header: 'Seamless transfers ',
    image: illustration3,
    paragraph: `Fast, simple, and hassle-free international money transfers`
  }
];

const paginationOptions: PaginationOptions = {
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="aside-carousel-pagination-item ' + className + '"/>' + '</span>';
  }
};

const autoPlayOptions: AutoplayOptions = {
  delay: 6000,
  disableOnInteraction: false
};

const AsideCarousel = () => {
  return (
    <Box className="">
      <Swiper
        pagination={paginationOptions}
        modules={[Pagination, Autoplay]}
        autoplay={autoPlayOptions}
        loop
        className="aside-carousel">
        {data.map((item) => (
          <SwiperSlide key={item.header}>
            <CarouselCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default AsideCarousel;
