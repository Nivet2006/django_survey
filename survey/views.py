from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
from django.utils import timezone

from .forms import SurveyForm
from .models import SurveyResponse


# Public homepage
def home(request):
    if request.method == 'POST':
        form = SurveyForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(
                request,
                'Survey submitted successfully!'
            )
            return redirect('home')
        else:
            messages.error(
                request,
                'Please correct the errors in the form before submitting.'
            )
    else:
        form = SurveyForm()

    return render(
        request,
        'home.html',
        {'form': form}
    )


# Protected survey results page
@login_required
def results(request):
    responses = SurveyResponse.objects.all().order_by('-submitted_at')
    total_responses = responses.count()

    avg_data = responses.aggregate(Avg('rating'))['rating__avg']
    average_rating = avg_data if avg_data is not None else 0

    # Calculate most popular technology using ORM
    popular_tech_data = (
        SurveyResponse.objects.values('technology')
        .annotate(tech_count=Count('technology'))
        .order_by('-tech_count')
        .first()
    )
    most_popular_tech = popular_tech_data['technology'] if popular_tech_data else "None"
    most_popular_count = popular_tech_data['tech_count'] if popular_tech_data else 0

    latest_response = responses.first()

    context = {
        'responses': responses,
        'total_responses': total_responses,
        'average_rating': average_rating,
        'most_popular_tech': most_popular_tech,
        'most_popular_count': most_popular_count,
        'latest_response': latest_response,
        'current_date': timezone.now(),
    }

    return render(
        request,
        'results.html',
        context
    )
