from django.http import JsonResponse

def students(request):
  if request.method == 'GET':
    student_data = { 'id': 1, 'name': 'Raquel'}
    return JsonResponse(student_data)
