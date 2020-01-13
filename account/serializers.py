from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from account.models import User
from rest_framework_jwt.settings import api_settings

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
        'id', 
        'username', 
        'email', 
        'sex', 
        'birthdate'
    )


class RegistrationSerializer(serializers.ModelSerializer):
    """Serializers registration requests and creates a new user."""

    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    password2 = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )

    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)

        return token

    def create(self, validated_data):
        
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})

        user = User.objects.create( 
            email = validated_data['email'],
            username = validated_data['username'],
            sex = validated_data['sex'],
            birthdate = validated_data['birthdate'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 'sex', 'birthdate', 'token']


# # Login Serializer
# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, data):
#         user = authenticate(**data)

#         if user and user.is_active:
#             return user

#         raise serializers.ValidationError("Incorrect Credentials")