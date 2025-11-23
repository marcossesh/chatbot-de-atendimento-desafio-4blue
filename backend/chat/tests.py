import pytest
from django.contrib.auth.models import User as DjangoUser
from rest_framework.test import APIClient
from rest_framework import status
from chat.models import User, Message


@pytest.mark.django_db
class TestMessageAPI:
    #Testes para a API de mensagens
    
    def setup_method(self):
        #Setup executado antes de cada teste
        self.client = APIClient()
        self.user_a = User.objects.create(username='A')
        self.user_b = User.objects.create(username='B')
    
    def test_criar_mensagem_valida(self):
        #Teste: Criar uma mensagem válida
        payload = {
            'user_id': self.user_a.id,
            'content': 'Olá, tudo bem?'
        }
        response = self.client.post('/api/messages/', payload, format='json')
        
        # Esperado: Status 201 (Created)
        assert response.status_code == status.HTTP_201_CREATED
        # Esperado: Retorna pergunta + resposta (2 mensagens)
        assert len(response.data) == 2
        # Primeira é pergunta do usuário
        assert response.data[0]['message_type'] == 'pergunta'
        # Segunda é resposta do bot
        assert response.data[1]['message_type'] == 'resposta'
        # Ambas vinculadas ao usuário correto
        assert response.data[0]['user'] == 'A'
        assert response.data[1]['user'] == 'A'
    
    def test_rejeitar_mensagem_vazia(self):
        #Teste: Rejeitar mensagem vazia
        payload = {
            'user_id': self.user_a.id,
            'content': '   '  # Só espaços
        }
        response = self.client.post('/api/messages/', payload, format='json')
        
        # Esperado: Status 400 (Bad Request)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        # Esperado: Retorna mensagem de erro
        assert 'content' in response.data
    
    def test_rejeitar_xss_attempt(self):
        #Teste: Rejeitar conteúdo com XSS
        payload = {
            'user_id': self.user_a.id,
            'content': '<script>alert("xss")</script>'
        }
        response = self.client.post('/api/messages/', payload, format='json')
        
        # Esperado: Status 400 (Bad Request)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        # Esperado: Retorna mensagem de erro sobre conteúdo não permitido
        assert 'content' in response.data
    
    def test_rejeitar_usuario_inexistente(self):
        #Teste: Rejeitar mensagem de usuário que não existe#
        payload = {
            'user_id': 999,  # Usuário não existe
            'content': 'Olá'
        }
        response = self.client.post('/api/messages/', payload, format='json')
        
        # Esperado: Status 400 (Bad Request)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
    
    def test_listar_mensagens_por_usuario(self):
        #Teste: Listar apenas mensagens do usuário A
        # Criar 2 mensagens para usuário A
        Message.objects.create(user=self.user_a, content='Msg A1', message_type='pergunta')
        Message.objects.create(user=self.user_a, content='Resp A1', message_type='resposta')
        
        # Criar 2 mensagens para usuário B
        Message.objects.create(user=self.user_b, content='Msg B1', message_type='pergunta')
        Message.objects.create(user=self.user_b, content='Resp B1', message_type='resposta')
        
        # Buscar apenas mensagens de A
        response = self.client.get(f'/api/messages/?user_id={self.user_a.id}')
        
        # Esperado: Status 200 (OK)
        assert response.status_code == status.HTTP_200_OK
        # Esperado: Retorna apenas 2 mensagens (de A)
        assert len(response.data) == 2
        # Todas pertencem a A
        for msg in response.data:
            assert msg['user'] == 'A'
    
    def test_separacao_dados_usuario(self):
        #Teste: Garantir que usuários não veem dados um do outro#
        # Criar mensagem para A
        Message.objects.create(user=self.user_a, content='Secret A', message_type='pergunta')
        
        # Buscar dados de B
        response = self.client.get(f'/api/messages/?user_id={self.user_b.id}')
        
        # Esperado: Status 200
        assert response.status_code == status.HTTP_200_OK
        # Esperado: Retorna 0 mensagens (B não tem nada)
        assert len(response.data) == 0


@pytest.mark.django_db
class TestMessageValidators:
    #Testes para validadores customizados
    
    def test_validador_rejeita_vazio(self):
        #Teste: Validador rejeita string vazia
        from chat.validators import validate_message_content
        from django.core.exceptions import ValidationError
        
        with pytest.raises(ValidationError):
            validate_message_content('')
    
    def test_validador_rejeita_espacos_apenas(self):
        #Teste: Validador rejeita apenas espaços
        from chat.validators import validate_message_content
        from django.core.exceptions import ValidationError
        
        with pytest.raises(ValidationError):
            validate_message_content('   ')
    
    def test_validador_rejeita_script_tag(self):
        #Teste: Validador rejeita <script>
        from chat.validators import validate_message_content
        from django.core.exceptions import ValidationError
        
        with pytest.raises(ValidationError):
            validate_message_content('<script>alert("xss")</script>')
    
    def test_validador_aceita_mensagem_valida(self):
        #Teste: Validador aceita mensagem normal
        from chat.validators import validate_message_content
        
        # Não deve lançar exceção
        result = validate_message_content('Olá, tudo bem?')
        assert result == 'Olá, tudo bem?'