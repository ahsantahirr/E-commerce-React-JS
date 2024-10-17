// import React, { useState, useContext, useEffect } from 'react';
// import logo from '../assets/Logo.jpg';
// import Googlebutton from '../components/Googlebutton';
// import { Link } from 'react-router-dom';
// import { useNavigate } from "react-router";
// import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
// import { auth, googleProvider, db } from '../firebaseutils';
// import { doc, setDoc, getDoc } from 'firebase/firestore';
// import { userContext } from '../Contexts/userContext';

// function Signup() {
//     const navigate = useNavigate();
//     const { setUser } = useContext(userContext);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState("");

//     useEffect(() => {
//         // Check if user is already logged in on page load
//         const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//             if (currentUser) {
//                 const userDoc = await getDoc(doc(db, "users", currentUser.uid));
//                 if (userDoc.exists()) {
//                     const userData = userDoc.data();
//                     setUser({
//                         name: userData.name,
//                         email: userData.email,
//                         isLogin: true,
//                         profile: userData.profile
//                     });
//                 }
//             }
//         });

//         return () => unsubscribe();
//     }, [setUser]);

//     // Handle form submission for email and password sign-up
//     const onsubmit = (e) => {
//         e.preventDefault();
//         createUserWithEmailAndPassword(auth, email, password)
//             .then(async (result) => {
//                 const user = result.user;
//                 // Add user data to Firestore
//                 await setDoc(doc(db, "users", user.uid), {
//                     name: name,
//                     email: user.email,
//                     profile: null // Default profile picture can be added later
//                 });
//                 setUser({
//                     name: name,
//                     email: user.email,
//                     isLogin: true,
//                     profile: null
//                 });
//                 navigate("/");
//             })
//             .catch((err) => alert(err.message));
//     };

//     // Handle Google sign-in
//     const google = () => {
//         signInWithPopup(auth, googleProvider)
//             .then(async (result) => {
//                 const user = result.user;
//                 // Check if user already exists in Firestore
//                 const userDoc = await getDoc(doc(db, "users", user.uid));
//                 if (!userDoc.exists()) {
//                     // Add user data to Firestore if it's their first time logging in
//                     await setDoc(doc(db, "users", user.uid), {
//                         name: user.displayName,
//                         email: user.email,
//                         profile: user.photoURL
//                     });
//                 }
//                 setUser({
//                     name: user.displayName,
//                     email: user.email,
//                     isLogin: true,
//                     profile: user.photoURL
//                 });
//                 navigate("/");
//             })
//             .catch((error) => {
//                 console.error(error.message);
//             });
//     };

//     return (
//         <div className="flex flex-col justify-center sm:h-screen p-4 h-full overflow-hidden font-poppins">
//             <div className="text-center mt-10 flex justify-center">
//                 <Link href="#" className="flex items-center text-2xl font-semibold text-gray-900">
//                     <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
//                     ReactStore
//                 </Link>
//             </div>
//             <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
//                 <form onSubmit={onsubmit}>
//                     <div className="space-y-6">
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block font-bold">Full Name</label>
//                             <input
//                                 name="userName"
//                                 type="text"
//                                 className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
//                                 placeholder="Enter your Name"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block font-bold">Email Id</label>
//                             <input
//                                 name="email"
//                                 type="text"
//                                 className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
//                                 placeholder="Enter email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block font-bold">Password</label>
//                             <input
//                                 name="password"
//                                 type="password"
//                                 className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
//                                 placeholder="Enter password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                         </div>
//                         <div className="flex items-center">
//                             <input
//                                 id="remember-me"
//                                 name="remember-me"
//                                 type="checkbox"
//                                 className="h-4 w-4 shrink-0 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
//                             />
//                             <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
//                                 I accept the{" "}
//                                 <Link href="javascript:void(0);" className="text-amber-600 font-semibold hover:underline ml-1">
//                                     Terms and Conditions
//                                 </Link>
//                             </label>
//                         </div>
//                     </div>
//                     <div className="!mt-12">
//                         <button
//                             type="submit"
//                             className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none"
//                         >
//                             Create an account
//                         </button>
//                     </div>
//                     <p className="text-gray-800 text-sm mt-6 text-center">
//                         Already have an account?{" "}
//                         <Link to="/signin" className="text-amber-600 font-semibold hover:underline ml-1">
//                             Login here
//                         </Link>
//                     </p>
//                 </form>
//                 <div className="!mt-12 flex justify-center">
//                     <Googlebutton onClick={google} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Signup;
import React, { useState, useContext, useEffect } from 'react';
import logo from '../assets/Logo.jpg';
import Googlebutton from '../components/Googlebutton';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, db } from '../firebaseutils';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { userContext } from '../Contexts/userContext';

function Signup() {
    const navigate = useNavigate();
    const { setUser } = useContext(userContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        // Check if user is already logged in on page load
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
                }
            }
        });

        return () => unsubscribe();
    }, [setUser]);

    // Handle form submission for email and password sign-up
    const onsubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const user = result.user;
                // Add user data to Firestore
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: user.email,
                    profile: null // Default profile picture can be added later
                });
                setUser({
                    name: name,
                    email: user.email,
                    isLogin: true,
                    profile: null
                });
                navigate("/");
            })
            .catch((err) => alert(err.message));
    };

    // Handle Google sign-in
    const google = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;
                // Check if user already exists in Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (!userDoc.exists()) {
                    // Add user data to Firestore if it's their first time logging in
                    await setDoc(doc(db, "users", user.uid), {
                        name: user.displayName,
                        email: user.email,
                        profile: user.photoURL
                    });
                }
                setUser({
                    name: user.displayName,
                    email: user.email,
                    isLogin: true,
                    profile: user.photoURL
                });
                navigate("/");
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return (
        <div className="flex flex-col justify-center sm:h-screen p-4 h-full overflow-hidden font-poppins">
            <div className="text-center mt-10 flex justify-center">
                <Link href="#" className="flex items-center text-2xl font-semibold text-gray-900">
                    <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                    ReactStore
                </Link>
            </div>
            <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
                <form onSubmit={onsubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block font-bold">Full Name</label>
                            <input
                                name="userName"
                                type="text"
                                className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-amber-500"
                                placeholder="Enter your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 shrink-0 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember-me" className="text-gray-800 ml-3 block text-sm">
                                I accept the{" "}
                                <Link href="javascript:void(0);" className="text-amber-600 font-semibold hover:underline ml-1">
                                    Terms and Conditions
                                </Link>
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
                        <Link to="/signin" className="text-amber-600 font-semibold hover:underline ml-1">
                            Login here
                        </Link>
                    </p>
                </form>
                <div className="!mt-12 flex justify-center">
                    <Googlebutton onClick={google} />
                </div>
            </div>
        </div>
    );
}

export default Signup;
