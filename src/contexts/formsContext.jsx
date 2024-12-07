import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetServicesFormByIdentify } from "../services/formsApi";

export const FormsContext = createContext();

export const FormsContextProvider = ({ children }) => {
    const [formServices, setFormServices] = useState([]);
    const [ usersInfos, setUsersInfos ] = useState({
        name: "",
        email: "",
        cpf: "",
        company: "",
        whatsapp: "",
        cep: "",
        birthday: "",
        genre: "unissex",
    });

    async function getFormServices(identify) {
        try {
            const res = await GetServicesFormByIdentify(identify);

            if(res.success){
                setFormServices(res.data.form_services);
            } else {
                toast.error("Erro ao buscar serviços.");
            }
        } catch (error) {
            toast.error("Erro ao buscar serviços.");
        }
    };

    return (
        <FormsContext.Provider
            value={{
                formServices,
                setFormServices: value => setFormServices(value),
                getFormServices: value => getFormServices(value),
                usersInfos,
                setUsersInfos: value => setUsersInfos(value),
            }}
        >
            {children}
        </FormsContext.Provider>
    );
}