document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const progressBar = document.getElementById("progressBar");
  const currentSlideEl = document.getElementById("currentSlide");
  const totalSlidesEl = document.getElementById("totalSlides");
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  let current = 0;
  const total = slides.length;
  totalSlidesEl.textContent = total;

  const update = () => {
    slides.forEach((slide, idx) => {
      slide.classList.remove("active", "prev");
      if (idx === current) {
        slide.classList.add("active");
      } else if (idx < current) {
        slide.classList.add("prev");
      }
    });

    currentSlideEl.textContent = current + 1;
    progressBar.style.width = `${((current + 1) / total) * 100}%`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  };

  const changeSlide = direction => {
    current = Math.min(Math.max(current + direction, 0), total - 1);
    update();
  };

  prevBtn.addEventListener("click", () => changeSlide(-1));
  nextBtn.addEventListener("click", () => changeSlide(1));

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") changeSlide(-1);
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      changeSlide(1);
    }
    if (e.key === "Home") {
      current = 0;
      update();
    }
    if (e.key === "End") {
      current = total - 1;
      update();
    }
    if (e.key === "f" || e.key === "F") toggleFullscreen();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) changeSlide(1);
    if (touchEndX > touchStartX + 50) changeSlide(-1);
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  fullscreenBtn.addEventListener("click", toggleFullscreen);

  update();
});
