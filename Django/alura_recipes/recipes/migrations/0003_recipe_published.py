# Generated by Django 3.2.3 on 2021-05-27 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_recipe_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='published',
            field=models.BooleanField(default=False),
        ),
    ]