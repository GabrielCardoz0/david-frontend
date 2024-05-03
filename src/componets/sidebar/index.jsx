import styled from "styled-components";
import Colors from "../../assets/colors";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/globalContext";

const routes = [
    {path: "/home/dashboard", name: "Dashboard"},
    {path: "/home/services", name: "Serviços"},
    {path: "/home/colaborators", name: "Colaboradores"},
    {path: "/home/forms", name: "Formulários"},
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
        </SidebarContainer>
    );
}

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