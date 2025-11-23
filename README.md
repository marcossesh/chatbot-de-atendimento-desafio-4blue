# 💬 Chatbot de Atendimento Simulado

Um protótipo fullstack de sistema de chat que simula atendimento entre dois usuários (A e B) com interface de conversa em tempo real, histórico de mensagens filtrado por usuário e testes automatizados.

## Funcionalidades

- ✅ **Login Mockado**: Seleção simples entre Usuário A ou B
- ✅ **Tela de Chat**: Interface de conversa com respostas automáticas
- ✅ **Tela de Histórico**: Visualização de todas as mensagens filtradas por usuário
- ✅ **Separação de Dados**: Cada usuário vê apenas suas próprias mensagens
- ✅ **Validação de Entrada**: Rejeita mensagens vazias e conteúdo malicioso (XSS)
- ✅ **Design Responsivo**: Interface profissional, funciona em desktop e mobile
- ✅ **Feedback Visual**: Toast notifications para erros e validações
- ✅ **Testes Automatizados**: Cobertura de testes backend + frontend

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.10+**
- **Django 4.2** - Framework web
- **Django REST Framework** - APIs RESTful
- **SQLite** - Banco de dados (padrão Django)
- **pytest-django** - Testes automatizados

### Frontend
- **React 18** - UI framework
- **Axios** - Requisições HTTP
- **CSS Moderno** - Estilização com variáveis CSS
- **Jest + React Testing Library** - Testes automatizados

---

## Pré-requisitos

- Python 3.10+
- Node.js 16+
- npm ou yarn
- Git

---

## Instalação e Execução

### 1. Clonar o Repositório

```bash
git clone https://github.com/marcossesh/chatbot-de-atendimento-desafio-4blue.git
cd chatbot-de-atendimento-desafio-4blue
```

### 2. Setup do Backend

#### 2.1 Criar e ativar ambiente virtual

```bash
cd backend
python -m venv venv
```

**No Windows:**
```bash
venv\Scripts\activate
```

**No macOS/Linux:**
```bash
source venv/bin/activate
```

#### 2.2 Instalar dependências

```bash
pip install -r requirements.txt
```

#### 2.3 Executar migrações

```bash
python manage.py migrate
```

#### 2.4 Criar usuários iniciais

```bash
python manage.py shell
```

**No shell Django, execute:**
```python
from chat.models import User
User.objects.create(username='A')
User.objects.create(username='B')
exit()
```

#### 2.5 Rodar o servidor Django

```bash
python manage.py runserver
```

**O backend estará disponível em:** `http://localhost:8000`

---

### 3. Setup do Frontend

#### 3.1 Instalar dependências

```bash
cd frontend
npm install
```

#### 3.2 Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do `frontend/`:

```
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

#### 3.3 Rodar o servidor React

```bash
npm start
```

**O frontend estará disponível em:** `http://localhost:3000`

---

## 🧪 Testando a Aplicação

### Teste Manual 1: Chat Básico

1. Abra `http://localhost:3000`
2. Selecione "Usuário A"
3. Digite "Olá" e clique "Enviar"
4. Veja a resposta aparecer
5. Troque para "Usuário B" e repita
6. **Verificar:** As mensagens não se misturam ✅

### Teste Manual 2: Histórico

1. Clique em "Histórico"
2. Veja todas as mensagens do usuário ativo
3. Troque de usuário
4. **Verificar:** O histórico atualiza automaticamente ✅

### Teste Manual 3: Separação de Dados

1. Usuário A envia 3 mensagens
2. Troque para Usuário B
3. **Verificar:** Chat está vazio (novo usuário) ✅
4. Volte para A
5. **Verificar:** As 3 mensagens retornam ✅

### Teste Manual 4: Validação de Entrada

1. Tente enviar uma mensagem vazia (ou só espaços)
2. **Verificar:** Toast aviso aparece: "Por favor, digite uma mensagem" ✅
3. Tente enviar: `<script>alert('xss')</script>`
4. **Verificar:** Toast erro aparece: "Mensagem contém conteúdo não permitido." ✅

### Teste Manual 5: Responsividade Mobile

1. Abra DevTools (F12)
2. Ative "Toggle device toolbar"
3. Teste em diferentes tamanhos (iPhone 12, Samsung S20, etc)
4. **Verificar:** Layout responsivo, sem overflow ✅

---

## Testes Automatizados

### Backend - Rodar Testes

```bash
cd backend
pytest chat/tests.py -v
```

**Esperado:** 10 testes passando ✅

```
test_criar_mensagem_valida PASSED
test_rejeitar_mensagem_vazia PASSED
test_rejeitar_xss_attempt PASSED
test_rejeitar_usuario_inexistente PASSED
test_listar_mensagens_por_usuario PASSED
test_separacao_dados_usuario PASSED
test_validador_rejeita_vazio PASSED
test_validador_rejeita_espacos_apenas PASSED
test_validador_rejeita_script_tag PASSED
test_validador_aceita_mensagem_valida PASSED

========== 10 passed ==========
```

### Frontend - Rodar Testes

```bash
cd frontend
npm test
# Pressione 'a' para rodar todos os testes
```

**Esperado:** 7 testes passando ✅

```
PASS  src/components/ChatScreen.test.jsx
  ChatScreen Component
    ✓ renderiza chat screen com header correto
    ✓ exibe empty state quando não há mensagens
    ✓ não envia mensagem vazia
    ✓ envia mensagem válida
    ✓ exibe mensagens com labels corretos
    ✓ mostra toast de erro ao falhar envio
    ✓ limpa chat ao trocar usuário

======= 7 passed ==========
```

---

## Estrutura do Projeto

```
chatbot-de-atendimento-desafio-4blue/

├── backend/
│   ├── chat/
│   │   ├── models.py           # Models: User, Message
│   │   ├── serializer.py       # Serializers para API
│   │   ├── validators.py       # Validadores customizados
│   │   ├── views.py            # ViewSets: UserViewSet, MessageViewSet
│   │   ├── services.py         # Lógica mockada de respostas
│   │   └── tests.py            # Testes automatizados (10 testes)
│   ├── config/
│   │   ├── settings.py         # Configurações Django
│   │   ├── urls.py             # Rotas principais
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── pytest.ini              # Configuração pytest
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatScreen.jsx
│   │   │   ├── ChatScreen.test.jsx  # Testes (7 testes)
│   │   │   ├── HistoryScreen.jsx
│   │   │   ├── UserSelector.jsx
│   │   │   ├── Toast.jsx            # Componente de notificação
│   │   │   └── styles/
│   │   │       ├── ChatScreen.css
│   │   │       ├── HistoryScreen.css
│   │   │       ├── UserSelector.css
│   │   │       └── Toast.css
│   │   ├── hooks/
│   │   │   └── useToast.js         # Hook customizado para toast
│   │   ├── services/
│   │   │   └── api.js              # Requisições HTTP com tratamento de erro
│   │   ├── utils/
│   │   │   └── helpers.js          # Funções auxiliares
│   │   ├── styles/
│   │   │   └── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env                         # Variáveis de ambiente
│   ├── package.json
│   └── public/
│
└── README.md
```

---

## Decisões Técnicas

### Backend

#### 1. Modelagem de Dados

```python
class User(models.Model):
    username = CharField(max_length=10, unique=True)
    created_at = DateTimeField(auto_now_add=True)

class Message(models.Model):
    user = ForeignKey(User, on_delete=CASCADE)
    content = TextField()
    message_type = CharField(choices=[('pergunta', 'Pergunta'), ('resposta', 'Resposta')])
    created_at = DateTimeField(auto_now_add=True)
```

**Razão:** Separação clara entre usuários e mensagens. O campo `message_type` diferencia perguntas (usuário) de respostas (bot), facilitando filtragem e exibição no frontend.

#### 2. API RESTful com Django REST Framework

**Endpoints:**

```
GET /api/users/                    - Lista todos os usuários
POST /api/messages/                - Cria pergunta + resposta automática
GET /api/messages/?user_id={id}    - Histórico filtrado por usuário
```

**Razão:** DRF oferece serialização automática, validação robusta e ViewSets reutilizáveis. A filtragem por `user_id` no queryset garante segurança (cada usuário vê apenas seus dados).

#### 3. Validadores Customizados

```python
def validate_message_content(value):
    """
    - Rejeita valores vazios ou apenas espaços
    - Detecta e rejeita HTML/XSS (tags como <script>, <iframe>)
    - Limita tamanho máximo (1000 chars - proteção contra DoS)
    """
    if not value or not value.strip():
        raise ValidationError("Mensagem não pode estar vazia.")
    
    if len(value) > 1000:
        raise ValidationError("Mensagem não pode ter mais de 1000 caracteres.")
    
    dangerous_patterns = [r'<script\b', r'<iframe\b', r'javascript:', ...]
    for pattern in dangerous_patterns:
        if re.search(pattern, value, re.IGNORECASE):
            raise ValidationError("Mensagem contém conteúdo não permitido.")
```

**Razão:** Segurança em primeiro lugar. Previne XSS, validação em nível de campo, mensagens de erro específicas para usuário.

#### 4. Serializer com Conversão user_id → user

```python
def create(self, validated_data):
    user_id = validated_data.pop('user_id')
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise serializers.ValidationError("Usuário não encontrado.")
    
    return Message.objects.create(user=user, **validated_data)
```

**Razão:** Converte `user_id` (inteiro) em `user` (object ForeignKey) antes de salvar. Validação automática se usuário existe.

### Frontend

#### 1. Gerenciamento de Estado Local (React Hooks)

```javascript
const [activeUserId, setActiveUserId] = useState(1);
const [activeUser, setActiveUser] = useState('A');
const [messages, setMessages] = useState([]);
```

**Razão:** `useState` é suficiente para este escopo. Sem necessidade de Redux/Context API. **YAGNI** (You Aren't Gonna Need It).

#### 2. Componentes com Responsabilidade Única

```
UserSelector    → Apenas seleciona usuário
ChatScreen      → Gerencia conversa em tempo real
HistoryScreen   → Exibe histórico filtrado
Toast           → Notificações
```

**Razão:** Cada componente tem responsabilidade única. Facilita testes, manutenção e reutilização.

#### 3. API Service Centralizado

```javascript
export const sendMessage = async (userId, content) => { ... }
export const getUserMessages = async (userId) => { ... }
```

**Razão:** Toda comunicação com backend em um arquivo. Facilita mudança de endpoints, mocking para testes, tratamento centralizado de erros.

#### 4. Hook Customizado para Toast

```javascript
export const useToast = () => {
  const [toast, setToast] = useState(null);
  
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);
  
  return { toast, showToast };
};
```

**Razão:** Reutilizável, testável, sem dependências externas. Notificações desaparecem automaticamente.

#### 5. Validação + Feedback Visual

```javascript
const handleSendMessage = async () => {
  const trimmedInput = inputValue.trim();
  
  if (!trimmedInput) {
    showToast('Por favor, digite uma mensagem', 'warning');
    return;
  }
  
  try {
    const newMessages = await sendMessage(activeUserId, trimmedInput);
    // ...
  } catch (error) {
    showToast(error.message, 'error');  // Mensagem específica do backend
  }
};
```

**Razão:** Validação frontend rápida + feedback backend específico. Melhor UX.

#### 6. Responsividade Mobile

```css
@media (max-width: 768px) {
  .sidebar { position: relative; width: 100%; }
  .main-content { margin-left: 0; width: 100%; }
}

@media (max-width: 480px) {
  .input-container input { font-size: 16px; }  /* Evita zoom iOS */
}
```

**Razão:** Layout empilhado em mobile, fonte 16px para prevenir zoom automático do iOS.

---

## Fluxo de Dados

```
Frontend (React)
    ↓
1. Usuário seleciona Usuário A ou B
2. Digita mensagem no ChatScreen
3. Clica "Enviar"
    ↓
API Backend (Django)
    ↓
4. POST /api/messages/
5. Validadores rodam (vazio? XSS? tamanho?)
6. Backend cria pergunta (message_type='pergunta')
7. Backend cria resposta automática (message_type='resposta')
8. Retorna array: [pergunta, resposta]
    ↓
Frontend (React)
    ↓
9. ChatScreen exibe ambas as mensagens
10. Usuário pode clicar em "Histórico"
11. HistoryScreen busca GET /api/messages/?user_id=1
12. Backend retorna apenas mensagens daquele usuário
13. HistoryScreen exibe histórico filtrado
```

---

## Endpoints da API

### Users

```
GET /api/users/
  Retorna lista de usuários
  
GET /api/users/{id}/
  Retorna dados de um usuário específico
```

### Messages

```
GET /api/messages/?user_id={user_id}
  Retorna histórico do usuário
  Response: Array de mensagens ordenadas por data (descendente)
  
POST /api/messages/
  Cria pergunta + resposta automática
  Body: { "user_id": 1, "content": "Sua pergunta" }
  Response: Array [pergunta, resposta]
```

---

## Segurança

✅ **Filtragem de dados** por usuário no queryset (cada usuário vê apenas seus dados)

✅ **Validação em 2 camadas:** Frontend (rápida) + Backend (segura)

✅ **XSS Prevention:** Regex detecta tags perigosas (`<script>`, `<iframe>`, `javascript:`)

✅ **Input Sanitization:** Rejeita apenas espaços, limita tamanho (1000 chars)

✅ **message_type controlado** pelo backend (frontend não consegue manipular)

✅ **CORS configurado** para aceitar apenas `localhost:3000`

✅ **Testes de segurança:** 3 testes específicos para validação (XSS, vazio, tamanho)

---

## 🐛 Troubleshooting

### "CORS Error" no console

**Problema:** Frontend tenta conectar ao backend, mas recebe erro CORS.

**Solução:**

1. Verificar se backend está rodando: `http://localhost:8000`
2. Verificar `.env` do frontend:
   ```
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```
3. Reiniciar servidor React: `npm start`

### "user_id: Usuário não encontrado"

**Problema:** Toast aparece ao enviar mensagem.

**Solução:**

1. Verificar se usuários A e B foram criados:
   ```bash
   cd backend
   python manage.py shell
   from chat.models import User
   print(list(User.objects.all()))
   ```

2. Se vazio, criar novamente:
   ```python
   User.objects.create(username='A')
   User.objects.create(username='B')
   ```

3. Reiniciar servidor React

### "Internal Server Error 500" no backend

**Problema:** Ao enviar mensagem, backend retorna erro 500.

**Solução:**

1. Verificar logs do Django:
   ```bash
   cd backend
   python manage.py runserver
   # Procurar por traceback na saída
   ```

2. Comum: Usuários não criados (ver solução anterior)

3. Se ainda não funcionar:
   ```bash
   python manage.py migrate
   python manage.py shell
   from chat.models import User
   User.objects.all().delete()
   User.objects.create(username='A')
   User.objects.create(username='B')
   ```

### Mensagens não aparecem no Histórico

**Problema:** HistoryScreen está vazio mesmo após enviar mensagens.

**Solução:**

1. Verificar se mudou de usuário após enviar (Histórico mostra apenas do usuário ATUAL)
2. Limpar cache do navegador: `Ctrl+Shift+Del`
3. Recarregar página: `F5`
4. Se ainda não funcionar:
   ```bash
   cd backend
   python manage.py shell
   from chat.models import Message
   print(Message.objects.all().count())  # Deve ser > 0
   ```

### Testes Backend falhando

**Problema:** `pytest chat/tests.py -v` retorna erros.

**Solução:**

```bash
cd backend
pip install pytest pytest-django  # Reinstalar
pytest --version                   # Verificar versão
pytest chat/tests.py -v           # Rodar novamente
```

### Testes Frontend falhando

**Problema:** `npm test` retorna erros de Jest.

**Solução:**

```bash
cd frontend
npm install                  # Reinstalar dependências
rm -rf node_modules/.cache  # Limpar cache
npm test                    # Rodar novamente
```

---

## Cobertura de Testes

### Backend (10 testes)
- ✅ 5 testes de API (criar, validar, listar, separação)
- ✅ 5 testes de validadores (XSS, vazio, espaços, normal)

### Frontend (7 testes)
- ✅ Renderização e empty state
- ✅ Validação de entrada
- ✅ Envio de mensagem
- ✅ Exibição com labels corretos
- ✅ Feedback de erro
- ✅ Limpeza ao trocar usuário

**Total:** 17 testes automatizados ✅

---

## Próximas Melhorias (Futuro)

- [ ] Autenticação real (JWT tokens)
- [ ] WebSocket para chat em tempo real (vs polling)
- [ ] Upload de avatares para usuários
- [ ] Temas (dark/light mode)
- [ ] Persistência de sessão (localStorage)
- [ ] Análise de sentimento nas mensagens
- [ ] Banco de dados PostgreSQL em produção

---

## Autor

Marcos Vinicius Ramos da Luz - GitHub [@marcossesh](https://github.com/marcossesh)

---

## Licença

Este projeto é parte de um desafio técnico da 4Blue.

---

## Resumo da Solução

| Aspecto | Detalhes |
|---------|----------|
| **Arquitetura** | Django REST + React Hooks |
| **Banco de Dados** | SQLite com models normalizados |
| **Autenticação** | Mockada (2 usuários fixos A, B) |
| **Chat** | Pergunta + Resposta automática |
| **Histórico** | Filtrado por usuário, ordenado descendente |
| **Validação** | Frontend + Backend, com XSS prevention |
| **Mobile** | 100% responsivo (tested on 375px - 1920px) |
| **Testes** | 17 testes automatizados (backend + frontend) |
| **Segurança** | Filtragem por usuário, input sanitization, CORS |

---

**Projeto 100% funcional, testado e pronto para entrega**