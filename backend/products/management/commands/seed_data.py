from django.core.management.base import BaseCommand
import random

from categories.models import Category
from products.models import Product


class Command(BaseCommand):
    help = "Clean and controlled seed data"

    def handle(self, *args, **kwargs):

        # 🧹 CLEAN DATA
        Product.objects.all().delete()
        Category.objects.all().delete()

        # -------------------------
        # 📂 DAHA FAZLA KATEGORİ (TEMİZ)
        # -------------------------
        categories = [
            "Telefon",
            "Bilgisayar",
            "Tablet",
            "Kulaklık",
            "Oyun Konsolu",
            "Televizyon",
            "Moda",
            "Ayakkabı",
            "Ev Elektroniği",
            "Mutfak",
            "Kitap",
            "Spor",
            "Kozmetik",
            "Otomotiv",
            "Bebek Ürünleri"
        ]

        category_objs = []

        for name in categories:
            cat = Category.objects.create(
                name=name,
                slug=name.lower().replace(" ", "-"),
                icon="icon-" + name.lower(),
                description=f"{name} kategorisi"
            )
            category_objs.append(cat)

        self.stdout.write(self.style.SUCCESS("Categories created"))

        # -------------------------
        # 🛒 AZ VE TEMİZ ÜRÜNLER
        # -------------------------
        products_map = {
            "Telefon": ["Akıllı Telefon"],
            "Bilgisayar": ["Laptop"],
            "Tablet": ["Tablet Cihaz"],
            "Kulaklık": ["Bluetooth Kulaklık"],
            "Oyun Konsolu": ["Oyun Konsolu"],
            "Televizyon": ["Smart TV"],
            "Moda": ["Tişört"],
            "Ayakkabı": ["Spor Ayakkabı"],
            "Ev Elektroniği": ["Elektrikli Süpürge"],
            "Mutfak": ["Kahve Makinesi"],
            "Kitap": ["Roman Kitabı"],
            "Spor": ["Fitness Aleti"],
            "Kozmetik": ["Cilt Bakım Ürünü"],
            "Otomotiv": ["Araç Aksesuarı"],
            "Bebek Ürünleri": ["Bebek Arabası"]
        }

        for category in category_objs:

            product_names = products_map.get(category.name, [])

            for name in product_names:

                Product.objects.create(
                    name=name,
                    description=f"{name} kaliteli bir üründür.",
                    price=random.randint(100, 10000),
                    stock=random.randint(5, 50),
                    slug=name.lower().replace(" ", "-"),
                    isHome=False,
                    isActive=True,
                    category=category
                )

        self.stdout.write(self.style.SUCCESS("Products created"))

        self.stdout.write(self.style.SUCCESS(
            "🎯 Clean seed data ready (low fake, editable structure)"
        ))