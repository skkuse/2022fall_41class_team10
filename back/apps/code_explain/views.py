from django.http import HttpResponse


def codex(request):
    return HttpResponse("OpenAI Codex")