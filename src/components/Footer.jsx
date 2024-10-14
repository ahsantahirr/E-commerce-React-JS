import React, { useContext } from 'react';
import { themeContext } from '../Contexts/Themecontext';
function Footer() {
  const {theme} = useContext(themeContext)
  return (
    <footer className={`bg-gray-950 p-10 font-poppins`}>
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className={`text-white mb-6 text-sm font-semibold uppercase`}>
              Company
            </h2>
            <ul className="text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Brand Center
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={`text-white mb-6 text-sm font-semibold uppercase`}>
              Help center
            </h2>
            <ul className="text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Discord Server
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={`text-white mb-6 text-sm font-semibold uppercase`}>
              Legal
            </h2>
            <ul className="text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Licensing
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className={`text-white mb-6 text-sm font-semibold uppercase`}>
              Download
            </h2>
            <ul className="text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  iOS
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Android
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Windows
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  MacOS
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-black md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-300 sm:text-center">
            © 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights
            Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
            <a
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 21 16"
              >
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
              </svg>
              <span className="sr-only">Discord community</span>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
               <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.65 11.65 0 0 1 1.392.75 3.937 3.937 0 0 0 1 2.698a4.008 4.008 0 0 0 1.82 3.355 4.202 4.202 0 0 1-1.857-.5v.046A4.08 4.08 0 0 0 4.06 9.622a4.085 4.085 0 0 1-1.085.14 3.85 3.85 0 0 1-.762-.073 4.096 4.096 0 0 0 3.834 2.82A8.275 8.275 0 0 1 0 14.414a11.612 11.612 0 0 0 6.29 1.83c7.547 0 11.674-6.144 11.674-11.468 0-.173-.003-.346-.01-.519A8.162 8.162 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .64a9.36 9.36 0 1 0 0 18.72A9.36 9.36 0 0 0 10 .64ZM8.55 6.7a1.64 1.64 0 1 1-3.281 0 1.64 1.64 0 0 1 3.281 0Zm6.8 1.62v4.91a4.7 4.7 0 0 1-4.7 4.7H6.28a4.7 4.7 0 0 1-4.7-4.7v-4.91a4.7 4.7 0 0 1 4.7-4.7h4.37a4.7 4.7 0 0 1 4.7 4.7Zm-3.25-.68c-.735 0-1.33.595-1.33 1.33 0 .734.595 1.33 1.33 1.33.735 0 1.33-.596 1.33-1.33 0-.735-.595-1.33-1.33-1.33Zm-2.45 1.33a3.02 3.02 0 0 0-3.02-3.02H6.28a3.02 3.02 0 0 0-3.02 3.02v4.91a3.02 3.02 0 0 0 3.02 3.02h4.37a3.02 3.02 0 0 0 3.02-3.02v-4.91a3.02 3.02 0 0 0-3.02-3.02Zm-2.34 6.84a1.68 1.68 0 1 1 0-3.36 1.68 1.68 0 0 1 0 3.36Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Instagram page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .64a9.36 9.36 0 1 0 0 18.72A9.36 9.36 0 0 0 10 .64ZM8.55 6.7a1.64 1.64 0 1 1-3.281 0 1.64 1.64 0 0 1 3.281 0Zm6.8 1.62v4.91a4.7 4.7 0 0 1-4.7 4.7H6.28a4.7 4.7 0 0 1-4.7-4.7v-4.91a4.7 4.7 0 0 1 4.7-4.7h4.37a4.7 4.7 0 0 1 4.7 4.7Zm-3.25-.68c-.735 0-1.33.595-1.33 1.33 0 .734.595 1.33 1.33 1.33.735 0 1.33-.596 1.33-1.33 0-.735-.595-1.33-1.33-1.33Zm-2.45 1.33a3.02 3.02 0 0 0-3.02-3.02H6.28a3.02 3.02 0 0 0-3.02 3.02v4.91a3.02 3.02 0 0 0 3.02 3.02h4.37a3.02 3.02 0 0 0 3.02-3.02v-4.91a3.02 3.02 0 0 0-3.02-3.02Zm-2.34 6.84a1.68 1.68 0 1 1 0-3.36 1.68 1.68 0 0 1 0 3.36Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;