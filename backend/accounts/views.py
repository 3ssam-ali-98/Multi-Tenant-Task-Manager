from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.permissions import AllowAny


# Create your views here.
def home(request):
    return HttpResponse('Welcome to Multi-Tenant Task Management System')



class RegisterView(APIView):

    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=201)

        return Response(serializer.errors, status=400)