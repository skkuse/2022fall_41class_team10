from django.http import HttpResponse


def multimetric(request):
    return HttpResponse("Calculating multimetric")