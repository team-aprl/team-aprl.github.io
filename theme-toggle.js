(function () {
  const storageKey = "aprlTheme";
  const button = document.querySelector(".theme-toggle");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem(storageKey);
  let isDark = savedTheme ? savedTheme === "dark" : prefersDark;

  function renderTheme() {
    document.body.classList.toggle("theme-dark", isDark);
    if (!button) return;
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute(
      "aria-label",
      isDark ? "Current theme: Dark. Switch to light theme" : "Current theme: Light. Switch to dark theme"
    );
    const icon = button.querySelector(".theme-toggle-icon");
    if (icon) icon.innerHTML = isDark ? "&#9790;" : "&#9728;";
    const text = button.querySelector(".theme-toggle-text");
    if (text) text.textContent = isDark ? "Dark" : "Light";
  }

  renderTheme();
  window.requestAnimationFrame(() => document.body.classList.add("theme-ready"));

  if (button) {
    button.addEventListener("click", () => {
      isDark = !isDark;
      localStorage.setItem(storageKey, isDark ? "dark" : "light");
      renderTheme();
    });
  }
})();
