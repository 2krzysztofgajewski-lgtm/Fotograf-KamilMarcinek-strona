document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideInterval;
  const autoPlayDelay = 5000;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove("opacity-0", "z-0");
        slide.classList.add("opacity-100", "z-10");
      } else {
        // Ukryj pozostałe
        slide.classList.remove("opacity-100", "z-10");
        slide.classList.add("opacity-0", "z-0");
      }
    });
  }

  function nextSlide() {
    if (window.innerWidth < 768) return;

    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  slideInterval = setInterval(nextSlide, autoPlayDelay);

  const logoTrack = document.getElementById("logoTrack");
  const logoPrev = document.getElementById("logoPrev");
  const logoNext = document.getElementById("logoNext");

  if (logoTrack && logoPrev && logoNext) {
    const logos = Array.from(logoTrack.children);
    const visibleLogos = 5;
    const totalLogos = logos.length;
    let logoIndex = 0;
    let isAnimating = false;

    logos.slice(0, visibleLogos).forEach((logo) => {
      const clone = logo.cloneNode(true);
      logoTrack.appendChild(clone);
    });

    const transitionStyle = "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)";

    logoTrack.style.transition = transitionStyle;

    function moveToSlide(index, animate = true) {
      if (!animate) {
        logoTrack.style.transition = "none";
      } else {
        logoTrack.style.transition = transitionStyle;
      }

      const translateX = -(index * 20);
      logoTrack.style.transform = `translateX(${translateX}%)`;

      if (!animate) {
        void logoTrack.offsetWidth;
        logoTrack.style.transition = transitionStyle;
      }
    }

    logoNext.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;

      logoIndex++;
      moveToSlide(logoIndex, true);

      if (logoIndex === totalLogos) {
        setTimeout(() => {
          logoIndex = 0;
          moveToSlide(logoIndex, false);
          isAnimating = false;
        }, 700);
      } else {
        setTimeout(() => {
          isAnimating = false;
        }, 700);
      }
    });

    logoPrev.addEventListener("click", () => {
      if (isAnimating) return;
      isAnimating = true;

      if (logoIndex === 0) {
        logoIndex = totalLogos;
        moveToSlide(logoIndex, false);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            logoIndex--;
            moveToSlide(logoIndex, true);
            setTimeout(() => {
              isAnimating = false;
            }, 700);
          });
        });
      } else {
        logoIndex--;
        moveToSlide(logoIndex, true);
        setTimeout(() => {
          isAnimating = false;
        }, 700);
      }
    });
  }
});
