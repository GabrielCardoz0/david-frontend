import styled from "styled-components";
import { InputButton } from "../../componets/inputs";
import { useLocation, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/undraw_undraw_undraw_undraw_undraw_walking_together_7ulo_m7i2_l2pa_rcwe_-1-_apsm 1.png";
import { useContext, useEffect, useState } from "react";
import { FormsContext } from "../../contexts/formsContext";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";
import { AiOutlineClose } from "react-icons/ai";


export default function FormsWelcomePage(params) {

    const navigate = useNavigate();
    const location = useLocation();

    const [showVideo, setShowVideo] = useState({ show: false, count: 0 });

    const { formServices, getFormServices } = useContext(FormsContext);

    useEffect(() => {
        getFormServices(location.pathname.replace("/forms/", ""))
    }, []);

    const handleNavigate = () => {
        // navigate(location.pathname+"/terms");
        setShowVideo({ show: true, count: showVideo.count });
    }

    const videoId = "LM6s8a8Lcj0";

    return(
        <WelcomePageContainer>
            {showVideo.show &&
            <div style={{ position: "fixed", top: "0", backgroundColor: "rgb(0,0,0,0.5)", width: "100%", height: "100%", zIndex: 1, display: "flex", justifyContent:"center", alignItems: "center", padding: "15px"}}>
                {/* <video src="https://www.youtube.com/watch?v=LM6s8a8Lcj0" width={"20%"}></video> */}
                <div style={{ backgroundColor: "#FFF", width: "100%", height: "60%", justifyContent: "center", padding: "30px 10px", borderRadius: "5px", position: "relative", display: "flex", alignItems: "center", flexDirection: "column"}}>
                    <span>Assista o vídeo abaixo:</span>
                    <div style={{ height: "30px" }}></div>

                    <iframe
                        style={{ width: "100%", height: "56%" }}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video"
                    ></iframe>

                    <div style={{ height: "30px" }}></div>

                    <InputButton text={"Acessar"} onClick={() => navigate(location.pathname+"/terms")} disabled={formServices.length < 0}/>
                    <AiOutlineClose style={{ position: "absolute", top: 5, right: 5 }} onClick={() => setShowVideo({ show: false, count: showVideo.count+1})}/>
                </div>
            </div>}

            <div className="maxWidth" style={{ position: "relative" }}>
                <div>
                    <h1 className="welcomeSpan">Bem-vindo, colaborador!</h1>
                    <span style={{ lineHeight: "1.5" }}>Cadastre-se e descubra descontos exclusivos em estética e bem-estar, especialmente para você.</span>
                </div>
                <img className="welcomeImage" src={beautytagLogo} alt=""/>
                <InputButton text={"Cadastre-se"} onClick={handleNavigate} disabled={formServices.length < 0}/>
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
