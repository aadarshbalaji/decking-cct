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
        // Reset and restart graph animations
        const graphNodes = slide.querySelectorAll('.animate-node');
        const graphLines = slide.querySelectorAll('.animate-line');
        graphNodes.forEach(node => {
          node.style.animation = 'none';
          setTimeout(() => {
            node.style.animation = null;
          }, 10);
        });
        graphLines.forEach(line => {
          line.style.animation = 'none';
          setTimeout(() => {
            line.style.animation = null;
          }, 10);
        });
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
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Only trigger if horizontal swipe is dominant and significant
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      // Check if the user is scrolling a horizontal container
      const scrollable = e.target.closest('.diagram-container');
      if (scrollable && scrollable.scrollWidth > scrollable.clientWidth) {
        // If scrolling right (diffX < 0) and not at end, or scrolling left (diffX > 0) and not at start
        if ((diffX < 0 && scrollable.scrollLeft < scrollable.scrollWidth - scrollable.clientWidth) ||
          (diffX > 0 && scrollable.scrollLeft > 0)) {
          return;
        }
      }

      if (diffX < 0) changeSlide(1);
      else changeSlide(-1);
    }
  });

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  fullscreenBtn.addEventListener("click", toggleFullscreen);

  // Enhanced tooltip functionality for SVG elements
  const graphNodeGroups = document.querySelectorAll('.graph-node-group');

  graphNodeGroups.forEach(group => {
    let tooltip = null;

    group.addEventListener('mouseenter', (e) => {
      const tooltipText = group.getAttribute('data-tooltip');
      if (!tooltipText) return;

      // Create tooltip element
      tooltip = document.createElement('div');
      tooltip.className = 'svg-tooltip';
      tooltip.textContent = tooltipText;
      document.body.appendChild(tooltip);

      // Position tooltip
      const rect = group.getBoundingClientRect();
      const svgRect = group.closest('svg').getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
      tooltip.style.top = `${rect.top - tooltipRect.height - 12}px`;

      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateY(0)';
      });
    });

    group.addEventListener('mouseleave', () => {
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(-8px)';
        setTimeout(() => {
          if (tooltip && tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
          tooltip = null;
        }, 200);
      }
    });

    group.addEventListener('mousemove', (e) => {
      if (tooltip) {
        const rect = group.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltipRect.height - 12}px`;
      }
    });
  });

  // Highlight related graph lines on hover
  const graphLines = document.querySelectorAll('.graph-line');
  const graphNodes = document.querySelectorAll('.graph-node-group');

  graphNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      graphLines.forEach(line => {
        line.style.strokeOpacity = '0.3';
      });
    });

    node.addEventListener('mouseleave', () => {
      graphLines.forEach(line => {
        line.style.strokeOpacity = '0.6';
      });
    });
  });

  update();
});
