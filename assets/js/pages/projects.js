(() => {
          const section = document.querySelector("#funded-projects");
          if (!section) return;
          let activeProjectRoleFilter = "all";

          const labels = {
            en: {
              Current: "Current",
              CurrentSummary: "Current National Projects",
              Completed: "Completed",
              Role: "Role",
              Period: "Period",
              "Funding Source": "Funding Source",
              Program: "Program",
              Title: "Title",
            },
            ko: {
              Current: "진행 중",
              CurrentSummary: "진행 중인 국가과제",
              Completed: "완료",
              Role: "역할",
              Period: "기간",
              "Funding Source": "지원기관",
              Program: "사업명",
              Title: "과제명",
            },
          };

          function setMetaValue(span, value) {
            const label = span.querySelector("b");
            span.textContent = "";
            span.appendChild(label);
            String(value)
              .split("\n")
              .forEach((part, index) => {
                if (index > 0) span.appendChild(document.createElement("br"));
                span.appendChild(document.createTextNode(part));
              });
          }

          function cacheOriginals() {
            section.querySelectorAll(".project-card").forEach((card) => {
              const title = card.querySelector("h3");
              if (!title || card.dataset.projectKey) return;
              card.dataset.projectKey = title.textContent.trim();
              title.dataset.en = title.textContent.trim();
              card.querySelectorAll(".publication-meta span").forEach((span) => {
                const label = span.querySelector("b");
                if (!label) return;
                const labelText = label.textContent.trim();
                span.dataset.enLabel = labelText;
                span.dataset.enValue = Array.from(span.childNodes)
                  .filter((node) => node !== label)
                  .map((node) => (node.nodeName === "BR" ? "\n" : node.textContent))
                  .join("")
                  .trim();
              });
            });
          }

          function setLanguage(language) {
            section.querySelectorAll("[data-project-lang]").forEach((button) => {
              const active = button.dataset.projectLang === language;
              button.classList.toggle("is-active", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
            });

            section.querySelectorAll(".project-status-row span, .publication-year, .project-card .pub-badge").forEach((element) => {
              const original = element.dataset.en || element.textContent.trim();
              element.dataset.en = original;
              const labelKey = element.closest(".project-status-row") && original === "Current" ? "CurrentSummary" : original;
              element.textContent = labels[language][labelKey] || original;
            });

            section.querySelectorAll(".project-card").forEach((card) => {
              const key = card.dataset.projectKey;
              const localized = { title: card.dataset.projectTitleKo || title.dataset.en, meta: Object.fromEntries(Array.from(card.querySelectorAll('.publication-meta span[data-project-value-ko]')).map((span) => [span.dataset.enLabel, span.dataset.projectValueKo])) };
              const title = card.querySelector("h3");
              if (title) title.textContent = language === "ko" && localized ? localized.title : title.dataset.en;

              card.querySelectorAll(".publication-meta span").forEach((span) => {
                const label = span.querySelector("b");
                if (!label) return;
                const enLabel = span.dataset.enLabel;
                const enValue = span.dataset.enValue;
                label.textContent = labels[language][enLabel] || enLabel;
                const koValue = localized && localized.meta ? localized.meta[enLabel] : "";
                setMetaValue(span, language === "ko" && koValue ? koValue : enValue);
              });
            });
            applyProjectRoleFilter();
          }

          function applyProjectRoleFilter() {
            const filtering = activeProjectRoleFilter !== "all";
            section.querySelectorAll("[data-project-role-filter]").forEach((button) => {
              const active = button.dataset.projectRoleFilter === activeProjectRoleFilter;
              button.classList.toggle("is-active", active);
              button.setAttribute("aria-pressed", active ? "true" : "false");
            });

            section.querySelectorAll(".project-current-list .project-card").forEach((card) => {
              const roles = (card.dataset.projectRoles || "").split(/\s+/).filter(Boolean);
              card.classList.toggle("is-hidden", filtering && !roles.includes(activeProjectRoleFilter));
            });

            const completedYear = section.querySelectorAll(".publication-year")[1];
            const completedList = section.querySelector(".project-completed-list");
            if (completedYear) completedYear.classList.toggle("is-hidden", filtering);
            if (completedList) completedList.classList.toggle("is-hidden", filtering);
          }

          cacheOriginals();
          setLanguage("en");
          section.querySelectorAll("[data-project-role-filter]").forEach((button) => {
            button.addEventListener("click", () => {
              const nextFilter = button.dataset.projectRoleFilter || "all";
              activeProjectRoleFilter = nextFilter === "all" || activeProjectRoleFilter === nextFilter ? "all" : nextFilter;
              applyProjectRoleFilter();
            });
          });
          section.querySelectorAll("[data-project-lang]").forEach((button) => {
            button.addEventListener("click", () => setLanguage(button.dataset.projectLang));
          });
        })();
