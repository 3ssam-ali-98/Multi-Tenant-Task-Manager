from django.urls import path
from .views import *



urlpatterns = [
    path('organizations/', OrganizationList.as_view(), name='organizations-list'),
    path('organizations/<int:org_id>/', OrganizationDetail.as_view(), name='organization-detail'),
    path('organizations/<int:org_id>/memberships/', MembershipList.as_view(), name='memberships-list'),
    path('organizations/<int:org_id>/memberships/<int:member_id>/', MembershipDetail.as_view(), name='membership-details'),
]
