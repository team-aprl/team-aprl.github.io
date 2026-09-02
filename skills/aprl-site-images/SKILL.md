---
name: aprl-site-images
description: Apply APRL's shared image-loading policy whenever adding, replacing, or optimizing raster images, galleries, cards, avatars, or lightboxes on this site.
---

# APRL Site Images

Use small display assets for normal page rendering and keep originals out of the initial request path.

## Policy

- Preserve source originals in the repository. Use a separate high-quality lightbox preview as the click target when an original exceeds the site's preview bound.
- Render raster content from a WebP thumbnail: 800 px maximum width and quality 82 by default. Use 400 px for people portraits and 256 px for the shared APRL avatar.
- Bound dataset and gallery lightbox assets within 1800 px width and 1200 px height without upscaling or changing aspect ratio. Use quality 90 for generated WebP lightbox previews.
- Never upscale a source image.
- Add intrinsic `width` and `height`, `decoding="async"`, and an explicit `loading` value to every raster `<img>`.
- Allow at most one content image per page to use `loading="eager" fetchpriority="high"`. Use it only for the first meaningful above-the-fold image. Everything else is `loading="lazy"`.
- Shared header icons may be eager because they are tiny, but must not use `fetchpriority="high"`.
- A clickable image's `src` must be the thumbnail. Its `href` must use the original when already within 1800x1200, otherwise a bounded lightbox preview.
- Keep thumbnails below 300 KB. Prefer substantially smaller files when the displayed size allows it.
- Do not replace animated WebP files with still thumbnails.

## Workflow

1. Generate each display asset with `scripts/make-thumbnail.sh SOURCE TARGET [MAX_WIDTH] [QUALITY]`.
2. When needed, generate a click preview with `scripts/make-lightbox-preview.sh SOURCE TARGET [MAX_WIDTH=1800] [MAX_HEIGHT=1200] [QUALITY=90]` and point `href` to it.
3. Add the generated file's intrinsic dimensions and loading attributes.
4. Build Jekyll.
5. Run `ruby skills/aprl-site-images/scripts/audit-site-images.rb _site`.
6. Verify the changed pages at desktop and mobile widths, including opening one bounded click preview.

Do not push or deploy unless the user explicitly asks.
