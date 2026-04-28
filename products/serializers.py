from rest_framework import serializers
from .models import Product
from rest_framework.validators import UniqueValidator
#from categories.serializers import CategorySerializer
from comments.serializers import CommentSerializer



#class ProductListSerializer(serializers.Serializer):
#  id= serializers.IntegerField()
# name= serializers.CharField(max_length=200)
# slug= serializers.CharField(max_length=200)
# price= serializers.DecimalField(max_digits=10, decimal_places=2)
 
#class ProductDetailSerializer(serializers.Serializer):
#  id= serializers.IntegerField()
# name= serializers.CharField(max_length=200)
# slug= serializers.CharField(max_length=200)
# description= serializers.CharField()
#  price= serializers.DecimalField(max_digits=10, decimal_places=2)
#  stock= serializers.IntegerField()
#  isHome= serializers.BooleanField()
#  isActive= serializers.BooleanField()
#  category= serializers.CharField(max_length=200)



class BaseProductSerializer(serializers.ModelSerializer):
    
    def validate_name(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Product name must be at least 3 characters.")
        if len(value) > 200:
            raise serializers.ValidationError("Product name must be max 200 characters.")
        return value

    def validate_slug(self, value):
        if Product.objects.filter(slug=value).exists():
            raise serializers.ValidationError("Slug must be unique.")
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be greater than 0.")
        if value > 100000:  
            raise serializers.ValidationError("Price cannot exceed 100,000.")
        return value

    def validate(self, data):
        stock = data.get("stock")
        isActive = data.get("isActive")

        if stock is not None and isActive is not None:
            if stock == 0 and isActive:
                raise serializers.ValidationError("Stock is 0 → product cannot be active")

        return data

    class Meta:
        model = Product
        fields = "__all__"


class ProductListSerializer(serializers.ModelSerializer):
    category= serializers.CharField(source="category.name")
   # category= CategorySerializer()
 
    class Meta:
        model = Product
        fields = [ "name", "price", "category"]


class AdminProductListSerializer(serializers.ModelSerializer):
    category= serializers.CharField(source="category.name")
 
    class Meta:
        model = Product
        fields = ["id", "name","slug", "price", "category","isActive","isHome","stock"]


class ProductDetailSerializer(serializers.ModelSerializer):
    comments= CommentSerializer(many=True)
    class Meta:
        model = Product
        fields = "__all__"
    #  exclude=["isHome", "isActive"]


#create işlemleri
class ProductCreateSerializer(BaseProductSerializer):
    class Meta(BaseProductSerializer.Meta):
        model = Product
        fields=["name","slug","price","category"]


class ProductUpdateSerializer(BaseProductSerializer):
    class Meta(BaseProductSerializer.Meta):
        model = Product
        fields=["name","slug","description","price","stock"]



