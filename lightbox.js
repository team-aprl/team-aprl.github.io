(() => {
  const images = "main img:not([data-lightbox='off']), .lab-logo-link img";
  let overlay;
  let overlayImage;
  let previousFocus;

  const imageSource = (image) => {
    const link = image.closest("a");
    if (link && /\.(avif|gif|jpe?g|png|webp|svg)(\?.*)?$/i.test(link.href)) {
      return link.href;
    }
    return image.currentSrc || image.src;
  };

  const closeLightbox = () => {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    overlayImage.removeAttribute("src");
    document.body.classList.remove("lightbox-open");
    if (previousFocus) previousFocus.focus();
  };

  const openLightbox = (image) => {
    if (!overlay) {
      overlay = document.createElement("button");
      overlay.type = "button";
      overlay.className = "image-lightbox";
      overlay.hidden = true;
      overlay.setAttribute("aria-label", "Close image preview");

      overlayImage = document.createElement("img");
      overlay.append(overlayImage);
      overlay.addEventListener("click", closeLightbox);
      document.body.append(overlay);
    }

    previousFocus = document.activeElement;
    overlayImage.src = imageSource(image);
    overlayImage.alt = image.alt || "";
    overlay.hidden = false;
    document.body.classList.add("lightbox-open");
    overlay.focus();
  };

  document.addEventListener("click", (event) => {
    const logoLink = event.target.closest(".lab-logo-link");
    const image = logoLink ? logoLink.querySelector("img") : event.target.closest(images);
    if (!image) return;

    const link = logoLink || image.closest("a");
    if (link && link.contains(image)) event.preventDefault();

    openLightbox(image);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();
