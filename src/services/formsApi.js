import { api } from "./api";

export const NewForm = async (formName, services) => {
    const payload = {
        formName,
        servicesList: [...services]
    };

    try {
        const res = await api.post('/forms', payload);

        return {
            success: true,
            data: res.data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao cadastrar formulário."
        };
    }
};

export const GetForms = async (page, limit, search) => {
    try {
        const { data } = await api.get(`/forms?page=${page || 0}&limit=${limit || 10}&search=${search || ""}`);

        return {
            success: true,
            data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao cadastrar serviço."
        };
    }
};

export const DeleteFormById = async (formId) => {
    try {
        const response = await api.delete(`/forms/${formId}`);
        return {
            success: true,
            data: true
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao cadastrar serviço."
        };
    }
}


export const GetServicesFormByIdentify = async (identify) => {
    try {
        const response = await api.get(`/forms/public/${identify}`);
        return {
            success: true,
            data: response.data
        };

    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao cadastrar serviço."
        };
    }
}

export const SubmitColaboratorPlan = async (identify, usersInfos, services) => {
    try {
        const payload = {
            user: usersInfos,
            services: services
        }

        const response = await api.post(`/forms/public/${identify}/plans`, payload);
        return {
            success: true,
            data: response.data
        };
        
    } catch (error) {
        return {
            success: false,
            message: error.response.data || "Erro ao cadastrar serviço."
        };
    }
}