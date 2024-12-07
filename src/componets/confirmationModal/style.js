import styled from "styled-components";
import Colors from "../../assets/colors";

export const ConfirmationModalContainer = styled.div`
position: fixed;
left: 0;
top: 0;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 10;


.modal {
    background-color: ${Colors.wht};
    opacity: 1;
    width: 600px;
    position: fixed;
    z-index: 11;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

}

.modalTitle {
    font-size: 20px;
    font-weight: 600;
}

.closeButton {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    &:hover {
        color: red;
    }
}
`;