import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { BaseLayoutContainer } from "../../componets/baseLayout";
import styled from "styled-components";
import Colors from "../../assets/colors";
import { DefaultModalContainer } from "../../componets/defaultModal/styles";
import { formatDate } from "../../utils";
import { InputButton } from "../../componets/inputs";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from "../../componets/confirmationModal";


export default function ChatPartners() {
  const [partners, setPartners] = useState([]);

  const [selectedPartner, setSelectedPartner] = useState({ show: false, partner: null });
  const [newService, setNewService] = useState({ name: "", price: "", description: "" });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, id: null });

  const fetchPartners = async () => {
    try {
      const res = await api.get("/api/v1/partners");

      setPartners(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const partner_id = selectedPartner.partner.id;
      
      const payload = {
        name: selectedPartner.partner.name,
        cep: selectedPartner.partner.cep,
        logradouro: selectedPartner.partner.logradouro,
        complemento: selectedPartner.partner.complemento,
        bairro: selectedPartner.partner.bairro,
        localidade: selectedPartner.partner.localidade,
        uf: selectedPartner.partner.uf,
        estado: selectedPartner.partner.estado,
        regiao: selectedPartner.partner.regiao,
        phone: selectedPartner.partner.phone,
        number: selectedPartner.partner.number,
        payment_links: selectedPartner.partner.payment_links.map(link => ({link: link.link}))
      }

      await api.put(`/api/v1/partners/${partner_id}`, payload);
      
      setSelectedPartner({ show: false, partner: null });

      await fetchPartners();

      toast.success("Parceiro atualizado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível atualizar o parceiro.");
    }
  }

  const handleChange = (e) => setSelectedPartner({ ...selectedPartner, partner: { ...selectedPartner.partner, [e.target.name]: e.target.value } });

  const handleServiceChange = (e) => setNewService({ ...newService, [e.target.name]: e.target.value });

  const handleAddService = async (e) => {
    e.preventDefault();

    try {
      setSelectedPartner({ ...selectedPartner, partner: { ...selectedPartner.partner, partners_services: [...selectedPartner.partner.partners_services, {...newService, price: newService.price * 1000 }] } });

      const payload = {
        name: newService.name,
        description: newService.description,
        price: newService.price * 1000,
        partner_id: selectedPartner.partner.id
      }

      await api.post(`/api/v1/services/`, payload);

      setNewService({ name: "", price: "", description: "" });

      fetchPartners();

      toast.success("Serviço adicionado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível adicionar o serviço.");
    }
  }

  const handleChangePaymentLink = (e) => {
    let payment_links = selectedPartner.partner.payment_links;
    
    if(e.target.name === "index0") payment_links[0] = { link: e.target.value };
      
      if(e.target.name === "index1") payment_links[1] = { link: e.target.value };

    setSelectedPartner({
      ...selectedPartner,
      partner: {
        ...selectedPartner.partner,
        payment_links,
      }
    });
  }

  const handleDeleteService = async (service_id) => {
    try {
      await api.delete(`/api/v1/services/${service_id}`);
      setSelectedPartner({ ...selectedPartner, partner: { ...selectedPartner.partner, partners_services: selectedPartner.partner.partners_services.filter(service => service.id !== service_id) } });
      fetchPartners();
      toast.success("Serviço deletado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível deletar o serviço.");
    }
  }

  const handleCloseDeleteModal = () => setShowDeleteModal({ show: false, id: null });

  const handleDeletePartner = async () => {
    try {
      await api.delete(`/api/v1/partners/${showDeleteModal.id}`);
      fetchPartners();
      handleCloseDeleteModal();
      toast.success("Parceiro deletado com sucesso!");
    } catch (error) {
      toast.error("Não foi possível deletar o parceiro.");
    }
  }

  return (
    <PartnersContainer>
      {selectedPartner.show && <UpdatePartnerForm handleAddService={handleAddService} newService={newService} handleServiceChange={handleServiceChange} handleChangePaymentLink={handleChangePaymentLink} handleSubmit={handleSubmit} handleChange={handleChange} selectedPartner={selectedPartner} setSelectedPartner={setSelectedPartner} handleDeleteService={handleDeleteService}/>
      }

      {showDeleteModal.show &&
        <ConfirmModal
        message={"Deseja realmente deletar este parceiro?"}
        onConfirm={() => handleDeletePartner()}
        onClose={handleCloseDeleteModal} />
      }

      {
        showCreateModal &&
        <DefaultModalContainer>
          <CreatePartnerForm closeModal={() => setShowCreateModal(false)} fetchPartners={fetchPartners} />
        </DefaultModalContainer>
      }

      <div>
        <div className="flex w-full justify-between">
          <h1 className="pageName">Colaboradores</h1>
          <div>
            <InputButton text={"Adicionar Colaborador"} onClick={() => setShowCreateModal(true)} />
          </div>
        </div>
          <div className="bottomLine my-4"></div>
      </div>

      <table>
        <thead>
          <tr className="border-collapse">
            <th className="font-medium text-start p-0.5 border-collapse w-[10%]">Nome</th>
            <th className="font-medium text-start p-0.5 border-collapse w-[10%]">CEP</th>
            <th className="font-medium text-start p-0.5 border-collapse w-[10%]">Telefone</th>
            <th className="font-medium text-start p-0.5 border-collapse w-[10%]">Links de Pagamento</th>
            <th className="font-medium text-start p-0.5 border-collapse w-[10%]">Qtd. Serviços</th>
            <th className="font-medium text-start p-0.5 border-collapse w-[5%]">Opções</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {
            partners.length > 0
            ? partners.map(partner => (<PartnerItem key={partner.id} partner={partner} setSelectedPartner={setSelectedPartner} setShowDeleteModal={setShowDeleteModal}/>))
            : <tr><div className="my-4">Nenhum parceiro cadastrado.</div></tr>
          }
        </tbody>
      </table>
    </PartnersContainer>
  );
};


function InputFormItem({ partnerkey, label, onChange, value, type = "text" }) {
  
  return (
    <div className="flex gap-1 flex flex-col">
      <label htmlFor={partnerkey} className="text-sm">{label}</label>
      <input
        className="border border-gray-300 rounded-sm p-1"
        type={type}
        id={partnerkey}
        value={value}
        onChange={onChange}
        name={partnerkey}
      />
    </div>
  )
}

function PartnerItem({ partner, setSelectedPartner, setShowDeleteModal }) {
  const { name, cep, phone, payment_links, partners_services } = partner;
  
  return (
    <>
      <tr className="hover:bg-gray-100 cursor-pointer">
        <td className="p-1.5 border-collapse w-[10%]">{name}</td>
        <td className="p-1.5 border-collapse w-[10%]">{cep}</td>
        <td className="p-1.5 border-collapse w-[10%]">{phone}</td>
        <td className="p-1.5 border-collapse w-[10%]">
          {payment_links.length}
        </td>
        <td className="p-1.5 border-collapse w-[10%]">{partners_services.length}</td>
        <td className="p-1.5 border-collapse w-[5%]">
          <p className="hover:underline" onClick={() => setSelectedPartner({ show: true, partner })}>Ver mais</p>
        </td>
        <td className="p-1.5 border-collapse w-[5%]">
          <FaRegTrashAlt className="cursor-pointer hover:text-red-500" onClick={() => setShowDeleteModal({ show: true, id: partner.id })} />
        </td>
      </tr>
    </>
  )
}

const PartnersContainer = styled(BaseLayoutContainer)`

  .bottomLine {
      border: 1px solid ${Colors.a};
  }

  .pageName {
      font-size: 24px;
      padding: 0 10px;
      margin-bottom: 5px;
  }

.pageName {
    font-size: 24px;
    padding: 0 10px;
    margin-bottom: 5px;
}
`;


function UpdatePartnerForm({ setSelectedPartner, selectedPartner, handleSubmit, handleChange, handleServiceChange, handleAddService, newService, handleChangePaymentLink, handleDeleteService}) {
  return <DefaultModalContainer>
    <div className="w-full h-full p-10">

      <div className="w-full h-full bg-white rounded-md p-4 flex">
        <AiOutlineClose 
          className="fixed right-20 cursor-pointer hover:text-red-500" 
          onClick={() => setSelectedPartner({ show: false, partner: null })}
        />

        <div className="w-2/5 h-full px-10" style={{ overflowY: "scroll" }}>
          <h1 className="text-lg font-semibold">Informações do Parceiro</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <p className="font-medium mt-2">Detalhes</p>
            <InputFormItem partnerkey={"name"} label={"Nome"} onChange={handleChange} value={selectedPartner.partner.name} />
            <InputFormItem partnerkey={"phone"} label={"Telefone"} onChange={handleChange} value={selectedPartner.partner.phone} />

            <p className="font-medium mt-3">Endereço</p>
            <InputFormItem partnerkey={"cep"} label={"CEP"} onChange={handleChange} value={selectedPartner.partner.cep} />
            <InputFormItem partnerkey={"logradouro"} label={"Logradouro"} onChange={handleChange} value={selectedPartner.partner.logradouro} />
            <InputFormItem partnerkey={"complemento"} label={"Complemento"} onChange={handleChange} value={selectedPartner.partner.complemento} />
            <InputFormItem partnerkey={"bairro"} label={"Bairro"} onChange={handleChange} value={selectedPartner.partner.bairro} />
            <InputFormItem partnerkey={"localidade"} label={"Localidade"} onChange={handleChange} value={selectedPartner.partner.localidade} />
            <InputFormItem partnerkey={"uf"} label={"UF"} onChange={handleChange} value={selectedPartner.partner.uf} />
            <InputFormItem partnerkey={"estado"} label={"Estado"} onChange={handleChange} value={selectedPartner.partner.estado} />
            <InputFormItem partnerkey={"regiao"} label={"Região"} onChange={handleChange} value={selectedPartner.partner.regiao} />
            <InputFormItem partnerkey={"number"} label={"Número"} onChange={handleChange} value={selectedPartner.partner.number} />

            <InputFormItem partnerkey={"index0"} label={"Link de pagamento 1"} onChange={handleChangePaymentLink} value={selectedPartner.partner.payment_links[0]?.link} />
            <InputFormItem partnerkey={"index1"} label={"Link de pagamento 2"} onChange={handleChangePaymentLink} value={selectedPartner.partner.payment_links[1]?.link} />

            <div className="mt-3"></div>
            <InputButton text={"Salvar"} onClick={handleSubmit} />
            <div className="mb-10"></div>
          </form>
        </div>

        <div className="w-3/5 h-full flex flex-col gap-10 px-10" style={{ overflowY:"scroll" }}>

        <div>
            <h1 className="modalTitle">Adicionar Serviço</h1>
            <form onSubmit={handleAddService} className="flex flex-col gap-4 max-w-[700px]">
              <div className="flex gap-4">
                <InputFormItem partnerkey={"name"} label={"Nome do Serviço"} onChange={handleServiceChange} value={newService.name} />
                <InputFormItem partnerkey={"price"} label={"Preço"} onChange={handleServiceChange} value={((newService.price.replace(/[^\d]/g, "")) / 100).toFixed(2)} />
              </div>

              <div className="flex gap-2 flex flex-col">
                <label htmlFor={"description"}>Descrição</label>
                <textarea
                  name="description"
                  id="description"
                  rows="2"
                  className="border border-gray-300 rounded-sm p-1 w-full"
                  placeholder="Descrição" value={newService.description}
                  onChange={handleServiceChange}></textarea>
              </div>
              <InputButton text={"Adicionar serviço"} onClick={handleAddService} disabled={!newService.name || !newService.price || !newService.description} />
            </form>
          </div>

          <div>
            <h1 className="modalTitle">Serviços</h1>
            <table className="mb-8">
              <thead>
                <tr>
                  <th className="font-semibold text-start p-0.5 border-collapse w-[20%]">Nome</th>
                  <th className="font-semibold text-start p-0.5 border-collapse w-[10%]">Preço</th>
                  <th className="font-semibold text-start p-0.5 border-collapse w-[30%]">Descrição</th>
                  <th className="font-semibold text-start p-0.5 border-collapse w-[10%]">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {selectedPartner.partner.partners_services.map((service, i) => (
                  <tr key={i}>
                    <td className="p-1.5 border-collapse w-[20%]">{service.name}</td>
                    <td className="p-1.5 border-collapse w-[10%]">R$ {(service.price / 100).toFixed(2)}</td>
                    <td className="p-1.5 border-collapse w-[30%]">{service.description}</td>
                    <td className="p-1.5 border-collapse w-[10%]">{formatDate(service.created_at, "DD.MM.YYYY")}</td>
                    <td className="p-1.5 border-collapse w-[10%]">
                      {service.id && <FaRegTrashAlt className="cursor-pointer hover:text-red-500" onClick={() => handleDeleteService(service.id)} />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



        </div>

      </div>

    </div>
  </DefaultModalContainer>
}

const CreatePartnerForm = ({ closeModal, fetchPartners }) => {
  const [newPartner, setNewPartner] = useState({ name: "", cep: "", phone: "", payment_links: [] });

  const handleChangePaymentLink = (e) => {
    let payment_links = newPartner.payment_links;
    
    if(e.target.name === "index0") payment_links[0] = { link: e.target.value };
      
      if(e.target.name === "index1") payment_links[1] = { link: e.target.value };

    setNewPartner({
      ...newPartner,
      payment_links,
    });
  }

  const handleChange = (e) => setNewPartner({ ...newPartner, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/v1/partners", newPartner);

      toast.success("Parceiro criado com sucesso!");
      await fetchPartners();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível criar o parceiro.");
    }
  }


  return (
    <div className="w-[800px] h-full p-10">
      <div className="w-full h-full bg-white rounded-md p-4 px-10 flex justify-center relative">
        <AiOutlineClose className="absolute right-10 cursor-pointer hover:text-red-500" onClick={closeModal} />
        <form onSubmit={submit} className="flex flex-col gap-2 w-full">
          <p className="font-medium mt-2">Detalhes</p>
          <InputFormItem
            partnerkey={"name"}
            label={"Nome"}
            onChange={handleChange}
            value={newPartner.name}
          />

          <InputFormItem
            partnerkey={"phone"}
            label={"Telefone"}
            onChange={handleChange}
            value={newPartner.phone}
          />


          <p className="font-medium mt-3">Endereço</p>
          <InputFormItem
            partnerkey={"cep"}
            label={"CEP"}
            onChange={handleChange}
            value={newPartner.cep}
          />

          <InputFormItem
            partnerkey={"logradouro"}
            label={"Logradouro"}
            onChange={handleChange}
            value={newPartner.logradouro}
          />

          <InputFormItem
            partnerkey={"complemento"}
            label={"Complemento"}
            onChange={handleChange}
            value={newPartner.complemento}
          />

          <InputFormItem
            partnerkey={"bairro"}
            label={"Bairro"}
            onChange={handleChange}
            value={newPartner.bairro}
          />

          <InputFormItem
            partnerkey={"localidade"}
            label={"Localidade"}
            onChange={handleChange}
            value={newPartner.localidade}
          />

          <InputFormItem
            partnerkey={"uf"}
            label={"UF"}
            onChange={handleChange}
            value={newPartner.uf}
          />

          <InputFormItem
            partnerkey={"estado"}
            label={"Estado"}
            onChange={handleChange}
            value={newPartner.estado}
          />

          <InputFormItem
            partnerkey={"regiao"}
            label={"Região"}
            onChange={handleChange}
            value={newPartner.regiao}
          />

          <InputFormItem
            partnerkey={"number"}
            label={"Número"}
            onChange={handleChange}
            value={newPartner.number}
          />


          <InputFormItem partnerkey={"index0"} label={"Link de pagamento 1"} onChange={handleChangePaymentLink} value={newPartner.payment_links[0]?.link} />
          <InputFormItem partnerkey={"index1"} label={"Link de pagamento 2"} onChange={handleChangePaymentLink} value={newPartner.payment_links[1]?.link} />

          <div className="mt-3"></div>
          <InputButton text={"Salvar"} onClick={submit} />
          <div className="mb-10"></div>
        </form>
      </div>
    </div>

  )
}