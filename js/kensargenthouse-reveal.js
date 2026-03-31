document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".feature[data-reveal]");
  if (!blocks.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  blocks.forEach((block) => observer.observe(block));
});
