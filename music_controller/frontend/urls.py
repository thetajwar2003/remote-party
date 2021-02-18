from django.urls import path
from .views import index

app_name = 'frontend'

urlpatterns = [
    path('', index), # render index template
    path('join', index, name=''),
    path('create', index),
    path('room/<str:roomCode>', index),
]
