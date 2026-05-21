from django.urls import path
from . import views

urlpatterns = [
    path('visitors/', views.VisitorCountView.as_view()),
    path('profile/', views.ProfileView.as_view()),
    path('projects/', views.ProjectListView.as_view()),
    path('projects/<slug:slug>/', views.ProjectDetailView.as_view()),
    path('education/', views.EducationListView.as_view()),
    path('interests/', views.InterestListView.as_view()),
]