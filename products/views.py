from django.shortcuts import render
from .models import Product
from django.http import JsonResponse
from rest_framework.response import Response
from . import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated,IsAdminUser

#def product_list(request):
#    products= Product.objects.all()
#   data={
 #       'products': list(products.values())
 #   }
 #   return JsonResponse (data)    

#single data json ile
#def product_details(request,pk):
#    product= Product.objects.get(pk=pk)
#    data={
#        'name':product.name,
#        'slug':product.slug,
#        'description':product.description,
#        'price':product.price,
#        'stock':product.stock
#    }
#    return JsonResponse (data)


@api_view(['GET'])
def product_list(request):
    products= Product.objects.filter(isActive=True)
    serializer= serializers.ProductListSerializer(products, many=True)
    return Response (serializer.data)    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def admin_product_list(request):
    products= Product.objects.all()
    serializer= serializers.AdminProductListSerializer(products, many=True)
    return Response (serializer.data)    


#single data serializer ile
@api_view(['GET'])
def product_details(request,pk):
    product= Product.objects.get(pk=pk)
    serializer= serializers.ProductDetailSerializer(product)
    return Response (serializer.data)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def product_create(request):
    serializer=serializers.ProductCreateSerializer(data=request.data)
    if serializer.is_valid():
       serializer.save()
       return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAdminUser])
def product_update(request,pk):
    try:
        product=Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND)
    
    if request.method=="PUT": 
        serializer=serializers.ProductUpdateSerializer(product, data=request.data)
    else:
        serializer=serializers.ProductUpdateSerializer(product, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def product_delete(request, pk):
    try:
        product=Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND)
    product.delete()
    return Response({"message": "Product deleted."},status=status.HTTP_204_NO_CONTENT)



