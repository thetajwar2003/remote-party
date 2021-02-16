from django.shortcuts import render

# Create your views here.
def index(reqeust, *args, **kwargs):
    return render(reqeust, 'frontend/index.html')