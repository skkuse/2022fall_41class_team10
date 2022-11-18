from django.urls import path

from . import views

urlpatterns = [
    path('', views.code_run, name='code_run'),
]