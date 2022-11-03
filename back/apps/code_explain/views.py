from django.http import JsonResponse
from modules.code_explain import Explain


def codex(request):
    return JsonResponse(Explain.act("#This is test code"),safe=False)