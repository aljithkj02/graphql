import { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";

const MyContext = createContext();

// eslint-disable-next-line no-undef, react/prop-types
export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(true);

    if(!user) {
        return <Navigate to='/login' />
    }
    return (
        <MyContext.Provider value={{ user }} >
            { children }
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext);