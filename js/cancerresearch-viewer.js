document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame = document.getElementById("panoFrame");

  if (!select || !frame) return;

  const ensureEmbedScript = () => {
    const existing = document.querySelector('script[src*="app.seekbeak.com/js/sbembed.js"]');
    if (existing) {
      const clone = document.createElement("script");
      clone.async = true;
      clone.src = "https://app.seekbeak.com/js/sbembed.js";
      clone.charset = "utf-8";
      document.body.appendChild(clone);
      return;
    }

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
    setFrameTitleFromSelect();
  };

  select.addEventListener("change", handleSelectChange);
  select.addEventListener("input", handleSelectChange);
  select.onchange = handleSelectChange;

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLSelectElement)) return;
    if (target.id !== "panoSelect") return;
    handleSelectChange();
  });

  setFrameTitleFromSelect();
});