import styled from "styled-components";
import Colors from "../../assets/colors";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/globalContext";
import { toast } from "react-toastify";

const routes = [
    {path: "/dashboard", name: "Dashboard"},
    {path: "/services", name: "Serviços"},
    {path: "/colaborators", name: "Colaboradores"},
    {path: "/forms", name: "Formulários"},
]

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { newColaborators } = useContext(GlobalContext);
    const [ selectedPage, setSelectedPage ] = useState(location.pathname);
    
    const handleChangePage = (value, path) => {
        if(path === selectedPage) return;
        setSelectedPage(path);
        return navigate(path);
    }

    const handleDownloadBackup = async () => {
        try {
            window.open(process.env.REACT_APP_API_URL + "/backup", "_blank");
            
        } catch (error) {
            toast.error("Erro ao baixar backup, tente novamente mais tarde.");
        }
    };

    return(
        <SidebarContainer>
            {routes.map((route, index) => ( 
                <SidebarRouteOption selected={selectedPage === route.path} key={index} className="route" onClick={() => handleChangePage(route.name, route.path)}>
                    {route.name === "Colaboradores" &&
                    <p
                    style={{ fontSize: "10px", borderRadius: "50%", padding: "3px", position: "absolute", right: "15px", top: "-5px"}}
                    >{newColaborators.length}</p>}

                    <span>{route.name}</span>
                </SidebarRouteOption>
            ))}

            <DownloadBackupButton onClick={handleDownloadBackup}>
                <span>Baixar backup</span>
            </DownloadBackupButton>


            {/*<br></br>

            <span style={{ color: "white", display: "flex", justifyContent: "center", width: "100%", fontWeight: "bold" }}>Area chat bot</span>

            <SidebarRouteOption selected={selectedPage === "/chat/partners"} onClick={() => handleChangePage("Chatbot", "/chat/partners")}>
              <span>Parceiros</span>
            </SidebarRouteOption>*/}

            <SidebarRouteOption selected={selectedPage === "/chat/checkins"} onClick={() => handleChangePage("Chatbot", "/chat/checkins")}>
              <span>Check-ins</span>
            </SidebarRouteOption>
            
        </SidebarContainer>
    );
}

const DownloadBackupButton = styled.div`
    font-weight: 600;
    font-size: 16px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    color: ${({selected}) => selected ? Colors.a : Colors.c };
    position: relative;
    
    span {
        cursor: pointer;    
        &:hover{
            opacity: 0.4;
        }
    }
`;

const SidebarContainer = styled.div`
    width: 180px;
    background-color: ${Colors.b};
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

`;

const SidebarRouteOption = styled.div`
    font-weight: 600;
    font-size: 16px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    color: ${({selected}) => selected ? Colors.a : Colors.c };
    position: relative;

    p {
        ${({selected}) => selected ? Colors.a : "#FFF" };
    }
    
    span {
        cursor: pointer;    
        &:hover{
            opacity: 0.4;
        }
    }
`;