from rest_framework.routers import DefaultRouter
from .views import UserViewSet, MessageViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'messages', MessageViewSet)

urlpatterns = router.urls