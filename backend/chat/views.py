from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from chat.services import get_mocked_response
from .models import User, Message
from .serializer import UserSerializer, MessageSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    pagination_class = None  # Desabilitar paginação

    def get_queryset(self):
        queryset = Message.objects.all().order_by('-created_at')
        user_id = self.request.query_params.get('user_id')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        request.data['message_type'] = 'pergunta'
        response = super().create(request, *args, **kwargs)
        
        pergunta_id = response.data['id']
        pergunta = Message.objects.get(id=pergunta_id)
        
        resposta_texto = get_mocked_response(pergunta.user.username)
        resposta = Message.objects.create(
            user=pergunta.user,
            content=resposta_texto,
            message_type='resposta'
        )
        
        messages = [pergunta, resposta]
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
