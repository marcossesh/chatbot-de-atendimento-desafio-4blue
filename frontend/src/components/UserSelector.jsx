import './styles/UserSelector.css';

export const UserSelector = ({ activeUser, onUserChange }) => {
    return (
        <div className="user-selector">
            <button 
                className={`user-button ${activeUser === 'A' ? 'active' : ''}`}
                onClick={() => onUserChange('A')}
            >
                Usuário A
            </button>
            <button 
                className={`user-button ${activeUser === 'B' ? 'active' : ''}`}
                onClick={() => onUserChange('B')}
            >
                Usuário B
            </button>
        </div>
    );
};