(function () {
  var dalgu = document.querySelector(".header-dalgu");

  if (!dalgu) {
    return;
  }

  var storageKey = "aprl-dalgu-patrol-origin-v1";
  var patrolDuration = 17000;
  var now = Date.now();
  var origin = now;

  try {
    var storedOrigin = Number(window.sessionStorage.getItem(storageKey));

    if (Number.isFinite(storedOrigin) && storedOrigin > 0 && storedOrigin <= now) {
      origin = storedOrigin;
    } else {
      window.sessionStorage.setItem(storageKey, String(origin));
    }
  } catch (error) {
    origin = now;
  }

  var elapsedInCycle = (now - origin) % patrolDuration;
  dalgu.style.animationDelay = "-" + elapsedInCycle + "ms";
})();
