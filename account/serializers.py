from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from account.models import Account


# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = Account
    fields = (
        'id', 
        'username', 
        'email', 
        'sex', 
        'birthdate'
    )


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Account
        fields = (
            'id', 
            'username', 
            'email', 
            'password', 
            'password2', 
            'sex', 
            'birthdate'
        )
        extra_kwargs = {'password': {'write_only': True}}

    # def create(self, validated_data):
    #     user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    #     return user

    def	save(self):
        account = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            sex=self.validated_data['sex'],
            birthdate=self.validated_data['birthdate'],
        )

        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords must match.'})

        account.set_password(password)
        account.save()

        user = User.objects.create_user(
            self.validated_data['username'], 
            self.validated_data['email'], 
            self.validated_data['password']
        )

        return user


# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)

        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect Credentials")