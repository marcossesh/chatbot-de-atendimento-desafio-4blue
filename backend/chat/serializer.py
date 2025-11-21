"""Diretrizes para Modificações de Código
Ao modificar qualquer código existente, siga estas diretrizes para garantir que as mudanças sejam mínimas, claras e mantenham a integridade do sistema.
Sempre leve em consideração os princípios YAGNI + SOLID + KISS + DRY ao projetar, revisar ou adicionar novo código.

Quando receber um pedido para modificar código, lembre-se: a verdadeira sabedoria não está em mostrar tudo o que você consegue construir, e sim em entender o que não deveria ser tocado.
Antes de mudar qualquer coisa, entenda o papel daquele código dentro da arquitetura maior. Cada linha existe em um contexto — uma teia de dependências, suposições e decisões históricas. Respeite esse contexto.
Busque a intervenção minimamente viável
Para cada mudança solicitada, pergunte:
Qual é a menor mudança possível que atende ao requisito?
Quais partes do sistema podem permanecer intocadas?
Como preservar os padrões já existentes enquanto atendo à necessidade?
Preserve sistemas que já funcionam
Quando for pedido para alterar código, priorize:
Primeiro: a mudança mínima e focada que resolve exatamente o que foi solicitado.
Se necessário: um refactor moderado que melhora a área imediatamente relacionada.
Só quando for explicitamente solicitado: uma reestruturação ampla e profunda.
Em caso de dúvida, peça esclarecimento de escopo
Se não estiver claro se o pedido implica uma mudança mais ampla, peça esclarecimento em vez de assumir a interpretação mais abrangente.
Lembre-se: menos é, muitas vezes, mais.
Uma única mudança precisa demonstra entendimento mais profundo do sistema do que uma reescrita completa. Mostre sua expertise pela precisão cirúrgica, não pela reconstrução total.
Se perceber melhorias possíveis além do escopo do pedido, registre-as brevemente em vez de já implementá-las.
Na sua contenção, mostre sabedoria. Na sua precisão, demonstre maestria. Valorize o poder de reverter
Se uma mudança feita não trouxer o resultado desejado, esteja pronto para revertê-la. Isso não é fracasso, é um sinal de compromisso com a integridade do sistema.
“No mundo do código, às vezes a melhor mudança é nenhuma mudança.”
Priorize clareza e legibilidade
Use nomes significativos para variáveis e funções.
Mantenha as funções curtas e focadas em uma única responsabilidade.
Formate o código de forma consistente, seguindo os guias de estilo do projeto (por exemplo, PEP 8 para Python, Prettier para JavaScript/TypeScript).
Mantenha a consistência
Siga os padrões e convenções já existentes no projeto.
Use as mesmas bibliotecas e frameworks que o projeto já utiliza, a menos que exista um motivo realmente forte para introduzir algo novo.
Implemente tratamento de erros robusto
Antecipe pontos de falha potenciais (por exemplo, requisições de rede, acesso a arquivos, entrada inválida).
Use mecanismos apropriados de tratamento de erro (por exemplo, blocos try/catch, códigos de erro, tipos específicos de exceção).
Forneça mensagens de erro informativas.
Considere segurança em cada mudança
Sanitize e valide entradas de usuário para evitar ataques de injeção (SQL, XSS etc.).
Evite colocar informações sensíveis (como chaves de API ou senhas) direto no código. Use variáveis de ambiente ou ferramentas de gestão de configuração.
Tenha atenção a possíveis vulnerabilidades ao usar bibliotecas externas.
Escreva código testável
Projete funções e módulos pensando em testabilidade (por exemplo, injeção de dependências).
Busque alta cobertura de testes para componentes críticos do sistema.
Adicione a documentação necessária
Inclua comentários para explicar lógicas complexas, suposições importantes ou trechos de código que não são óbvios.
Use formatos de documentação padrão (por exemplo, JSDoc, Docstrings) para funções, classes e módulos.
Sobre mensagens de commit:
Gere mensagens de commit seguindo a especificação Conventional Commits (por exemplo: feat(api): add user filtering).
Use o modo imperativo na descrição.
Inferir o tipo (feat, fix, chore, refactor, test, docs) e o escopo opcional a partir das mudanças realizadas.

Apenas gere códigos completos de lógica se eu pedir, eu quero implementar com ajuda e não só você implementando."""

from rest_framework import serializers
from .models import User, Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'created_at']
        read_only_fields = ['id', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'user', 'content', 'message_type', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']


