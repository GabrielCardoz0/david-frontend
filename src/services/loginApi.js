import { api } from "./api";

export const LoginApi = async (login, password) => {
    try {
        const res = await api.post('/login', { login, password });

        return {
            success: true,
            data: res.data
        };

    } catch (error) {

        return {
            success: false,
            message: error.response.data || "Erro ao realizar login."
        };
    }
}