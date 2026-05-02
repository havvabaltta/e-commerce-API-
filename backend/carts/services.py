
from rest_framework.exceptions import NotFound, ValidationError
from backend.products.models import Product
from django.shortcuts import get_object_or_404
from .models import Cart,CartItem
from rest_framework.response import Response
from . import serializers

def check_product_stock(product, quantity):
    if quantity > product.stock:
        raise ValidationError(f"stokta sadece {product.stock} adet mevcut.")


def add_product_to_cart(user,product_id,quantity):
    product = get_object_or_404(Product, id=product_id)
    check_product_stock(product, quantity)

    cart, _ = Cart.objects.get_or_create(user=user)
    #Sepette bu ürün var mı kontrol et
    cart_item, itemCreated = CartItem.objects.get_or_create(
            cart=cart,
            product=product
        )

    if not itemCreated:
            new_quantity = cart_item.quantity + quantity
            check_product_stock(product, new_quantity)
            cart_item.quantity += new_quantity
    else:
            cart_item.quantity = quantity

    cart_item.save()
   
    return cart
    


def update_cart_item(user, cart_item_id, quantity):
    try:  
        cart_item = CartItem.objects.get(pk=cart_item, cart__user = user)
    except CartItem.DoesNotExist:
        raise ValidationError("Cart Item not found")
        
    if quantity <= 0:
        cart_item.delete()
    else:
        check_product_stock(cart_item.product, quantity)
        cart_item.quantity = quantity
        cart_item.save()
        

    return cart_item.cart