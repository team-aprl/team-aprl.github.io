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
  var modeStorageKey = "aprl-dalgu-mode-v1";
  var skinStorageKey = "aprl-dalgu-skin-v1";
  var patrolDuration = 17000;
  var skins = [
    { key: "garden", label: "Sprout garden" },
    { key: "mars", label: "Subtle Mars terrain" },
    { key: "city", label: "Minimal urban environment" },
    { key: "none", label: "No scenery" }
  ];
  var modes = [
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
  var modeIndex = Math.floor(Math.random() * modes.length);
  var skinIndex = 0;
  var now = Date.now();
  var origin = now;

  try {
    var storedMode = window.sessionStorage.getItem(modeStorageKey);
    var storedModeIndex = modes.findIndex(function (mode) {
      return mode.key === storedMode;
    });
    var navigationEntry = window.performance &&
      window.performance.getEntriesByType &&
      window.performance.getEntriesByType("navigation")[0];
    var isReload = navigationEntry && navigationEntry.type === "reload";

    if (!isReload && storedModeIndex >= 0) {
      modeIndex = storedModeIndex;
    }

    window.sessionStorage.setItem(modeStorageKey, modes[modeIndex].key);

    var storedSkin = window.sessionStorage.getItem(skinStorageKey);
    var storedSkinIndex = skins.findIndex(function (skin) {
      return skin.key === storedSkin;
    });

    if (storedSkinIndex >= 0) {
      skinIndex = isReload
        ? (storedSkinIndex + 1) % skins.length
        : storedSkinIndex;
    }

    window.sessionStorage.setItem(skinStorageKey, skins[skinIndex].key);
  } catch (error) {
    // A random mode is still used when browser storage is unavailable.
  }

  function applyMode() {
    var mode = modes[modeIndex];

    source.srcset = mode.animated;
    image.src = mode.fallback;
    dalgu.dataset.dalguMode = mode.key;
    dalgu.classList.toggle("is-vehicle-mode", mode.key !== "walk");

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

      try {
        window.sessionStorage.setItem(modeStorageKey, modes[modeIndex].key);
      } catch (error) {
        // The mode still changes for this page when storage is unavailable.
      }

      applyMode();
    });
  }


  if (skinToggle) {
    skinToggle.addEventListener("click", function () {
      skinIndex = (skinIndex + 1) % skins.length;

      try {
        window.sessionStorage.setItem(skinStorageKey, skins[skinIndex].key);
      } catch (error) {
        // The scenery still changes for this page when storage is unavailable.
      }

      applySkin();
    });
  }

  modes.slice(1).forEach(function (mode) {
    var preload = new Image();
    preload.src = mode.animated;
  });

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
