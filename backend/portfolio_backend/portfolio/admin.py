from django.contrib import admin
from .models import VisitorCount, Profile, Project, Education, Interest

@admin.register(VisitorCount)
class VisitorCountAdmin(admin.ModelAdmin):
    readonly_fields = ['count', 'last_updated']

admin.site.register(Profile)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'order']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['get_level_display', 'institution', 'year_of_passing']

admin.site.register(Interest)