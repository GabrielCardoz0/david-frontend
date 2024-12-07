import { api } from "./api";

export const GetNewColabs = async () => {
    try {

        const res = await api.get('/forms/colaborators/new');
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao cadastrar serviço."
        };
    }
};

export const ConfirmNewColab = async (id) => {
    try {
        const res = await api.put(`/forms/colaborators/new/${id}`);
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro confirmar colaborador."
        };
    }
};

export const DeniedNewColabs = async (id) => {
    try {
        const res = await api.delete(`/forms/colaborators/new/${id}`);
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro negar cadastro de colaborador."
        };
    }
};

export const DeleteColab = async (id) => {
    try {
        const res = await api.delete(`/forms/colaborators/${id}`);
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao deletar colaborador."
        };
    }
}