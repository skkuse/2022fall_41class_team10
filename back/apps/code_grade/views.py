from modules.code_score import CodeScore
from modules.db import db
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def code_grade(request):
    code_json = json.loads(request.body)
    code = code_json["code"]

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
        tcID, tcIN, tcOUT, isHidden = tc
        tc_list.append(CodeScore.check_testcase(file_path, tcIN, tcOUT))

    result_json = json.dumps({"result": tc_list})
    return JsonResponse(result_json, safe=False)

