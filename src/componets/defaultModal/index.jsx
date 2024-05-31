import { useContext, useEffect, useState } from "react";
import Colors from "../../assets/colors";
import { InputButton, SelectInput, TxtInput } from "../inputs";
import { DefaultModalContainer } from "./styles";
import { AiOutlineClose } from "react-icons/ai";
import { ServicesContext } from "../../contexts/servicesContext";
import { toast } from "react-toastify";


function convertToMoney(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const NewServiceModal = ({ onClose, onConfirm }) => {

    const [serviceInputValues, setServiceInputValues] = useState({});

    const handleServiceNameInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceName: e.target.value });
    };

    const handleServiceDFrequencyInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceFrequency: e.target.value });
    };

    const handleServiceBasePriceInput = (e) => {
        e.preventDefault();
        
        return setServiceInputValues({ ...serviceInputValues, serviceBasePrice: e.target.value.replace(/[^0-9.]/g, '') });
    };

    const handleServiceColabPercentInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceColabPercent: e.target.value.replace(/[^0-9.]/g, '') });
    };

    const handleServiceRepassPercentInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceRepassPercent: e.target.value.replace(/[^0-9.]/g, '') });
    };

    const handleServiceGenre = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, genre: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(serviceInputValues);
    }

    return(
        <DefaultModalContainer>
            <div className="modal">
                <AiOutlineClose className="closeButton" onClick={onClose}/>

                <div className="modalTitle">Cadastrar novo serviço</div>

                <form onSubmit={handleSubmit} className="newServiceForm">
                    <div className="newServiceFormGrid">
                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Nome do serviço"} required={true} onChange={handleServiceNameInput} placeholder={"João Gabriel"}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Preço base"} required={true} onChange={handleServiceBasePriceInput} placeholder={"R$ 30,00"} value={serviceInputValues.serviceBasePrice ? "R$ "+serviceInputValues.serviceBasePrice : ""}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Porcentagem para colaborador"} required={true} onChange={handleServiceColabPercentInput} value={serviceInputValues.serviceColabPercent ? serviceInputValues.serviceColabPercent+"%" : ""} placeholder={"20%"}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Porcentagem de repasse"} required={true} onChange={handleServiceRepassPercentInput} value={serviceInputValues.serviceRepassPercent ? serviceInputValues.serviceRepassPercent+"%" : ""} placeholder={"20%"}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Frequência"} required={true} onChange={handleServiceDFrequencyInput} placeholder={"Ex.: 1x semana; 2x semana "}/>

                        <SelectInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Público"} required={true} onChange={handleServiceGenre}/>

                    </div>

                    <div className="calcs">
                        <p>Preço para o colaborador: R$ {(((serviceInputValues.serviceBasePrice) * (1 - serviceInputValues.serviceColabPercent/100)) || 0).toFixed(2) ?? "0.00"}</p>

                        <p>Preço para o fornecedor: R$ {((((serviceInputValues.serviceBasePrice) * (1 - serviceInputValues.serviceColabPercent/100)) * (1 - serviceInputValues.serviceRepassPercent/100)) || 0).toFixed(2) ?? "0.00"}</p>
                        
                        <p>Lucro: R$ {((((serviceInputValues.serviceBasePrice) * (1 - serviceInputValues.serviceColabPercent/100)) * (serviceInputValues.serviceRepassPercent/100)) || 0).toFixed(2) ?? "0.00"}</p>
                    </div>

                    <div className="formButtons">
                        <span onClick={onClose} style={{ cursor: "pointer" }}>Cancelar</span>
                        <InputButton text={"ADICIONAR"}/>
                    </div>

                </form>


            </div>
        </DefaultModalContainer>
    );
};

export const EditServiceModal = ({ onClose, onConfirm, service }) => {

    const [serviceInputValues, setServiceInputValues] = useState({
        serviceName: service.name,
        serviceBasePrice: service.base_price,
        serviceColabPercent: service.colaborator_percent,
        serviceRepassPercent: service.repass_percent,
        genre: service.genre
    });

    const handleServiceNameInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceName: e.target.value });
    };

    const handleServiceBasePriceInput = (e) => {
        e.preventDefault();
        
        return setServiceInputValues({ ...serviceInputValues, serviceBasePrice: e.target.value.replace(/[^0-9.]/g, '') });
    };

    const handleServiceColabPercentInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceColabPercent: e.target.value.replace(/[^0-9.]/g, '') });
    };

    const handleServiceRepassPercentInput = (e) => {
        e.preventDefault();
        return setServiceInputValues({ ...serviceInputValues, serviceRepassPercent: e.target.value.replace(/[^0-9.]/g, '') });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(serviceInputValues);
    };

    return(
        <DefaultModalContainer>
            <div className="modal">
                <AiOutlineClose className="closeButton" onClick={onClose}/>

                <div className="modalTitle">Editar serviço</div>

                <form onSubmit={handleSubmit}>
                    <div className="">
                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Nome do serviço"} required={true} onChange={handleServiceNameInput} placeholder={"João Gabriel"} value={serviceInputValues.serviceName}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Preço base"} required={true} onChange={handleServiceBasePriceInput} placeholder={"R$ 30,00"} value={serviceInputValues.serviceBasePrice ? "R$ "+serviceInputValues.serviceBasePrice : ""}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Porcentagem para colaborador"} required={true} onChange={handleServiceColabPercentInput} value={serviceInputValues.serviceColabPercent ? serviceInputValues.serviceColabPercent+"%" : ""} placeholder={"20%"}/>

                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Porcentagem de repasse"} required={true} onChange={handleServiceRepassPercentInput} value={serviceInputValues.serviceRepassPercent ? serviceInputValues.serviceRepassPercent+"%" : ""} placeholder={"20%"}/>
{/* 
                        <TxtInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Frequência"} required={true} onChange={handleServiceDFrequencyInput} placeholder={"Ex.: 1x semana; 2x semana "}/> */}

                        {/* <SelectInput inputStyle={{ border: `2px solid ${Colors.c}`, fontSize: "16px" }} label={"Público"} required={true} onChange={handleServiceGenre}/> */}

                    </div>

                    <div className="calcs">
                        <p>Preço para o colaborador: R$ {(((serviceInputValues.serviceBasePrice) * (1 - serviceInputValues.serviceColabPercent/100)) || 0).toFixed(2) ?? "0.00"}</p>

                        <p>Preço para o fornecedor: R$ {((((serviceInputValues.serviceBasePrice) * (1 - serviceInputValues.serviceColabPercent/100)) * (1 - serviceInputValues.serviceRepassPercent/100)) || 0).toFixed(2) ?? "0.00"}</p>
                        
                        <p>Lucro: R$ {((((serviceInputValues.serviceBasePrice) * (1 - serviceInputValues.serviceColabPercent/100)) * (serviceInputValues.serviceRepassPercent/100)) || 0).toFixed(2) ?? "0.00"}</p>
                    </div>

                    <div className="formButtons">
                        <span onClick={onClose} style={{ cursor: "pointer" }}>Cancelar</span>
                        <InputButton text={"ADICIONAR"}/>
                    </div>

                </form>


            </div>
        </DefaultModalContainer>
    );
};

export const CompleteColaboratorModal = ({ onClose, onConfirm, colab }) => {

    return(
        <DefaultModalContainer>
        <div className="modal" style={{ justifyContent: "flex-start", height: "350px" }}>
            <AiOutlineClose className="closeButton" onClick={onClose}/>

            <div className="modalTitle">Confirmação de cadastro</div>

            <form onSubmit={onConfirm} className="newServiceForm">
                <div style={{ display: "flex", backgroundColor: "", width: "100%", justifyContent: "space-between", gap:"30px" }}>
                    <div className="" style={{ flexDirection: "column", gap: "8px", display: "flex", flexDirection: "column"}}>
                        <p><span style={{ fontWeight: "bold" }}>Colaborador:</span> {colab.name}</p>
                        <p><span style={{ fontWeight: "bold" }}>Data de Nascimento:</span> {colab.birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")}</p>
                        <p><span style={{ fontWeight: "bold" }}>CPF:</span> {colab.cpf.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2')}</p>
                        <p><span style={{ fontWeight: "bold" }}>Email:</span> {colab.email}</p>
                        <p><span style={{ fontWeight: "bold" }}>Telefone:</span> {colab.tel.replace(/\D/g, '').replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')}</p>
                        <p><span style={{ fontWeight: "bold" }}>Empresa:</span> {colab.company_name}</p>
                    </div>
                    <div className="" style={{ flexDirection: "column", gap:"8px", display: "flex", flexDirection: "column", overflowY: "scroll", paddingRight: "5px", paddingBottom:"5px", maxHeight: "160px" }}>
                        <span style={{ fontWeight: "bold" }}>Serviços</span>
                        {colab.colaborator_services.map(service => {
                            return (
                                <p key={service.id}>{service.frequencies.services.name} - {service.frequencies.frequency}</p>
                            );
                        })}
                    </div>
                </div>

                <div className="formButtons" style={{ height: "80px", justifyContent: "end", alignItems: "flex-end" }}>
                    <span onClick={onClose} style={{ cursor: "pointer", padding: "15px 35px" }}>Cancelar</span>
                    <InputButton text={"CONFIRMAR"}/>
                </div>

            </form>

        </div>
                        {/* <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Nome completo"} required={true}/>
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Nascimento"} required={true}/>
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"CPF"} required={true}/>
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Endereço"} required={true}/>
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Email"} required={true}/>  
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Whatsapp"} required={true}/>
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Empresa"} required={true}/> */}

        </DefaultModalContainer>
    );

};

export const ConfirmModal = ({ onClose, onConfirm, message }) => {

    return(
        <DefaultModalContainer>
            <div className="modal" style={{ height: "160px", width: "490px", justifyContent: "center" }}>
                <AiOutlineClose className="closeButton" onClick={onClose}/>
                <div className="modalTitle">Confirmação</div>
                <p>{message || ""}</p>
                <form onSubmit={onConfirm} className="newServiceForm">
                    <div className="formButtons" style={{ height: "80px", justifyContent: "end", alignItems: "flex-end" }}>
                        <span onClick={onClose} style={{ cursor: "pointer", padding: "15px 35px" }}>Cancelar</span>
                        <InputButton text={"CONFIRMAR"}/>
                    </div>
                </form>
            </div>
        </DefaultModalContainer>
    );

};

export const FormsModal = ({ onClose, onConfirm }) => {
    const { services, getServices } = useContext(ServicesContext);
    const [selectedServices, setSelectedServices] = useState([]);
    const [serviceName, setServiceName] = useState("");

    const handleSelectService = (service_id) => {
        if(selectedServices.find(i => i === service_id)) return setSelectedServices(selectedServices.filter(id => id !== service_id));
        return setSelectedServices([...selectedServices, service_id]);
    };

    const handleServiceName = (e) => {
        e.preventDefault();
        setServiceName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            onConfirm(serviceName, selectedServices);
        } catch (error) {
            toast.error("Deu ruim");
        }
    };

    useEffect(() => {
        getServices(1, -1);
    }, []);

    return(
        <DefaultModalContainer>
            <form className="modal" onSubmit={e => handleSubmit(e)}>
                <AiOutlineClose className="closeButton" onClick={onClose}/>

                <div className="modalTitle">Cadastrar novo formulário</div>

                <div className="newForm">

                    <div className="leftSide formSide">
                        {services.map((service, index) => (
                            <div key={index} className={`formServiceItem ${selectedServices.find(i => i === service.id) && 'selected'}`} onClick={() => handleSelectService(service.id)}>
                                <p>Serviço: {service.name || "Não informado"}</p>
                                <p>Preço: {convertToMoney(service.base_price || 0)}</p>
                            </div>
                        ))}
                    </div>

                    <div className="rightSide formSide">
                        <TxtInput inputStyle={{ height: "35px", border: `2px solid ${Colors.c}`, fontSize: "16px" }} labelStyle={{ fontSize: "14px" }} label={"Nome do formulário"} required={true} onChange={e => handleServiceName(e)}/>
                    </div>
                </div>

                <div className="formButtons" style={{ height: "80px", justifyContent: "end", alignItems: "flex-end" }}>
                    <span onClick={onClose} style={{ cursor: "pointer", padding: "15px 35px" }}>Cancelar</span>
                    
                    <InputButton text={"CADASTRAR"}/>
                </div>
            </form>
        </DefaultModalContainer>
    );

};
