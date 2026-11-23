from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from .models import SurveyResponse


class SurveyAppTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username='testuser', password='password123')

    def test_homepage_get(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Student Technology Survey')
        self.assertContains(response, 'Your Voice')

    def test_submit_valid_survey(self):
        data = {
            'name': 'Alice',
            'email': 'alice@example.com',
            'technology': 'Django',
            'rating': 5,
            'feedback': 'Great framework!',
        }
        response = self.client.post(reverse('home'), data, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(SurveyResponse.objects.count(), 1)
        self.assertContains(response, 'Survey submitted successfully!')

    def test_submit_invalid_survey(self):
        data = {
            'name': 'Bob',
            'email': 'not-an-email',
            'technology': 'Python',
            'rating': 4,
            'feedback': 'Test feedback',
        }
        response = self.client.post(reverse('home'), data, follow=True)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(SurveyResponse.objects.count(), 0)
        self.assertContains(response, 'Please correct the errors in the form')

    def test_results_page_redirects_unauthenticated_user(self):
        response = self.client.get(reverse('results'))
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.url.startswith(reverse('login')))

    def test_results_page_authenticated_user(self):
        SurveyResponse.objects.create(
            name='Charlie',
            email='charlie@example.com',
            technology='Python',
            rating=4,
            feedback='Love it!'
        )
        SurveyResponse.objects.create(
            name='Diana',
            email='diana@example.com',
            technology='Python',
            rating=5,
            feedback='Python is awesome'
        )
        self.client.login(username='testuser', password='password123')
        response = self.client.get(reverse('results'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Survey Results Dashboard')
        self.assertContains(response, 'Total Responses: 2')
        self.assertContains(response, 'Charlie')
        self.assertContains(response, 'Diana')
        self.assertEqual(response.context['most_popular_tech'], 'Python')
        self.assertEqual(response.context['most_popular_count'], 2)

    def test_login_page_renders_cleanly(self):
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Login to view survey results')
        self.assertContains(response, 'id_password')
