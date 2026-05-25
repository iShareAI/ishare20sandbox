document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const rows = Array.from(document.querySelectorAll(".naming-table tbody tr[data-pano]"));

  if (!select) return;

  const normalizePanoUrl = (rawUrl) => {
    if (!rawUrl) return "";
    try {
      const parsed = new URL(rawUrl, window.location.origin);
      let normalizedPath = parsed.pathname.replace(/\/+$/, "");
      if (!normalizedPath) normalizedPath = "/";
      return `${parsed.origin}${normalizedPath}`;
    } catch (_) {
      return String(rawUrl).trim().replace(/\/+$/, "");
    }
  };

  const createFallbackIframe = (url, title) => {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = title || "360 Panorama Viewer";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.minHeight = "420px";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "fullscreen; xr-spatial-tracking; gyroscope; accelerometer");
    return iframe;
  };

  const getVisibleEmbedContent = () => document.querySelector("#viewer .snap-embed-content");
  const getTemplateFrame = () => document.getElementById("panoFrame");

  const getCurrentEmbedUrl = () => {
    const iframe = document.querySelector("#viewer .snap-embed-content iframe");
    if (iframe && iframe.src) return iframe.src;
    const frame = getTemplateFrame();
    return frame?.getAttribute("data-pano-url") || frame?.querySelector("a")?.getAttribute("href") || "";
  };

  const findOptionByUrl = (url) => {
    const target = normalizePanoUrl(url);
    return Array.from(select.options).find((option) => normalizePanoUrl(option.value) === target) || null;
  };

  const renderSnapEmbed = (url, label) => {
    const title = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
    const contentHost = getVisibleEmbedContent();

    // SeekBeak initialized: update visible iframe directly.
    const sbIframe = document.querySelector("#viewer .snap-embed-content iframe");
    if (sbIframe) {
      sbIframe.src = url;
      sbIframe.title = title;
      return;
    }

    // SeekBeak wrapper exists but iframe is missing: hard fallback to direct iframe.
    if (contentHost) {
      contentHost.innerHTML = "";
      contentHost.appendChild(createFallbackIframe(url, title));
      return;
    }

    // SeekBeak did not initialize (or was blocked): render direct iframe in template.
    const frame = getTemplateFrame();
    if (!frame || !frame.isConnected) return;
    frame.setAttribute("data-pano-label", label || "");
    frame.setAttribute("data-pano-url", url);
    frame.innerHTML = "";
    frame.appendChild(createFallbackIframe(url, title));
  };

  const setActiveRowByUrl = (url) => {
    const target = normalizePanoUrl(url);
    rows.forEach((row) => {
      row.classList.toggle("active", normalizePanoUrl(row.getAttribute("data-pano")) === target);
    });
  };

  const setFrameTitleFromSelect = () => {
    const currentOption = select.options[select.selectedIndex];
    const label = currentOption ? currentOption.textContent.trim() : "";
    const frame = getTemplateFrame();
    if (frame) frame.title = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
    return label;
  };

  const handleSelectChange = () => {
    const selectedOption = select.options[select.selectedIndex];
    const nextUrl = (selectedOption?.value || "").trim();
    if (!nextUrl) return;
    renderSnapEmbed(nextUrl, setFrameTitleFromSelect());
    setActiveRowByUrl(nextUrl);
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
      const matchedOption = findOptionByUrl(url);
      if (matchedOption) select.value = matchedOption.value;
      const selectedUrl = (matchedOption?.value || url).trim();
      renderSnapEmbed(selectedUrl, setFrameTitleFromSelect());
      setActiveRowByUrl(selectedUrl);
    });

    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        row.click();
      }
    });
  });

  const currentUrl = getCurrentEmbedUrl();
  const matchedCurrentOption = findOptionByUrl(currentUrl);
  if (matchedCurrentOption) select.value = matchedCurrentOption.value;
  setActiveRowByUrl((matchedCurrentOption?.value || currentUrl || select.value || "").trim());
  if (select.selectedIndex <= 0 && select.options.length > 1) {
    select.selectedIndex = 1;
    const defaultUrl = (select.options[1].value || "").trim();
    if (defaultUrl) {
      renderSnapEmbed(defaultUrl, setFrameTitleFromSelect());
      setActiveRowByUrl(defaultUrl);
      return;
    }
  }
  setFrameTitleFromSelect();
});