import { api } from "./api";

export const NewServiceApi = async ({serviceName, serviceBasePrice, serviceColabPercent, serviceRepassPercent, serviceFrequency, genre, serviceDescription}) => {
    const payload = { serviceName, serviceBasePrice, serviceColabPercent, serviceRepassPercent, serviceFrequency, genre, serviceDescription};

    try {
        const res = await api.post('/services', payload);

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

export const GetServices = async (page, limit, search) => {
    try {
        const { data } = await api.get(`/services?page=${page || 0}&limit=${limit || 10}&search=${search || ""}`);

        return {
            success: true,
            data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao listar serviço."
        };
    }
}

export const GetColaborators = async (page, limit, search) => {
    try {
        const { data } = await api.get(`/forms/colaborators?page=${page || 0}&limit=${limit || 10}&search=${search || ""}`);

        return {
            success: true,
            data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao listar colaboradores."
        };
    }
}

export const DeleteService = async (serviceId) => {
    try {
        const data = await api.delete(`/services/${serviceId}`);

        return {
            success: true,
            data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao listar colaboradores."
        };
    }
}

export const EditService = async (serviceId, payload) => {
    try {
        const data = await api.put(`/services/${serviceId}`, payload);

        return {
            success: true,
            data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao editar serviço."
        };
    }
}