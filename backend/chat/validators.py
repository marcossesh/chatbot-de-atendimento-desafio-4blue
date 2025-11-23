import re
from django.core.exceptions import ValidationError


def validate_message_content(value):
    # Validação personalizada para o conteúdo da mensagem, não permite HTML ou scripts maliciosos e nem mensagens vazias.
    if not value or not value.strip():
        raise ValidationError("Mensagem não pode estar vazia.")

    if len(value) > 1000:
        raise ValidationError("Mensagem não pode ter mais de 1000 caracteres.")

    dangerous_patterns = [
        r'<script\b',
        r'<iframe\b',
        r'<embed\b',
        r'javascript:',
        r'onerror\s*=',
        r'onload\s*=',
    ]

    for pattern in dangerous_patterns:
        if re.search(pattern, value, re.IGNORECASE):
            raise ValidationError("Mensagem contém conteúdo não permitido.")

    return value