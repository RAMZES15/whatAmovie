import React, { useEffect } from "react";
import { Select, Option, Input, Button } from "@material-tailwind/react";
import styles from './Search.module.scss';
import { useFetch } from "../../hooks/useFetch";
import { Card, CardHeader, CardBody, Typography,IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setUserSearch, setUserSearchType } from '../../store/app/appSlice';
import { useNavigate } from "react-router-dom";
import { path } from '../../route/path';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import img404 from "../../assets/img/img404.png";

export const Search = () => {
    const [active, setActive] = React.useState(1);

    useEffect(() => {
        doFetch(`https://api.themoviedb.org/3/search/${type}?query=${search}${type == 'tv' ? '&first_air_date_year=' + year : ''}&include_adult=false&language=en-US${type == 'movie' ? '&primary_release_year=' + year : ''}&page=${active}`)
      }, [active]);
    
      const next = () => {
        if (active === searchResPages) return;
        setActive(active + 1);
        window.scrollTo(0, 0);
      };
    
      const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
        window.scrollTo(0, 0);
      };
    
      const searchFetch = () => {
        doFetch(`https://api.themoviedb.org/3/search/${type}?query=${search}${type == 'tv' ? '&first_air_date_year=' + year : ''}&include_adult=false&language=en-US${type == 'movie' ? '&primary_release_year=' + year : ''}&page=1`)
        setActive(1)
        setActiveSearch(true)
        setSearch('')
        console.log(searchRes);
      }
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [{ data: searchRes }, doFetch] = useFetch();
    const searchResList = searchRes?.results || [];
    const searchResPages = searchRes?.total_pages || [];
    const searchTotalRes = searchRes?.total_results || [];
    const [search, setSearch] = React.useState("");
    const [activeSearch, setActiveSearch] = React.useState(false);
    const [year, setYear] = React.useState("");
    const [type, setType] = React.useState("multi");
    const onChangeSearch = ({ target }) => setSearch(target.value);
    const onChangeYear = ({ target }) => setYear(target.value);
    const onChangeType = (value) => setType(value);
   
    const handleCardClick = (movieId, movieType) => {
        dispatch(setUserSearch(movieId));
        dispatch(setUserSearchType(movieType));
        console.log(movieId);
        console.log(movieType);
        if (movieType == 'movie') {
            navigate(path.movieSinglePage)
        } else if (movieType == 'tv') {
            navigate(path.tvSinglePage)
        } else {
            return;
        }
    }
    const handleSlideClick = (e, movieId, movieType) => {
        e.stopPropagation();
        handleCardClick(movieId, movieType);
    };
    return (
        <><div className=" flex justify-center lg:justify-between items-center flex-wrap mt-[20px] mb-16 gap-[10px]">
            <div className={styles.search}>
                <Select label="Type" value={type}
                    onChange={onChangeType} className={styles.inputText}>
                    <Option value="multi">Multi</Option>
                    <Option value="movie">Movie</Option>
                    <Option value="tv">TV</Option>
                </Select>
                <Input size="md" label="Year" type="number" value={year} onChange={onChangeYear} disabled={type == 'multi'} className={styles.inputText} />
            </div>
            <div className="relative flex w-full max-w-[410px]">
                <Input
                    type="text"
                    label="Search"
                    value={search}
                    onChange={onChangeSearch}
                    className={styles.inputText}
                    containerProps={{
                        className: "min-w-0",
                    }}
                />
                <Button
                    size="sm"
                    color={search ? "blue" : "blue-gray"}
                    disabled={!search}
                    className="!absolute right-1 top-1 rounded"
                    onClick={searchFetch}
                >
                    Search
                </Button>
            </div>
        </div>
            <div className="flex flex-wrap justify-center gap-[50px]  lg:gap-y-[50px] mb-8">
                {searchResList && searchResList.map((movie, index) => (
                    movie.media_type === 'person' ? (
                        ''
                    ) : (

                        <Card key={Math.random() + index + movie.id}
                            className="w-[260px]"
                            onClick={(e) => handleSlideClick(e, movie.id, movie.media_type == undefined ? movie.title ? 'movie' : 'tv' : movie.media_type)}
                        >
                            <CardHeader shadow={true} floated={false} className="m-1">
                                <img
                                    src={movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : img404}
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody className='p-2'>
                                <div className="flex flex-col items-center justify-between mb-2">
                                    <Typography color="blue-gray" className="font-medium mx-auto font-bold">
                                        {!movie.title  ? movie.name : movie.title}
                                    </Typography>
                                    <Typography color="blue-gray" className="font-medium mx-auto font-light">
                                        {!movie.title  ? movie.first_air_date : movie.release_date}
                                    </Typography>
                                </div>
                            </CardBody>
                        </Card>

                    )
                ))}
            </div >
            {searchTotalRes == 0 && activeSearch && <h2 className="text-3xl mb-8 text-center">Oh no nothing found...</h2>}
            {searchResPages && activeSearch && <div className="flex items-center gap-8 justify-center mb-8">
                    <IconButton
                        size="sm"
                        variant="outlined"
                        color="blue-gray"
                        onClick={prev}
                        disabled={active === 1}
                    >
                        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                    <Typography color="gray" className={styles.inputText + " font-normal"}>
                        Page <strong className="text-[#e53935]">{active}</strong> of{" "}
                        <strong className="text-[#e53935]">{searchResPages}</strong>
                    </Typography>
                    <IconButton
                        size="sm"
                        variant="outlined"
                        color="blue-gray"
                        onClick={next}
                        disabled={active === searchResPages}
                    >
                        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                    </IconButton>
                </div>}
        </>


    )
}