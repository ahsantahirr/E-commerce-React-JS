import React, { useState, useContext } from 'react';
import logo from '../assets/Logo.jpg';
import { NavLink } from 'react-router-dom';
import { userContext } from '../Contexts/userContext'
import { signOut } from "firebase/auth";
import { auth } from '../firebaseutils';
function Navbar({ onChange, onCategoryChange }) {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const { user } = useContext(userContext)
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    async function signout() {
        await signOut(auth)
    }
    return (
        <nav className="bg-amber-600 border-gray-200 sticky z-50 top-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className=" h-8" alt="ReactStore Logo" />
                    <span className="self-center text-sm sm:text-2xl font-semibold whitespace-nowrap text-white">
                        ReactStore
                    </span>
                </NavLink>

                <div className="flex md:order-2">
                    {user.isLogin ? (<button onClick={signout} className="text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-500 shadow-lg shadow-amber-500/50 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-2 py-2 text-center me-2 mb-2">
                        SignOut
                    </button>):(<NavLink to="/signin" className="text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-amber-500 shadow-lg shadow-amber-500/50 font-medium rounded-lg text-sm sm:px-5 sm:py-2.5 px-2 py-2 text-center me-2 mb-2">
                        SignIn
                    </NavLink>)}


                    <div className="relative md:block">
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
                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-amber-400 rounded-lg md:hidden hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600"
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
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-amber-600 rounded-lg bg-amber-600 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                        <li>
                            <NavLink to="/" className={({ isActive }) => `block py-2 px-3 rounded hover:bg-amber-700 md:hover:bg-transparent
                            ${isActive ? " text-amber-400 " : "text-white"} md:hover:text-amber-500 md:p-0 hover:bg-gray-700`}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={({ isActive }) => `block py-2 px-3 rounded hover:bg-amber-700 md:hover:bg-transparent
                            ${isActive ? " text-amber-400 " : "text-white"} md:hover:text-amber-500 md:p-0 hover:bg-gray-700`}>
                                About
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={({ isActive }) => `block py-2 px-3 rounded hover:bg-amber-700 md:hover:bg-transparent
                            ${isActive ? " text-amber-400 " : "text-white"} md:hover:text-amber-500 md:p-0 hover:bg-gray-700`}>
                                Contact Us
                            </NavLink>
                        </li>
                        <li>{user.isLogin ? <p className="text-white">{user.email}</p> : <p>no user</p>}

                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
