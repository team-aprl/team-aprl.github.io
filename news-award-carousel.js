(() => {
  const itemSelector = '[data-news-id="icros-young-researcher"]';
  const triggerSelector = `${itemSelector} a[href*="icros2026-outstanding-young-researcher-award.jpg"]`;
  const images = [
    "assets/news/icros2026-outstanding-young-researcher-award.jpg",
    "assets/news/icros2026-outstanding-young-researcher-award-ceremony.jpg",
  ];
  let modal;
  let currentIndex = 0;
  let returnFocus;
  let touchStartX = 0;

  function isKorean() {
    return window.aprlNewsLanguage?.current === "ko";
  }

  function text(en, ko) {
    return isKorean() ? ko : en;
  }

  function syncTriggers() {
    document.querySelectorAll(triggerSelector).forEach((trigger) => {
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("title", text("Open award photo gallery", "수상 사진 갤러리 열기"));
    });
  }

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "news-award-carousel-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <button class="news-award-carousel-backdrop" type="button" aria-label="Close photo gallery"></button>
      <div class="news-award-carousel-dialog" role="dialog" aria-modal="true" aria-labelledby="news-award-carousel-title">
        <div class="news-award-carousel-heading">
          <h2 id="news-award-carousel-title">Outstanding Young Researcher Award</h2>
          <button class="news-award-carousel-close" type="button" aria-label="Close photo gallery">&times;</button>
        </div>
        <div class="news-award-carousel-stage">
          <img class="news-award-carousel-image" alt="">
          <button class="news-award-carousel-arrow news-award-carousel-prev" type="button" aria-label="Previous photo">&#8249;</button>
          <button class="news-award-carousel-arrow news-award-carousel-next" type="button" aria-label="Next photo">&#8250;</button>
        </div>
        <div class="news-award-carousel-footer">
          <span class="news-award-carousel-count" aria-live="polite"></span>
          <div class="news-award-carousel-dots" aria-label="Photo selector"></div>
        </div>
      </div>`;

    modal.querySelector(".news-award-carousel-backdrop").addEventListener("click", close);
    modal.querySelector(".news-award-carousel-close").addEventListener("click", close);
    modal.querySelector(".news-award-carousel-prev").addEventListener("click", () => show(currentIndex - 1));
    modal.querySelector(".news-award-carousel-next").addEventListener("click", () => show(currentIndex + 1));
    modal.querySelector(".news-award-carousel-dots").addEventListener("click", (event) => {
      const dot = event.target.closest("[data-news-award-slide]");
      if (dot) show(Number(dot.dataset.newsAwardSlide));
    });

    const stage = modal.querySelector(".news-award-carousel-stage");
    stage.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    stage.addEventListener("touchend", (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 40) show(currentIndex + (distance > 0 ? -1 : 1));
    }, { passive: true });

    document.body.appendChild(modal);
    return modal;
  }

  function updateLabels() {
    if (!modal) return;
    modal.querySelector(".news-award-carousel-backdrop").setAttribute("aria-label", text("Close photo gallery", "사진 갤러리 닫기"));
    modal.querySelector(".news-award-carousel-close").setAttribute("aria-label", text("Close photo gallery", "사진 갤러리 닫기"));
    modal.querySelector(".news-award-carousel-prev").setAttribute("aria-label", text("Previous photo", "이전 사진"));
    modal.querySelector(".news-award-carousel-next").setAttribute("aria-label", text("Next photo", "다음 사진"));
    modal.querySelector(".news-award-carousel-dots").setAttribute("aria-label", text("Photo selector", "사진 선택"));
  }

  function show(requestedIndex) {
    ensureModal();
    currentIndex = (requestedIndex + images.length) % images.length;
    const image = modal.querySelector(".news-award-carousel-image");
    image.src = images[currentIndex];
    image.alt = text(
      `Outstanding Young Researcher Award photo ${currentIndex + 1} of ${images.length}`,
      `우수신진연구자상 사진 ${currentIndex + 1}/${images.length}`
    );
    modal.querySelector(".news-award-carousel-count").textContent = `${currentIndex + 1} / ${images.length}`;
    modal.querySelector(".news-award-carousel-dots").innerHTML = images.map((_, index) =>
      `<button class="news-award-carousel-dot${index === currentIndex ? " is-active" : ""}" type="button" data-news-award-slide="${index}" aria-label="${text(`Show photo ${index + 1}`, `${index + 1}번 사진 보기`)}"${index === currentIndex ? ' aria-current="true"' : ""}></button>`
    ).join("");
    const nextImage = new Image();
    nextImage.src = images[(currentIndex + 1) % images.length];
  }

  function open(trigger) {
    ensureModal();
    returnFocus = trigger;
    updateLabels();
    show(0);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("news-award-carousel-open");
    modal.querySelector(".news-award-carousel-close").focus();
  }

  function close() {
    if (!modal?.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("news-award-carousel-open");
    returnFocus?.focus();
  }

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest(triggerSelector);
    if (!trigger) return;
    event.preventDefault();
    open(trigger);
  });

  document.addEventListener("keydown", (event) => {
    if (!modal?.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(currentIndex - 1);
    if (event.key === "ArrowRight") show(currentIndex + 1);
  });

  window.addEventListener("aprl:news-language", () => {
    syncTriggers();
    updateLabels();
    if (modal?.classList.contains("is-open")) show(currentIndex);
  });

  syncTriggers();
})();
