from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, TokenViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'tokens', TokenViewSet, basename='token')

urlpatterns = [
    path('', include(router.urls)),
]
