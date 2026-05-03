import os
from django.db import models
from django.utils.text import slugify
from categories.models import Category

# Özel dosya yolu ve isim oluşturma fonksiyonu
def product_image_path(instance, filename):
    ext = filename.split('.')[-1] 
    # Dosya adını ürünün adına göre 
    new_filename = f"{slugify(instance.name)}.{ext}"
    return os.path.join('products', new_filename)


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    slug = models.SlugField()
    isHome = models.BooleanField(default=False)
    isActive = models.BooleanField(default=False)
    
   
    image = models.ImageField(upload_to=product_image_path, null=True, blank=True)
    
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, related_name="products")

    def __str__(self):
        return f"{self.name} ({self.stock})"