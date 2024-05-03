import { AiOutlineClose } from "react-icons/ai";
import { ConfirmationModalContainer } from "./style";
import { InputButton } from "../inputs";

export default function ConfirmModal({ title, message, onConfirm, onClose }) {
    return(
        <ConfirmationModalContainer>
            <div className="modal">

                <div className="modalTitle">{title || "Deseja continuar?"}</div>
                <span>{message || ""}</span>
                <AiOutlineClose className="closeButton" onClick={onClose}/>


                <div className="formButtons" style={{ display: "flex" }}>
                    <span onClick={onClose} style={{ cursor: "pointer", padding: "15px 35px" }}>Cancelar</span>
                    
                    <InputButton text={"CONFIRMAR"} onClick={onConfirm}/>
                </div>
            </div>
            
        </ConfirmationModalContainer>
    );
};
