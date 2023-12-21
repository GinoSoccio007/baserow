# Generated by Django 3.2.18 on 2023-06-16 08:06

import django.db.models.deletion
from django.db import migrations, models

import baserow.core.mixins


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0070_integration_service"),
        ("builder", "0012_imageelement"),
    ]

    operations = [
        migrations.CreateModel(
            name="DataSource",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("trashed", models.BooleanField(db_index=True, default=False)),
                (
                    "name",
                    models.CharField(
                        blank=True,
                        default="",
                        help_text="Human name for this data source.",
                        max_length=255,
                    ),
                ),
                (
                    "order",
                    models.DecimalField(
                        decimal_places=20,
                        default=1,
                        editable=False,
                        help_text="Lowest first.",
                        max_digits=40,
                    ),
                ),
                (
                    "page",
                    models.ForeignKey(
                        help_text="Page this data source is linked to.",
                        on_delete=django.db.models.deletion.CASCADE,
                        to="builder.page",
                    ),
                ),
                (
                    "service",
                    models.OneToOneField(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="data_source",
                        to="core.service",
                    ),
                ),
            ],
            options={
                "ordering": ("order", "id"),
                "unique_together": {("page", "name")},
            },
            bases=(baserow.core.mixins.FractionOrderableMixin, models.Model),
        ),
    ]