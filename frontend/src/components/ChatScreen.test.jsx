import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChatScreen } from './ChatScreen';
import * as api from '../services/api';

// Mock da API
Element.prototype.scrollIntoView = jest.fn();
jest.mock('../services/api');
describe('ChatScreen Component', () => {
  const mockSendMessage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    api.sendMessage = mockSendMessage;
  });

  test('renderiza chat screen com header correto', () => {
    render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    expect(screen.getByText('Chat - Usuário A')).toBeInTheDocument();
    expect(screen.getByText('Envie sua mensagem abaixo')).toBeInTheDocument();
  });

  test('exibe empty state quando não há mensagens', () => {
    render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    expect(screen.getByText('Nenhuma mensagem ainda. Comece uma conversa!')).toBeInTheDocument();
  });

  test('não envia mensagem vazia', async () => {
    const user = userEvent.setup();
    render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendButton = screen.getByText('Enviar');
    
    // Digitar só espaços
    await user.type(input, '   ');
    await user.click(sendButton);
    
    // API não deve ser chamada
    expect(mockSendMessage).not.toHaveBeenCalled();
    // Toast de aviso deve aparecer
    expect(screen.getByText('Por favor, digite uma mensagem')).toBeInTheDocument();
  });

  test('envia mensagem válida', async () => {
    const user = userEvent.setup();
    mockSendMessage.mockResolvedValue([
      { id: 1, content: 'Olá', message_type: 'pergunta', user: 'A' },
      { id: 2, content: 'Olá! Bem-vindo.', message_type: 'resposta', user: 'A' }
    ]);
    
    render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendButton = screen.getByText('Enviar');
    
    // Digitar mensagem
    await user.type(input, 'Olá');
    await user.click(sendButton);
    
    // API deve ser chamada com dados corretos
    expect(mockSendMessage).toHaveBeenCalledWith(1, 'Olá');
    
    // Aguardar que as mensagens apareçam
    await waitFor(() => {
      expect(screen.getByText('Olá')).toBeInTheDocument();
      expect(screen.getByText('Olá! Bem-vindo.')).toBeInTheDocument();
    });
    
    // Input deve ser limpo
    expect(input.value).toBe('');
  });

  test('exibe mensagens com labels corretos', async () => {
    const user = userEvent.setup();
    mockSendMessage.mockResolvedValue([
      { id: 1, content: 'Minha pergunta', message_type: 'pergunta', user: 'A' },
      { id: 2, content: 'Resposta do bot', message_type: 'resposta', user: 'A' }
    ]);
    
    render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendButton = screen.getByText('Enviar');
    
    await user.type(input, 'Minha pergunta');
    await user.click(sendButton);
    
    // Aguardar labels
    await waitFor(() => {
      const labels = screen.getAllByText('Você');
      expect(labels.length).toBeGreaterThan(0);
    });
    
    expect(screen.getByText('Chatbot')).toBeInTheDocument();
  });

  test('mostra toast de erro ao falhar envio', async () => {
    const user = userEvent.setup();
    mockSendMessage.mockRejectedValue(new Error('Mensagem contém conteúdo não permitido.'));
    
    render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    const input = screen.getByPlaceholderText('Digite sua mensagem...');
    const sendButton = screen.getByText('Enviar');
    
    await user.type(input, '<script>');
    await user.click(sendButton);
    
    // Toast de erro deve aparecer
    await waitFor(() => {
      expect(screen.getByText('Mensagem contém conteúdo não permitido.')).toBeInTheDocument();
    });
  });

  test('limpa chat ao trocar usuário', () => {
    const { rerender } = render(<ChatScreen activeUser="A" activeUserId={1} />);
    
    // Trocar para usuário B
    rerender(<ChatScreen activeUser="B" activeUserId={2} />);
    
    expect(screen.getByText('Chat - Usuário B')).toBeInTheDocument();
  });
});