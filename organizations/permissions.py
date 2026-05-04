from rest_framework.permissions import BasePermission
from .models import *




class IsOrganizationAdmin(BasePermission):
    def has_permission(self, request, view):
        org_id = view.kwargs.get("org_id")
        role = Membership.objects.filter(organization__pk=org_id, user=request.user).values_list('role', flat=True).first()
        
        if role != 'admin':
            return False
        return True


class IsOrganizationOwner(BasePermission):
    def has_permission(self, request, view):
        org_id = view.kwargs.get("org_id")
        owner = Organization.objects.filter(pk=org_id).values_list('owner', flat=True).first()
        
        if owner != request.user.pk:
            return False
        return True