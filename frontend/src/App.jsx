import { useState } from 'react';
import { UserSelector } from './components/UserSelector';
import { ChatScreen } from './components/ChatScreen';
import HistoryScreen from './components/HistoryScreen';

export const App = () => {
    const [activeUser, setActiveUser] = useState('A'); // "A" ou "B"
    const [activeUserId, setActiveUserId] = useState(1); // 1 ou 2
    const [currentScreen, setCurrentScreen] = useState('chat'); // "chat" ou "history"

    const handleUserChange = (user) => {
        setActiveUser(user);
        setActiveUserId(user === 'A' ? 1 : 2);
        setCurrentScreen('chat'); // Reseta para chat ao mudar usuário
    };

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    };

    return (
        <div>
            <h1>Chatbot de Atendimento</h1>
            <UserSelector 
                activeUser={activeUser} 
                onUserChange={handleUserChange} 
            />
            <div>
                <button 
                    onClick={() => handleScreenChange('chat')}
                    disabled={currentScreen === 'chat'}
                >
                    Chat
                </button>
                <button 
                    onClick={() => handleScreenChange('history')}
                    disabled={currentScreen === 'history'}
                >
                    Histórico
                </button>
            </div>
            <div>
                {currentScreen === 'chat' ? (
                    <ChatScreen 
                        activeUser={activeUser} 
                        activeUserId={activeUserId} 
                    />
                ) : (
                    <HistoryScreen 
                        activeUser={activeUser} 
                        activeUserId={activeUserId} 
                    />
                )}
            </div>
        </div>
    );
};

export default App;