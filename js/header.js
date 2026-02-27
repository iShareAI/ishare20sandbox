(() => {
  const body = document.body;
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  const closeBtn = document.getElementById("mobileClose");
  const backdrop = document.getElementById("mobileBackdrop");

  if (!burger || !menu || !closeBtn || !backdrop) return;

  const openMenu = () => {
    body.classList.add("mobile-open");
    burger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
  };

  const closeMenu = () => {
    body.classList.remove("mobile-open");
    burger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
  };

  burger.addEventListener("click", () => {
    body.classList.contains("mobile-open") ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();
