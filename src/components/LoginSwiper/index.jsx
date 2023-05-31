import { useFetch } from '../../hooks/useFetch';
import {Card, CardHeader} from "@material-tailwind/react";

import { Navigation, Pagination, Autoplay, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useState,useEffect } from 'react';

export const LoginSwiper = () => {
  const [ { data: movies }] = useFetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
  const moviesRes = movies?.results || [];
  const windowSize = useWindowSize()
  const [size, setSize] = useState(3)
  useEffect(() => {
    if (windowSize.width < 720) {
      setSize(1);
    }else if(windowSize.width < 1140){
      setSize(2);
    }else {
      setSize(3);
    }
  }, [windowSize.width]);
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={size}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false
    }}
     className='!pb-12 !px-12'
    >
      {moviesRes && moviesRes.map((movie, index) =>(
        <SwiperSlide key={Math.random()+ index}>
          <Card>
        <CardHeader shadow={true} floated={false} className="m-1">
        <img 
          src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
          className="w-full h-full object-cover"
        />
        </CardHeader>
      </Card>
        </SwiperSlide>
      ))}
      
      
    </Swiper>
  );
};