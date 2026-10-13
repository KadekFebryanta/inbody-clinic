/**
 * Navigation Module - InBody Clinic
 * Handles mobile hamburger toggle, sticky header shadow, and smooth anchor scrolling
 */

export function initNav() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

  // Sticky header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('is-scrolled');
    } else {
      navbar?.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.classList.toggle('is-active');
      navMenu.classList.toggle('is-open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Dropdown accessibility for keyboard
  const dropdownToggle = document.querySelector('.nav-item-dropdown > a');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dropdownMenu.classList.toggle('is-visible');
      }
    });
  }
}
