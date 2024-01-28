import { createContext, useContext, useState } from "react";

const MyContext = createContext();

// eslint-disable-next-line no-undef, react/prop-types
export const ContextProvider = ({ children }) => {
    const [trigger, setTrigger] = useState(false);

    const handleTrigger = (value) => {
        setTrigger(value);
    }
    return (
        <MyContext.Provider value={{ trigger, handleTrigger }} >
            { children }
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext);