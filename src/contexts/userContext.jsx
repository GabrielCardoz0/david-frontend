import { createContext, useState } from "react";
import { api } from "../services/api";

export const UsersContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const [userInfos, setuserInfos] = useState({});


    const verifyToken = async (tokenToVerify) => {
        try {
            const { data } = await api.post(`/login/checktoken/${tokenToVerify}`);

            if(data === "OK"){
                setToken(tokenToVerify);
                localStorage.setItem('token', tokenToVerify);
            } else {
                setToken("");
                localStorage.clear();
            };
            return data === "OK";
        } catch {
            setToken("");
            localStorage.clear();
            return false;
        }
    };

    useState(() => {

        const localToken = localStorage.getItem('token');

        if(localToken){
            verifyToken(localToken);
        };

    }, []);

    return (
        <UsersContext.Provider
            value={{
                token,
                setToken: value => setToken(value),
                userInfos,
                setuserInfos: value => setuserInfos(value),
                verifyToken,
            }}
        >
            {children}
        </UsersContext.Provider>
    );
}