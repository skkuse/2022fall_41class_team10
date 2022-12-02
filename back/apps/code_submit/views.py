from modules.code_score import CodeScore
from modules.db import db
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

    #채점
    isProhibitLib = CodeScore.check_imports(code)
    if isProhibitLib:
        result_json = json.dumps({"result": isProhibitLib})
        return JsonResponse(result_json, safe=False)

    class_id = code_json["class_id"]
    assign_id = code_json["assign_id"]
    user_id = code_json["user_id"]

    dir_path = "./data/class_%d/assign_%d" % (class_id, assign_id)
    file_path = "%s/%d.py" % (dir_path, user_id)
    CodeScore.save2file(dir_path, file_path, code)

    tc_list = []
    for tc in db.get_testcase_list(class_id, assign_id):
        tcID, tcIN,