(function () {
  var dalgu = document.querySelector(".header-dalgu");
  var source = document.querySelector(".header-dalgu-source");
  var image = document.querySelector(".header-dalgu-image");
  var modeToggle = document.querySelector(".dalgu-mode-toggle");
  var scenery = document.querySelector(".header-dalgu-scenery");
  var skinToggle = document.querySelector(".dalgu-skin-toggle");

  if (!dalgu || !source || !image) {
    return;
  }

  var patrolStorageKey = "aprl-dalgu-patrol-origin-v1";
  var patrolDuration = 17000;
  var skins = [
    { key: "none", label: "No scenery" },
    { key: "garden", label: "Sprout garden" },
    { key: "mars", label: "Subtle Mars terrain" },
    { key: "city", label: "Minimal urban environment" }
  ];
  var modes = [
    { key: "none", label: "No Dalgu" },
    {
      key: "walk",
      label: "Walk",
      animated: "/assets/site/dalgu-walk.webp",
      fallback: "/assets/site/dalgu-walk-fallback.png"
    },
    {
      key: "bubble",
      label: "Bubble",
      animated: "/assets/site/dalgu-car-bubble.webp",
      fallback: "/assets/site/dalgu-car-bubble-fallback.png"
    },
    {
      key: "rover",
      label: "Rover",
      animated: "/assets/site/dalgu-car-rover.webp",
      fallback: "/assets/site/dalgu-car-rover-fallback.png"
    },
    {
      key: "pod",
      label: "Pod",
      animated: "/assets/site/dalgu-car-pod.webp",
      fallback: "/assets/site/dalgu-car-pod-fallback.png"
    },
    {
      key: "platform",
      label: "Platform",
      animated: "/assets/site/dalgu-car-platform.webp",
      fallback: "/assets/site/dalgu-car-platform-fallback.png"
    }
  ];
  // Decorations are opt-in on every page load, including reloads.
  var modeIndex = 0;
  var skinIndex = 0;
  var now = Date.now();
  var origin = now;

  function applyMode() {
    var mode = modes[modeIndex];

    if (mode.key !== "none") {
      source.srcset = mode.animated;
      image.src = mode.fallback;
    }
    dalgu.dataset.dalguMode = mode.key;
    dalgu.classList.toggle("is-vehicle-mode", mode.key !== "none" && mode.key !== "walk");

    if (modeToggle) {
      modeToggle.setAttribute(
        "aria-label",
        "Dalgu mode: " + mode.label + ". Switch to the next mode"
      );
      modeToggle.title =
        "Dalgu: " + mode.label + " " + (modeIndex + 1) + "/" + modes.length;
    }
  }

  function applySkin() {
    var skin = skins[skinIndex];

    if (scenery) {
      scenery.dataset.dalguSkin = skin.key;
    }

    if (skinToggle) {
      skinToggle.dataset.dalguSkin = skin.key;
      skinToggle.setAttribute(
        "aria-label",
        "Dalgu scenery: " + skin.label + ". Show the next scenery"
      );
      skinToggle.title = "Scenery: " + skin.label + " (next)";
    }
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", function () {
      modeIndex = (modeIndex + 1) % modes.length;

      applyMode();
    });
  }


  if (skinToggle) {
    skinToggle.addEventListener("click", function () {
      skinIndex = (skinIndex + 1) % skins.length;

      applySkin();
    });
  }

  applyMode();
  applySkin();

  try {
    var storedOrigin = Number(window.sessionStorage.getItem(patrolStorageKey));

    if (Number.isFinite(storedOrigin) && storedOrigin > 0 && storedOrigin <= now) {
      origin = storedOrigin;
    } else {
      window.sessionStorage.setItem(patrolStorageKey, String(origin));
    }
  } catch (error) {
    origin = now;
  }

  var elapsedInCycle = (now - origin) % patrolDuration;
  dalgu.style.animationDelay = "-" + elapsedInCycle + "ms";
})();
