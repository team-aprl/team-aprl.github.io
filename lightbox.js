(() => {
  const images = "main img:not([data-lightbox='off']), .lab-logo-link img";
  let overlay;
  let overlayImage;
  let documentOverlay;
  let documentFrame;
  let copyToast;
  let copyToastTimer;
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

  const closeDocumentLightbox = () => {
    if (!documentOverlay || documentOverlay.hidden) return;
    documentOverlay.hidden = true;
    documentFrame.removeAttribute("src");
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

  const openDocumentLightbox = (link) => {
    if (!documentOverlay) {
      documentOverlay = document.createElement("div");
      documentOverlay.className = "document-lightbox";
      documentOverlay.hidden = true;

      const panel = document.createElement("div");
      panel.className = "document-lightbox-panel";

      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "document-lightbox-close";
      closeButton.setAttribute("aria-label", "Close document preview");
      closeButton.textContent = "x";
      closeButton.addEventListener("click", closeDocumentLightbox);

      documentFrame = document.createElement("iframe");
      documentFrame.title = link.textContent.trim() || "Document preview";

      panel.append(closeButton, documentFrame);
      documentOverlay.append(panel);
      documentOverlay.addEventListener("click", (event) => {
        if (event.target === documentOverlay) closeDocumentLightbox();
      });
      document.body.append(documentOverlay);
    }

    previousFocus = document.activeElement;
    documentFrame.src = link.href;
    documentOverlay.hidden = false;
    document.body.classList.add("lightbox-open");
    documentOverlay.querySelector("button").focus();
  };

  const showCopyToast = (event) => {
    if (!copyToast) {
      copyToast = document.createElement("div");
      copyToast.className = "copy-toast";
      copyToast.setAttribute("role", "status");
      copyToast.setAttribute("aria-live", "polite");
      document.body.append(copyToast);
    }

    copyToast.textContent = "Mail copied!";
    copyToast.style.left = `${event.clientX}px`;
    copyToast.style.top = `${event.clientY}px`;
    copyToast.hidden = false;

    window.clearTimeout(copyToastTimer);
    copyToastTimer = window.setTimeout(() => {
      copyToast.hidden = true;
    }, 1000);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  document.addEventListener("click", (event) => {
    const emailButton = event.target.closest(".member-email-link[data-email]");
    if (emailButton) {
      copyText(emailButton.dataset.email).then(() => showCopyToast(event));
      return;
    }

    const documentLink = event.target.closest("a[data-preview='document']");
    if (documentLink) {
      event.preventDefault();
      openDocumentLightbox(documentLink);
      return;
    }

    const logoLink = event.target.closest(".lab-logo-link");
    const figureLink = event.target.closest("a.publication-figure");
    const image = logoLink
      ? logoLink.querySelector("img")
      : figureLink
        ? figureLink.querySelector("img")
        : event.target.closest(images);
    if (!image) return;

    const link = logoLink || figureLink || image.closest("a");
    if (link && link.contains(image)) event.preventDefault();

    openLightbox(image);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      closeDocumentLightbox();
    }
  });
})();
