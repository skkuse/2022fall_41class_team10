from modules.code_score import CodeScore
from modules.db import db

from modules.code_efficiency import MultiMetrics
from modules.code_explain import Explain
from modules.copy_detect import CopyDetect
from modules.code_readability import Pylama
from modules.code_diff import CodeDiff

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
        tcID, tcIN, tcOUT, isHidden = tc
        tc_list.append(CodeScore.check_testcase(file_path, tcIN, tcOUT))


    CopyDetect.prepareCopyDetect(class_id, assign_id)
    MultiMetrics.prepareMultiMetrics(class_id, assign_id)

    #설명
    code_efficiency = MultiMetrics.calculeScore(class_id, assign_id, file_path)
    code_explain = Explain.act(code)
    code_readability = Pylama.act(class_id, assign_id, file_path)
    copy_detect = CopyDetect.findPlagiarismRate(class_id, assign_id, file_path)
    code_diff = CodeDiff.MakeDiffStr(class_id, assign_id, file_path)

    #total
    tc_score = 60 * sum(tc_list)/len(tc_list)
    exp_score = (20/100) * (code_efficiency["LOC"]+code_efficiency["Halstead"]+code_efficiency["Control_flow"]+code_efficiency["Data flow"])
    read_score = (20/100) * (sum(code_readability[:5]))
    total = tc_score + exp_score + read_score

    result_json = json.dumps({
        "result": tc_list,
        "score": {
            "code_efficiency" : code_efficiency,
            "code_explain" : code_explain,
            "code_readability" : code_readability,
            "copy_detect" : copy_detect,
            "code_diff_str": code_diff,
            "total": total,
        },
    })

    return JsonResponse(result_json, safe=False)