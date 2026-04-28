from django.db import models
from categories.models import Category

class Product(models.Model):
   name = models.CharField(max_length=200)
   description = models.TextField(null=True, blank= True)
   price = models.DecimalField(max_digits=10, decimal_places=2)
   stock = models.PositiveIntegerField(default=0)
   slug = models.SlugField()
   isHome = models.BooleanField(default=False)
   isActive = models.BooleanField(default=False)
   #many to one : bir kategori çok ürün
   category = models.ForeignKey(Category,on_delete=models.RESTRICT, related_name="products")

    #category=models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
     

   def __str__(self):   
        return f"{self.name} ({self.stock})"





# from django.contrib import admin
# from .models import Product

# @admin.register(Product)
# class ProductAdmin(admin.ModelAdmin):
#     # Admin panelinde hangi sütunların liste halinde görüneceğini belirler
#     # list_display = ('id', 'name', 'price', 'stock', 'isHome', 'isActive', 'category')
    
#     # Listeden ayrılmadan (sayfa içinde) direkt güncellenebilecek alanlar
#     # list_editable = ('price', 'stock', 'isActive', 'isHome')
    
#     # Sağ panelde hızlı filtreleme yapmaya yarayan alanlar
#     # list_filter = ('isHome', 'isActive', 'category')
    
#     # İsim yazıldığında otomatik olarak slug (URL yapısı) oluşturan sistem
#     # prepopulated_fields = {'slug': ('name',)}
    
#     # Arama kutusunda hangi alanlarda arama yapılacağını belirler
#     # 'category__name' yabancı anahtar olan kategorinin isminde de arama yapar
#     # search_fields = ('name', 'category__name')
    
#     # Varsayılan sıralama kuralı
#     # ordering = ('name',)
    
#     # Sayfalamayı yönetir; her sayfada kaç nesne görüneceğini belirler
#     # list_per_page = 50

#     # Ürün detay sayfasındaki alanları gruplandırarak daha düzenli gösterir
#     # fieldsets = (
#     #     ('Genel Bilgiler', {
#     #         'fields': ('name', 'slug', 'category')
#     #     }),
#     #     ('Satış Detayları', {
#     #         'fields': ('price', 'stock'),
#     #         'classes': ('collapse',)  # Bu kısım başlangıçta gizli olur
#     #     }),
#     #     ('Durum Ayarları', {
#     #         'fields': ('isHome', 'isActive')
#     #     }),
#     # )