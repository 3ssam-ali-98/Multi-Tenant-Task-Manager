from django.db import models
from django.conf import settings

# Create your models here.
class Organization(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='organizations', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.name
    
    
class Membership(models.Model):
     
    role_choices = [
        ('admin', 'Admin'),
        ('member', 'Member'),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='memberships', on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, related_name='memberships', on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=role_choices, default='member')
    
    class Meta:
        constraints = [models.UniqueConstraint(fields=['user', 'organization'], name='unique_membership')]
        
    def __str__(self):  
        return f"{self.user} - {self.organization}"