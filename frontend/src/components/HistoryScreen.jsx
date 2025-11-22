import { useState, useEffect } from 'react';
import { getUserMessages } from '../services/api';
import { getDisplayName } from '../utils/helpers';
import './styles/HistoryScreen.css';

export const HistoryScreen = ({ activeUser, activeUserId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const userMessages = await getUserMessages(activeUserId);
                setMessages(userMessages);
            } catch (error) {
                console.error('Erro ao buscar mensagens:', error);
            } finally {
                setLoading(false);
            }
        };

        if (activeUserId) {
            fetchMessages();
        }
    }, [activeUserId]);

    return (
        <div className="history-screen">
            <div className="history-header">
                <h2>Histórico de Mensagens - Usuário {activeUser}</h2>
                <p>Visualize todas as suas conversas</p>
            </div>
            
            {loading ? (
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Carregando mensagens...</p>
                </div>
            ) : messages.length === 0 ? (
                <div className="empty-history">
                    <div className="empty-icon">📭</div>
                    <p className="empty-text">Nenhuma mensagem encontrada</p>
                    <p className="empty-subtext">Comece uma conversa na aba Chat</p>
                </div>
            ) : (
                <div className="history-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`history-message ${msg.message_type}`}>
                            <span className="message-type">
                                {getDisplayName(msg.message_type)}
                            </span>
                            <p className="message-content">{msg.content}</p>
                            <p className="message-timestamp">
                                {new Date(msg.created_at).toLocaleString('pt-BR')}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryScreen;