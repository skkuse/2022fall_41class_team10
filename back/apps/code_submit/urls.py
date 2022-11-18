from django.urls import path

from . import views

urlpatterns = [
    path('', views.code_submit, name='code_submit'),
]