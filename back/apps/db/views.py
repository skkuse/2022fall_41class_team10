from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from modules.db import db
import json

# Create your views here.
@csrf_exempt
def get_class_list(request):
    data=db.get_class_list()
    # Maybe change later
    result_json = json.dumps({
        "Classes" : data,
    })

    return JsonResponse(result_json, safe=False)

def get_assignment_list(request, class_id):
    data=db.get_assignment_list(class_id)
    # Maybe change later
    result_json = json.dumps({
        "Assignments" : data,
    })

    return JsonResponse(result_json, safe=False)

def get_assignment_info(request, class_id, assign_id):
    data=db.get_assignment_info(class_id,assign_id)
    result_json = json.dumps({
        "Content" : data[0][0],
        "Restriction" : data[0][1],
        "due_date" : data[0][2],
        "skeleton_code": data[0][3], 
        "answer_code": data[0][4]
    })
    return JsonResponse(result_json, safe=False, json_dumps_params={'ensure_ascii':False})

def get_testcase_list(request, class_id, assign_id):
    data=db.get_testcase_list(class_id, assign_id)
    # Maybe change later
    result_json = json.dumps({
        "Tests" : data,
    })

    return JsonResponse(result_json, safe=False)

def get_explain(request, class_id, assign_id):
    data=db.get_explain(class_id, assign_id)
    # Maybe change later
    result_json = json.dumps({
        "Explain" : data,
    })

    return JsonResponse(result_json, safe=False)

def save_user_code(request):
    try:
        body = json.loads(request.body)
        class_id = body["class_id"]
        assign_id = body["assign_id"]
        code_id = body["code_id"]
        content = body["content"]
        db.save_user_code(class_id, assign_id, code_id, content)
        return JsonResponse({"message":"Save code"}, status=200)
    except:
        return JsonResponse({"message": "Error"}, status=400)

def get_user_code(request, code_id):
    body = json.loads(request.body)
    class_id = body["class_id"]
    assign_id = body["assign_id"]
    data=db.get_user_code(class_id,assign_id,code_id)

    result_json = json.dumps({
        "Code" : data,
    })

    return JsonResponse(result_json, safe=False)