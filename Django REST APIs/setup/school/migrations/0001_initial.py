# Generated by Django 3.2.4 on 2021-06-07 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Courses',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('level', models.CharField(choices=[('B', 'Basic'), ('I', 'Intermediate'), ('A', 'Advanced')], default='B', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='Students',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('rg', models.CharField(max_length=9)),
                ('cpf', models.CharField(max_length=11)),
                ('birth_date', models.DateField()),
            ],
        ),
    ]
