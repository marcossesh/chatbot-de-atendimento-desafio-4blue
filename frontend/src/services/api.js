import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        throw error;
    }
};

export const sendMessage = async (userId, content) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/messages/`, {
            user_id: userId,
            content: content
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        throw error;
    }
};

export const getUserMessages = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/messages/?user_id=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter mensagens do usuário:', error);
        throw error;
    }
};