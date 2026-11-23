from django import forms
from .models import SurveyResponse


class SurveyForm(forms.ModelForm):

    class Meta:
        model = SurveyResponse

        fields = [
            'name',
            'email',
            'technology',
            'rating',
            'feedback',
        ]

        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter your name',
                'autocomplete': 'name',
            }),

            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'Enter your email',
                'autocomplete': 'email',
            }),

            'technology': forms.Select(attrs={
                'class': 'form-select',
            }),

            'rating': forms.Select(attrs={
                'class': 'form-select',
            }),

            'feedback': forms.Textarea(attrs={
                'class': 'form-textarea',
                'rows': 4,
                'placeholder': 'Your feedback',
            }),
        }
