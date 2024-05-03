import styled from "styled-components";
import Colors from "../../assets/colors";

export const TxtInputContainer = styled.div`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    
    .inputTxtLabel {
        margin-bottom: 5px;
        color: ${Colors.c};
        font-size: 20px;
        font-weight: 600;
    }
    
    input {
        font-size: 20px;
        border-radius: 5px;
        height: 40px;
        width: 300px;
        padding: 0 10px;
        border: none;
        border: 2px solid rgba(0,0,0,0);
        outline: none;

        &::placeholder {
            color: ${Colors.c};
        }

        &:focus{
            color: ${Colors.blk};
            border: 2px solid ${Colors.a};
        }
    }
`;

export const InputButtonContainer = styled.button`
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: ${Colors.a};
    padding: 15px 35px;
    border-radius: 5px;
    color: ${Colors.e};
    font-weight: 700;
    cursor: pointer;
    height: 40px;
    opacity: ${({disabled}) => disabled ? 0.2 : 1};
    
    &:hover {
        opacity: 0.7;
    }
`;

export const SearchInputContainer = styled.div`
    width: 450px;
    height: 40px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

    input {
        width: 100%;
        height: 100%;
        border: none;
        font-size: 18px;
        outline: none;

        &:focus{
            color: ${Colors.blk};
        }
    }



`;

export const SelectInputContainer = styled.div`

.inputTxtLabel {
        margin-bottom: 5px;
        color: ${Colors.c};
        font-size: 20px;
        font-weight: 600;
    }

select {
    background-color: ${Colors.wht};
    font-size: 20px;
    border-radius: 5px;
    height: 40px;
    width: 300px;
    padding: 0 10px;
    border: none;
    border: 2px solid rgba(0,0,0,0);
    outline: none;
}
`;