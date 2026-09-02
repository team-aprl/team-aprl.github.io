---
name: aprl-site-images
description: Apply APRL's shared image-loading policy whenever adding, replacing, or optimizing raster images, galleries, cards, avatars, or lightboxes on this site.
---

# APRL Site Images

Use small display assets for normal page rendering and keep originals out of the initial request path.

## Policy

- Preserve the original image as the click or lightbox target when a full-size view is useful.
- Render raster content from a WebP thumbnail: 800 px maximum width and quality 82 by default. Use 400 px for people portraits and 256 px for the shared APRL avatar.
- Never upscale a source image.
- Add intrinsic `width` and `height`, `decoding="async"`, and an explicit `loading` value to every raster `<img>`.
- Allow at most one content image per page to use `loading="eager" fetchpriority="high"`. Use it only for the first meaningful above-the-fold image. Everything else is `loading="lazy"`.
- Shared header icons may be eager because they are tiny, but must not use `fetchpriority="high"`.
- A clickable image's `href` must remain the original. Its `src` must be the thumbnail.
- Keep thumbnails below 300 KB. Prefer substantially smaller files when the displayed size allows it.
- Do not replace animated WebP files with still thumbnails.

## Workflow

1. Generate each display asset with `scripts/make-thumbnail.sh SOURCE TARGET [MAX_WIDTH] [QUALITY]`.
2. Update the HTML `src` only; preserve the original `href`.
3. Add the generated file's intrinsic dimensions and loading attributes.
4. Build Jekyll.
5. Run `ruby skills/aprl-site-images/scripts/audit-site-images.rb _site`.
6. Verify the changed pages at desktop and mobile widths, including opening one original image.

Do not push or deploy unless the user explicitly asks.
