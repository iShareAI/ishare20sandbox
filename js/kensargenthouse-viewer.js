document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame  = document.getElementById("panoFrame");
  const rows   = Array.from(document.querySelectorAll(".naming-table tbody tr[data-pano]"));

  if (!select || !frame) return;

  const mountStandaloneSnap = (targetFrame) => {
    if (!targetFrame || targetFrame.dataset.seekbeakSnapBound === "1") return;

    const parent = targetFrame.parentElement;
    const src = targetFrame.getAttribute("src");
    if (!parent || !src) return;

    const parentStyle = window.getComputedStyle(parent);
    if (parentStyle.position === "static") {
      parent.style.position = "relative";
    }

    if (!document.getElementById("seekbeak-snap-style")) {
      const style = document.createElement("style");
      style.id = "seekbeak-snap-style";
      style.textContent =
        ".seekbeak-snap-host{display:block;width:100%}" +
        ".seekbeak-snap-host .snap-embed{width:100%;height:100%}" +
        ".seekbeak-snap-host .snap-embed iframe{width:100%;height:100%}";
      document.head.appendChild(style);
    }

    const host = document.createElement("div");
    host.className = "seekbeak-snap-host";
    targetFrame.insertAdjacentElement("afterend", host);

    const applyFrameSizeToHost = () => {
      const computed = window.getComputedStyle(targetFrame);
      if (computed.height && computed.height !== "auto" && computed.height !== "0px") {
        host.style.minHeight = computed.height;
      }
    };

    const cleanLabel = (label) => {
      const safe = String(label || "").replace(/^360\s+Panorama:\s*/i, "").trim();
      return safe || "360 Panorama Viewer";
    };

    const render = () => {
      const nextSrc = targetFrame.getAttribute("src");
      if (!nextSrc) return;
      const label = targetFrame.getAttribute("data-pano-label") || targetFrame.getAttribute("title");

      host.innerHTML = "";

      const snap = document.createElement("div");
      snap.className = "snap-embed";
      snap.setAttribute("data-aspect-width", "16");
      snap.setAttribute("data-aspect-height", "9");

      const span = document.createElement("span");
      span.textContent = cleanLabel(label);
      snap.appendChild(span);

      const link = document.createElement("a");
      link.href = nextSrc;
      link.target = "_blank";
      link.textContent = "Snap Content";
      snap.appendChild(link);

      host.appendChild(snap);

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://app.seekbeak.com/js/sbembed.js";
      script.charset = "utf-8";
      host.appendChild(script);
    };

    targetFrame.style.visibility = "hidden";
    targetFrame.style.pointerEvents = "none";
    targetFrame.style.display = "none";
    targetFrame.setAttribute("aria-hidden", "true");
    targetFrame.setAttribute("tabindex", "-1");

    applyFrameSizeToHost();
    render();

    const observer = new MutationObserver(() => {
      applyFrameSizeToHost();
      render();
    });
    observer.observe(targetFrame, {
      attributes: true,
      attributeFilter: ["src", "title", "data-pano-label"]
    });

    targetFrame.dataset.seekbeakSnapBound = "1";
  };

  if (window.IShareSeekBeak && typeof window.IShareSeekBeak.mountFromIframe === "function") {
    window.IShareSeekBeak.mountFromIframe(frame);
  } else {
    mountStandaloneSnap(frame);
  }

  const setActiveRowByUrl = (url) => {
    rows.forEach((row) => {
      row.classList.toggle("active", row.getAttribute("data-pano") === url);
    });
  };

  const setFrameTitleFromSelect = () => {
    const currentOption = select.options[select.selectedIndex];
    const label = currentOption ? currentOption.textContent.trim() : "";
    frame.setAttribute("data-pano-label", label);
    frame.title = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
  };

  select.addEventListener("change", () => {
    const nextUrl = select.value.trim();
    if (!nextUrl) return;
    frame.src = nextUrl;
    setActiveRowByUrl(nextUrl);
    setFrameTitleFromSelect();
  });

  rows.forEach((row) => {
    row.tabIndex = 0;
    row.setAttribute("role", "button");

    row.addEventListener("click", () => {
      const url = row.getAttribute("data-pano");
      if (!url) return;
      frame.src = url;
      select.value = url;
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

  setActiveRowByUrl(frame.getAttribute("src") || "");
  setFrameTitleFromSelect();
});
