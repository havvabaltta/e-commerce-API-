from rest_framework.permissions import BasePermission,SAFE_METHODS

class IsAdminOrReadOnly(BasePermission):
  def has_permission(self, request, view):
        # Güvenli yöntemler (GET, HEAD, OPTIONS) herkese açıktır
        if request.method in SAFE_METHODS:
            return True
        # Diğer yöntemler için kullanıcının staff olması gerekir
        return request.user and request.user.is_staff

#sahiplik kontrolü
class IsOwnerOrReadOnly(BasePermission):
      def has_object_permission(self, request, view,obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user == obj.user

