from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),  # render index template
    path('redirect', spotify_callback),
    path('is_authenticated', isAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
]
