import styled from "styled-components";
import Colors from "../../assets/colors";

export const DefaultModalContainer = styled.div`
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
    width: 900px;
    height: 600px;
    position: fixed;
    z-index: 11;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

}

.modalTitle {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
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

.newServiceFormGrid {
    display: grid;
    gap: 20px 50px;
    grid-template-columns: 1fr 1fr;
}

.newServiceForm {
    gap: 10px;
}

.calcs {
    height: 100px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
}

.formButtons {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 30px;
    height: 60px;
    width: 100%;    
}

.newForm {
height: 100%;
width: 100%;
max-height: 100%;
display: flex;

.formSide {
    padding: 0 10px;
    width: 100%;
}

.leftSide {
    height: 100%;
    max-height: 350px;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
}

.box {
    height: 60px;
}

.formServiceItem {
    height: 50px;
    cursor: pointer;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 1px solid rgba(0,0,0,0.0);
    border-radius: 3px;

    p{
        font-size: 14px;
    }

    &:hover {
        background-color: ${Colors.d};
    }
}


.selected {
    border-left: 3px solid rgba(0,255,0,0.5);
}

}

`;
