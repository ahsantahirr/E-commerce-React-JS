import React, { useState } from 'react'
import logo from '../assets/Logo.jpg'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../firebaseutils'
function Signup() {
    const navigate = useNavigate();
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("")

    function onsubmit(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then(()=>{
            navigate("/")
        })
        .catch((err)=>alert(err))
    }
    
    return (
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4 h-full 
    ">
            <div className="text-center mt-10 flex justify-center">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src={logo}
                        alt="logo"
                    />
                    ReactStore
                </a>
            </div>
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">

                <form
                onSubmit={onsubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block font-bold ">Full Name</label>
                            <input
                                name="userName"
                                type="text"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
                                placeholder="Enter your Name"
                                
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block font-bold">Email Id</label>
                            <input
                                name="email"
                                type="text"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block font-bold">Password</label>
                            <input
                                name="password"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block font-bold">
                                Confirm Password
                            </label>
                            <input
                                name="cpassword"
                                type="password"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
                                placeholder="Enter confirm password"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 shrink-0 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                            <label
                                htmlFor="remember-me"
                                className="text-gray-800 ml-3 block text-sm"
                            >
                                I accept the{" "}
                                <a
                                    href="javascript:void(0);"
                                    className="text-amber-600 font-semibold hover:underline ml-1"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>
                    <div className="!mt-12">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
                        >
                            Create an account
                        </button>
                    </div>
                    <p className="text-gray-800 text-sm mt-6 text-center">
                        Already have an account?{" "}
                        <Link
                            to="/signin"
                            className="text-amber-600 font-semibold hover:underline ml-1"
                        >
                            Login here
                        </Link>
                    </p>
                    <div className="!mt-12">
                        <button
                            type="button"
                            className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
                        >
                           Signup with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup