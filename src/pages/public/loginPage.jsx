import styled from "styled-components";
import baseColors from "../../assets/colors.js";
import loginImage from "../../assets/images/undraw_undraw_undraw_undraw_undraw_walking_together_7ulo_m7i2_l2pa_rcwe_-1-_apsm 1.png";
import { InputButton, TxtInput } from "../../componets/inputs/index.jsx";
import { useContext, useEffect, useState } from "react";
import { LoginApi } from "../../services/loginApi.js";
import { UsersContext } from "../../contexts/userContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Login = () => {
    const { setuserInfos, setToken, verifyToken, token } = useContext(UsersContext);
    const [userLogin, setUserLogin] = useState('');
    const [userPass, setUserPass] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    /*
    */
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        
        if(localToken){
            const verify = verifyToken(token);
            const lastPath= location.state?.lastPath;
            if(verify) return navigate("/dashboard");
        };

    }, []);

    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const login = await LoginApi(userLogin, userPass);
            
            if(login.success){
                setToken(login.data.token);

                localStorage.setItem('token', login.data.token);
                
                setuserInfos(login.data.user);
                
                return navigate("/dashboard");
            } else {
                return toast.error("Erro ao fazer login.");
            };
        } catch (error) {
            toast.error("erro ao realizar login.");
        };
    };

    return(
        <LoginPage>
                <div className="leftSide">
                    <img src={loginImage} alt=""/>
            </div>

            <form className="rightSide" onSubmit={handleLogin}>
                <TxtInput label={"Login"} placeholder={"Digite seu login"} required={true} onChange={e => setUserLogin(e.target.value)}/>

                <TxtInput label={"Senha"} placeholder={"Digite sua senha"} isPassword={true} required={true} onChange={e => setUserPass(e.target.value)}/>

                <InputButton text={"LOGIN"}/>
            </form>
        </LoginPage>
    );
};

const LoginPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;

    .leftSide, .rightSide {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .rightSide {
        background-color: ${baseColors.b};
        flex-direction: column;
        gap: 40px;
    }

`;