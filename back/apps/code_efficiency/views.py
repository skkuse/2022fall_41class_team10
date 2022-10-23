from django.http import JsonResponse
from modules.code_efficiency import MultiMetrics

def multimetric(request):
    return JsonResponse(MultiMetrics.CalculMetrics("printf(\"temp code\")"),safe=False)