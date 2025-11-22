import { useState, useEffect, useRef } from 'react';
import { getUserMessages } from '../services/api';
import { groupMessagesByDate } from '../utils/helpers';
import './styles/HistoryScreen.css';

export const HistoryScreen = ({ activeUser, activeUserId }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);
    const isAutoScrollEnabledRef = useRef(true);

    const handleScroll = () => {
        if (!messagesContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
        
        const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;
        
        isAutoScrollEnabledRef.current = isNearBottom;
    };

    const scrollToBottom = () => {
        if (isAutoScrollEnabledRef.current && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const userMessages = await getUserMessages(activeUserId);
                setMessages(userMessages);
                
                isAutoScrollEnabledRef.current = true;
                
                setTimeout(scrollToBottom, 100);
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

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                <div 
                    className="history-messages"
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                >
                    {Object.entries(groupMessagesByDate(messages)).reverse().map(([dateLabel, msgs]) => (
                        <div key={dateLabel}>
                            <div className="date-divider">
                                <span className="date-label">{dateLabel}</span>
                            </div>
                            {msgs.reverse().map((msg, index) => {
                                const isUserMessage = msg.message_type === 'pergunta';
                                return (
                                    <div 
                                        key={`${dateLabel}-${index}`} 
                                        className={`history-message ${isUserMessage ? 'user' : 'bot'}`}
                                    >
                                        <div className="message-bubble">
                                            <div className="message-label">
                                                {isUserMessage ? 'Você' : 'Chatbot'}
                                            </div>
                                            <p className="message-content">{msg.content}</p>
                                            <p className="message-timestamp">
                                                {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            )}
        </div>
    );
};

export default HistoryScreen;