import styled from "styled-components";
import { InputButton } from "../../componets/inputs";
import { useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/undraw_undraw_undraw_undraw_undraw_walking_together_7ulo_m7i2_l2pa_rcwe_-1-_apsm 1.png";
import { useContext, useEffect } from "react";
import { FormsContext } from "../../contexts/formsContext";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";

export default function FormsWelcomePage(params) {

    const navigate = useNavigate();
    const location = useLocation();

    const { formServices, getFormServices } = useContext(FormsContext);

    useEffect(() => {
        getFormServices(location.pathname.replace("/forms/", ""))
    }, []);

    return(
        <WelcomePageContainer>
            <div className="maxWidth">
                <div>
                    <h1 className="welcomeSpan">Bem-vindo, colaborador!</h1>
                    <span style={{ lineHeight: "1.5" }}>Cadastre-se e descubra descontos exclusivos em estética e bem-estar, especialmente para você.</span>
                </div>
                <img className="welcomeImage" src={beautytagLogo} alt=""/>
                <InputButton text={"Cadastre-se"} onClick={() => navigate(location.pathname+"/terms")} disabled={formServices.length < 0}/>
            </div>
        </WelcomePageContainer>
    );
};

const WelcomePageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 40px 10px;
height: 100vh;

.welcomeImage {
    width: 100%;
}

.welcomeSpan {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
}

.image {
    width: 100%;
    height: 400px;
    background-color: red;
}

.maxWidth {
width: 100%;
max-width: 500px;
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
justify-content: space-between;

}
`;
