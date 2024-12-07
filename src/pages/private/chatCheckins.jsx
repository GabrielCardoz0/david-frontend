import styled from "styled-components";
import { BaseLayoutContainer } from "../../componets/baseLayout";
import Colors from "../../assets/colors";
import { useEffect, useMemo, useState } from "react";
import { api } from "../../services/api";
import dayjs from "dayjs";
import { SearchInput } from "../../componets/inputs";
import { toast } from "react-toastify";

export default function ChatCheckins() {
  const limitPerPage = 20;
  const [checkins, setCheckins] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [checkinsCount, setCheckinsCount] = useState(1);

  const componentsPage = useMemo(() => {
    const totalPages = Math.ceil(checkinsCount / limitPerPage)
    const arr = [];
    let i = 0;
    while(i < totalPages){
        arr.push(<NumberPage key={i} value={i+1} selectedPage={selectedPage} onClick={setSelectedPage}/>);
        i++;
    };

    return arr;
  }, [checkinsCount, selectedPage]);
  

  const fetchCheckins = async (page, limit, search) => {
    try {
      const response = await api.get(`/api/v1/checkins?page=${page ?? 1}&limit=${limit ?? limitPerPage}&search=${search ?? ""}`);
      setCheckins(response.data.data);
      setCheckinsCount(response.data.count);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao buscar check-ins.");
    }
  }

  useEffect(() => {
    fetchCheckins(selectedPage, limitPerPage, search);
  }, [selectedPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSelectedPage(1);
    await fetchCheckins(1, 10, search);
  }

  const handleDigiteInput = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <PartnersContainer>
      <div>

        <form className="mb-4" onSubmit={(e) => handleSearch(e)}>
            <SearchInput onChange={e => handleDigiteInput(e)}/>
        </form>

        <h1 className="pageName">Check-ins</h1>
        <div className="bottomLine"></div>
      </div>

      <div className="flex flex-col w-full gap-2 mt-1">
        <div className="flex w-full">
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%] font-semibold">Código</span>
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[10%] font-semibold">status</span>
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[10%] font-semibold">telefone</span>
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[25%] font-semibold">Serviço</span>
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%] font-semibold">Data-criação</span>
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%] font-semibold">Check-in</span>
          <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%] font-semibold">Check-out</span>
        </div>

        {
          checkins.length > 0 
          ? checkins.map((checkin) => <Checkin key={checkin.id} checkin={checkin} />)
          : <span className="font-medium text-base text-start p-0.5 border-collapse w-full">Nenhum check-in encontrado</span>
        }

      </div>

      <div className="absolute w-full pr-8 flex gap-1 justify-end bottom-4">
          {componentsPage}
      </div>

    </PartnersContainer>
  );
};

const Checkin = ({ checkin }) => {
  return (
    <div className="flex w-full hover:bg-gray-200 cursor-default">
      <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%]">{checkin.hash}</span>
      <span className="font-medium text-base text-start p-0.5 border-collapse w-[10%]">{checkin.status}</span>
      <span className="font-medium text-base text-start p-0.5 border-collapse w-[10%]">{checkin.colab_number}</span>
      <span title={checkin.service ?? "Serviço não informado."} className="font-medium text-base text-start p-0.5 border-collapse w-[25%] truncate">{checkin.service ?? "Serviço não informado."}</span>
      <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%]">{dayjs(checkin.created_at).format("DD.MM.YYYY HH:mm")}</span>
      <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%]">{checkin?.start_at ? dayjs(checkin?.start_at).format("DD.MM.YYYY HH:mm") : "Não iniciado"}</span>
      <span className="font-medium text-base text-start p-0.5 border-collapse w-[15%]">{checkin?.end_at ? dayjs(checkin?.end_at).format("DD.MM.YYYY HH:mm") : "Não finalizado"}</span>
    </div>
  )
}

const NumberPage = ({value, selectedPage, onClick}) => {
  return(<NumberPageContainer className="page" selectedPage={selectedPage === value} onClick={() => onClick(value)}>{value}</NumberPageContainer>);
}

const PartnersContainer = styled(BaseLayoutContainer)`
  position: relative;
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

  .pages {
      display: flex;
      justify-content: end;
      gap: 5px;
      width: 100%;
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