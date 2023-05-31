import {BrowserRouter, Routes as RouterRoutes, Route} from 'react-router-dom'
import { path } from "./path";
import { Layout } from "../components";
import { LoginPage, Movie, Home,MovieSinglePage, TvSinglePage } from "../pages";
import { ProtectedRoad } from "./ProtectedRoad";

export const Routes =  ()=> {
    return (
        <BrowserRouter>
            <RouterRoutes>
                <Route element={<Layout/>}>
                    <Route path={path.startPage} element={<LoginPage/>}/>
                    <Route path={path.homePage} element={<ProtectedRoad><Home/></ProtectedRoad>}/>
                    <Route path={path.moviePage} element={<ProtectedRoad><Movie/></ProtectedRoad>}/>
                    <Route path={path.movieSinglePage} element={<ProtectedRoad><MovieSinglePage/></ProtectedRoad>}/>
                    <Route path={path.tvSinglePage} element={<ProtectedRoad><TvSinglePage/></ProtectedRoad>}/>
                </Route>
            </RouterRoutes>
        </BrowserRouter>
    )
}