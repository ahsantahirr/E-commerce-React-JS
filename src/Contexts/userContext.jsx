import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseutils';
import { doc, getDoc } from 'firebase/firestore';
import defaultprofile from '../assets/defaultprofile.jpg'
export const userContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        name: null,
        email: null,
        isLogin: false,
        profile: defaultprofile,
    });

    // Check Firebase auth state and retrieve user data from Firestore
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch user data from Firestore
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUser({
                        name: userData.name,
                        email: userData.email,
                        isLogin: true,
                        profile: userData.profile || null
                    });
                }
            } else {
                // Reset user data if no user is logged in
                setUser({
                    name: null,
                    email: null,
                    isLogin: false,
                    profile: defaultprofile
                });
            }
        });

        // Clean up subscription on unmount
        return () => unsubscribe();
    }, [setUser]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;