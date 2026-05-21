from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from .models import VisitorCount, Profile, Project, Education, Interest
from .serializers import *

class VisitorCountView(APIView):
    """Increments visitor count (like YouTube views) and returns total."""
    def get(self, request):
        obj, created = VisitorCount.objects.get_or_create(id=1)
        obj.count += 1
        obj.save()
        return Response({'count': obj.count})

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    def get_object(self):
        return Profile.objects.first()

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class ProjectDetailView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    lookup_field = 'slug'

class EducationListView(generics.ListAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

class InterestListView(generics.ListAPIView):
    queryset = Interest.objects.all()
    serializer_class = InterestSerializer