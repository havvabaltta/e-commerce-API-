from .models import Category
from rest_framework import serializers
from products.serializers import ProductListSerializer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class CategoryDetailSerializer(serializers.ModelSerializer): 
   #products= serializers.StringRelatedField(many=True)   
   # str self, metodu ile dönen attribute döner
   #products= serializers.IntegerField(source="products.name")  
   
   products= ProductListSerializer(many=True,read_only=True) #nested serializer
          
   class Meta:
        model = Category
        fields =  ["id", "name", "slug", "icon", "description", "products"]


class CategoryCreateUpdateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Category
        fields = ["name", "slug", "icon", "description"]