# Generated by Django 5.1.3 on 2024-11-07 04:58

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_membership_residencegroup_membership_group_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='Residence',
        ),
        migrations.AddField(
            model_name='profile',
            name='Adminpincode',
            field=models.CharField(blank=True, max_length=6, null=True, validators=[django.core.validators.RegexValidator(code='Invalid_Pin_Code', message='Pin code must be exactly 6 digits', regex='^\\d{6}$')]),
        ),
        migrations.AddField(
            model_name='profile',
            name='Adminresidence',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='phonenumber',
            field=models.CharField(blank=True, max_length=10, null=True, unique=True, validators=[django.core.validators.RegexValidator(code='Invalid_Phone_Number', message='Phone number must be exactly 10 digits.', regex='^\\d{10}$')]),
        ),
        migrations.CreateModel(
            name='Residence',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ResidenceName', models.CharField(max_length=50)),
                ('Pincode', models.CharField(blank=True, max_length=6, null=True, validators=[django.core.validators.RegexValidator(code='Invalid_Pin_Code', message='Pin code must be exactly 6 digits', regex='^\\d{6}$')])),
            ],
            options={
                'unique_together': {('ResidenceName', 'Pincode')},
            },
        ),
        migrations.AddField(
            model_name='profile',
            name='Pincode',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.residence'),
        ),
    ]