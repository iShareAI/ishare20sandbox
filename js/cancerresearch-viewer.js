document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame = document.getElementById("panoFrame");

  if (!select || !frame) return;

  const setFrameTitleFromSelect = () => {
    const currentOption = select.options[select.selectedIndex];
    const label = currentOption ? currentOption.textContent.trim() : "";
    frame.title = label ? `360 Panorama: ${label}` : "360 Panorama Viewer";
  };

  select.addEventListener("change", () => {
    const nextUrl = select.value.trim();
    if (!nextUrl) return;
    frame.src = nextUrl;
    setFrameTitleFromSelect();
  });

  setFrameTitleFromSelect();
});