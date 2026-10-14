/**
 * Contact Form Module - InBody Clinic
 * Handles client-side validation, accessibility states, honeypot protection,
 * and user feedback on form submission.
 */

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const successPanel = document.getElementById('contact-success-panel');
  const resetBtn = document.getElementById('contact-reset-btn');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const hpInput = document.getElementById('contact-hp');
  const submitBtn = document.getElementById('contact-submit-btn');

  const fields = [
    {
      input: nameInput,
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please enter your name (at least 2 characters).'
    },
    {
      input: emailInput,
      validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
      errorMsg: 'Please enter a valid email address.'
    },
    {
      input: subjectInput,
      validate: (val) => val.trim().length >= 2,
      errorMsg: 'Please enter a subject.'
    },
    {
      input: messageInput,
      validate: (val) => val.trim().length >= 10,
      errorMsg: 'Please write a message (at least 10 characters).'
    }
  ];

  function validateField(field) {
    const group = field.input.closest('.form-group');
    const errorEl = group ? group.querySelector('.form-error-msg') : null;
    const isValid = field.validate(field.input.value);

    if (!isValid) {
      group?.classList.add('has-error');
      field.input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = field.errorMsg;
    } else {
      group?.classList.remove('has-error');
      field.input.removeAttribute('aria-invalid');
    }
    return isValid;
  }

  // Live validation on blur & input
  fields.forEach(field => {
    if (!field.input) return;

    field.input.addEventListener('blur', () => {
      if (field.input.value.trim().length > 0) {
        validateField(field);
      }
    });

    field.input.addEventListener('input', () => {
      const group = field.input.closest('.form-group');
      if (group?.classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  // Handle submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check honeypot
    if (hpInput && hpInput.value.trim() !== '') {
      // Bot detected, silently show success without actual send
      showSuccess();
      return;
    }

    let isAllValid = true;
    let firstInvalidInput = null;

    fields.forEach(field => {
      if (!field.input) return;
      const isValid = validateField(field);
      if (!isValid) {
        isAllValid = false;
        if (!firstInvalidInput) {
          firstInvalidInput = field.input;
        }
      }
    });

    if (!isAllValid) {
      firstInvalidInput?.focus();
      return;
    }

    // Submit state
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.classList.add('is-submitting');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>SENDING...</span><span class="btn-arrow" aria-hidden="true"><i class="ph-light ph-spinner ph-spin"></i></span>`;

    // Simulate sending / fallback handling
    setTimeout(() => {
      showSuccess();
      submitBtn.classList.remove('is-submitting');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
      form.reset();
      fields.forEach(f => f.input.closest('.form-group')?.classList.remove('has-error'));
    }, 900);
  });

  function showSuccess() {
    form.style.display = 'none';
    if (successPanel) {
      successPanel.classList.add('is-active');
      successPanel.focus();
    }
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (successPanel) {
        successPanel.classList.remove('is-active');
      }
      form.style.display = 'grid';
      nameInput?.focus();
    });
  }
}

// Auto-init if on page
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
