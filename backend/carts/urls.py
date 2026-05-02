from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.AddToCartView.as_view(), name='cart_add'),
    path('', views.CartDetailView.as_view(), name='cart_detail'),
    path('update/<int:cart_item>', views.CartUpdateView.as_view(), name='cart_update'),
    path('delete/<int:cart_item>', views.CartDeleteItemView.as_view(), name='cart_delete'),
    path('clear/', views.ClearCartItemView.as_view(), name='cart_clear'),


]