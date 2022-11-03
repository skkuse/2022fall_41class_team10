from django.http import JsonResponse
from modules.copy_detect import CopyDetect
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def copydetect(request):
    code_json = json.loads(request.body)
    code = code_json["code"]
    data=[{"PlagiarismRate":CopyDetect.findPlagiarismRate(0,"#This is test code")}]
    return JsonResponse(data,safe=False)