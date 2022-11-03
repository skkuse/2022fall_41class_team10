from django.http import JsonResponse
from modules.code_efficiency import MultiMetrics
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def multimetric(request):
    code_json = json.loads(request.body)
    code = code_json["code"]

    return JsonResponse(MultiMetrics.CalculMetrics(code),safe=False)