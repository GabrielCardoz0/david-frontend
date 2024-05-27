import styled from "styled-components";
import { Sidebar } from "../../componets/sidebar";
import Colors from "../../assets/colors";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BiExit } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../../contexts/userContext";
import { ConfirmModal } from "../../componets/defaultModal";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";


export const Layout = () => {
    const { token, verifyToken } = useContext(UsersContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showExitModal, setShowExitModal] = useState(false);

    /*
    useEffect(() => {
        if(token){
            const verify = verifyToken(token);
            
            if(!verify) return navigate("/login");
        } else {
            return navigate("/login", { state: { lastPath: location.pathname }});
        }
    }, [location.pathname, token]);
    */
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    console.log("1");

    return(
        <LayoutContainer>
            <div className="container">
                <Sidebar/>
                <div className="topbarOutletContainer">
                    {showExitModal && <ConfirmModal message={"Deseja sair?"} onClose={() => setShowExitModal(false)}  onConfirm={() => handleLogout()}/>}
                    <div className="topbar">
                        <img src={beautytagLogo} alt="" style={{ width: "50px", height:"auto", marginRight: "10px" }}/>
                        <span>Painel adminstrativo</span>
                        <BiExit className="exitIcon" onClick={() => setShowExitModal(true)}/>
                    </div>
                    <div className="outletContainer">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </LayoutContainer>
    );
}

const LayoutContainer = styled.div`
    width: 100%;
    height: 100vh;
    
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        max-width: 100%;
        max-height: 100%;
    }

    .topbarOutletContainer {
        width: 100%;
        height: 100%;
    }

    .topbar {
        background-color: ${Colors.wht};
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        position: relative;

        .exitIcon {
            position: absolute;
            right: 20px;
            font-size: 30px;
            cursor: pointer;

            &:hover {
                color: red;
            }

        }
    }

    .outletContainer {
        background-color: ${Colors.d};
        width: 100%;
        height: calc(100% - 70px);
        padding: 20px;
        box-sizing: border-box;
    }

`;