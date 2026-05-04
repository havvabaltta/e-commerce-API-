from rest_framework import serializers
from .models import Product
from comments.serializers import CommentSerializer


class BaseProductSerializer(serializers.ModelSerializer):

    def validate_slug(self, value):
        if self.instance and self.instance.slug == value:
            return value
        if Product.objects.filter(slug=value).exists():
            raise serializers.ValidationError("Slug must be unique.")
        return value

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "price",
            "stock",
            "category",
            "image",
            "isHome",
            "isActive"
        ]


#  LIST
class ProductListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ["id", "name", "price", "image", "category", "isHome"]


#  DETAIL
class ProductDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = "__all__"


#  CREATE
class ProductCreateSerializer(BaseProductSerializer):
    class Meta(BaseProductSerializer.Meta):
        fields = ["name", "slug", "price", "category", "image"]


#  UPDATE
class ProductUpdateSerializer(BaseProductSerializer):
    class Meta(BaseProductSerializer.Meta):
        fields = ["name", "slug", "description", "price", "stock", "image", "isHome", "isActive"]