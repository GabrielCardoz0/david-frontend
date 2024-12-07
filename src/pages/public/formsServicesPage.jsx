import { useLocation, useNavigate } from "react-router-dom";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import { CheckInput, InputButton } from "../../componets/inputs";
import SquareForm from "../../componets/squareForm";
import { useContext, useEffect, useState } from "react";
import { FormsContext } from "../../contexts/formsContext";
import { convertToMoney } from "../../utils";
import { toast } from "react-toastify";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";
import { DefaultModalContainer } from "../../componets/defaultModal/styles";
import { AiOutlineClose, AiFillInfoCircle } from "react-icons/ai";


export default function FormsServicesPage(params) {
    const { formServices, getFormServices, setFormServices, usersInfos } = useContext(FormsContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [ showMoreInfo, setShowMoreInfo ] = useState({ visible: false, description: "" });

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
                <h1 style={{ fontWeight: "600", fontSize:"18px" }}>Cadastro do colaborador</h1>
            </div>
            <br/>
            {/*<p style={{ fontSize:"12px" }}>Preencha as informações para prosseguir</p>*/}
            <p style={{ fontSize:"12px" }}>Selecione a frequência de cada serviço que deseja adicionar ao pacote.</p>
        </SquareForm>

        {
            formServices.map(({services}, i) => {
                return(
                    <SquareForm key={services.id}>
                        {showMoreInfo.visible && <DefaultModalContainer>
                            <div style={{ backgroundColor: "#FFF", width: "70%", padding: "10px 5px 10px 5px", minHeight: "150px", borderRadius: "5px", position: "relative" }}>
                                <p style={{ marginBottom: "5px", fontWeight: "600", fontSize:"14px" }}>Descrição do serviço</p>
                                <p style={{ fontSize:"14px" }}>{showMoreInfo.description}</p>
                                <AiOutlineClose className="closeButton" onClick={() => setShowMoreInfo({ visible: false, description: "" })}/>
                            </div>
                        </DefaultModalContainer>}

                        <h1 style={{ fontWeight: "600", fontSize:"14px" }}>{services.name}</h1>
                        <div className="spaceText"></div>
                        <div className="spaceText"></div>
                        {
                            services.frequencies.map(fr => {
                                return (<CheckInput checked={!!fr.selected} key={fr.id} label={`${fr.frequency} - ${convertToMoney(services.colaborator_value * fr.value)}`} onChange={() => handleSelectFrequency(services.id, fr.id, !fr.selected)}/>);
                            })
                        }
                        {services.description !== "" && <AiFillInfoCircle style={{ position: "absolute", right: 5, top: 5, color: "orange" }} onClick={() => setShowMoreInfo({ visible: true, description: services.description })}/>}
                    </SquareForm>
                );
            })
        }

        <InputButton text={"Continuar"} onClick={() => navigate(location.pathname.replace('services', 'submit'))} disabled={!haveSelectedServices}/>

    </FormDefaultContainer>
    );
};
