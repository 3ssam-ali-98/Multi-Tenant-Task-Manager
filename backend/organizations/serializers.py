from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model



User = get_user_model()


class OrganizationSerializer(serializers.ModelSerializer):
    
    
    owner = serializers.CharField(source='owner.full_name', read_only=True)
    created_at = serializers.DateTimeField(format="%d-%m-%Y", read_only=True)
    current_user_role = serializers.SerializerMethodField()
    current_user_is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = '__all__'
        read_only_fields =  ['owner', 'created_at']
        
    def get_current_user_role(self, obj):

        request = self.context["request"]

        membership = obj.memberships.filter(user=request.user).first()

        if not membership:
            return None

        return membership.role
      
    def get_current_user_is_owner(self, obj):

        request = self.context["request"]

        membership = obj.memberships.filter(user=request.user).first()

        if not membership:
            return False

        return membership.is_owner    
        
class MembershipSerializer(serializers.ModelSerializer):
    
    member_name = serializers.CharField(source='user.full_name', read_only=True)
    member_email = serializers.EmailField(source='user.email', read_only=True)
    
    class Meta:
        model = Membership
        fields = '__all__'
        read_only_fields = ['organization', 'user']
        
        
    def update(self, instance, validated_data):
        if instance.organization.owner == instance.user:
            if 'role' in validated_data:
                raise serializers.ValidationError(f"You cannot change the owner from admin to member")
        return super().update(instance, validated_data)