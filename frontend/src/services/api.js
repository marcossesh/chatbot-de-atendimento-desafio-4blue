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
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        // Extrair mensagem de erro específica do backend
        const errorMessage = error.response?.data?.content?.[0] || 
                            error.response?.data?.detail || 
                            'Erro ao enviar mensagem. Tente novamente.';
        const customError = new Error(errorMessage);
        customError.status = error.response?.status;
        throw customError;
    }
};

export const getUserMessages = async (userId) => {
    try {
        const response = await apiClient.get(`/messages/?user_id=${userId}`);
        let data = Array.isArray(response.data) ? response.data : response.data.results || [];
        
        // Garantir que todas as mensagens têm message_type
        data = data.map(msg => ({
            ...msg,
            message_type: msg.message_type || 'resposta' // fallback para resposta se não tiver type
        }));
        
        return data;
    } catch (error) {
        console.error('Erro ao obter mensagens do usuário:', error);
        throw error;
    }
};