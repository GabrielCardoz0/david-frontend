import styled from "styled-components";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import SquareForm from "../../componets/squareForm";
import Colors from "../../assets/colors";
import { InputButton } from "../../componets/inputs";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FormsContext } from "../../contexts/formsContext";
import beautytagLogo from "../../assets/images/beautytag-logo.jpeg";

export default function FormsClientInfosPage(params) {
    const { usersInfos, setUsersInfos } = useContext(FormsContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleChangeInput(e) {
        e.preventDefault();
        const {name, value} = e.target;
        
        setUsersInfos({
            ...usersInfos,
            [name]: value
        });
    }

    return(
        <FormDefaultContainer>
            <SquareForm border={true}>

                <div style={{ display: "flex" }}>
                    <img src={beautytagLogo} alt="" style={{ width: "20px", marginRight: "10px", height: "auto", objectFit: "cover" }}/>
                    <h1 style={{ fontWeight: "600", fontSize:"18px" }}>Formulário personalizado</h1>
                </div>                <br/>
                {/*<p style={{ fontSize:"12px" }}>Preencha as informações para prosseguir</p>*/}
                <p style={{ fontSize:"12px" }}>Cadastro de informações pessoais.</p>
            </SquareForm>

            <form onSubmit={() => navigate(location.pathname.replace('infos', 'services'))}>
                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>Nome</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Digite seu nome completo</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.name} id="name" name="name" />
                </SquareForm>

                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>Email</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Digite seu email</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.email} id="email" name="email" type="email"/>
                </SquareForm>

                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>CPF</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Digite seu CPF</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.cpf.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')} id="cpf" name="cpf" mask="999.999.999-99" maxLength={14}/>
                </SquareForm>
                
                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>Gênero</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Selecione</p>
                    <div className="spaceText"></div>
                    <select style={{ width: "150px", height: "30px" }} required onChange={e => handleChangeInput(e)} id="genre" name="genre" value={usersInfos.genre}>
                        <option value="unissex">Unissex</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>
                </SquareForm>

                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>Empresa</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Empresa que trabalha</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.company} id="company" name="company"/>
                </SquareForm>

                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>Whatsapp</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Número de whatsapp para contato</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} type={"tel"} mask="(99) 99999-9999" placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.whatsapp.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')} id="whatsapp" name="whatsapp" maxLength={15}/>
                </SquareForm>

                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>Data de nascimento</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Digite sua data de nascimento</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.birthday} id="birthday" name="birthday" type="date"/>
                </SquareForm>

                <SquareForm>
                    <h1 style={{ fontWeight: "600", fontSize:"14px" }}>CEP</h1>
                    <div className="spaceText"></div>
                    <p style={{ fontSize:"12px" }}>Digite o seu CEP</p>
                    <div className="spaceText"></div>
                    <div className="spaceText"></div>
                    <FormTextInput required={true} placeholder="Digite aqui" onChange={e => handleChangeInput(e)} value={usersInfos.cep.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2')} id="cep" name="cep" mask="99999-999" maxLength={9}/>
                </SquareForm>

                <InputButton text={"Continuar"} />
            </form>


        </FormDefaultContainer>
    );
};

const FormTextInput = styled.input`
    width: 100%;
    border: none;
    border-bottom: 2px solid ${Colors.d};
    height: 24px;
    &:focus{
        border: none;
        border-bottom: 2px solid ${Colors.a};
        outline: none;
    }
`;