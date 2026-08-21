# Team APRL Website

Static GitHub Pages site for the Autonomy and Perceptual Robotics Lab (APRL),
Department of Robotics and Mechatronics Engineering, DGIST.

Published at: https://team-aprl.github.io

## Architecture

The site uses one canonical content source and a replaceable presentation
layer. Content under `_data/` must contain facts, links, semantic rich text,
and media references only. It must not contain CSS classes, layout variants,
font sizes, colors, image crops, loading strategies, or other design choices.

- `_data/`: canonical publications, news, projects, datasets, gallery,
  teaching, people, site identity, and navigation content.
- `_includes/render/`: stable component facade used by pages.
- `_includes/themes/current/`: markup and display decisions for the existing
  APRL design.
- `assets/css/current.css`: the existing stylesheet preserved byte-for-byte.
- `assets/js/pages/`: page behavior formerly embedded in HTML.
- `scripts/validate_content_schema.py`: rejects presentation fields or
  class/style markup in canonical content.

`design_theme: current` in `_config.yml` selects the active design. A future
theme should add its own renderer and stylesheet while continuing to consume
the same `_data` records. Theme templates may decide layout, classes, emphasis,
image behavior, and interaction; they must not become another content source.

## Editing content

Edit each fact in its canonical file:

- publications: `_data/publications.yml`
- news and homepage latest-news feed: `_data/news.yml`
- funded projects and Korean translations: `_data/projects.yml`
- lab members and collaborators: `_data/people.yml`
- datasets, gallery, and teaching: their matching `_data/*.yml` files
- lab identity/contact and navigation: `_data/site.yml` and
  `_data/navigation.yml`

## Local validation

Use the repository's Ruby 2.7 toolchain on Windows:

```powershell
$env:BUNDLE_GEMFILE = Join-Path $PWD 'Gemfile'
C:\Ruby27-x64\bin\bundle.cmd exec jekyll build
python scripts/validate_content_schema.py
git diff --check
```

The schema validator requires Python with `PyYAML`.

## Deployment boundary

GitHub Pages is a legacy build sourced from the repository's `main` branch and
root directory. Feature branches, including architecture experiments, are not
hosted. Pushing a feature branch does not alter the live website; deployment
requires a separately reviewed merge to `main`.

