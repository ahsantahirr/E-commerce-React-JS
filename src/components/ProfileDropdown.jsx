import { useState, useContext } from 'react';
import { userContext } from '../Contexts/userContext';
import defaultprofile from '../assets/defaultprofile.jpg'

import { Link } from 'react-router-dom';
function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(userContext);
// console.log(user);
// console.log(user.profile)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${user.isLogin ? "inline-block" : "hidden"} relative text-left`}>
            <div>
                <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    id="user-menu-button"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                >
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="w-8 h-8 rounded-full"
                        src={user.profile || defaultprofile} // Show default profile if not available
                        alt="user photo"
                    />
                </button>
            </div>
            {isOpen && (
                <div
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg z-50 bg-white dark:bg-gray-700"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                >
                    <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                    </div>
                    <ul className="py-2" role="menu" aria-labelledby="user-menu-button">
                        <li>
                            <Link
                               to='orders'
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Your Orders
                            </Link>
                            
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                            >
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
