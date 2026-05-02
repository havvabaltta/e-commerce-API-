from django.urls import path
from . import views


urlpatterns = [
     path('',views.CommentView.as_view(), name='comment_list'),
     path('<int:product_id>/product',views.CommentView.as_view(), name='product_comment_list'),
     path('<int:pk>',views.CommentUpdateView.as_view(), name='comment_update'),
    
]