from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .permissions import *
from django.contrib.auth import get_user_model


 
# Create your views here.
User = get_user_model()
    
def get_org(request, org_id):
    return get_object_or_404(Organization, pk=org_id, memberships__user=request.user)
    
def get_member(request, org_id, member_id):
    get_org(request, org_id)
    return get_object_or_404(Membership, pk=member_id, organization__pk=org_id)



class OrganizationList(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        organizations = Organization.objects.filter(memberships__user=request.user)
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)
    
    
    
    def post(self, request):
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            organization = serializer.save(owner=request.user)
            
            Membership.objects.create(user=request.user, organization=organization, role='admin')
            
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    
class OrganizationDetail(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,IsOrganizationOwner]
        return [permission() for permission in permission_classes]
        
    def get(self, request, org_id):
        organization = get_org(request, org_id)
        serializer = OrganizationSerializer(organization)
        return Response(serializer.data)
    
    def patch(self, request, org_id):
        organization = get_org(request, org_id)
        serializer = OrganizationSerializer(organization, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, org_id):
        organization = get_org(request, org_id)
        organization.delete()
        return Response(status=204)

            
            
class MembershipList(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,IsOrganizationAdmin]
        return [permission() for permission in permission_classes]
    
    def get(self, request, org_id):
        organization = get_org(request, org_id)
        memberships = Membership.objects.filter(organization = organization)
        serializer = MembershipSerializer(memberships, many=True)
        return Response(serializer.data)
    
    
    def post(self, request, org_id):
        organization = get_org(request, org_id)
        email = request.data.get('email')
        if email is None:
            raise serializers.ValidationError(f"Please enter an Email")
        user = get_object_or_404(User, email = email)
        serializer = MembershipSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(organization=organization, user=user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
            
            
class MembershipDetail(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,IsOrganizationOwner]
        return [permission() for permission in permission_classes]
    
    
    def get(self, request, org_id, member_id):
        membership = get_member(request, org_id, member_id)
        serializer = MembershipSerializer(membership)
        return Response(serializer.data)
    
    def patch(self, request, org_id, member_id):
        membership = get_member(request, org_id, member_id)
        serializer = MembershipSerializer(membership, data = request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def delete(self, request, org_id, member_id):
        membership = get_member(request, org_id, member_id)
        if membership.organization.owner == membership.user:
            raise serializers.ValidationError(f"Organization owner cannot be deleted")
        membership.delete()
        return Response(status=204)