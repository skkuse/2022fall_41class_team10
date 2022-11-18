from django.http import JsonResponse
from modules.code_explain import Explain
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def codex(request):
    code_json = json.loads(request.body)
    code = code_json["code"]
    return JsonResponse(Explain.act(code),safe=False)
    

#This text is from openai Example
