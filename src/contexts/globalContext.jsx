import { createContext, useEffect, useState } from "react";
import { GetNewColabs } from "../services/colabsApi";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [newColaborators, setNewColaborators] = useState('');


    useEffect(() => {
        const getNewColabs = async () => {
            try {
                const res = await GetNewColabs();
                
                if(res.success){
                    setNewColaborators(res.data.colaborators);
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        getNewColabs();
    
        const intervalId = setInterval(getNewColabs, (60 * 1 * 1000));
        return () => clearInterval(intervalId);
    }, []); 

    return (
        <GlobalContext.Provider
            value={{
                newColaborators,
                setNewColaborators: value => setNewColaborators(value),
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
