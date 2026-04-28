(() => {
  const frame = document.getElementById("panoFrame");
  if (frame) {
    document.querySelectorAll(".naming-table tbody tr[data-pano]").forEach((row) => {
      row.tabIndex = 0;
      row.setAttribute("role", "button");
      const openPano = () => {
        const url = row.getAttribute("data-pano");
        if (!url) return;
        frame.src = url;
        const label = row.cells && row.cells.length ? row.cells[0].textContent.trim() : "";
        frame.title = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
        document.querySelectorAll(".naming-table tbody tr.active").forEach((active) => {
          active.classList.remove("active");
        });
        row.classList.add("active");
      };
      row.addEventListener("click", openPano);
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPano();
        }
      });
    });
  }

  const revealItems = document.querySelectorAll(".feature[data-reveal]");
  if ("IntersectionObserver" in window && revealItems.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-in"));
  }

  const panel = document.getElementById("survey-panel");
  const backdrop = document.getElementById("survey-backdrop");
  const closeBtn = document.getElementById("survey-close");
  const submitBtn = document.getElementById("survey-submit");
  const openButtons = document.querySelectorAll(".open-survey");
  const wealthOther = document.getElementById("survey-wealth-other");
  const wealthOtherWrap = document.getElementById("survey-wealth-other-wrap");
  const progressBar = document.getElementById("survey-progress-bar");
  const progressText = document.getElementById("survey-progress-text");

  const isChecked = (name) => document.querySelectorAll(`input[name="${name}"]:checked`).length > 0;
  const hasText = (name) => {
    const node = document.querySelector(`[name="${name}"]`);
    return Boolean(node && node.value.trim() !== "");
  };

  const updateProgress = () => {
    if (!progressBar || !progressText) return;
    let answered = 0;
    const total = 14;

    if (isChecked("wealth") || hasText("wealth_other")) answered += 1;
    if (isChecked("wealth_obligation")) answered += 1;
    if (isChecked("values")) answered += 1;
    if (hasText("first_choice_reason")) answered += 1;
    if (isChecked("associations")) answered += 1;
    if (isChecked("estate_planning")) answered += 1;
    if (isChecked("estate-planning")) answered += 1;
    if (document.querySelector("input[name='skills']:checked")) answered += 1;
    if (document.querySelector("input[name='charity-involvement']:checked")) answered += 1;
    if (document.querySelector("input[name='charitable-gifts']:checked")) answered += 1;
    if (isChecked("charitable-transfer")) answered += 1;
    if (isChecked("family-philanthropy")) answered += 1;
    if (isChecked("philanthropy")) answered += 1;
    if (isChecked("recognition")) answered += 1;

    const percent = Math.round((answered / total) * 100);
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}% completed`;
  };

  if (panel && backdrop && closeBtn) {
    const openPanel = () => {
      panel.classList.add("open");
      backdrop.classList.add("visible");
      panel.setAttribute("aria-hidden", "false");
      backdrop.setAttribute("aria-hidden", "false");
    };

    const closePanel = () => {
      panel.classList.remove("open");
      backdrop.classList.remove("visible");
      panel.setAttribute("aria-hidden", "true");
      backdrop.setAttribute("aria-hidden", "true");
    };

    openButtons.forEach((btn) => btn.addEventListener("click", openPanel));
    closeBtn.addEventListener("click", closePanel);
    backdrop.addEventListener("click", closePanel);

    if (wealthOther && wealthOtherWrap) {
      wealthOther.addEventListener("change", () => {
        wealthOtherWrap.style.display = wealthOther.checked ? "block" : "none";
        updateProgress();
      });
    }

    document.addEventListener("input", updateProgress);
    updateProgress();

    if (submitBtn) {
      submitBtn.addEventListener("click", async () => {
        const consent = document.getElementById("survey-consent");
        if (!consent || !consent.checked) {
          alert("Please agree to the Privacy Policy to continue.");
          return;
        }

        const getCheckedValues = (name) =>
          Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((i) => i.value);

        const payload = {
          name: (document.querySelector('[name="name"]') || {}).value || "",
          email: (document.querySelector('[name="email"]') || {}).value || "",
          phone: (document.querySelector('[name="phone"]') || {}).value || "",
          wealth: getCheckedValues("wealth"),
          wealth_other: (document.querySelector('[name="wealth_other"]') || {}).value || "",
          wealth_obligation: getCheckedValues("wealth_obligation"),
          values: getCheckedValues("values"),
          first_choice_reason: (document.querySelector('[name="first_choice_reason"]') || {}).value || "",
          associations: getCheckedValues("associations"),
          estate_planning: getCheckedValues("estate_planning"),
          estate_planning_statements: getCheckedValues("estate-planning"),
          skills: (document.querySelector("input[name='skills']:checked") || {}).value || null,
          charity_involvement: (document.querySelector("input[name='charity-involvement']:checked") || {}).value || null,
          charitable_gifts: (document.querySelector("input[name='charitable-gifts']:checked") || {}).value || null,
          charitable_transfer: getCheckedValues("charitable-transfer"),
          family_philanthropy: getCheckedValues("family-philanthropy"),
          philanthropy: getCheckedValues("philanthropy"),
          recognition: getCheckedValues("recognition"),
          consent: consent.checked
        };

        try {
          const res = await fetch("/api/survey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error("Network error");

          alert("Thank you! Your response has been submitted.");
          panel
            .querySelectorAll('input[type="checkbox"], input[type="radio"]')
            .forEach((i) => (i.checked = false));
          panel
            .querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea')
            .forEach((i) => {
              i.value = "";
            });
          if (wealthOtherWrap) wealthOtherWrap.style.display = "none";
          updateProgress();
          closePanel();
        } catch (err) {
          console.error(err);
          alert("Submission failed. Please try again later.");
        }
      });
    }
  }
})();
