import { useState } from 'react';
import { UserSelector } from './components/UserSelector';
import { ChatScreen } from './components/ChatScreen';
import { HistoryScreen } from './components/HistoryScreen';
import './styles/App.css';

function App() {
    const [activeUser, setActiveUser] = useState('A');
    const [activeUserId, setActiveUserId] = useState(1);
    const [currentScreen, setCurrentScreen] = useState('chat');

    const handleUserChange = (user) => {
        setActiveUser(user);
        setActiveUserId(user === 'A' ? 1 : 2);
        setCurrentScreen('chat');
    };

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen);
    };

    return (
        <div className="App">
            <header className="app-header">
                <h1>Chatbot de Atendimento</h1>
            </header>

            <aside className="sidebar">
                <h2>Seletor de Usuário</h2>
                <UserSelector 
                    activeUser={activeUser} 
                    onUserChange={handleUserChange} 
                />
                
                <h2 style={{ marginTop: '32px' }}>Navegação</h2>
                <div className="nav-tabs">
                    <button 
                        className="tab-button"
                        onClick={() => handleScreenChange('chat')}
                        disabled={currentScreen === 'chat'}
                    >
                        Chat
                    </button>
                    <button 
                        className="tab-button"
                        onClick={() => handleScreenChange('history')}
                        disabled={currentScreen === 'history'}
                    >
                        Histórico
                    </button>
                </div>
            </aside>

            <main className="main-content">
                <div className="content-container">
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
            </main>
        </div>
    );
}

export default App;
