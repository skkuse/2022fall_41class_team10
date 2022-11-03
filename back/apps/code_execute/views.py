from django.http import JsonResponse
from django.shortcuts import render
import sys
from io import StringIO
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def code_execute(request):
    code_json = json.loads(request.body)
    code = code_json["code"]

    old_stdout = sys.stdout
    redirected_output = sys.stdout = StringIO()

    exec(code)
    sys.stdout = old_stdout
    result = redirected_output.getvalue()

    result_json = json.dumps({"result": result})
    return JsonResponse(result_json, safe=False)