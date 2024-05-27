import { useLocation, useNavigate } from "react-router-dom";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import { CheckInput, InputButton } from "../../componets/inputs";
import SquareForm from "../../componets/squareForm";
import { useContext, useEffect } from "react";
import { FormsContext } from "../../contexts/formsContext";
import { convertToMoney } from "../../utils";
import { toast } from "react-toastify";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";

export default function FormsServicesPage(params) {
    const { formServices, getFormServices, setFormServices, usersInfos } = useContext(FormsContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleSelectFrequency(serviceId, frequencyId, value) {
        const servicesWithSelectedFrequencies = formServices.map(service => {
            if(service.services.id === serviceId){

                const selectedFrequencie = service.services.frequencies.map(fr => {
                    if(fr.id === frequencyId) return { ...fr, selected: !!value };
                    return { ...fr, selected: false };
                });

                service.services.frequencies = selectedFrequencie

                return service;
            } else {
                return service;
            }
        });

        setFormServices(servicesWithSelectedFrequencies);
    };

    const haveSelectedServices = formServices.filter(({services}) => services.frequencies.filter(fr => !!fr.selected).length > 0).length > 0;
    
    function verifyColabInfos() {
        const {
            name,
            email,
            cpf,
            company,
            whatsapp,
            cep,
            birthday,
            genre,
        } = usersInfos;
        if(!name || !email || !cpf || !company || !whatsapp || !cep || !birthday || !genre){
            toast.warning("Preencha as informações pessoais para prosseguir.");
            const local = location.pathname.replace("services", "infos");
            navigate(local);
        };
    }

    useEffect(() => {
        if(formServices.length < 1){
            const formIdentify = location.pathname.replace("/forms/", "").replace("/services", "");
            getFormServices(formIdentify);
            navigate("");
        };
        
    }, [formServices]);


    useEffect(() => {
        verifyColabInfos();
    }, []);


    return(
    <FormDefaultContainer>

        <SquareForm border={true}>

            <div style={{ display: "flex" }}>
                <img src={beautytagLogo} alt="" style={{ width: "20px", marginRight: "10px", height: "auto", objectFit: "cover" }}/>
                <h1 style={{ fontWeight: "600", fontSize:"18px" }}>Formulário personalizado</h1>
            </div>
            <br/>
            {/*<p style={{ fontSize:"12px" }}>Preencha as informações para prosseguir</p>*/}
            <p style={{ fontSize:"12px" }}>Selecione a frequência de cada serviço que deseja adicionar ao pacote.</p>
        </SquareForm>

        {
            formServices.map(({services}, i) => {
                /*
                {
    "id": 43,
    "form_id": 21,
    "service_id": 27,
    "services": {
        "id": 27,
        "name": "Escova e Prancha",
        "base_price": 50,
        "colaborator_percent": 20,
        "colaborator_value": 40,
        "repass_percent": 25,
        "repass_value": 8,
        "profit": 32,
        "genre": "feminino",
        "created_at": "2024-02-19T00:00:00.000Z",
        "updated_at": "2024-02-19T00:00:00.000Z",
        "frequencies": [
            {
                "id": 43,
                "frequency": "1x por mês",
                "service_id": 27,
                "created_at": "2024-02-19T00:00:00.000Z",
                "updated_at": "2024-02-19T00:00:00.000Z",
                "value": 1
            },
            {
                "id": 44,
                "frequency": " 2x por mês",
                "service_id": 27,
                "created_at": "2024-02-19T00:00:00.000Z",
                "updated_at": "2024-02-19T00:00:00.000Z",
                "value": 2
            }
        ]
    }
}
                */
                return(
                    <SquareForm key={services.id}>
                        <h1 style={{ fontWeight: "600", fontSize:"14px" }}>{services.name}</h1>
                        <div className="spaceText"></div>
                        <div className="spaceText"></div>
                        {
                            services.frequencies.map(fr => {
                                return (<CheckInput checked={!!fr.selected} key={fr.id} label={`${fr.frequency} - ${convertToMoney(services.colaborator_value * fr.value)}`} onChange={() => handleSelectFrequency(services.id, fr.id, !fr.selected)}/>);
                            })
                        }
                    </SquareForm>
                );
            })
        }

        <InputButton text={"Continuar"} onClick={() => navigate(location.pathname.replace('services', 'submit'))} disabled={!haveSelectedServices}/>

    </FormDefaultContainer>
    );
};
