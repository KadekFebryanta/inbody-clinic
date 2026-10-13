/**
 * Navigation Module - InBody Clinic
 * Handles mobile hamburger toggle, sticky header shadow, mega-menu, and accessibility
 */

export function initNav() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownContainer = document.querySelector('.nav-item-dropdown');
  const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
  const megaMenu = document.querySelector('.mega-menu');

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
  }

  // Mega-menu keyboard & click toggle
  if (dropdownContainer && dropdownTrigger && megaMenu) {
    function openMenu() {
      dropdownTrigger.setAttribute('aria-expanded', 'true');
      dropdownContainer.classList.add('is-open');
    }

    function closeMenu() {
      dropdownTrigger.setAttribute('aria-expanded', 'false');
      dropdownContainer.classList.remove('is-open');
    }

    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownTrigger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdownContainer.classList.contains('is-open')) {
        closeMenu();
        dropdownTrigger.focus();
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdownContainer.contains(e.target)) {
        closeMenu();
      }
    });

    // Mobile accordion toggle for mega-columns
    const megaTitles = megaMenu.querySelectorAll('.mega-title');
    megaTitles.forEach(title => {
      title.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          title.parentElement.classList.toggle('is-active');
        }
      });
    });
  }

  // Close menus when clicking any anchor link
  const allNavLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-trigger), .mega-link');
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navMenu) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('is-active');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      if (dropdownTrigger && dropdownContainer) {
        dropdownTrigger.setAttribute('aria-expanded', 'false');
        dropdownContainer.classList.remove('is-open');
      }
    });
  });
}
