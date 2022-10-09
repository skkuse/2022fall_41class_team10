from django.urls import path

from . import views

urlpatterns = [
    path('', views.pylama, name='pylama'),
]