import styled from "styled-components";
import Colors from "../../assets/colors";
import { CheckInput, InputButton } from "../../componets/inputs";
import { useLocation, useNavigate } from "react-router-dom";
import SquareForm from "../../componets/squareForm";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import { useContext, useState, useEffect } from "react";
import { FormsContext } from "../../contexts/formsContext";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";
import { toast } from "react-toastify";

export default function FormsTermsConditionsPage() {
    const { formServices } = useContext(FormsContext);
    const [ termsAgree, setTermsAgree ] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(formServices.length < 1){
            toast.error("Erro ao carregar os serviços, este formulário foi deletado ou está sem serviços.");
            return navigate(location.pathname.replace('/terms', ''));
        };

        const formIdentify = window.location.href.match(/forms\/(.*?)\//)[1];

    }, [formServices]);

    return(
        <FormDefaultContainer>
            <SquareForm border={true}>
                <div style={{ display: "flex" }}>
                    <img src={beautytagLogo} alt="" style={{ width: "20px", marginRight: "10px", height: "auto", objectFit: "cover" }}/>
                    <h1 style={{ fontWeight: "600", fontSize:"18px" }}>Cadastro do colaborador</h1>
                </div>
                <br/>
                    <p style={{ fontSize:"12px" }}>Formulário para cadastro de planos personalizados com a Beauty TAG ®</p>
            </SquareForm>


            <SquareForm>
                <h1 style={{ fontSize:"14px" }}>Termos e condições de uso</h1>
                <br/>
                
                <p style={{ fontSize: "12px", textAlign: "justify" }}>
                    Este formulário é um serviço oferecido pela empresa Beautytag®.
                    Ao preencher este formulário, você concorda com os termos e condições
                    de uso da empresa, concordando em disponibilizar seus dados
                    pessoais para fins de marketing e comunicação, de acordo com a legislação vigente.
                </p>

                <br/>

                <ul style={{ fontSize: "12px", textAlign: "justify" }}>
                    <li>Ao utilizar esta ferramenta, você concorda em disponibilizar seus dados pessoais para a empresa Beautytag ®.</li>
                    <br/>
                    <li>A empresa poderá utilizar esses dados para fins de marketing e comunicação, de acordo com a legislação vigente.</li>
                    <br/>
                    <li>A empresa se compromete a proteger e manter a confidencialidade dos seus dados pessoais.</li>
                    <br/>
                    <li>Você pode solicitar a exclusão dos seus dados a qualquer momento, entrando em contato com a empresa.</li>
                </ul>

                <br/>
                
                <CheckInput label={"Eu concordo"} checked={termsAgree} onChange={() => setTermsAgree(!termsAgree)}/>
            </SquareForm>

            <InputButton text={"Continuar"} onClick={() => navigate(location.pathname.replace('terms', 'infos'))} disabled={!termsAgree}/>
        </FormDefaultContainer>
    );
};

