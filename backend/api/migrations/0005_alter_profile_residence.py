# Generated by Django 5.1.2 on 2024-11-05 07:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_profile_isverified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='Residence',
            field=models.CharField(max_length=100),
        ),
    ]