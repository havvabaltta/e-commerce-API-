from django.urls import path
from . import views


urlpatterns = [
     path('',views.product_list, name='product_list'),
     path('admin/',views.admin_product_list, name='admin_product_list'),
     path('<int:pk>',views.product_details, name='product_details'),
     path('create/', views.product_create, name='product_create'),
     path('update/<int:pk>', views.product_update, name='product_update'),
     path('delete/<int:pk>', views.product_delete, name='product_delete')
]