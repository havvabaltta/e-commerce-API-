from django.shortcuts import render
from rest_framework import views
from rest_framework.views import APIView
from .models import Comment
from . import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics,mixins
from django.shortcuts import get_object_or_404 
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from core.permissions import IsAdminOrReadOnly,IsOwnerOrReadOnly

"""  ##class based yapısı##

class CommentView(APIView):
    def get(self,request):
        comments = Comment.objects.all()
        serializer=serializers.CommentSerializer(comments,many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=serializers.CommentCreateSerializer(data=request.data)
        if serializer.is_valid():
          serializer.save()
          return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

        
class CommentUpdateView(APIView):
    def get(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)
        serializer = serializers.CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        comment = get_object_or_404(Comment, pk=pk)
        serializer = serializers.CommentUpdateSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Validation hataları
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,pk):
        comment= get_object_or_404(Comment, pk=pk)
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
"""



"""""
#generic yapısı 
class CommentView(generics.GenericAPIView,mixins.ListModelMixin,mixins.CreateModelMixin):
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
            if self.request.method =="POST":
              return serializers.CommentCreateSerializer
            return serializers.CommentSerializer
    
    def get(self,request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self,request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get_queryset(self):
        product_id = self.kwargs.get("product_id")
        if product_id:
            return Comment.objects.filter(product_id=product_id)
        return Comment.objects.all() 

    def perform_create(self,serializer):
        serializer.save(user=self.request.user)
     

  
class CommentUpdateView(generics.GenericAPIView,
                        mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin):

    queryset = Comment.objects.all()
    permission_classes= [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ["PUT","PATCH"]:
            return serializers.CommentUpdateSerializer
        return serializers.CommentSerializer
    
    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self,request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self,request, *args, **kwargs):
            return self.destroy(request, *args, **kwargs)
    
"""""


""""  concrete yapısı kullanarak daha basit kod yazılır,framework tarafında işlemler daha kolay yapılır """

class CommentView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return serializers.CommentCreateSerializer
        return serializers.CommentSerializer

    def get_queryset(self):
        product_id = self.kwargs.get("product_id")
        if product_id:
            return Comment.objects.filter(product_id=product_id)
        return Comment.objects.all()
    
    
class CommentUpdateView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    permission_classes= [IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ["PUT", "PATCH"]:
            return serializers.CommentUpdateSerializer
        return serializers.CommentSerializer

