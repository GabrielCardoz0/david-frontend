import styled from "styled-components";
import Colors from "../../assets/colors";
import { BaseLayoutContainer } from "../../componets/baseLayout";
import { SearchInput } from "../../componets/inputs";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useContext, useState } from "react";
import { CompleteColaboratorModal, ConfirmModal } from "../../componets/defaultModal";
import { GlobalContext } from "../../contexts/globalContext";
import { toast } from "react-toastify";
import { ConfirmNewColab, DeniedNewColabs } from "../../services/colabsApi";
import { convertToMoney } from "../../utils";


function calculatePlanValue(services) {
    let total = 0;

    services.map(service => total = total + (service?.frequencies.value * service?.frequencies?.services?.colaborator_value));

    return convertToMoney(total);
}

export const Colaborators = () => {

    const [showCompleteColaboratorModal, setShowCompleteColaboratorModal ] = useState({
        open: false,
        colab: null,
    });
    const [showDeniedColaboratorModal, setShowDeniedColaboratorModal ] = useState({
        open: false,
        colaboratorId: null,
    });
    const { newColaborators } = useContext(GlobalContext);

    async function handleConfirmColaborator(e) {
        try {
            e.preventDefault();
            await ConfirmNewColab(showCompleteColaboratorModal.colab.id);

            toast.success("Novo colaborador confirmado com sucesso.");
        } catch (error) {
            toast.error("Não foi possível confirmar o colaborador.");
        } finally {
            setShowCompleteColaboratorModal({open: false, colaboratorId: null});
        }
    };

    async function handleDeniedColaborator() {
        try {            
            await DeniedNewColabs(showDeniedColaboratorModal.colaboratorId);

            toast.success("Colaborador negado com sucesso.");
        } catch (error) {
            toast.error("Não foi possível confirmar o colaborador.");
        } finally {
            setShowDeniedColaboratorModal({open: false, colaboratorId: null});
        }
    };


    return(
        <ColaboratorsContainer >

            {showCompleteColaboratorModal.open && <CompleteColaboratorModal onClose={() => setShowCompleteColaboratorModal({ open: false, colab: null })} onConfirm={handleConfirmColaborator} colab={showCompleteColaboratorModal.colab}/>}

            {showDeniedColaboratorModal.open && <ConfirmModal message={"Deseja negar o pacote desse colaborador?"} onClose={() => setShowDeniedColaboratorModal({open: false, colaboratorId: null})} onConfirm={handleDeniedColaborator}/>}

            {/* <div className="topInputs">
                <SearchInput/>
            </div> */}

            <div>
                <h1 className="pageName">Colaboradores</h1>
                <div className="bottomLine"></div>
            </div>

            {newColaborators.length > 0 ? <div className="content">
                <div className="item fields">
                    <span>Nome do colaborador</span>
                    <span>Formulário</span>
                    <span>Gênero</span>
                    <span>Serviços</span>
                    <span>Valor</span>
                    <span>Empresa</span>
                    <span className="actions">Ações</span>
                </div>
                {newColaborators.map((colab, i) => {
                    return (
                        <div className="item" key={colab.id}>
                            <span>{colab.name}</span>
                            <span>{colab.forms.name}</span>
                            <span>{colab.genre}</span>
                            <span>{colab.colaborator_services?.length}</span>
                            <span>{calculatePlanValue(colab.colaborator_services)}</span>
                            <span>{colab.company_name}</span>
                            <div className="actions">
                                <AiOutlineFileDone className="icon" size={20} onClick={() => setShowCompleteColaboratorModal({open:true, colab: colab})}/>
                                <FaRegTrashAlt className="icon" size={20} onClick={() => setShowDeniedColaboratorModal({ open: true, colaboratorId: colab.id })}/>
                            </div>
                        </div>
                    );
                })}
            </div> : <span>Não há novos registros por enquanto.</span>}

            {/* {
{
    "id": 5,
    "name": "gabriel",
    "cpf": "48471261812",
    "genre": "",
    "email": "gabriel@gmail.com",
    "tel": "1122345567",
    "birthday": "2024-04-08",
    "company_name": "top",
    "registered": false,
    "form_id": 21,
    "address_id": 10,
    "created_at": "2024-02-19T00:00:00.000Z",
    "updated_at": "2024-02-19T00:00:00.000Z",
    "addresses": {
        "id": 10,
        "cep": "06700-499",
        "street": "Rua Cabrália",
        "neighborhood": "Jardim Araruama",
        "city": "Cotia",
        "state": "SP",
        "number": "",
        "created_at": "2024-02-19T00:00:00.000Z",
        "updated_at": "2024-02-19T00:00:00.000Z"
    },
    "forms": {
        "id": 21,
        "name": "Formulário Geral",
        "identify": "b1b34bfb-e95b-49b9-bb6c-d7e82c58d7c5",
        "created_at": "2024-02-19T00:00:00.000Z",
        "updated_at": "2024-02-19T00:00:00.000Z"
    },
    "colaborator_services": [
        {
            "id": 8,
            "colaborator_id": 5,
            "service_id": 27,
            "frequency_id": 43,
            "frequencies": {
                "id": 43,
                "frequency": "1x por mês",
                "service_id": 27,
                "created_at": "2024-02-19T00:00:00.000Z",
                "updated_at": "2024-02-19T00:00:00.000Z",
                "value": 1,
                "services": {
                    "id": 27,
                    "name": "Escova e Prancha",
                    "base_price": 50,
                    "colaborator_percent": 20,
                    "colaborator_value": 40,
                    "repass_percent": 25,
                    "repass_value": 8,
                    "profit": 32,
                    "genre": "feminino",
                    "created_at": "2024-02-19T00:00:00.000Z",
                    "updated_at": "2024-02-19T00:00:00.000Z"
                }
            }
        },
        {
            "id": 9,
            "colaborator_id": 5,
            "service_id": 26,
            "frequency_id": 41,
            "frequencies": {
                "id": 41,
                "frequency": "1x por mês",
                "service_id": 26,
                "created_at": "2024-02-19T00:00:00.000Z",
                "updated_at": "2024-02-19T00:00:00.000Z",
                "value": 1,
                "services": {
                    "id": 26,
                    "name": "Hidração de cabelo",
                    "base_price": 50,
                    "colaborator_percent": 20,
                    "colaborator_value": 40,
                    "repass_percent": 25,
                    "repass_value": 8,
                    "profit": 32,
                    "genre": "feminino",
                    "created_at": "2024-02-19T00:00:00.000Z",
                    "updated_at": "2024-02-19T00:00:00.000Z"
                }
            }
        },
        {
            "id": 10,
            "colaborator_id": 5,
            "service_id": 25,
            "frequency_id": 39,
            "frequencies": {
                "id": 39,
                "frequency": "1x por mês",
                "service_id": 25,
                "created_at": "2024-02-19T00:00:00.000Z",
                "updated_at": "2024-02-19T00:00:00.000Z",
                "value": 1,
                "services": {
                    "id": 25,
                    "name": "Alisamento de cabelo",
                    "base_price": 60,
                    "colaborator_percent": 20,
                    "colaborator_value": 48,
                    "repass_percent": 20,
                    "repass_value": 9.6,
                    "profit": 38.4,
                    "genre": "feminino",
                    "created_at": "2024-02-19T00:00:00.000Z",
                    "updated_at": "2024-02-19T00:00:00.000Z"
                }
            }
        },
        {
            "id": 11,
            "colaborator_id": 5,
            "service_id": 24,
            "frequency_id": 37,
            "frequencies": {
                "id": 37,
                "frequency": "1x por mês",
                "service_id": 24,
                "created_at": "2024-02-19T00:00:00.000Z",
                "updated_at": "2024-02-19T00:00:00.000Z",
                "value": 1,
                "services": {
                    "id": 24,
                    "name": "Corte de cabelo",
                    "base_price": 40,
                    "colaborator_percent": 20,
                    "colaborator_value": 32,
                    "repass_percent": 30,
                    "repass_value": 6.4,
                    "profit": 25.6,
                    "genre": "masculino",
                    "created_at": "2024-02-19T00:00:00.000Z",
                    "updated_at": "2024-02-19T00:00:00.000Z"
                }
            }
        }
    ]
}*/}

            {/* <div className="pages">
                Olá
            </div> */}
            
        </ColaboratorsContainer >
    );
}


const ColaboratorsContainer = styled(BaseLayoutContainer)`

display: flex;
flex-direction: column;
gap: 20px;

.topInputs {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.bottomLine {
    border: 1px solid ${Colors.a};
}

.pageName {
    font-size: 24px;
    padding: 0 10px;
    margin-bottom: 5px;
}

.content {
    width: 100%;
    height: 100%;
}

.actions {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 30px;
}

.icon {
    cursor: pointer;
}

.item {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr;
    text-align: left;
    align-items: center;
    padding: 5px;
    cursor: default;
    
    &:hover {
        background-color: ${Colors.d};
    }
}

.fields {
    font-weight: 600;
    &:hover {
        background-color: #FFF;
    }
}

.pages {
    display: flex;
    justify-content: end;
    width: 100%;
    background-color: red;
}

`;