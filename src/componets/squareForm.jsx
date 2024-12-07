import styled from "styled-components";
import Colors from "../assets/colors";

export default function SquareForm({border, children}) {
    return(
        <SquareContainer border={`${border}` || "false"}>
            {children}
        </SquareContainer>
    );
};

const SquareContainer = styled.div`
    width: 100%;
    padding: 10px 18px;
    background-color: #FFF;
    border-radius: 3px;
    border-top: ${({border}) => border == "true" ? `4px solid ${Colors.a}` : ""};
    margin-bottom: 20px;
    position: relative;

    .spaceText{
        height: 5px;
    }
`;
