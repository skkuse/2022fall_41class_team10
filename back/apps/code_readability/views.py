from django.http import JsonResponse


def pylama(request):
    return JsonResponse(Pylama.act("#This is test code"),safe=False)
    # 점수 출력
    # 각각의 정보는 텍스트 파일로 정리