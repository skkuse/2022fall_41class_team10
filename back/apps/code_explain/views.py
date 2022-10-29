from django.http import JsonResponse


def codex(request):
    return JsonResponse(Explain.act("#This is test code"),safe=False)