import { createContext } from "react";
import { useState } from "react";

export const Authcontext = createContext();

export const Authprovider = ({ children })=>{
    const [loading, setloading] = useState(true);
    const [user, setuser] = useState(null);

    return (
        <Authcontext.Provider value={{ loading, setloading, user, setuser }}>
            {children}
        </Authcontext.Provider>
    )
}