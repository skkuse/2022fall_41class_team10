from modules.code_execute import CodeExecute
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def code_run(request):
    code_json = json.loads(request.body)
    code = code_json["code"]

    result = CodeExecute.code_execute(code)

    result_json = json.dumps({"result": result})

    return JsonResponse(result_json, safe=False)