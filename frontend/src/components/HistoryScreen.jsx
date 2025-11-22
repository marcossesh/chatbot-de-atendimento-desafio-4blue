import { useState, useEffect } from 'react';
import { getUserMessages } from '../services/api';
import { getDisplayName } from '../utils/helpers';

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
        <div>
            <h2>Histórico de Mensagens - Usuário {activeUser}</h2>
            {loading ? (
                <p>Carregando mensagens...</p>
            ) : messages.length === 0 ? (
                <p>Sem mensagens</p>
            ) : (
                <div>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <p><strong>{getDisplayName(msg.message_type)}:</strong> {msg.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HistoryScreen;