export const UserSelector = ({ activeUser, onUserChange }) => {
    return (
        <div>
            <button 
                onClick={() => onUserChange('A')}
                style={{ fontWeight: activeUser === 'A' ? 'bold' : 'normal' }}
            >
                Usuário A
            </button>
            <button 
                onClick={() => onUserChange('B')}
                style={{ fontWeight: activeUser === 'B' ? 'bold' : 'normal' }}
            >
                Usuário B
            </button>
        </div>
    );
};