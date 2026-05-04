from rest_framework import serializers
from .models import *


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['organization', 'created_by', 'created_at']

    def validate(self, attrs):

        if self.instance:
            organization = self.instance.organization 
        else: 
            organization = self.context.get('organization')
            
        assigned_user = attrs.get('assigned_to', getattr(self.instance, 'assigned_to', None))

        if assigned_user is not None:
            membership_exists = Membership.objects.filter(organization=organization, user=assigned_user).exists()
            if not membership_exists:
                raise serializers.ValidationError("Assigned user must belong to the same organization")
        return attrs

    def update(self, instance, validated_data):

        request = self.context.get('request')
        role = Membership.objects.filter(organization=instance.organization, user=request.user).values_list('role', flat=True).first()

        if role != 'admin':
            allowed_fields = {'status'}
            incoming_fields = set(validated_data.keys())
            forbidden_fields = incoming_fields - allowed_fields
            if forbidden_fields:
                raise serializers.ValidationError(
                    f"You cannot edit: {', '.join(forbidden_fields)}")
        return super().update(instance, validated_data)
    

