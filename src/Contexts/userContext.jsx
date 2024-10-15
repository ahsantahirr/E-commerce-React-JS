import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseutils";


export const userContext = createContext()
function UserContextProvider({ children }) {
    const [user, setUser] = useState({ isLogin: false, email: "", name: "" })
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({ isLogin: true,  })
               
                
            } else {
                setUser({ isLogin: false,  })
            }
        })
    }, [])

    return (
        < userContext.Provider value={{ user, setUser }}>
            {children}
        </ userContext.Provider >
    )

}
export default UserContextProvider;