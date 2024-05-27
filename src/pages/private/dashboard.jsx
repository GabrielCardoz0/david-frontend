import styled from "styled-components";
import Colors from "../../assets/colors";
import { BaseLayoutContainer } from "../../componets/baseLayout";
import { InputButton, SearchInput, TxtInput } from "../../componets/inputs";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetColaborators } from "../../services/serviceApi";
import { convertToMoney } from "../../utils";
import ConfirmModal from "../../componets/confirmationModal";
import { DeleteColab } from "../../services/colabsApi";


export const Dashboard = () => {
    const [colaborators, setColaborators] = useState([]);
    const [selectedColab, setSelectedColab] = useState(null);
    const [searchColab, setSearchColab] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    async function getColabs(search) {
        try {
            const res = await GetColaborators(1, -1, search);

            if(res.success){
                setColaborators(res.data.colaborators);
            } else {
                toast.error("Erro ao listar planos.");
            }
        } catch (error) {
            toast.error("Erro ao listar planos.");
        };
    }

    function calculatePlanValue(services) {
        let total = 0;

        services.map(service => total = total + (service?.frequencies.value * service?.frequencies?.services?.colaborator_value));

        return convertToMoney(total);
    }

    function parseAddress(address) {
        if(!address.cep) return "Não informado";

        return(`${address.city}, ${address.neighborhood}, ${address.street}.`);
    }

    useEffect(() => {
        getColabs("");
    }, []);

    function handleDigiteInput (e) {
        e.preventDefault();
        setSearchColab(e.target.value);
    };

    function handleSearch(e) {
        e.preventDefault();
        getColabs(searchColab);
    }

    async function handleDeleteColab() {
        try {
            await DeleteColab(selectedColab.id);
            setSelectedColab(null);
            toast.success("Colaborador deletado com sucesso.");
            getColabs("");
        } catch (error) {
            toast.error("Não foi possível deletar o colaborador.");
        } finally {
            setShowDeleteModal(false);
        }
    }

    return(
        <DashboardContainer>

            {showDeleteModal && <ConfirmModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteColab}/>}

            <form className="topInputs" onSubmit={handleSearch}>
                <SearchInput onChange={handleDigiteInput}/>
            </form>

            <div>
                <h1 className="pageName">Dashboard</h1>
                <div className="bottomLine"></div>
            </div>

            <div className="content">
                <div className="left side">
                    {colaborators.map(colab => {
                        return (
                        <div key={colab.id} className="leftSideItem" style={{ backgroundColor: `${selectedColab?.id === colab.id ? Colors.d : ""}` }} onClick={() => setSelectedColab(colab.id !== selectedColab?.id ? colab : null)}>
                            <p>{colab.name}</p>
                            <div>
                                <span>Empresa: {colab.company_name}</span>
                                <span>Valor: {calculatePlanValue(colab.colaborator_services)}</span>
                            </div>
                        </div>
                        )
                    })}
                </div>

                <div className="separatorLine"></div>

                <div className="right side">
                    {selectedColab ? 
                        <>
                        <div className="clientInfos">
                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Nome</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.name}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>CPF</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.cpf}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Gênero</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.genre || "Não informado"}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Email</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.email}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Telefone</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.tel}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Data de nascimento</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Empresa</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{selectedColab.company_name}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Endereço</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{parseAddress(selectedColab.addresses)}</p>
                            </div>

                            <div style={{ width: "100%" }}>
                                <p style={{ color: Colors.c }}>Total do plano</p>
                                <p style={{ fontSize: "18px", height: "15px" }}>{calculatePlanValue(selectedColab.colaborator_services)}</p>
                            </div>

                            <div style={{ alignSelf: "start", cursor: "pointer", color: "red" }} onClick={() => setShowDeleteModal(true)}>Deletar</div>
                        </div>


                        <div className="servicesInfos">
                            {selectedColab.colaborator_services.map((service) => {
                                return (
                                    <div key={service.id} className="servicesList">
                                        <div className="service">
                                            <p>Nome do serviço: {service.frequencies.services.name}</p>
                                            <p>Preço: {calculatePlanValue([service])}</p>
                                            <p>Frequência: {service.frequencies.frequency}</p>
                                        </div>
                                    </div>
                                );
                            })}
    
                            {/* <InputButton style={{ position: "absolute", right: "0", bottom: "0" }} text={"EDITAR"}/> */}
                        </div>
                        </> : "Selecione um colaborador para ver mais detalhes."
                    }
                </div>
            </div>
            
        </DashboardContainer >
    );
}

const DashboardContainer = styled(BaseLayoutContainer)`

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
    box-sizing: border-box;
}

.content {
    width: 100%;
    height: 100%;
    max-height: 85%;
    display: flex;
    gap: 10px;
}

.side {
    width: 100%;
    height: 100%;
}

.left {
    width: 800px;
}

.separatorLine {
    border: 1px solid ${Colors.c};
}

.leftSideItem {
    font-size: 18px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8px 10px;
    box-sizing: border-box;
    cursor: pointer;

    div {
        display: flex;
        justify-content: space-between;
    }

    span {
        font-size: 16px;
    }

    &:hover {
        background-color: ${Colors.d};
    }
}

.servicesInfos, .clientInfos {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 20px 10px;
}

.colabInfo {
    width: 400px;
    height: 100%;
}

.right {
    display: flex;
    height: 100%;
}

.servicesList {
    max-height: calc(100% - 50px);
    overflow: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
}

.clientInfos {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.service {
    padding: 10px 20px;
    height: 80px;
    width: 75%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    border-bottom: 1.5px solid ${Colors.c};

    p {
        color: black;
        
    }
}

`;