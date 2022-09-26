from django.db import models

# Create your models here.
class OnlineJudge(models.Model):
    user = models.CharField(max_length=70, blank=False, default='')
    code = models.CharField(max_length=20000,blank=False, default='')
    isPassed = models.BooleanField(default=False)