# Generated by Django 3.2.6 on 2021-10-04 16:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("database", "0037_alter_exportjob_export_options"),
    ]

    operations = [
        migrations.CreateModel(
            name="MultipleSelectField",
            fields=[
                (
                    "field_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="database.field",
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
            bases=("database.field",),
        ),
    ]