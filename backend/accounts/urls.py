from rest_framework.routers import DefaultRouter
from django.urls import path, include
from . import views

router = DefaultRouter()
router.register("user", views.UserViewSet)

urlpatterns = [
    path("api/", include(router.urls)),
    path("signup/", views.SignupView.as_view(), name="signup"),
]
