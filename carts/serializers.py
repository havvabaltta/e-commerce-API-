from rest_framework import serializers
from .models import Cart, CartItem
from products.models import Product


#  Sepete ürün ekleme
class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)


class CartItemUpdateSerializer(serializers.Serializer):
    quantity = serializers.IntegerField(min_value=0)



#  Product (cart içinde gösterilecek sade hali)
class CartItemProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price"]


#  CartItem serializer
class CartItemSerializer(serializers.ModelSerializer):
    product = CartItemProductSerializer(read_only=True)
    item_total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity", "item_total_price"]

    def get_item_total_price(self, obj):
        return obj.get_item_total()


#  Cart serializer
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    cart_total_price = serializers.SerializerMethodField()
    user = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "user", "items", "cart_total_price"]

    def get_cart_total_price(self, obj):
        return obj.get_cart_total()