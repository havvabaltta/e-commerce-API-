from django.urls import path
from . import views


urlpatterns = [
     path('',views.CategoryListCreateView.as_view(), name='category_list'),
     path('<int:pk>/',views.CategoryRetrieveUpdateDestroyView.as_view(), name='category_detail')
     
]