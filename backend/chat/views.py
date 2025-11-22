from django.shortcuts import render
from rest_framework import viewsets
from chat.services import get_mocked_response
from .models import User, Message
from .serializer import UserSerializer, MessageSerializer
from rest_framework.response import Response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def perform_create(self, serializer):
        pergunta = serializer.save()

        resposta_texto = get_mocked_response(pergunta.user.username)
        Message.objects.create(
            user=pergunta.user,
            content=resposta_texto,
            message_type='resposta'
        )
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user_id = request.data.get('user_id')
        pergunta_e_resposta = Message.objects.filter(user_id=user_id).order_by('-created_at')[:2]
        pergunta_serializada = MessageSerializer(pergunta_e_resposta[1])
        resposta_serializada = MessageSerializer(pergunta_e_resposta[0])
        return Response({
            'pergunta': pergunta_serializada.data,
            'resposta': resposta_serializada.data
        })
    
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return Message.objects.filter(user_id=user_id).order_by('-created_at')
        return super().get_queryset()
