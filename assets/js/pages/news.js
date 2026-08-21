(() => {
    const filters = Array.from(document.querySelectorAll("[data-news-filter]"));
    const items = Array.from(document.querySelectorAll("[data-news-category]"));
    const count = document.querySelector("#news-filter-count");
    const validFilters = new Set(filters.map((button) => button.dataset.newsFilter));
    const yearHeadings = Array.from(document.querySelectorAll("[data-news-year]"));

    function syncNewsYearCollapse(yearHeading) {
      const list = yearHeading.nextElementSibling;
      const toggle = yearHeading.querySelector("[data-news-year-toggle]");
      const collapsed = yearHeading.dataset.collapsed === "true";
      if (list) list.classList.toggle("is-collapsed", collapsed);
      if (toggle) {
        toggle.textContent = collapsed ? "▸" : "▾";
        toggle.setAttribute("aria-label", collapsed ? `Expand ${yearHeading.dataset.yearLabel}` : `Collapse ${yearHeading.dataset.yearLabel}`);
        toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
      }
    }

    yearHeadings.forEach((yearHeading) => {
      const label = yearHeading.textContent.trim();
      yearHeading.dataset.yearLabel = label;
      yearHeading.textContent = "";
      const yearText = document.createElement("span");
      yearText.textContent = label;
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.dataset.newsYearToggle = "";
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", `Collapse ${label}`);
      toggle.textContent = "▾";
      toggle.addEventListener("click", () => {
        yearHeading.dataset.collapsed = yearHeading.dataset.collapsed === "true" ? "false" : "true";
        syncNewsYearCollapse(yearHeading);
      });
      yearHeading.append(yearText, toggle);
      yearHeading.dataset.collapsed = "false";
    });

    function setAllNewsYearsCollapsed(collapsed) {
      yearHeadings.forEach((yearHeading) => {
        yearHeading.dataset.collapsed = collapsed ? "true" : "false";
        syncNewsYearCollapse(yearHeading);
      });
    }

    function applyNewsFilter(category) {
      let visible = 0;
      items.forEach((item) => {
        const matches = category === "all" || item.dataset.newsCategory === category;
        item.classList.toggle("is-hidden", !matches);
        if (matches) visible += 1;
      });

      yearHeadings.forEach((yearHeading) => {
        const list = yearHeading.nextElementSibling;
        const hasVisibleItems = list && list.querySelector("[data-news-category]:not(.is-hidden)");
        yearHeading.classList.toggle("is-hidden", !hasVisibleItems);
        if (list) list.classList.toggle("is-hidden", !hasVisibleItems);
        syncNewsYearCollapse(yearHeading);
      });

      filters.forEach((button) => {
        const active = button.dataset.newsFilter === category;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (count) {
        count.textContent = category === "all"
          ? "APRL announcements and updates."
          : `${visible} ${category} update${visible === 1 ? "" : "s"}.`;
      }
    }

    function updateNewsQuery(category) {
      const params = new URLSearchParams(window.location.search);
      if (category === "all") params.delete("category");
      else params.set("category", category);
      const query = params.toString();
      window.history.replaceState(null, "", `${window.location.pathname}${query ? "?" + query : ""}${window.location.hash}`);
    }

    filters.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.dataset.newsFilter;
        applyNewsFilter(category);
        updateNewsQuery(category);
      });
    });

    document.querySelector("[data-news-collapse-all]")?.addEventListener("click", () => setAllNewsYearsCollapsed(true));
    document.querySelector("[data-news-expand-all]")?.addEventListener("click", () => setAllNewsYearsCollapsed(false));

    const initialCategory = new URLSearchParams(window.location.search).get("category");
    applyNewsFilter(validFilters.has(initialCategory) ? initialCategory : "all");
  })();
