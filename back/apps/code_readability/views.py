from django.http import JsonResponse
from modules.code_readability import Pylama
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def pylama(request):
    code_json = json.loads(request.body)
    code = code_json["code"]
    mypy_score = Pylama.act("#This is test code")[0]
    pylint_score = Pylama.act("#This is test code")[1]
    eradicate_score = Pylama.act("#This is test code")[2]
    radon_score = Pylama.act("#This is test code")[3]
    pycodestyle_score = Pylama.act("#This is test code")[4]
    mypy_data = Pylama.act("#This is test code")[5]
    pylint_data = Pylama.act("#This is test code")[6]
    eradicate_data = Pylama.act("#This is test code")[7]
    radon_data = Pylama.act("#This is test code")[8]
    pycodestyle_data = Pylama.act("#This is test code")[9]
    return JsonResponse({"mypy_score": mypy_score, "pylint_score": pylint_score, "eradicate_score": eradicate_score, "radon_score": radon_score, "pycodestyle_score": pycodestyle_score, \
        "mypy_data": mypy_data, "pylint_data": pylint_data, "eradicate_data": eradicate_data, "radon_data": radon_data, "pycodestyle_data": pycodestyle_data} ,safe=True)
    # 점수 출력
    # 각각의 정보는 텍스트 파일로 정리