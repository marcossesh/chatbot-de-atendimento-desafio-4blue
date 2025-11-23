import { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/api';
import { useToast } from '../hooks/useToast';
import { Toast } from './Toast';
import './styles/ChatScreen.css';

export const ChatScreen = ({ activeUser, activeUserId }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { toast, showToast } = useToast();

    useEffect(() => {
        setMessages([]);
        setInputValue('');
    }, [activeUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        const trimmedInput = inputValue.trim();
        
        if (!trimmedInput) {
            showToast('Por favor, digite uma mensagem', 'warning');
            return;
        }

        setLoading(true);
        try {
            const newMessages = await sendMessage(activeUserId, trimmedInput);
            setMessages([
                ...messages, 
                ...newMessages
            ]);
            setInputValue('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            // Usar mensagem de erro específica do backend
            showToast(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !loading) {
            handleSendMessage();
        }
    };

    const suggestedMessages = [
        'Olá',
        'Como você funciona?',
        'Preciso de ajuda',
        'Falar com atendente'
    ];

    return (
        <div className="chat-screen">
            <Toast message={toast?.message} type={toast?.type} />
            
            <div className="chat-header">
                <h2>Chat - Usuário {activeUser}</h2>
                <p>Envie sua mensagem abaixo</p>
            </div>
            
            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">💬</div>
                        <p>Nenhuma mensagem ainda. Comece uma conversa!</p>
                        <div className="suggested-messages">
                            {suggestedMessages.map((suggestion, index) => (
                                <button
                                    key={index}
                                    className="suggestion-chip"
                                    onClick={() => {
                                        setInputValue(suggestion);
                                    }}
                                    disabled={loading}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg, index) => {
                        const isUserMessage = msg.message_type === 'pergunta';
                        return (
                            <div key={index} className={`message ${isUserMessage ? 'user' : 'bot'}`}>
                                <div className="message-bubble">
                                    <div className="message-label">
                                        {isUserMessage ? 'Você' : 'Chatbot'}
                                    </div>
                                    <p>{msg.content}</p>
                                </div>
                            </div>
                        );
                    })
                )}
                {loading && (
                    <div className="message bot">
                        <div className="message-bubble">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-container">
                <input 
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Digite sua mensagem..."
                    disabled={loading}
                />
                <button 
                    className="send-button"
                    onClick={handleSendMessage}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};