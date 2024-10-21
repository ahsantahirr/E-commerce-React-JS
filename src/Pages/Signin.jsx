import React, { useState, useContext, useEffect } from 'react';
import logo from '../assets/logo1.jpg';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseutils';
import { doc, getDoc } from 'firebase/firestore';
import { userContext } from '../Contexts/userContext';
import { themeContext } from '../Contexts/Themecontext';
import { ColorRing } from 'react-loader-spinner';

function Signin() {
  const { theme } = useContext(themeContext);
  const { setUser } = useContext(userContext); // To update user state
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false)
  // Handle form submission for email and password sign-in
  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        const user = result.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            name: userData.name,
            email: userData.email,
            isLogin: true,
            profile: userData.profile
          });
        }
        navigate("/");
      })
      .catch((error) => {
        alert(error.message); // Handle error during sign-in
        setLoading(false)
      });
  };

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            name: userData.name,
            email: userData.email,
            isLogin: true,
            profile: userData.profile
          });
          navigate("/"); // Redirect to homepage if user is logged in
        }
      }
    });

    return () => unsubscribe();
  }, [navigate, setUser]);

  return (
    <section className={`${theme ? "bg-black" : "bg-white"} font-poppins`}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className={`flex items-center mb-6 text-2xl font-semibold ${theme ? "text-white" : "text-black"}`}
        >
          <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
          ReactStore
        </a>
        <div className={`w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ${theme ? "bg-black" : "bg-white"}`}>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className={`text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ${theme ? "text-white" : "text-black"}`}>
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onsubmit}>
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium text-gray-900 ${theme ? "text-white" : "text-black"}`}
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border border-gray-300  rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 ${theme ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium text-gray-900 ${theme ? "text-white" : "text-black"}`}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border border-gray-300  rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 ${theme ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className={`text-sm font-medium hover:underline ${theme ? "text-white" : "text-black"}`}
                >
                  Forgot password?
                </a>
              </div>

              <div className="!mt-12">
                            <button
                                type="submit"
                                className={`w-full ${theme ? "text-black bg-white" : "text-white bg-black"} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            >
                                {loading ? (
                                    theme?( <div className = "flex justify-center items-center" >
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="80"
                                            ariaLabel="color-ring-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="color-ring-wrapper"
                                            colors={["#849b87"]}
                                        />
                            </div>):
                               ( <div className = "flex justify-center items-center" >
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="80"
                                            ariaLabel="color-ring-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="color-ring-wrapper"
                                            colors={["white", "white", "white", "white", "white"]}
                                        />
                            </div>))  : <p>Signin</p>}

                    </button>
                </div>
            
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className={`font-medium hover:underline ${theme ? "text-white" : "text-black"}`}
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signin;
