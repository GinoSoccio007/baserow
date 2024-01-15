# Generated by Django 4.0.10 on 2024-01-11 15:03

import django.db.models.deletion
from django.db import migrations, models

import baserow.core.formula.field


class Migration(migrations.Migration):
    dependencies = [
        ("builder", "0037_auto_20240111_1001"),
    ]

    operations = [
        migrations.CreateModel(
            name="IFrameElement",
            fields=[
                (
                    "element_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="builder.element",
                    ),
                ),
                (
                    "source_type",
                    models.CharField(
                        choices=[("url", "Url"), ("embed", "Embed")],
                        default="url",
                        max_length=32,
                    ),
                ),
                (
                    "url",
                    baserow.core.formula.field.FormulaField(
                        blank=True, default="", help_text="A link to the page to embed"
                    ),
                ),
                (
                    "embed",
                    baserow.core.formula.field.FormulaField(
                        blank=True, default="", help_text="Inline HTML to embed"
                    ),
                ),
                (
                    "height",
                    models.PositiveIntegerField(
                        default=300, help_text="Height in pixels of the iframe"
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
            bases=("builder.element",),
        ),
    ]
