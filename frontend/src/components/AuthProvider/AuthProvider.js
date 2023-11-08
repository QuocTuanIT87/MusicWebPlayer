import { createContext, useEffect, useState } from 'react';
import { GetCurrentUser } from '../../service/Auth/GetCurrentUser';

export const authContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await GetCurrentUser();
            if (result) {
                setUser(result.data.user);
            }
        };
        fetchAPI();
    }, [logged]);

    const value = {
        user,
        setUser,
        setLogged,
    };

    return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthProvider;
