import { useContext, useEffect, useMemo, useState } from "react";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import { CheckInput, InputButton } from "../../componets/inputs";
import SquareForm from "../../componets/squareForm";
import { FormsContext } from "../../contexts/formsContext";
import { convertToMoney } from "../../utils";
import { toast } from "react-toastify";
import { SubmitColaboratorPlan } from "../../services/formsApi";
import { useLocation, useNavigate } from "react-router-dom";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";

export default function FormsSubmitPage(params) {
    const { formServices, usersInfos } = useContext(FormsContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedServices, setSelectedServices] = useState(formServices.filter(({services}) => services.frequencies.filter(fr => !!fr.selected).length > 0) ?? []);

    // const selectedServices = formServices.filter(({services}) => services.frequencies.filter(fr => !!fr.selected).length > 0);

    
    const totalValue = useMemo(() => {
        let total = 0;
        const t = selectedServices.forEach(({services}) => services.frequencies.map(fr => !!fr.selected ? total = total + (services.colaborator_value * fr.value) : null )?.length > 0)?.length > 0;
        return total ?? 0
    }, [selectedServices]);

    // const t = formServices.map(({services}) => services.frequencies.map(fr => !!fr.selected ? totalValue = totalValue + (services.colaborator_value * fr.value) : null ).length > 0).length > 0;


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
            return navigate(location.pathname.replace("submit", "infos"));
        };
    };

    function verifyColabServices() {
        if(selectedServices.length < 1){
            return navigate(location.pathname.replace("submit", "infos"));
        }
    };

    useEffect(() => {
        verifyColabInfos();
        verifyColabServices();
    }, []);



    const handleSubmit = async () => {
        try {
            const identify = location.pathname.split("/")[2];

            const res = await SubmitColaboratorPlan(identify,usersInfos,selectedServices);

            if(res.success){
                toast.success("Plano enviado com sucesso!.");
                navigate(location.pathname.replace("/submit", ""));
            } else {
                toast.error("Não foi possível enviar seu plano. Por favor tente novamente mais tarde 02.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Não foi possível enviar seu plano. Por favor tente novamente mais tarde.");
        }
    }

    const handleDeleteSelectedService = (serviceId) => {
        const newServices = selectedServices.filter(({services}) => services.id !== serviceId);
        setSelectedServices(newServices);
    }


    return(
        <FormDefaultContainer>
            <SquareForm border={true}>
                <div style={{ display: "flex" }}>
                    <img src={beautytagLogo} alt="" style={{ width: "20px", marginRight: "10px", height: "auto", objectFit: "cover" }}/>
                    <h1 style={{ fontWeight: "600", fontSize:"18px" }}>Cadastro do colaborador</h1>
                </div>
                <br/>
                {/*<p style={{ fontSize:"12px" }}>Preencha as informações para prosseguir</p>*/}
                <p style={{ fontSize:"12px" }}>Confirme os serviços selecionados</p>
            </SquareForm>

            {selectedServices.map(({services}) => {
                return(
                    <SquareForm key={services.id}>
                        <h1 style={{ fontWeight: "600", fontSize:"14px" }}>{services.name}</h1>
                        <div className="spaceText"></div>
                        <p style={{ fontSize:"12px" }}>Frequência selecionada:</p>
                        <div className="spaceText"></div>
                        <div className="spaceText"></div>
                        <CheckInput label={`${services.frequencies.filter(fr => !!fr.selected)[0].frequency} - ${convertToMoney(services.frequencies.filter(fr => !!fr.selected)[0].value * services.colaborator_value)} `} defaultChecked={true} onClick={() => handleDeleteSelectedService(services.id)}/>
                    </SquareForm>
                );
            })}

            <SquareForm>
                Valor total do plano: {" "}
                <span> {convertToMoney(totalValue)}</span>
            </SquareForm>


            <InputButton text={"Enviar"} onClick={() => handleSubmit()}/>


        </FormDefaultContainer>
    );
};
