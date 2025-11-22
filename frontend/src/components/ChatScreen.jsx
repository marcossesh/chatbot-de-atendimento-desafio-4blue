import { useState } from 'react';
import { sendMessage } from '../services/api';
import { getDisplayName } from '../utils/helpers';

export const ChatScreen = ({ activeUser, activeUserId }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        setLoading(true);
        try {
            const newMessage = await sendMessage(activeUserId, inputValue);
            setMessages([
                ...messages, 
                newMessage.pergunta, 
                newMessage.resposta
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

    return (
        <div>
            <h2>Chat - Usuário {activeUser}</h2>
            
            {/* Lista de mensagens */}
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p><strong>{getDisplayName(msg.message_type)}:</strong> {msg.content}</p>
                    </div>
                ))}
            </div>

            {/* Input + Botão */}
            <div>
                <input 
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Digite sua mensagem..."
                    disabled={loading}
                />
                <button 
                    onClick={handleSendMessage}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
        </div>
    );
};