import React from "react";
import styles from './Header.module.scss'
import { Navbar, Collapse, Typography, Button, IconButton, ButtonGroup,} from "@material-tailwind/react";
import { useTheme } from '../../hooks/useTheme';
import { logOut } from '../../store/app/appSlice';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { path } from "../../route/path";



export const Header = () => {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);
    const navList = () => {
        if (isLogin) {
            return (
                <ul className={styles.inputText + " mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"}>
                    <Typography
                        as="li"
                        variant="small"
                        className="p-1 font-normal"
                    >
                        <a href="#" className="flex items-center">
                            Pages
                        </a>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        className="p-1 font-normal"
                    >
                        <a href="#" className="flex items-center">
                            Account
                        </a>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"

                        className="p-1 font-normal"
                    >
                        <a href="#" className="flex items-center">
                            Blocks
                        </a>
                    </Typography>
                </ul>)
        } else {
            return;
        }

    };

    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.app)
    const { theme, setTheme } = useTheme()
    const navigate = useNavigate();
    const handleLightThemeClick = () => {
        setTheme('light')
    }
    const handleDarkThemeClick = () => {
        setTheme('dark')
    }
    const hendleLogOutClick = () => {
        navigate(path.homePage);
        dispatch(logOut())
    }
    const isDarkTheme = () => {
        if (theme == 'dark') {
            return true;
        } else {
            return false;
        }
    }
    return (
        <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4 bg-[#0d253f] border-0 bg-opacity-100">
            <div className="flex items-center justify-between text-blue-gray-900">
                <a href={path.homePage} >
                    <div className='text-xl cursor-pointer text-white'>what<span className='text-red-600'>A</span>movie</div>
                </a>
                <div className="flex items-center gap-4">
                    {/* <div className="mr-4 hidden lg:block">{navList()}</div> */}
                    <ButtonGroup variant="gradient" size="sm" className='ml-auto hidden lg:inline-block'>
                        <Button onClick={handleDarkThemeClick} className={isDarkTheme() ? '' : styles.theme}>Dark</Button>
                        <Button onClick={handleLightThemeClick} className={isDarkTheme() ? styles.theme : ''}>Light</Button>
                    </ButtonGroup>
                    {isLogin && <Button size="sm" className='ml-[15px] hidden lg:inline-block' onClick={hendleLogOutClick}>logout</Button>}
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="white"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="white"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <Collapse open={openNav}>
                {/* {navList()} */}
                <ButtonGroup fullWidth variant="gradient" size="sm" className='mb-[15px]'>
                    <Button onClick={handleDarkThemeClick} className={isDarkTheme() ? '' : styles.theme}>Dark</Button>
                    <Button onClick={handleLightThemeClick} className={isDarkTheme() ? styles.theme : ''}>Light</Button>
                </ButtonGroup>
                {isLogin && <Button size="sm" fullWidth onClick={hendleLogOutClick}>logout</Button>}
            </Collapse>
        </Navbar>
    )
}