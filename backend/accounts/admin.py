from django.contrib import admin
from .models import User
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = ('id', 'email', 'full_name', 'created_at',)

    search_fields = ('full_name', 'email',)

    list_filter = ('created_at',)

    ordering = ('id',)

    readonly_fields = ('created_at',)
