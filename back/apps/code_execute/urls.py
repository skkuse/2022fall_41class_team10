from django.urls import path

from . import views

urlpatterns = [
    path('', views.code_execute, name='code_execute'),
]