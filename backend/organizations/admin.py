from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):

    list_display = ('id', 'name', 'owner', 'created_at',)

    search_fields = ('name', 'owner__full_name', 'owner__email',)

    list_filter = ('created_at',)

    ordering = ('id',)

    readonly_fields = ('created_at',)




@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):

    list_display = ('id', 'user', 'organization', 'role', 'is_owner')

    search_fields = ('user__full_name', 'user__email', 'organization__name', 'role')

    list_filter = ('organization','role',)

    ordering = ('id',)