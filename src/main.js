document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel-item");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideInterval;
  const autoPlayDelay = 5000; // 5 sekund

  // Funkcja pokazująca konkretny slajd
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        // Pokaż aktywny slajd
        slide.classList.remove("opacity-0", "z-0");
        slide.classList.add("opacity-100", "z-10");
      } else {
        // Ukryj pozostałe
        slide.classList.remove("opacity-100", "z-10");
        slide.classList.add("opacity-0", "z-0");
      }
    });
  }

  // Funkcja następny slajd (z pętlą nieskończoną)
  function nextSlide() {
    // Disable slide rotation on mobile
    if (window.innerWidth < 768) return;

    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  // Funkcja poprzedni slajd (z pętlą nieskończoną)
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  // Funkcje do resetowania autoodtwarzania po kliknięciu
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, autoPlayDelay);
  }

  // Event Listenery na przyciski
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  // Start autoodtwarzania
  slideInterval = setInterval(nextSlide, autoPlayDelay);

  // --- LOGO CAROUSEL (Seamless Loop) ---
  const logoTrack = document.getElementById("logoTrack");
  const logoPrev = document.getElementById("logoPrev");
  const logoNext = document.getElementById("logoNext");

  if (logoTrack && logoPrev && logoNext) {
    const logos = Array.from(logoTrack.children);
    const visibleLogos = 5; // min-w-[20%]
    const totalLogos = logos.length;
    let logoIndex = 0;
    let isAnimating = false;

    // Klonujemy pierwsze 5 elementów, aby uzyskać efekt nieskończoności
    logos.slice(0, visibleLogos).forEach((logo) => {
      const clone = logo.cloneNode(true);
      logoTrack.appendChild(clone);
    });

    const transitionStyle = "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)";

    // Inicjalizacja stylu
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
        // Wymuszamy reflow
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
