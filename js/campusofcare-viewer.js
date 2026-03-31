document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame = document.getElementById("panoFrame");
  const rows = Array.from(document.querySelectorAll(".naming-table tbody tr[data-pano]"));

  if (!select || !frame) return;

  const setActiveRowByUrl = (url) => {
    rows.forEach((row) => {
      row.classList.toggle("active", row.getAttribute("data-pano") === url);
    });
  };

  select.addEventListener("change", () => {
    const nextUrl = select.value.trim();
    if (!nextUrl) return;
    frame.src = nextUrl;
    setActiveRowByUrl(nextUrl);
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
    });

    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        row.click();
      }
    });
  });

  setActiveRowByUrl(frame.getAttribute("src") || "");
});
