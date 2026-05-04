from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager



# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(unique=True, blank=False, null=False)
    full_name = models.CharField(max_length=100, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    objects = CustomUserManager()

    def __str__(self):
        return self.full_name or self.email