import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import { useFetch } from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import img404 from "../../assets/img/img404.png";

import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";

export const MovieSingle = () => {
    const { userSearchType, userSearch } = useSelector(state => state.app)
    const [{ data: movie }] = useFetch(`https://api.themoviedb.org/3/${userSearchType}/${userSearch}?language=en-US`);
    const [{ data: person }] = useFetch(`https://api.themoviedb.org/3/${userSearchType}/${userSearch}/credits?language=en-US`);
    const windowSize = useWindowSize()
    const [size, setSize] = useState(8)

    useEffect(() => {
        if (windowSize.width < 440) {
            setSize(1);
        } else if (windowSize.width < 720) {
            setSize(2);
        } else if (windowSize.width < 960) {
            setSize(4);
        } else if (windowSize.width < 1140) {
            setSize(6);
        } else if (windowSize.width < 1320) {
            setSize(7);
        } else {
            setSize(8);
        }

    }, [windowSize.width]);

    return (
        <div >
            {movie && <Card className="mt-12 md:flex-row pb-4 mb-8">
                <CardHeader color="blue-gray" className="relative md:min-w-[300px] h-min">
                    <img src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : img404} alt="img-blur-shadow" layout="fill" />
                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2 text-3xl">
                        {userSearchType == 'movie' ? movie.title : movie.name}
                    </Typography>
                    <Typography className="font-bold">
                        Release: {userSearchType == 'movie' ? movie.release_date : movie.first_air_date}
                    </Typography>
                    <Typography className="font-bold">
                        {userSearchType == 'movie' ? `Runtime: ${movie.runtime}min` : `Number of seasons: ${movie.number_of_seasons}`}
                    </Typography>
                    {movie.number_of_episodes && <Typography className="font-bold">
                        Number of episodes: {movie.number_of_episodes}
                    </Typography>}
                    {movie.episode_run_time && movie.episode_run_time.length > 0 ? (
                        <Typography className="font-bold">
                            Episode run time: {movie.episode_run_time} min
                        </Typography>
                    ) : null}
                    <Typography className="font-bold mb-4">
                        Vote average: {(movie.vote_average * 10).toFixed(0)}%
                    </Typography>
                    <Typography>
                        {movie.overview}
                    </Typography>

                </CardBody>
            </Card>}
            <h3 className="ml-12 mb-8 text-3xl">Cast</h3>
            <Card className="py-4">
                <CardHeader>
                    <Swiper
                        className="!px-9"
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={40}
                        slidesPerView={size}
                        navigation
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log('slide change')}
                    >
                        {person && person.cast.map((pers, index) => (
                            <SwiperSlide key={index + pers.name}>
                                <img className="rounded-md" src={pers.profile_path ? 'https://image.tmdb.org/t/p/w500' + pers.profile_path : img404} />
                                <Typography className='text-center'>
                                    {pers.name}
                                </Typography>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </CardHeader>
            </Card>
        </div>
    )
}