from rest_framework import serializers
from .models import *





class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'
        read_only_fields =  ['owner', 'created_at']
        
        
        
class MembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Membership
        fields = '__all__'
        read_only_fields = ['organization', 'user']
        
        
    def update(self, instance, validated_data):
        if instance.organization.owner == instance.user:
            if 'role' in validated_data:
                raise serializers.ValidationError(f"You cannot change the owner from admin to member")
        return super().update(instance, validated_data)