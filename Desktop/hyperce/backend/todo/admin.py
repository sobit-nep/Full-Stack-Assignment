from django.contrib import admin

# Register your models here.
from .models import Task  # Importing the model

admin.site.register(Task)  # Registering the model with the admin site