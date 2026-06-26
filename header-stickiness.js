(function () {
  const header = document.querySelector(".site-header");
  const institution = document.querySelector(".institution-bar");
  const lab = document.querySelector(".lab-header");
  const nav = document.querySelector(".primary-nav");
  const wordmark = document.querySelector(".dgist-wordmark");
  const wordmarkText = wordmark && wordmark.querySelector("span");
  if (!header || !institution || !lab || !nav) return;

  function setHeaderMetrics() {
    document.documentElement.style.setProperty("--sticky-utility-height", `${institution.offsetHeight}px`);
    document.documentElement.style.setProperty("--sticky-nav-height", `${nav.offsetHeight}px`);
  }

  function updateCompactHeader() {
    setHeaderMetrics();
    const threshold = institution.offsetHeight + lab.offsetHeight;
    const compact = window.scrollY >= threshold;
    document.body.classList.toggle("header-compact-sticky", compact);
    if (wordmark && wordmarkText) {
      wordmark.href = compact ? wordmark.dataset.compactHref : wordmark.dataset.defaultHref;
      wordmarkText.textContent = compact ? wordmark.dataset.compactLabel : wordmark.dataset.defaultLabel;
      wordmark.setAttribute("aria-label", wordmarkText.textContent);
    }
  }

  window.addEventListener("scroll", updateCompactHeader, { passive: true });
  window.addEventListener("resize", updateCompactHeader);
  updateCompactHeader();
})();
