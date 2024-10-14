import React from 'react'
import logo from '../assets/logo1.jpg'
import { useContext } from 'react'
import { themeContext } from '../Contexts/Themecontext'
import { Link } from 'react-router-dom'
function Signin() {
  const {theme} = useContext(themeContext)
  return (
    
    <section className={`${theme? "bg-black" : "bg-white"}`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className={`flex items-center mb-6 text-2xl font-semibold ${theme? "text-white" : "text-black"}`}
        >
          <img
            className="w-8 h-8 mr-2"
            src={logo}
            alt="logo"
          />
          ReactStore
        </a>
        <div className={`w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ${theme? "bg-black" : "bg-white"}`}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ${theme? "text-white" : "text-black"}`}>
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium text-gray-900 ${theme? "text-white" : "text-black"}`}
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 ${theme? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium text-gray-900 ${theme? "text-white" : "text-black"}`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300  rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 ${theme? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 "
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className={`text-sm font-medium  hover:underline dark:text-primary-500 ${theme? "text-white" : "text-black"}`}
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className={`w-full ${theme? "text-black bg-white" : "text-white bg-black"} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className={`font-medium  hover:underline ${theme? "text-white" : "text-black"}`}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Signin