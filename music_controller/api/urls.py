from django.urls import path
from .views import main

urlpatterns = [
    path('', main) #if we get an empty endpoint, return main function
]