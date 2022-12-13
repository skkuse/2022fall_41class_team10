from modules.code_execute import CodeExecute
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import time
import os

# Create your views here.
@csrf_exempt
def code_run(request):
    code_json = json.loads(request.body)
    code = code_json["code"]

    dir_path = "./data/exec"
    file_id = str(time.time()).replace(".", "")
    file_path = "%s/%s.py" % (dir_path, file_id)
    CodeExecute.save2file(dir_path, file_path, code)

    out, err = CodeExecute.code_execute(file_path)
    os.remove(file_path)
    result_json = json.dumps({"stdout": out, "stderr": err})
    return JsonResponse(result_json, safe=False)