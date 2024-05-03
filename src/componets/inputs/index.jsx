import Colors from "../../assets/colors";
import { InputButtonContainer, SearchInputContainer, SelectInputContainer, TxtInputContainer } from "./styles";
import { FaSearch } from "react-icons/fa";


export const TxtInput = ({ label, placeholder, isPassword, required, style, inputStyle, labelStyle, ...rest }) => {
    return(
        <TxtInputContainer style={style}>
            <p className="inputTxtLabel" style={labelStyle}>{label || ""}</p>
            <input {...rest} style={inputStyle} type={isPassword ? "password" : "text"} placeholder={placeholder || "digite aqui"} required={required || false}/>
        </TxtInputContainer>
    )
}

export const InputButton = ({ text, onClick, style, disabled }) => {
    return(
        <InputButtonContainer disabled={disabled} style={style} onClick={onClick}>{text || "CLIQUE AQUI"}</InputButtonContainer>
    )
}

export const SearchInput = ({ onChange }) => {
    return(
        <SearchInputContainer>
            <input type={"text"} placeholder="digite aqui" onChange={onChange}/>
            <FaSearch size={20} color={Colors.a} />
        </SearchInputContainer>
    );
}

export const SelectInput = ({label, required, inputStyle, labelStyle, ...rest}) => {
    return(
        <SelectInputContainer>
            <p className="inputTxtLabel" style={labelStyle}>{label || "Selecione"}</p>
            <select
            style={inputStyle}
            required={required || false}
            {...rest}>
                <option value="">Selecione</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Unissex</option>
            </select>
        </SelectInputContainer>
    );
}

export const CheckInput = ({ label, ...rest }) => {
    return(
        <div style={{display: "flex", alignItems: "center", fontSize: "13px"}}>
            <input style={{ height:"14px", width: "14px" }} type={"checkbox"} {...rest} />
            <span>{label || ""}</span>
        </div>
    );
}