from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):

    list_display = ('id', 'title', 'organization', 'status', 'assigned_to', 'created_by', 'created_at')

    search_fields = ('title', 'description', 'assigned_to__full_name', 'assigned_to__email', 'organization__name',)

    list_filter = ('status', 'organization', 'assigned_to', 'created_at',)

    ordering = ('id',)

    readonly_fields = ('created_at',)
