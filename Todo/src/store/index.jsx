import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createContext, useContext, useState } from "react";

const MyContext = createContext();

const token = localStorage.getItem('token');
const clientServer = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  ...(token && {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
})

// eslint-disable-next-line no-undef, react/prop-types
export const ContextProvider = ({ children }) => {
    const [trigger, setTrigger] = useState(false);
    const [client, setClient] = useState(clientServer);

    const handleTrigger = (value) => {
        setTrigger(value);
    }

    const triggerLogin = () => {
        const token = localStorage.getItem('token');
        setClient(new ApolloClient({
            uri: 'http://localhost:4000/graphql',
            cache: new InMemoryCache(),
            ...(token && {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
        }))
    }
    
    return (
        <MyContext.Provider value={{ trigger, handleTrigger, triggerLogin }} >
            <ApolloProvider client={client}>
                { children }
            </ApolloProvider>
        </MyContext.Provider>
    )
}

export const useMyContext = () => useContext(MyContext);