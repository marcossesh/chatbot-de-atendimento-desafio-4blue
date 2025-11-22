export const getDisplayName = (messageType) => {
    const typeMap = {
    'pergunta': 'Você',
    'resposta': 'Chatbot'
    };
    return typeMap[messageType] || messageType;
}

export const getDateLabel = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Formatar apenas a data (sem hora)
    const messageDay = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayDay = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());

    if (messageDay.getTime() === todayDay.getTime()) {
        return 'Hoje';
    }
    if (messageDay.getTime() === yesterdayDay.getTime()) {
        return 'Ontem';
    }

    // Para datas antigas, mostrar no formato DD/MM/YYYY
    return messageDate.toLocaleDateString('pt-BR');
}

export const groupMessagesByDate = (messages) => {
    const grouped = {};

    messages.forEach((msg) => {
        const dateLabel = getDateLabel(msg.created_at);
        if (!grouped[dateLabel]) {
            grouped[dateLabel] = [];
        }
        grouped[dateLabel].push(msg);
    });

    // Ordenar as chaves de forma inteligente (Hoje, Ontem, depois datas antigas)
    const dateOrder = ['Hoje', 'Ontem'];
    const otherDates = Object.keys(grouped).filter(date => !dateOrder.includes(date));
    
    const sortedKeys = [...dateOrder.filter(d => d in grouped), ...otherDates];

    const result = {};
    sortedKeys.forEach(key => {
        result[key] = grouped[key];
    });

    return result;
}