document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
  document.querySelectorAll(".card, .pillar, .step, .metric, .contact__panel, .contact__aside").forEach(el =>
    observer.observe(el)
  );
});
