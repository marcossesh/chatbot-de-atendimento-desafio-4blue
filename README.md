
# 💬 Chatbot de Atendimento Simulado

  

Um protótipo fullstack de sistema de chat que simula atendimento entre dois usuários (A e B) com interface de conversa em tempo real e histórico de mensagens filtrado por usuário.

  

## 🎯 Funcionalidades

  

- ✅ **Login Mockado**: Seleção simples entre Usuário A ou B

- ✅ **Tela de Chat**: Interface de conversa com respostas automáticas

- ✅ **Tela de Histórico**: Visualização de todas as mensagens filtradas por usuário

- ✅ **Separação de Dados**: Cada usuário vê apenas suas próprias mensagens

- ✅ **Design Responsivo**: Interface profissional e intuitiva

  

---

  

## 🛠️ Tecnologias Utilizadas

  

### Backend

- **Python 3.10+**

- **Django 4.2**

- **Django REST Framework** - APIs RESTful

- **SQLite** - Banco de dados (padrão Django)

  

### Frontend

- **React 18**

- **Axios** - Requisições HTTP

- **CSS Moderno** - Estilização com variáveis CSS

  

---

  

## 📋 Pré-requisitos

  

- Python 3.10+

- Node.js 16+

- npm ou yarn

- Git

  

---

  

## 🚀 Instalação e Execução

  

### 1. Clonar o Repositório

  

```bash

git clone https://github.com/marcossesh/chatbot-de-atendimento-desafio-4blue.git

cd chatbot-de-atendimento-desafio-4blue

```

### 2. Setup do Backend

- 2.1 Criar e ativar ambiente virtual

```

cd backend

python -m venv venv

```
## No Windows
```
venv\Scripts\activate
```
## No macOS/Linux
```
source venv/bin/activate
```
### 2.2 Instalar dependências
```
pip install -r requirements.txt
```
### 2.3 Executar migrações
  ```
python manage.py migrate
```

### 2.4 Criar usuários iniciais
```
python manage.py shell
```

### No shell Django, execute:
```
from chat.models import User
User.objects.create(username='A')
User.objects.create(username='B')
exit()
  ```

### 2.5 Rodar o servidor Django
```
python manage.py runserver
```
### O backend estará disponível em: http://localhost:8000

  

### 3. Setup do Frontend

### 3.1 Instalar dependências
```
cd frontend
npm install
```
### Configurar variáveis de ambiente
Crie um arquivo .env na raiz do frontend/:
```
REACT_APP_API_BASE_URL=http://localhost:8000/api
```
# 📁 Estrutura do Projeto

  
```
chatbot-de-atendimento-desafio-4blue/

├── backend/
│ ├── chat/
│ │ ├── models.py # Models: User, Message
│ │ ├── serializer.py # Serializers para API
│ │ ├── views.py # ViewSets: UserViewSet, MessageViewSet
│ │ └── services.py # Lógica mockada de respostas
│ ├── config/
│ │ ├── settings.py # Configurações Django
│ │ ├── urls.py # Rotas principais
│ │ └── wsgi.py
│ ├── manage.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChatScreen.jsx
│ │ │ ├── HistoryScreen.jsx
│ │ │ ├── UserSelector.jsx
│ │ │ └── styles/
│ │ │ ├── ChatScreen.css
│ │ │ ├── HistoryScreen.css
│ │ │ └── UserSelector.css
│ │ ├── services/
│ │ │ └── api.js # Requisições HTTP
│ │ ├── utils/
│ │ │ └── helpers.js # Funções auxiliares
│ │ ├── App.jsx # Componente raiz
│ │ └── index.js
│ ├── .env # Variáveis de ambiente
│ ├── package.json
│ └── public/
│
└── README.mdchatbot-de-atendimento-desafio-4blue/
├── backend/
│ ├── chat/
│ │ ├── models.py # Models: User, Message
│ │ ├── serializer.py # Serializers para API
│ │ ├── views.py # ViewSets: UserViewSet, MessageViewSet
│ │ └── services.py # Lógica mockada de respostas
│ ├── config/
│ │ ├── settings.py # Configurações Django
│ │ ├── urls.py # Rotas principais
│ │ └── wsgi.py
│ ├── manage.py
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ChatScreen.jsx
│ │ │ ├── HistoryScreen.jsx
│ │ │ ├── UserSelector.jsx
│ │ │ └── styles/
│ │ │ ├── ChatScreen.css
│ │ │ ├── HistoryScreen.css
│ │ │ └── UserSelector.css
│ │ ├── services/
│ │ │ └── api.js
│ │ ├── utils/
│ │ │ └── helpers.js
│ │ ├── App.jsx
│ │ └── index.js
│ ├── .env
│ ├── package.json
│ └── public/
│
└── README.md
```
# 💡 Decisões Técnicas

## Backend

1. Modelagem de Dados

  

# Models: User e Message
```
class User(models.Model):

username = CharField(max_length=10, unique=True)

created_at = DateTimeField(auto_now_add=True)

  

class Message(models.Model):

user = ForeignKey(User, on_delete=CASCADE)

content = TextField()

message_type = CharField(choices=[('pergunta', 'Pergunta'), ('resposta', 'Resposta')])

created_at = DateTimeField(auto_now_add=True)

 ```

- Razão: Separação clara entre usuários e mensagens. O campo message_type diferencia perguntas (usuário) de respostas (bot), facilitando a filtragem e exibição no frontend.

  

### 2. API RESTful com Django REST Framework


Endpoints:

```
GET /api/users/ - Lista todos os usuários

POST /api/messages/ - Cria pergunta + resposta automática

GET /api/messages/?user_id={id} - Histórico filtrado por usuário
```

- Razão: DRF oferece serialização automática, validação robusta e ViewSets reutilizáveis. A filtragem por user_id no queryset garante segurança (cada usuário vê apenas seus dados).

### 3. Create Custom - Lógica de Pergunta e Resposta
```
def create(self, request, *args, **kwargs):

request.data['message_type'] = 'pergunta'

response = super().create(request, *args, **kwargs)

pergunta = Message.objects.get(id=response.data['id'])

resposta_texto = get_mocked_response(pergunta.user.username)

resposta = Message.objects.create(

user=pergunta.user,

content=resposta_texto,

message_type='resposta'

)

messages = [pergunta, resposta]

serializer = MessageSerializer(messages, many=True)

return Response(serializer.data)

```

- Razão: Ao enviar uma mensagem, o backend automaticamente cria a resposta. Retorna ambas em um array (ordem cronológica) para melhor UX no frontend. Evita requisições desnecessárias.

  

### 4. Serializer com message_type Flexível

  
```
message_type = serializers.CharField(required=False)

read_only_fields = ['id', 'user', 'created_at', 'updated_at']
  ```

- Razão: message_type é required=False para permitir controle do backend (força sempre 'pergunta' no create). Assim, o frontend não precisa conhecer a lógica de tipos.

  

## Frontend

### 1. Gerenciamento de Estado Local

```
const [activeUserId, setActiveUserId] = useState(1);

const [activeUser, setActiveUser] = useState('A');

const [messages, setMessages] = useState([]);

 ```

- Razão: React hooks (useState) são suficientes para este escopo. Sem necessidade de Redux/Context API pois o estado é simples e local. YAGNI.

### 2. Separação de Responsabilidades - Componentes

  
```
UserSelector: Apenas seleciona usuário

ChatScreen: Gerencia conversa em tempo real

HistoryScreen: Exibe histórico filtrado

 ```

- Razão: Cada componente tem uma responsabilidade única. Facilita testes, manutenção e reutilização.

  

### 3. API Service Centralizado

  

### api.js
```
export const sendMessage = async (userId, content) => { ... }

export const getUserMessages = async (userId) => { ... }
```
- Razão: Toda comunicação com backend em um arquivo. Facilita mudança de endpoints, mocking para testes, tratamento centralizado de erros.

  

### 4. Estilização com CSS Variáveis
```
:root {

--primary-blue: #0052cc;

--bg-light: #f5f7fa;

--text-dark: #1a1f36;

}
```
- Razão: Manutenção simplificada. Mudanças de tema em um único lugar. Evita repetição de cores hardcoded.

### 5. Ordem Invertida no Histórico
```
Object.entries(groupMessagesByDate(messages))

.reverse()

.map(([dateLabel, msgs]) => (

msgs.reverse().map((msg) => ...)

))
```

- Razão: Mensagens mais recentes acima (padrão WhatsApp/Telegram). Melhora UX, usuário vê contexto recente primeiro.

### 6. Filtragem e Separação Visual por Tipo

  
```
const isUserMessage = msg.message_type === 'pergunta';

return (

<div className={`message ${isUserMessage ? 'user' : 'bot'}`}>

<div  className="message-label">

{isUserMessage ? 'Você' : 'Chatbot'}

</div>

</div>

);
```
  

- Razão: message_type é a única fonte da verdade. CSS .user (direita, azul) e .bot (esquerda, cinza) mantêm padrão visual consistente. Labels "Você" vs "Chatbot" deixam claro quem fala.

  

## 🔄 Fluxo de Dados

  
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

5. Backend cria pergunta (message_type='pergunta')

6. Backend cria resposta automática (message_type='resposta')

7. Retorna array: [pergunta, resposta]

↓

Frontend (React)

↓

8. ChatScreen exibe ambas as mensagens

9. Usuário pode clicar em "Histórico"

10. HistoryScreen busca GET /api/messages/?user_id=1

11. Backend retorna apenas mensagens daquele usuário

12. HistoryScreen exibe histórico filtrado
```
## 🧪 Testando a Aplicação

### 1. Chat Básico

Abra http://localhost:3000

Selecione "Usuário A"

Digite "Olá" e clique "Enviar"

Veja a resposta aparecer

Troque para "Usuário B" e repita

As mensagens não se misturam ✅

  

### 2. Histórico

Clique em "Histórico"

Veja todas as mensagens do usuário ativo

Troque de usuário

O histórico atualiza automaticamente ✅

  

### 3. Separação de Dados


Usuário A envia 3 mensagens

Troque para Usuário B

Chat está vazio (novo usuário) ✅

Volte para A

As 3 mensagens retornam ✅

  

## 📚 Endpoints da API

  
### Users

GET /api/users/

- Retorna lista de usuários

  

GET /api/users/{id}/

- Retorna dados de um usuário específico

  

### Messages

  

GET /api/messages/?user_id={user_id}

- Retorna histórico do usuário

- Response: Array de mensagens ordenadas por data (descendente)

  

POST /api/messages/

- Cria pergunta + resposta automática

- Body: { "user_id": 1, "content": "Sua pergunta" }

- Response: Array [pergunta, resposta]

  

## 🔒 Segurança

  

✅ Filtragem de dados por usuário no queryset

✅ Validação automática do serializer

✅ message_type controlado pelo backend

✅ CORS configurado para aceitar localhost:3000

  

## 📝 Commits Principais

  

chore: initial project setup and configuration

chore: backend initial config

feat: models and serializer created

feat: backend tested and frontend created

feat: styling with CSS

fix: api flux now creates an array

fix: filter in views between user a and b

fix: removed perform_create() because user history was duppling

fix: several bugs in frontend rendering

  

## 📧 Autor

  

Marcos Vinicius Ramos da Luz - GitHub [marcossesh](https://github.com/marcossesh)

  

## 📄 Licença

Este projeto é parte de um desafio técnico.
