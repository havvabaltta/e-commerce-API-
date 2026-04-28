from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import Category
from .import serializers
from django.db.models import RestrictedError
from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from core.permissions import IsAdminOrReadOnly

#@api_view(["GET","POST"])
#def category_list(request):
 #   if request.method == "POST":
  #       return Response({ "message":"bilgiler kaydedildi.",
#                       "data":request.data
 #                         })
  #  return  Response({
  #      "message": "Veriler listelendi."
  #  })

    

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset= Category.objects.all()
    permission_classes= [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.request.method== "POST":
            return serializers.CategoryCreateUpdateSerializer
        return serializers.CategorySerializer
    
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminUser()]
        return super().get_permissions()
    

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset= Category.objects.all()
    permission_classes= [IsAdminOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in ["PUT","PATCH"]:
            return serializers.CategoryCreateUpdateSerializer
        return serializers.CategoryDetailSerializer

    def delete(self, request, *args, **kwargs):
        category = self.get_object()
    
        try:
            category.delete()
            return Response({"message": "Category deleted"}, status=status.HTTP_204_NO_CONTENT)
        except RestrictedError:
            return Response({"error": "Bu kategoride ürünler var. Silinemez. Önce ürünleri siliniz."}, status=status.HTTP_400_BAD_REQUEST)
        
    def get_permissions(self):
        if self.request.method in  ["POST","PUT", "PATCH","DELETE"]:
            return [IsAdminUser()]
        return super().get_permissions()
    








@api_view(["GET","POST"])
def category_list(request):
  if request.method=="GET":
    categories = Category.objects.all()
    serializer= serializers.CategorySerializer(categories, many=True) 
    return Response(serializer.data)
  
  elif request.method=="POST":
    serializer = serializers.CategoryCreateUpdateSerializer(data=request.data)
    if serializer.is_valid():
         serializer.save()
         return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH"])
def category_detail(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = serializers.CategoryDetailSerializer(category)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = serializers.CategoryCreateUpdateSerializer(category, data=request.data)   
    else:
        serializer = serializers.CategoryCreateUpdateSerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def category_delete(request, pk): 
    try:
        category=Category.objejcts.get(pk=pk)
    except Category.DoesNotExist:
        return Response({"error":"Category not found"}, status=status.HTTP_404_NOT_FOUND)
    try:
        category.delete()
        return Response({"message":"Category deleted."},status=status.HTTP_204_NO_CONTENT)
    except RestrictedError:
        return Response({"error":"Category cannot be deleted because it has related products."}, status=status.HTTP_400_BAD_REQUEST)
  