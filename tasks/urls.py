from django.urls import path
from .views import *



urlpatterns = [
    path('organizations/<int:org_id>/tasks/', TaskList.as_view(), name='tasks-list'),
    path('organizations/<int:org_id>/tasks/<int:task_id>/', TaskDetails.as_view(), name='task-detail'),
]
