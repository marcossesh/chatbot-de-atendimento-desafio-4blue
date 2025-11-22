export const getDisplayName = (messageType) => {
    const typeMap = {
    'pergunta': 'Você',
    'resposta': 'Chatbot'
    };
    return typeMap[messageType] || messageType;
}