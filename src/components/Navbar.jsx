import React, { useState, useContext, useEffect } from 'react';
import logo from '../assets/logo1.jpg';
import ProfileDropdown from './ProfileDropdown'
import { NavLink, Link } from 'react-router-dom';
import { userContext } from '../Contexts/userContext'
import { signOut } from "firebase/auth";
import { auth } from '../firebaseutils';
import { themeContext } from '../Contexts/Themecontext';
import { Button, TimelineIcon } from '@material-tailwind/react';
import { ShoppingCartOutlined, MoonOutlined, MoonFilled } from '@ant-design/icons';
import { CartContext } from '../Contexts/Cartcontext'

import { Badge } from 'antd';
function Navbar({ onChange, onCategoryChange }) {
    const { theme, setTheme } = useContext(themeContext)
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { user } = useContext(userContext)
    const { cartItems } = useContext(CartContext);
   
    const [spin, setSpin] = useState(false);
 
    
    useEffect(() => {
        if (cartItems.length >= 0) {
            setSpin(true); // Start spinning
            // Stop spinning after 1 second
            const timeout = setTimeout(() => {
                setSpin(false);
            }, 1000);

            return () => clearTimeout(timeout); // Cleanup timeout on unmount or next change
        }
    }, [cartItems.length]);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    async function signout() {
        await signOut(auth)
    }
    return (
        <nav className={`border-b-2 sticky z-50 top-0 font-poppins ${theme ? ("bg-black border-blue-50") : "bg-white border-b-black"}`}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className=" h-8 rounded-2xl" alt="ReactStore Logo" />
                    <span className={`self-center text-xs sm:text-2xl font-semibold whitespace-nowrap ${theme ? "text-white" : "text-black"}`}>
                        ReactStore
                    </span>
                </NavLink>

                <div className="flex md:order-2 gap-2 items-center">
                    {user.isLogin ? (<button onClick={signout} className="text-white bg-gradient-to-r from-black via-black to-black hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-black shadow-lg shadow-black-500/50 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-2 py-2 text-center me-2 mb-2 hidden sm:block">
                        SignOut
                    </button>) : (<NavLink to="/signin" className={` bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none  shadow-lg shadow-black-500/50 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-2 py-2 text-center me-2 mb-2 hidden sm:block ${theme ? ("text-black from-white via-white to-white focus:ring-white") : ("text-white from-black via-black to-black focus:ring-black")}`}>
                        SignIn
                    </NavLink>)}
                    <Button className='bg-transparent' onClick={() => {
                        if (theme === true) {
                            setTheme(false);
                        } else {
                            setTheme(true);
                        }
                    }}>
                        {theme ? <MoonFilled className={`${theme ? ("text-white") : ("text-black")}`} style={{ fontSize: 20 }} /> : <MoonOutlined className={`${theme ? ("text-white") : ("text-black")}`} style={{ fontSize: 20 }} />}
                    </Button>

                    {/* <div className="relative md:block">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input
                            type="text"
                            id="search-navbar"
                            className="block w-24 sm:w-full p-2 ps-10 text-sm text-black border border-gray-600 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search..."
                            onChange={onChange}
                        />
                    </div> */}
                    <Link to="cart">
                      
                            <Badge count={cartItems.length} className="mt-2">
                                <ShoppingCartOutlined
                                    className={`${theme ? 'text-white' : 'text-black'} ${spin ? 'animate-spin' : ''} `}
                                    style={{ fontSize: 30 }}
                                />
                            </Badge>
                      
                    </Link>
                    <div className={`${user.isLogin?"flex" : "hidden"} md:order-2`}>

                        <ProfileDropdown />

                    </div>
                    <button
                        type="button"
                        className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white-400 rounded-lg md:hidden  focus:outline-none focus:ring-2  ${theme ? "focus:ring-white bg-white " : "focus:ring-black bg-white"}`}
                        aria-controls="navbar-search"
                        aria-expanded={!isNavCollapsed}
                        onClick={handleNavCollapse}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div className={`items-center justify-between ${isNavCollapsed ? 'hidden' : 'flex'} w-full md:flex md:w-auto md:order-1`} id="navbar-search">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-b lack rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `block py-2 px-3 
                            ${theme ? "text-white" : "text-black"} 
                            ${isActive ? (`underline ${theme ? "decoration-white" : "decoration-black "} decoration-2 font-bold underline-offset-8 `) : "text-black"}  md:p-0 `}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => `block py-2 px-3 
                            ${theme ? "text-white" : "text-black"} 
                            ${isActive ? (`underline ${theme ? "decoration-white" : "decoration-black "} decoration-2 font-bold underline-offset-8 `) : "text-black"}  md:p-0 `}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => `block py-2 px-3 
                            ${theme ? "text-white" : "text-black"} 
                            ${isActive ? (`underline ${theme ? "decoration-white" : "decoration-black "} decoration-2 font-bold underline-offset-8 `) : "text-black"}  md:p-0 `}>
                                Contact Us
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/AdminPanel" className={({ isActive }) => ` py-2 px-3 
                           ${user.email=="admin@gmail.com"? "block":"hidden"} ${theme ? "text-white" : "text-black"} 
                            ${isActive ? (`underline ${theme ? "decoration-white" : "decoration-black "} decoration-2 font-bold underline-offset-8 `) : "text-black"}  md:p-0 `}>
                                Admin Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signin" className={` bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none  shadow-lg shadow-black-500/50 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-2 py-2 text-center me-2 mb-2 block sm:hidden ${theme ? ("text-black from-white via-white to-white focus:ring-white") : ("text-white from-black via-black to-black focus:ring-black")}`}>
                                SignIn
                            </NavLink>
                        </li>
                        {/* <li>{user.isLogin ? <p className="text-white">{user.name}</p> : <p>no user</p>}

                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;



