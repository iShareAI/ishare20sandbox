document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame = document.getElementById("panoFrame");

  if (!select || !frame) return;

  select.addEventListener("change", () => {
    const nextUrl = select.value.trim();
    if (!nextUrl) return;
    frame.src = nextUrl;
  });
});