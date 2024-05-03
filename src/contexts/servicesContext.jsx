import { createContext, useEffect, useState } from "react";
import { GetServices } from "../services/serviceApi";

export const ServicesContext = createContext();

export const ServicesContextProvider = ({ children }) => {
    const [services, setServices] = useState([]);
    const [pages, setPages] = useState(1);

    const getServices = async (page, limit, search) => {
        try {
            const res = await GetServices(page, limit || "", search);

            if(res.success){
                setServices(res.data.services);
                setPages(res.data.pages);
            } else {
                alert("Erro no get")
            }
        } catch (error) {
            console.log("Erro no try catch");
        }
    }

    useEffect(() => {
        getServices();
    }, []);

    return (
        <ServicesContext.Provider
            value={{
                services,
                setServices: value => setServices(value),
                pages,
                setPages: value => setPages(value),
                getServices
            }}
        >
            {children}
        </ServicesContext.Provider>
    );
}