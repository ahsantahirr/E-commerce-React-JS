import { onAuthStateChanged } from "firebase/auth";
import { createContext,useEffect, useState } from "react";
import { auth } from "../firebaseutils";


export const userContext = createContext()
function UserContextProvider({ children }) {
    const [user, setUser] = useState({ isLogin: false, email: "" })
useEffect(() => {
 onAuthStateChanged(auth,(user)=>{
    if(user){
        setUser({isLogin: true, email: user.email})
    }else{
        setUser({isLogin: false, email: ""})
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