from django.db import models

MESSAGE_TYPE_CHOICES = [
    ('pergunta', 'Pergunta'),
    ('resposta', 'Resposta'),
]

class User(models.Model):
    username = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages')
    content = models.TextField()
    message_type = models.CharField(max_length=50, choices=MESSAGE_TYPE_CHOICES, default='resposta')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.message_type} - {self.created_at}"