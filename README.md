# Team APRL Website

Static GitHub Pages site for the Autonomy and Perceptual Robotics Lab (APRL),
Department of Robotics and Mechatronics Engineering, DGIST.

Published at: https://team-aprl.github.io

The shared header's city scenery turns its streetlights on in dark mode and off
in light mode. Lamp lighting follows the theme and scenery switches automatically.
The garden scenery also shows subtle stars in dark mode, away from the header text.

The news archive automatically counts news entries by category for each year.
Year summaries use muted gray tags when expanded and category colors when collapsed.
Tutorial and workshop organization belongs to Service (학술봉사); general events
remain under Event. Keep the English entries in `news.html` and their Korean
translations in `news-language.js` aligned by `data-news-id`.


The gallery keeps the IROS 2026 Best Paper Award (September 30) separate from
the conference attendance photos. The March 17, 2025 lab renovation and
August 14, 2025 first Research Day galleries include all five and four photos,
respectively, from the original Google Sites gallery:
https://sites.google.com/view/aprl-dgist/gallery . Source photos are kept in
assets/gallery; WebP thumbnails and bounded lightbox previews are stored in
assets/gallery/thumbs and assets/gallery/previews. Image generation and
validation guidance is in skills/aprl-site-images/SKILL.md.

Conference attendance galleries also include member-provided photos: ICRA 2026
(four photos), IFAC 2026 (two), ICROS 2026 (two), and IROS 2025 (four). Each
carousel retains its existing first photo, date, and caption.

The LT-Mem IROS 2026 news links explicitly label the award certificate and
finalist certificates. The original Best Paper Award and Best Student Paper
Award finalist PDFs are preserved in `assets/news/` as
`lt-mem-iros2026-best-paper-finalist-certificate.pdf` and
`lt-mem-iros2026-best-student-paper-finalist-certificate.pdf`. These two PDFs
certify finalist selection; the separate award news links to the winning certificate.
