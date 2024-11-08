import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({children}){
    const [userdata, setUserData] = useState({
        jwt: "",
        nombre: "",
        apellido: "",
        email: "",
        usuario: "",
        contrato: "",
        rol: "",
        id: ""
    });

    return(
        <UserContext.Provider value={{userdata, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}