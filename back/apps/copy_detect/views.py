from django.http import JsonResponse
from modules.copy_detect import CopyDetect

def copydetect(request):
    data=[{"PlagiarismRate":CopyDetect.findPlagiarismRate(0,"#This is test code")}]
    return JsonResponse(data,safe=false)