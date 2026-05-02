from django.shortcuts import render
from rest_framework import generics,permissions,status
from . import serializers
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart,CartItem,Product
from rest_framework.exceptions import NotFound
from . import services


class AddToCartView(generics.GenericAPIView):
    serializer_class = serializers.AddToCartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request,*args,**kwargs): 
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product_id = serializer.validated_data.get("product_id")
        quantity = serializer.validated_data.get("quantity",1)

        #servis metodu
        try:
            services.add_product_to_cart(user=request.user, product_id=product_id, quantity=quantity)
        except ValidationError as e:
            return Response({"error": str(e.detail[0])}, status=status.HTTP_400_BAD_REQUEST)
     
        return Response(serializers.CartSerializer(cart).data,status=status.HTTP_200_OK)
        

class CartDetailView(generics.RetrieveAPIView):
    serializer_class = serializers.CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
       cart, _ = Cart.objects.get_or_create(user=self.request.user)
       return cart 


class CartUpdateView(generics.GenericAPIView):
    serializer_class = serializers.CartItemUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def put(self,request,cart_item):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        quantity= serializer.validated_data.get("quantity")

        if quantity is None:
            return Response({"error": "quantity is required"})

        try:
           cart= services.update_cart_item(user=request.user, cart_item_id=cart_item, quantity=quantity)
        except ValidationError as e:
            return Response({"error": str(e.detail[0])}, status=status.HTTP_400_BAD_REQUEST)
     
        return Response(serializers.CartSerializer(cart).data,status=status.HTTP_200_OK)
        


class CartDeleteItemView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self,request,cart_item):
        try:
            cart_item = CartItem.objects.get(pk=cart_item, cart__user=request.user)
        except CartItem.DoesNotExist:
            raise NotFound({"error":"Cart Item not found"})   
        
        cart_item.delete()

        cart = Cart.objects.get(user=request.user)
        serializer = serializers.CartSerializer(cart)

        return Response(serializer.data, status=status.HTTP_200_OK)



class ClearCartItemView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def delete(self,request):
        cart = request.user.cart
        cart.items.all().delete()
        serializer = serializers.CartSerializer(cart)

        return Response(serializer.data, status=status.HTTP_200_OK)

