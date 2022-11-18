from modules.code_execute import CodeExecute

from modules.code_efficiency import MultiMetrics
from modules.code_explain import Explain
from modules.copy_detect import CopyDetect
from modules.code_readability import Pylama

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def code_submit(request):
    code_json = json.loads(request.body)
    code = code_json["code"]

    result = CodeExecute.code_execute(code)

    code_efficiency = MultiMetrics.CalculMetrics(code)
    # code_explain = Explain.act(code)
    code_readability = Pylama.act("#This is test code")
    copy_detect = CopyDetect.findPlagiarismRate(0,"#This is test code")

    result_json = json.dumps({
        "result": result,
        "score": {
            "code_efficiency" : code_efficiency,
            "code_explain" : "code_explain",
            "code_readability" : code_readability,
            "copy_detect" : copy_detect,    
        },
    })

    return JsonResponse(result_json, safe=False)