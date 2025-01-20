import { useParams } from "react-router-dom";
import FormDefaultContainer from "../../componets/formDefaultContainer";
import { useContext, useEffect, useState } from "react";
import { FormsContext } from "../../contexts/formsContext";
import SquareForm from "../../componets/squareForm";
import { DefaultModalContainer } from "../../componets/defaultModal/styles";
import { AiFillInfoCircle, AiOutlineClose } from "react-icons/ai";
import { CheckInput } from "../../componets/inputs";
import { convertToMoney } from "../../utils";

export default function ServicesListPage() {
  const { formIdentify } = useParams();
  const { formServices, getFormServices } = useContext(FormsContext);
  const [ showMoreInfo, setShowMoreInfo ] = useState({ visible: false, description: "" });


  useEffect(() => {
    getFormServices(formIdentify)
  }, []);
  console.log(formServices);

  
  return (
    <FormDefaultContainer>

      {formServices.length > 0
      ? formServices?.map(({ services }) => <SquareForm key={services.id}>
          {showMoreInfo.visible && <DefaultModalContainer>
              <div style={{ backgroundColor: "#FFF", width: "70%", padding: "10px 5px 10px 5px", minHeight: "150px", borderRadius: "5px", position: "relative" }}>
                  <p style={{ marginBottom: "5px", fontWeight: "600", fontSize:"14px" }}>Descrição do serviço</p>
                  <p style={{ fontSize:"14px" }}>{showMoreInfo.description}</p>
                  <AiOutlineClose className="closeButton" onClick={() => setShowMoreInfo({ visible: false, description: "" })}/>
              </div>
          </DefaultModalContainer>}

          <h1 style={{ fontWeight: "600", fontSize:"14px" }}>{services.name}</h1>
          <div className="spaceText"></div>
          <div className="spaceText"></div>
          {
              services.frequencies.map(fr => {
                  return (<div className="py-0.5">{`${fr.frequency} - ${convertToMoney(services.colaborator_value * fr.value)}`}</div>);
              })
          }
          {services.description !== "" && <AiFillInfoCircle style={{ position: "absolute", right: 5, top: 5, color: "orange" }} onClick={() => setShowMoreInfo({ visible: true, description: services.description })}/>}
      </SquareForm>)
      : <div>Carregando...</div>  
    }

    </FormDefaultContainer>
  )
};
