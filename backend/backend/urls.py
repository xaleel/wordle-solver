from django.contrib import admin
from django.urls import path
from wordle_solver import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('solve/<str:guesses>', views.solve),
]
