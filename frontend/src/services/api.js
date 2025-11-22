import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/users/');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        throw error;
    }
};

export const sendMessage = async (userId, content) => {
    try {
        const response = await apiClient.post('/messages/', {
            user_id: userId,
            content: content
        });
        // Garantir que sempre retorna um array
        return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        throw error;
    }
};

export const getUserMessages = async (userId) => {
    try {
        const response = await apiClient.get(`/messages/?user_id=${userId}`);
        return Array.isArray(response.data) ? response.data : response.data.results || [];
    } catch (error) {
        console.error('Erro ao obter mensagens do usuário:', error);
        throw error;
    }
};