from django.contrib import admin
from .models import Product


@admin.register(Product)

class ProductAdmin(admin.ModelAdmin):
    list_display=('id','name','price','stock', 'isHome', 'isActive', 'category')
    list_filter=('isHome', 'isActive', 'category')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)
    ordering=('name',)





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
