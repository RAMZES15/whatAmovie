import { useFetch } from '../../hooks/useFetch';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { Navigation, Pagination, Autoplay, A11y } from 'swiper';
import { setUserSearch,setUserSearchType } from '../../store/app/appSlice'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { path } from '../../route/path'; 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PopularSwiper = ({ link, type }) => {
    const dispatch = useDispatch();
    const [{ data: movies }, doFetch] = useFetch(link);
    const moviesRes = movies?.results || [];
    const windowSize = useWindowSize()
    const [size, setSize] = useState(4)
    const navigate = useNavigate()
    const handleCardClick = (movieId , movieType) => {
        dispatch(setUserSearch(movieId));
        dispatch(setUserSearchType(movieType));
        console.log(movieId);
        console.log(movieType);
        if(movieType == 'movie'){
            navigate(path.movieSinglePage)
        }else if (movieType == 'tv'){
            navigate(path.tvSinglePage)
        }else{
            return;
        }
    }
    const handleSlideClick = (e, movieId , movieType) => {
        e.stopPropagation();
        handleCardClick(movieId , movieType);
    };
    useEffect(() => {
        if (windowSize.width < 720) {
            setSize(1);
        } else if (windowSize.width < 960) {
            setSize(2);
        } else if (windowSize.width < 1140) {
            setSize(3);
        } else {
            setSize(4);
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
                delay: 7000,
                disableOnInteraction: false
            }}
            className='!p-12'
        >
            {moviesRes && moviesRes.map((movie, index) => (
                <SwiperSlide key={Math.random() + index}>
                    <Card onClick={(e) => handleSlideClick(e, movie.id , movie.media_type)}>
                        <CardHeader shadow={true} floated={false} className="m-1">
                            <img
                                src={'https://image.tmdb.org/t/p/w500' + movie.poster_path}
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>
                        <CardBody className='p-2'>
                            <div className="flex items-center justify-between mb-2">
                                <Typography color="blue-gray" className="font-medium mx-auto font-bold">
                                    {type ? movie.name : movie.title}
                                </Typography>
                            </div>
                        </CardBody>
                    </Card>
                </SwiperSlide>
            ))}


        </Swiper>
    );
};