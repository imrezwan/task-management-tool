# Generated by Django 4.1.3 on 2022-11-27 17:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('boards', '0003_carditem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carditem',
            name='desc',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='carditem',
            name='listitem',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='carditems', to='boards.listitem'),
        ),
        migrations.AlterField(
            model_name='listitem',
            name='board',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='listitems', to='boards.board'),
        ),
    ]
