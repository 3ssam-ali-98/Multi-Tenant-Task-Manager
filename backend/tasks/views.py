from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from organizations.permissions import *
from organizations.views import get_org
from organizations.models import *




# Create your views here.
def get_role(request, org_id):
    get_org(request, org_id)
    return Membership.objects.filter(organization__pk=org_id, user=request.user).values_list('role', flat=True).first()

def get_task(request, org_id, task_id):
    role = get_role(request, org_id)
    if role == 'admin':
        return get_object_or_404(Task, pk=task_id, organization__pk=org_id)
    else:
        member = Membership.objects.filter(organization__pk=org_id, user=request.user).first()
        return get_object_or_404(Task, pk=task_id, organization__pk=org_id, assigned_to=member)
    



class TaskList(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,IsOrganizationAdmin]
        return [permission() for permission in permission_classes]
    
    def get(self, request, org_id):
        role = get_role(request, org_id)
        
        if role == 'admin':
            tasks = Task.objects.filter(organization__pk=org_id)
        else:
            member = Membership.objects.filter(organization__pk=org_id, user=request.user).first()
            tasks = Task.objects.filter(organization__pk=org_id, assigned_to=member)
        
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    def post(self, request, org_id):
        organization = get_org(request, org_id)
        serializer = TaskSerializer(data=request.data, context={'request': request, 'organization': organization},)
        if serializer.is_valid():
            member = Membership.objects.filter(organization__pk=org_id, user=request.user).first()
            serializer.save(organization=organization, created_by=member)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    
class TaskDetails(APIView):
    def get_permissions(self):
        if self.request.method == 'DELETE':
            permission_classes = [IsAuthenticated, IsOrganizationAdmin]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get(self, request, org_id, task_id):
        task = get_task(request, org_id, task_id)
        serializer = TaskSerializer(task)
        return Response(serializer.data)
    
    def patch(self, request, org_id, task_id):
        task = get_task(request, org_id, task_id)
        serializer = TaskSerializer(task, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, org_id, task_id):
        task = get_object_or_404(Task, pk=task_id, organization__pk=org_id)
        task.delete()
        return Response(status=204)