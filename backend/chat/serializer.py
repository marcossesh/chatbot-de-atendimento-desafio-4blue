from rest_framework import serializers
from .models import User, Message
from .validators import validate_message_content


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'created_at']
        read_only_fields = ['id', 'created_at']


class MessageSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    user_id = serializers.IntegerField(write_only=True)
    content = serializers.CharField(
        max_length=1000,
        validators=[validate_message_content]
    )
    message_type = serializers.CharField(required=False)
    
    class Meta:
        model = Message
        fields = ['id', 'user', 'user_id', 'content', 'message_type', 'created_at', 'updated_at']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        #Customizar create para garantir que user_id é convertido para user object
        user_id = validated_data.pop('user_id')
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("Usuário não encontrado.")
        
        return Message.objects.create(
            user=user,
            **validated_data
        )