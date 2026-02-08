/* ================================
   MAIN JAVASCRIPT - Core Functionality
   ================================ */

// ================================
// NAVIGATION & HEADER
// ================================

class Navigation {
  constructor() {
    this.header = document.querySelector('header');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navItems = document.querySelectorAll('.nav-item');

    this.init();
  }

  init() {
    // Hamburger menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu when nav item clicked
    this.navItems.forEach(item => {
      item.addEventListener('click', () => this.closeMenu());
    });

    // Scroll event for sticky header
    window.addEventListener('scroll', () => this.handleScroll());

    // Click outside to close menu
    document.addEventListener('click', (e) => this.handleOutsideClick(e));
  }

  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }

  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  handleScroll() {
    if (window.scrollY > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
  }

  handleOutsideClick(e) {
    if (this.navMenu && !this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
      this.closeMenu();
    }
  }
}

// ================================
// SMOOTH SCROLLING
// ================================

class SmoothScroll {
  constructor() {
    this.setupScrollLinks();
  }

  setupScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// ================================
// RESERVATION FORM
// ================================

class ReservationForm {
  constructor() {
    this.form = document.querySelector('.reservation-form');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.setupDatePickers();
    this.setupValidation();
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.showMessage(i18n.get('messages.error'), 'error');
      return;
    }

    // Collect form data
    const formData = new FormData(this.form);
    const reservationData = Object.fromEntries(formData);

    // Store reservation (in real app, send to server)
    this.storeReservation(reservationData);

    this.showMessage(i18n.get('messages.success'), 'success');
    this.form.reset();

    // Reset date pickers if using Flatpickr
    document.querySelectorAll('[data-flatpickr]').forEach(input => {
      if (input._flatpickr) input._flatpickr.clear();
    });
  }

  setupDatePickers() {
    // Using native HTML5 date inputs
    const checkInInput = this.form.querySelector('input[name="checkIn"]');
    const checkOutInput = this.form.querySelector('input[name="checkOut"]');

    if (checkInInput && checkOutInput) {
      // Set minimum date to today
      const today = new Date().toISOString().split('T')[0];
      checkInInput.min = today;
      checkOutInput.min = today;

      // Update check-out minimum when check-in changes
      checkInInput.addEventListener('change', () => {
        if (checkInInput.value) {
          const checkInDate = new Date(checkInInput.value);
          checkInDate.setDate(checkInDate.getDate() + 1);
          checkOutInput.min = checkInDate.toISOString().split('T')[0];
        }
      });
    }
  }

  validateForm() {
    const firstName = this.form.querySelector('input[name="firstName"]');
    const lastName = this.form.querySelector('input[name="lastName"]');
    const email = this.form.querySelector('input[name="email"]');
    const phone = this.form.querySelector('input[name="phone"]');
    const checkIn = this.form.querySelector('input[name="checkIn"]');
    const checkOut = this.form.querySelector('input[name="checkOut"]');

    // Check required fields
    if (!firstName.value.trim()) {
      this.setError(firstName, i18n.get('reservation.firstName'));
      return false;
    }

    if (!lastName.value.trim()) {
      this.setError(lastName, i18n.get('reservation.lastName'));
      return false;
    }

    // Email validation
    if (!this.isValidEmail(email.value)) {
      this.setError(email, i18n.get('reservation.email'));
      return false;
    }

    // Phone validation
    if (!phone.value.trim()) {
      this.setError(phone, i18n.get('reservation.phone'));
      return false;
    }

    // Date validation
    if (!checkIn.value) {
      this.setError(checkIn, i18n.get('reservation.checkIn'));
      return false;
    }

    if (!checkOut.value) {
      this.setError(checkOut, i18n.get('reservation.checkOut'));
      return false;
    }

    if (new Date(checkIn.value) >= new Date(checkOut.value)) {
      this.showMessage(i18n.get('messages.error'), 'error');
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  setError(element, message) {
    element.classList.add('error');
    element.style.borderColor = 'var(--color-error)';
    setTimeout(() => {
      element.classList.remove('error');
      element.style.borderColor = '';
    }, 3000);
  }

  storeReservation(data) {
    // Store in localStorage for demo purposes
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
    reservations.push({
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('reservations', JSON.stringify(reservations));
    console.log('Reservation stored:', data);
  }

  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
      color: white;
      border-radius: var(--radius-md);
      z-index: 10000;
      animation: slideInUp 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
  }
}

// ================================
// CONTACT FORM
// ================================

class ContactForm {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    const name = this.form.querySelector('input[name="name"]');
    const email = this.form.querySelector('input[name="email"]');
    const subject = this.form.querySelector('input[name="subject"]');
    const message = this.form.querySelector('textarea[name="message"]');

    // Basic validation
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert(i18n.get('messages.error'));
      return;
    }

    // Prepare email data
    const mailBody = `
      İsim: ${name.value}
      E-mail: ${email.value}
      Konu: ${subject.value}
      Mesaj: ${message.value}
    `;

    // In a real application, this would be sent to a backend
    console.log('Contact form submitted:', {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value
    });

    alert(i18n.get('messages.success'));
    this.form.reset();
  }
}

// ================================
// SCROLL ANIMATIONS (AOS Integration)
// ================================

class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            this.observer.unobserve(entry.target);
          }
        });
      }, this.observerOptions);

      document.querySelectorAll('[data-aos]').forEach(element => {
        this.observer.observe(element);
      });
    }
  }
}

// ================================
// GALLERY LIGHTBOX
// ================================

class GalleryLightbox {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery-item');
    if (this.galleryItems.length > 0) {
      this.init();
    }
  }

  init() {
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });

    this.createLightbox();
  }

  createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <button class="lightbox-prev">&#10094;</button>
      <img class="lightbox-content" src="" alt="">
      <button class="lightbox-next">&#10095;</button>
      <p class="lightbox-caption"></p>
    `;

    document.body.appendChild(lightbox);
    this.lightbox = lightbox;

    lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.previousImage());
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) this.closeLightbox();
    });

    this.currentIndex = 0;
  }

  openLightbox(index) {
    this.currentIndex = index;
    const item = this.galleryItems[index];
    const img = item.querySelector('img');

    this.lightbox.querySelector('.lightbox-content').src = img.src;
    this.lightbox.querySelector('.lightbox-caption').textContent = img.alt;
    this.lightbox.style.display = 'flex';
    document.body.classList.add('no-scroll');
  }

  closeLightbox() {
    this.lightbox.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.galleryItems.length;
    this.openLightbox(this.currentIndex);
  }

  previousImage() {
    this.currentIndex = (this.currentIndex - 1 + this.galleryItems.length) % this.galleryItems.length;
    this.openLightbox(this.currentIndex);
  }
}

// Add lightbox styles dynamically
function addLightboxStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      z-index: 9999;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(5px);
    }

    .lightbox-content {
      max-width: 90%;
      max-height: 80vh;
      object-fit: contain;
      animation: slideInUp 0.3s ease-out;
    }

    .lightbox-close {
      position: absolute;
      top: 30px;
      right: 30px;
      color: var(--color-secondary);
      font-size: 40px;
      cursor: pointer;
      transition: color var(--transition-fast);
    }

    .lightbox-close:hover {
      color: var(--color-hover);
    }

    .lightbox-prev,
    .lightbox-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(212, 175, 55, 0.2);
      border: 2px solid var(--color-secondary);
      color: var(--color-secondary);
      padding: 15px 20px;
      cursor: pointer;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      font-size: 24px;
    }

    .lightbox-prev:hover,
    .lightbox-next:hover {
      background: var(--color-secondary);
      color: var(--color-primary);
    }

    .lightbox-prev {
      left: 20px;
    }

    .lightbox-next {
      right: 20px;
    }

    .lightbox-caption {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      color: var(--color-secondary);
      font-size: 1.1rem;
      text-align: center;
      max-width: 80%;
    }

    @media (max-width: 768px) {
      .lightbox-prev,
      .lightbox-next {
        padding: 10px 15px;
        font-size: 18px;
      }

      .lightbox-close {
        top: 15px;
        right: 15px;
        font-size: 30px;
      }
    }
  `;

  document.head.appendChild(style);
}

// ================================
// COUNTER ANIMATION
// ================================

class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-counter]');
    if (this.counters.length > 0) {
      this.init();
    }
  }

  init() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    this.counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-counter'));
    const duration = 2000;
    const start = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = (now - start) / duration;

      if (progress < 1) {
        const current = Math.ceil(target * progress);
        element.textContent = current.toLocaleString();
        requestAnimationFrame(animate);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    animate();
  }
}

// ================================
// INITIALIZATION
// ================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new Navigation();
  new SmoothScroll();
  new ReservationForm();
  new ContactForm();
  new ScrollAnimations();
  new GalleryLightbox();
  new CounterAnimation();

  // Add lightbox styles
  addLightboxStyles();

  // Listen for language changes
  window.addEventListener('languageChanged', () => {
    console.log('Language changed to:', i18n.getCurrentLanguage());
  });

  console.log('The Prestige Hotel - Application Initialized');
});

// Prevent double initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Already handled above
  });
}
