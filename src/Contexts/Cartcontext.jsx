import { createContext } from "react";


export const cartcontext = createContext()
function cartContextprovider({children}){
return(
   < cartcontext.Provider >
    {children}
   </cartcontext.Provider>
)
}
export default cartContextprovider