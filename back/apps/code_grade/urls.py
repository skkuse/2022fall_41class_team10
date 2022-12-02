from django.urls import path

from . import views

urlpatterns = [
    path('', views.code_grade, name='code_grade'),
]