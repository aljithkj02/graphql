import { createContext, useContext } from "react";

const MyContext = createContext();

// eslint-disable-next-line no-undef, react/prop-types
export const ContextProvider = ({ children }) => {
    return (
        <MyContext.Provider value={{ test: true }} >
            { children }
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext);