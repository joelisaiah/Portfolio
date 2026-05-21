from django.db import models

class VisitorCount(models.Model):
    count = models.PositiveBigIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Visitor Count"

    def __str__(self):
        return f"Visitors: {self.count}"


class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    email = models.EmailField()
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    location = models.CharField(max_length=100, blank=True)
    photo_url = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    TECH_CHOICES = [
        ('data', 'Data Analytics'),
        ('automation', 'Automation/Testing'),
        ('ai', 'AI/ML'),
        ('web', 'Web'),
    ]
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=TECH_CHOICES)
    short_description = models.CharField(max_length=300)
    full_description = models.TextField()
    tech_stack = models.JSONField(default=list)  # e.g. ["Python", "Pandas"]
    github_url = models.URLField(blank=True)
    image_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class Education(models.Model):
    LEVEL_CHOICES = [
        ('sslc', 'SSLC (10th)'),
        ('hslc', 'HSLC (12th)'),
        ('ug', 'Under Graduate'),
        ('pg', 'Post Graduate'),
    ]
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES)
    institution = models.CharField(max_length=300)
    board_or_university = models.CharField(max_length=200)
    year_of_passing = models.CharField(max_length=20)
    grade_or_percentage = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.get_level_display()} — {self.institution}"


class Interest(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, blank=True)  # emoji or icon name
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title