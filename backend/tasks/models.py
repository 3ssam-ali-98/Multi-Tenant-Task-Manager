from django.db import models
from django.conf import settings
from organizations.models import *

# Create your models here.
class Task(models.Model):
    
    status_choices = [
        ('todo', 'To-Do'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]
    
    title = models.CharField(max_length=20, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=15, choices=status_choices, default='todo')
    organization = models.ForeignKey(Organization, related_name='tasks', on_delete=models.CASCADE)
    assigned_to = models.ForeignKey(Membership, related_name='assigned_tasks', on_delete=models.SET_NULL, blank=True, null=True)
    created_by = models.ForeignKey(Membership, related_name='created_tasks', on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title