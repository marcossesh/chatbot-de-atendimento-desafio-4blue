import { useState } from 'react';
import { sendMessage } from '../services/api';
import { getDisplayName } from '../utils/helpers';
import './styles/ChatScreen.css';

export const ChatScreen = ({ activeUser, activeUserId }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        setLoading(true);
        try {
            const newMessage = await sendMessage(activeUserId, inputValue);
            // newMessage pode ser um array [pergunta, resposta] ou um objeto
            const messagesToAdd = Array.isArray(newMessage) ? newMessage : [newMessage];
            setMessages([
                ...messages, 
                ...messagesToAdd
            ]);
            setInputValue('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
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

    return (
        <div className="chat-screen">
            <div className="chat-header">
                <h2>Chat - Usuário {activeUser}</h2>
                <p>Envie sua mensagem abaixo</p>
            </div>
            
            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">💬</div>
                        <p>Nenhuma mensagem ainda. Comece uma conversa!</p>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`message ${msg.message_type === 'pergunta' ? 'user' : 'bot'}`}>
                            <div className="message-bubble">
                                <div className="message-label">
                                    {getDisplayName(msg.message_type)}
                                </div>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))
                )}
                {loading && (
                    <div className="message bot">
                        <div className="message-bubble">
                            <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}
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