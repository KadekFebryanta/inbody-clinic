/**
 * Hero Slider - InBody Clinic
 * Supports 3 slides with horizontal sliding transitions (right-to-left),
 * autoplay, glass capsule dot pagination & arrow controls, keyboard navigation,
 * touch swipe, and accessibility.
 */

export function initHeroSlider() {
  const heroSection = document.querySelector('.section-hero');
  if (!heroSection) return;

  const slides = Array.from(heroSection.querySelectorAll('.hero-slide'));
  const dotsContainer = heroSection.querySelector('.hero-dots');
  const prevBtn = heroSection.querySelector('.hero-arrow.hero-prev');
  const nextBtn = heroSection.querySelector('.hero-arrow.hero-next');

  if (slides.length <= 1) return;

  let currentIndex = 0;
  let isAnimating = false;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 6000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ANIM_CLASSES = [
    'is-animating-in-right',
    'is-animating-out-left',
    'is-animating-in-left',
    'is-animating-out-right'
  ];

  function cleanSlideClasses(slide) {
    slide.classList.remove(...ANIM_CLASSES);
  }

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `hero-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.addEventListener('click', () => {
        if (idx === currentIndex || isAnimating) return;
        const dir = idx > currentIndex ? 1 : -1;
        goToSlide(idx, dir);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.hero-dot')) : [];

  function updateDots() {
    dots.forEach((dot, idx) => {
      const isActive = idx === currentIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  function goToSlide(targetIndex, direction = 1) {
    if (targetIndex === currentIndex || isAnimating) return;

    const oldIndex = currentIndex;
    const newIndex = (targetIndex + slides.length) % slides.length;
    const oldSlide = slides[oldIndex];
    const newSlide = slides[newIndex];

    if (prefersReducedMotion) {
      oldSlide.classList.remove('is-active');
      oldSlide.setAttribute('aria-hidden', 'true');
      newSlide.classList.add('is-active');
      newSlide.setAttribute('aria-hidden', 'false');
      currentIndex = newIndex;
      updateDots();
      return;
    }

    isAnimating = true;

    // Reset all slides' animation classes
    slides.forEach(cleanSlideClasses);

    // Apply animation classes based on direction
    if (direction === 1) {
      newSlide.classList.add('is-animating-in-right');
      oldSlide.classList.add('is-animating-out-left');
    } else {
      newSlide.classList.add('is-animating-in-left');
      oldSlide.classList.add('is-animating-out-right');
    }

    oldSlide.classList.remove('is-active');
    oldSlide.setAttribute('aria-hidden', 'true');
    newSlide.setAttribute('aria-hidden', 'false');

    currentIndex = newIndex;
    updateDots();

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      cleanSlideClasses(oldSlide);
      cleanSlideClasses(newSlide);
      newSlide.classList.add('is-active');
      isAnimating = false;
    };

    newSlide.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 700);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1, 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1, -1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Keyboard navigation
  heroSection.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    }
  });

  // Touch Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  heroSection.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  heroSection.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoplay();
    }
  }

  // Autoplay
  function startAutoplay() {
    if (prefersReducedMotion) return;
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  heroSection.addEventListener('mouseenter', stopAutoplay);
  heroSection.addEventListener('mouseleave', startAutoplay);
  heroSection.addEventListener('focusin', stopAutoplay);
  heroSection.addEventListener('focusout', startAutoplay);

  // Initial State Setup
  slides.forEach((slide, idx) => {
    cleanSlideClasses(slide);
    if (idx === 0) {
      slide.classList.add('is-active');
      slide.setAttribute('aria-hidden', 'false');
    } else {
      slide.classList.remove('is-active');
      slide.setAttribute('aria-hidden', 'true');
    }
  });
  updateDots();
  startAutoplay();
}
