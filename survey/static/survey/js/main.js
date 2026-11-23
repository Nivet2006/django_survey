/**
 * Main Application JavaScript
 * Handles navigation, mobile menu, toast auto-dismiss, and form interactions.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation drawer toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navActions = document.getElementById('navActions');

  if (mobileMenuBtn && navActions) {
    mobileMenuBtn.addEventListener('click', () => {
      navActions.classList.toggle('is-open');
      const isExpanded = navActions.classList.contains('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Toast notifications auto-dismiss
  const toasts = document.querySelectorAll('.toast');
  toasts.forEach((toast) => {
    // Click close button
    const closeBtn = toast.querySelector('.toast-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dismissToast(toast);
      });
    }

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      dismissToast(toast);
    }, 5000);
  });

  function dismissToast(toast) {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  // Password visibility toggle (Login page)
  const passwordToggleBtn = document.getElementById('passwordToggleBtn');
  const passwordInput = document.getElementById('id_password');

  if (passwordToggleBtn && passwordInput) {
    passwordToggleBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      
      // Update eye icon state
      const eyeIcon = passwordToggleBtn.querySelector('.eye-icon');
      const eyeOffIcon = passwordToggleBtn.querySelector('.eye-off-icon');
      if (eyeIcon && eyeOffIcon) {
        eyeIcon.style.display = isPassword ? 'none' : 'block';
        eyeOffIcon.style.display = isPassword ? 'block' : 'none';
      }
    });
  }

  // Interactive Mouse Pointer Tracking for Gradient Font Text
  const gradientTexts = document.querySelectorAll('.gradient-text');
  if (gradientTexts.length > 0) {
    const updatePointer = (clientX, clientY) => {
      gradientTexts.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', (e) => {
      updatePointer(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });
  }

  // Button submission loading state
  const surveyForm = document.querySelector('form.survey-submission-form');
  if (surveyForm) {
    surveyForm.addEventListener('submit', (e) => {
      const submitBtn = surveyForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = `
          <svg class="animate-spin" style="width: 18px; height: 18px; animation: spin 1s linear infinite;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" style="opacity: 0.25;"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" style="opacity: 0.75;"></path>
          </svg>
          Submitting...
        `;
        submitBtn.style.opacity = '0.85';
        submitBtn.style.pointerEvents = 'none';
      }
    });
  }
});
