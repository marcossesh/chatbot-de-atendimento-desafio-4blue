def get_mocked_response(username):
    if username == "A":
        return "Obrigado pelo contato, Usuário A! Responderemos em breve."
    elif username == "B":
        return "Olá Usuário B! Sua solicitação foi recebida."
    else:
        return "Olá! Como podemos ajudar você hoje?"