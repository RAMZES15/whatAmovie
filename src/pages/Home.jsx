import { useSelector } from "react-redux";
import { Search,PopularSwiper } from "../components";

export const Home = ()=>{
    const { userName } = useSelector(state => state.app)
    return(
        <div className="container mx-auto px-4">
            <div className="pt-5 text-xl text-center ">Hello, {userName}</div>
            <Search/>
            <div>
            <h3 className="ml-12 text-3xl">Popular movies</h3>
                <PopularSwiper link={'https://api.themoviedb.org/3/trending/movie/week?language=en-US'} type={false}/>
            </div>
            <div>
                <h3 className="ml-12 text-3xl">Popular TV</h3>
                <PopularSwiper link={'https://api.themoviedb.org/3/trending/tv/week?language=en-US'} type={true}/>
            </div>
        </div>

    )
}