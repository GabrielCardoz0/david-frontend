import styled from "styled-components";
import { BaseLayoutContainer } from "../../componets/baseLayout";
import { InputButton, SearchInput } from "../../componets/inputs";
import Colors from "../../assets/colors";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { EditServiceModal, NewServiceModal } from "../../componets/defaultModal";
import { useContext, useEffect, useState } from "react";
import { DeleteService, EditService, NewServiceApi } from "../../services/serviceApi";
import { ServicesContext } from "../../contexts/servicesContext";
import { toast } from "react-toastify";
import { convertToMoney } from "../../utils";
import ConfirmModal from "../../componets/confirmationModal";

const NumberPage = ({value, selectedPage, onClick}) => {
    return(<NumberPageContainer className="page" selectedPage={selectedPage === value} onClick={() => onClick(value)}>{value}</NumberPageContainer>);
}

export const Services = () => {
    const { services, pages, getServices } = useContext(ServicesContext);
    const [ showNewServiceModal, setShowNewServiceModal ] = useState(false);
    const [ showEditServiceModal, setShowEditServiceModal ] = useState({ show: false, service: {} });
    const [selectedPage, setSelectedPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState();
    const [searchService, setSearchService] = useState("");


    const componetesPage = [];  
    let i = 0;
    while(i < pages){
        componetesPage.push(<NumberPage key={i} value={i+1} selectedPage={selectedPage} onClick={setSelectedPage}/>);
        i++;
    };

    const handleAddService = async (values) => {
        try {
            setLoading(true);
            const res = await NewServiceApi(values);

            if(res.success){
                toast.success("Serviço cadastrado com sucesso!");
            } else {
                toast.error("Erro ao cadastrar serviço. Tente novamente mais tarde.");
            }

        } catch (error) {
            toast.error("Erro ao cadastrar serviço");
        } finally {
            setShowNewServiceModal(false);
            getServices();
            setLoading(false);
        };
    };

    const handleShowDeleteModal = async () => {
        try {
            const data = await DeleteService(serviceIdToDelete);

            if(data.success){
                toast.success("Serviço deletado com sucesso.");
                getServices(1);
            } else {
                toast.error("Erro ao deletar serviço. Tente novamente mais tarde.");
            }
        } catch (error) {
            toast.error("Erro ao deletar serviço. Tente novamente mais tarde.");
        } finally {
            setShowDeleteModal(false);
        }
    };

    useEffect(() => {
        getServices(selectedPage);
    }, [selectedPage]);


    function handleDigiteInput (e) {
        e.preventDefault();
        setSearchService(e.target.value);
    };

    function handleSearch(e) {
        e.preventDefault();
        getServices(1, -1, searchService);
    };

    async function handleEditService(editedService) {

        try {
            await EditService(showEditServiceModal.service.id, editedService);
            toast.success("Serviço editado com sucesso.");
        } catch (error) {
            console.log(error);
            toast.error("Erro ao editar serviço. Tente novamente mais tarde.");
        } finally {
            setShowEditServiceModal({ show: false, service: {} });
            getServices();
        }
    }

    return(
        <ServicesContainer>
            {showNewServiceModal && <NewServiceModal onClose={() => setShowNewServiceModal(false)} onConfirm={handleAddService}/>}
            {showDeleteModal && <ConfirmModal onConfirm={() => handleShowDeleteModal()} onClose={() => setShowDeleteModal(false)}/>}
            {showEditServiceModal.show && <EditServiceModal service={showEditServiceModal.service} onClose={() => setShowEditServiceModal({ show: false, service: {} })} onConfirm={handleEditService}/>}

            <div style={{ display: "flex" }}>
                <form className="topInputs" onSubmit={handleSearch}>
                    <SearchInput onChange={handleDigiteInput}/>
                </form>
                <div>
                    <InputButton text={"ADICIONAR"} onClick={() => setShowNewServiceModal(true)}/>
                </div>
            </div>

            <div>
                <h1 className="pageName">Serviços</h1>
                <div className="bottomLine"></div>
            </div>

            <div className="content">
                <div className="service fields">
                    <span>Serviço</span>
                    <span>Preço(base)</span>
                    <span>Preço(colab)</span>
                    <span>Lucro</span>
                    <span>Repasse</span>
                    <span>Público</span>
                    <span>Qtd. frequência</span>
                    <span className="actions">Ações</span>
                </div>


                {loading ? <div>Carregando</div> : services.map(service => (
                    <div key={service.id} className="service">
                        <span>{service.name}</span>
                        <span>{convertToMoney(service?.base_price || 0)}</span>
                        <span>{convertToMoney(service?.colaborator_value || 0)}</span>
                        <span>{convertToMoney(service?.repass_value || 0)}</span>
                        <span>{convertToMoney(service?.profit || 0)}</span>
                        <span>{service?.genre || "indefinido"}</span>
                        <span>{service?.frequencies?.length || "Não informado"}</span>
                        <div className="actions">
                            <FaEdit className="icon" size={20} onClick={() => setShowEditServiceModal({show: true, service: service})}/>
                            <FaRegTrashAlt className="icon" size={20} onClick={() => {
                                setServiceIdToDelete(service.id);
                                setShowDeleteModal(true);
                            }}/>
                        </div>
                    </div>
                ))}
                {services.length < 1 && !loading && <div style={{ fontSize: '24px', marginTop: "20px" }}>Cadastre um serviço</div>}

            </div>

            <div className="pages">
                {componetesPage}
            </div>

        </ServicesContainer>
    );
}


const ServicesContainer = styled(BaseLayoutContainer)`
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

.pages {
    display: flex;
    justify-content: end;
    gap: 5px;
    width: 100%;
}

.actions {
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 30px;
}

.icon {
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
}

.service {
    display: grid;
    grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    text-align: left;
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
`;

const NumberPageContainer = styled.span`
        justify-content: center;
        border-radius: 3px;
        display: flex;
        align-items: center;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-color: ${Colors.d};
        border: 1px solid ${({selectedPage}) => selectedPage ? Colors.c : Colors.d };

        &:hover {
            opacity: 0.6;
        }    
`
/*

{
    "id": 4,
    "name": "new serbice",
    "base_price": 30,
    "colaborator_percent": 12,
    "colaborator_value": 26.4,
    "repass_percent": 12,
    "repass_value": 3.17,
    "profit": 23.23,
    "genre": "masculino",
    "created_at": "2024-02-19T00:00:00.000Z",
    "updated_at": "2024-02-19T00:00:00.000Z",
    "frequencies": [
        {
            "id": 3,
            "frequency": "1x por semana",
            "service_id": 4,
            "created_at": "2024-02-19T00:00:00.000Z",
            "updated_at": "2024-02-19T00:00:00.000Z",
            "value": 1
        },
        {
            "id": 4,
            "frequency": " 2x top",
            "service_id": 4,
            "created_at": "2024-02-19T00:00:00.000Z",
            "updated_at": "2024-02-19T00:00:00.000Z",
            "value": 2
        }
    ]
}

*/