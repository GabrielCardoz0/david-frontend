import styled from "styled-components";
import Colors from "../../assets/colors";
import { CheckInput, InputButton } from "../../componets/inputs";
import { useLocation, useNavigate } from "react-router-dom";
import SquareForm from "../../componets/squareForm";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import { useContext, useState, useEffect } from "react";
import { FormsContext } from "../../contexts/formsContext";

export default function FormsTermsConditionsPage() {
    const { formServices } = useContext(FormsContext);
    const [ termsAgree, setTermsAgree ] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(formServices.length < 1){
            return navigate(location.pathname.replace('/terms', ''));
        };

        const formIdentify = window.location.href.match(/forms\/(.*?)\//)[1];

    }, [formServices]);

    return(
        <FormDefaultContainer>
            <SquareForm border={true}>
                <h1 style={{ fontWeight: "600", fontSize:"18px" }}>Formulário personalizado</h1>
                <br/>
                <p style={{ fontSize:"12px" }}>Formulário para cadastro de planos personalizados com a empresa David & Companhia</p>
            </SquareForm>


            <SquareForm>
                <h1 style={{ fontSize:"14px" }}>Termos e condições de uso</h1>
                <br/>
                <p style={{ fontSize:"12px" }}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>

                <br/>
                
                <CheckInput label={"Eu concordo"} checked={termsAgree} onChange={() => setTermsAgree(!termsAgree)}/>
            </SquareForm>

            <InputButton text={"Continuar"} onClick={() => navigate(location.pathname.replace('terms', 'infos'))} disabled={!termsAgree}/>
        </FormDefaultContainer>
    );
};

