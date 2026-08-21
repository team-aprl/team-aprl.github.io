const joiningTabButtons = Array.from(document.querySelectorAll("[data-joining-language]"));
      const joiningPanels = Array.from(document.querySelectorAll(".joining-language-panel"));
      const joiningSubtitle = document.querySelector(".joining-subtitle");
      joiningTabButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const language = button.dataset.joiningLanguage;
          joiningTabButtons.forEach((tab) => {
            const active = tab.dataset.joiningLanguage === language;
            tab.classList.toggle("is-active", active);
            tab.setAttribute("aria-selected", active ? "true" : "false");
          });
          joiningPanels.forEach((panel) => {
            const active = panel.id === `joining-${language}`;
            panel.classList.toggle("is-active", active);
            panel.hidden = !active;
          });
          if (joiningSubtitle) joiningSubtitle.textContent = joiningSubtitle.dataset[`text${language.charAt(0).toUpperCase() + language.slice(1)}`];
        });
      });
