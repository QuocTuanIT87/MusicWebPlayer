import { createContext, useState } from 'react';

export const authContext = createContext();

function AuthProvider({ children }) {
    const [token, setToken] = useState();

    const value = {
        token,
        setToken,
    };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
