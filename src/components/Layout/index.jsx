import {Outlet} from 'react-router-dom'
import {Header} from '../'

export const Layout = () => {
    return (
        <>
        <Header/>
        <main>
            <Outlet/>
        </main>
        </>
    )
}