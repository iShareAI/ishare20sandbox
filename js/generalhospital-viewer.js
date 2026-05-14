document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame = document.getElementById("panoFrame");
  const rows = Array.from(document.querySelectorAll(".naming-table tbody tr[data-pano]"));

  if (!select || !frame) return;

  const ensureEmbedScript = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://app.seekbeak.com/js/sbembed.js";
    script.charset = "utf-8";
    document.body.appendChild(script);
  };

  const renderSnapEmbed = (url, label) => {
    frame.setAttribute("data-pano-label", label || "");
    frame.setAttribute("data-pano-url", url);

    // SeekBeak wraps #panoFrame after initial render; update its iframe src directly.
    const sbIframe = frame.parentElement?.querySelector("iframe");
    if (sbIframe) {
      sbIframe.src = url;
      return;
    }

    // Fallback: SeekBeak not yet initialized — rebuild placeholder and re-trigger.
    const title = document.createElement("span");
    title.textContent = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
    const link = document.createElement("a");
    link.href = url;
    link.textContent = "Open panorama";
    link.target = "_blank";
    link.rel = "noopener";
    frame.innerHTML = "";
    frame.append(title, link);
    frame.classList.add("snap-embed");
    ensureEmbedScript();
  };

  const setActiveRowByUrl = (url) => {
    rows.forEach((row) => {
      row.classList.toggle("active", row.getAttribute("data-pano") === url);
    });
  };

  const setFrameTitleFromSelect = () => {
    const currentOption = select.options[select.selectedIndex];
    const label = currentOption ? currentOption.textContent.trim() : "";
    frame.title = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
    return label;
  };

  const updatePanorama = (url) => {
    const label = select.options[select.selectedIndex]?.textContent?.trim() || "";
    renderSnapEmbed(url, label);
  };

  const handleSelectChange = () => {
    const nextUrl = select.value.trim();
    if (!nextUrl) return;
    updatePanorama(nextUrl);
    setActiveRowByUrl(nextUrl);
    setFrameTitleFromSelect();
  };

  select.addEventListener("change", handleSelectChange);
  select.addEventListener("input", handleSelectChange);
  select.onchange = handleSelectChange;

  document.addEventListener("change", (e) => {
    if (e.target instanceof HTMLSelectElement && e.target.id === "panoSelect") handleSelectChange();
  });

  rows.forEach((row) => {
    row.tabIndex = 0;
    row.setAttribute("role", "button");

    row.addEventListener("click", () => {
      const url = row.getAttribute("data-pano");
      if (!url) return;
      select.value = url;
      updatePanorama(url);
      setActiveRowByUrl(url);
      setFrameTitleFromSelect();
    });

    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        row.click();
      }
    });
  });

  setActiveRowByUrl(frame.getAttribute("data-pano-url") || frame.querySelector("a")?.getAttribute("href") || "");
  setFrameTitleFromSelect();
});