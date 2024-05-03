import styled from "styled-components";
import Colors from "../../assets/colors";

export const BaseLayout = ({ children }) => {
    return(
        <BaseLayoutContainer>
        {children}
        </BaseLayoutContainer>
    );
}

export const BaseLayoutContainer = styled.div`
background-color: ${Colors.wht};
width: 100%;
height: 100%;
padding: 20px;
border-radius: 5px;
`;