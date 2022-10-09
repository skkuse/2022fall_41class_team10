from django.urls import path

from . import views

urlpatterns = [
    path('', views.multimetric, name='multimetric'),
]