from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def pylama(request):
    code_json = json.loads(request.body)
    code = code_json["code"]
    return JsonResponse(Pylama.act("#This is test code"),safe=False)
    # 점수 출력
    # 각각의 정보는 텍스트 파일로 정리