import styled from "styled-components";
import { InputButton, SearchInput } from "../../componets/inputs";
import Colors from "../../assets/colors";
import { BaseLayoutContainer } from "../../componets/baseLayout";
import { useEffect, useState } from "react";
import { FormsModal } from "../../componets/defaultModal";
import { DeleteFormById, GetForms, NewForm } from "../../services/formsApi";
import { toast } from "react-toastify";
import { convertToMoney, formatDate } from "../../utils";
import ConfirmModal from "../../componets/confirmationModal";
import ClipboardJS from 'clipboard';
import CopyToClipboard from "react-copy-to-clipboard";


export const Forms = () => {

    const [ showFormModal, setShowFormModal ] = useState(false);
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchForm, setSearchForm] = useState("");

    const getForms = async (page, limit, search) => {
        try {
            const res = await GetForms(page, limit || "", search);

            if(res.success){
                setForms(res.data.forms);
            } else {
                toast.error("Erro ao listar formulários.")
            }
        } catch (error) {
            console.log("Erro no try catch");
        }
    };

    const handleCreateForm = async (formName, services) => {
        if(services.length < 1) return toast.warning("Selecione ao menos um serviço.");
        try {
            const res = await NewForm(formName, services);

            if(res.success){
                setShowFormModal(false);
                toast.success("Formulário criado com sucesso");
                return getForms();
            } else {
                return toast.error("Erro ao criar formulário.");
            };

        } catch (error) {
            toast.error("Erro ao criar formulário.");
        };
    }

    const handleDeleteForm = async () => {
        try {
            setShowDeleteModal(false);
            setSelectedForm({});

            const res = await DeleteFormById(selectedForm.id);

            if(res.success){
                toast.success("Formulário deletado com sucesso.");
            } else {
                toast.error("Erro ao deletar formulário.")
            }
        } catch (error) {
            console.log("Erro no try catch");
        } finally {
            setShowDeleteModal(false);
            getForms();
        }
    };

    useEffect(() => {
        getForms();
    }, []);

    const handleSelectForm = (form) => {
        if(selectedForm.id === form.id) return setSelectedForm({});
        return setSelectedForm(form);
    }

    function handleDigiteInput (e) {
        e.preventDefault();
        setSearchForm(e.target.value);
    };

    function handleSearch(e) {
        e.preventDefault();
        getForms(1, -1, searchForm);
    };

    return(
        <>
        {showDeleteModal && <ConfirmModal onClose={() => setShowDeleteModal(false) } onConfirm={() => handleDeleteForm()}/>}
        {showFormModal && <FormsModal onClose={() => setShowFormModal(false)} onConfirm={handleCreateForm}/>}
        <FormsContainer>
            
            <div style={{ display: "flex" }}>
                <form className="topInputs" onSubmit={handleSearch}>
                    <SearchInput onChange={handleDigiteInput}/>
                </form>
                <div>
                    <InputButton text={"NOVO FORMULÁRIO"} onClick={() => setShowFormModal(true)}/>
                </div>

            </div>

            <div>
                <h1 className="pageName">Formulários</h1>
                <div className="bottomLine"></div>
            </div>

            <div className="content">
                <div className="side left">
                    {forms?.map(form => {
                        return(
                        <div key={form.id} className="formItem" style={{ backgroundColor: `${selectedForm?.id === form.id ? Colors.d : ""}` }} onClick={() => handleSelectForm(form)}>
                            <p>{form.name}</p>
                            <div>
                                <span>Identificador: {form.identify}</span>
                            </div>
                        </div>
                        );
                    })}
                </div>

                <div className="betweenLine"></div>

                <div className="side right">
                    {selectedForm.id ?
                    <>
                    <div className="formInfos">
                        <div className="formInfoItem">
                            <label>Nome</label>
                            <p>{selectedForm.name}</p>
                        </div>
                        <div className="formInfoItem">
                            <label>Identificador</label>
                            <p>{selectedForm.identify}</p>
                        </div>
                        <div className="formInfoItem">
                            <label>Data de criação</label>
                            <p>{formatDate(selectedForm.created_at)}</p>
                        </div>
                        <div className="formInfoItem" style={{ display: "flex", gap: "30px" }}>

                            <CopyToClipboard text={window.location.href.replace("/forms", "") +"/forms/"+ selectedForm.identify} onCopy={() => toast.success("Texto copiado para a área de transferência.")}>
                            <p style={{ cursor: "pointer" }}>Copiar</p>
                            </CopyToClipboard>

                            <p className="deleteForm" onClick={() => setShowDeleteModal(true)}>Deletar</p>
                        </div>
                    </div>

                    <div className="formServices">
                        {selectedForm.form_services.map(({services}) => {
                            return(
                            <div key={services.id} className="formServiceItem">
                                <p>{services.name}</p>
                                <p>Preço: {convertToMoney(services.base_price)}</p>
                                <p>Público: {services.genre}</p>
                            </div>
                            );
                        })}
                    </div>
                    </> : <p>Selecione um formulário para ver mais detalhes.</p>
                    }
                </div>
            </div>

        </FormsContainer>
        </>
    );
}

const FormsContainer = styled(BaseLayoutContainer)`
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

    .betweenLine {
        border: 1px solid ${Colors.d};
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
        display: flex;
    }

    .side {
        height: 100%;
        width: 100%;
        padding: 10px;
    }

    .left {
        width: 70%;
        overflow: scroll;
        height: 700px;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    .right {
        display: flex;
        padding: 10px 30px;
    }

    .formItem {
        width: 100%;
        height: 70px;
        background-color: ${Colors.wht};
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 16px;
        cursor: pointer;

        p {
            font-weight: 500;
        }

        span {
            color: ${Colors.b};
        }

        div {
            display: flex;
            width: 100%;
            justify-content: space-between;
        }

        &:hover {
            background-color: ${Colors.d};
        }
    }

    .formInfoItem {
        padding: 10px 5px;
    }

    .formInfos {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .formServices {
        width: 100%;
        height: 600px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column;
        gap: 10px;

        &::-webkit-scrollbar {
            display: none;  
        }
    }

    .formServiceItem {
        padding: 5px 15px;
        border-bottom: 2px solid ${Colors.d};
    }

    .deleteForm {
        color: rgba(255,0,0,1);
        cursor: pointer;
        &:hover {
            opacity: 0.6;
        }
    }
`;