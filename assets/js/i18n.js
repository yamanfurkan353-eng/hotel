/* ================================
   INTERNATIONALIZATION (i18n) SYSTEM
   Multi-Language Management
   ================================ */

class I18n {
  constructor() {
    // Default language is Turkish
    this.currentLanguage = this.getSavedLanguage() || 'tr';
    this.languages = ['tr', 'en'];
    this.init();
  }

  /**
   * Initialize the i18n system
   */
  init() {
    this.applyLanguage(this.currentLanguage);
    this.setupLanguageSwitcher();
  }

  /**
   * Get saved language from localStorage
   */
  getSavedLanguage() {
    const saved = localStorage.getItem('preferredLanguage');
    return saved && this.languages.includes(saved) ? saved : null;
  }

  /**
   * Save currently selected language
   */
  saveLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
  }

  /**
   * Get translation value by key path (e.g., "nav.home")
   */
  get(key) {
    const keys = key.split('.');
    let value = languages[this.currentLanguage];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  /**
   * Set active language and update all text
   */
  setLanguage(lang) {
    if (!this.languages.includes(lang)) {
      console.warn(`Language "${lang}" not supported`);
      return;
    }

    this.currentLanguage = lang;
    this.saveLanguage(lang);
    this.applyLanguage(lang);

    // Trigger custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
  }

  /**
   * Apply language translations to DOM elements
   */
  applyLanguage(lang) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.get(key);
    });

    // Update all input placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.get(key);
    });

    // Update all input values with data-i18n-value
    document.querySelectorAll('[data-i18n-value]').forEach(element => {
      const key = element.getAttribute('data-i18n-value');
      element.value = this.get(key);
    });

    // Update title and meta descriptions if needed
    this.updatePageMeta(lang);

    // Update HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update active language button
    this.updateLanguageSwitcher();
  }

  /**
   * Update page meta information based on language
   */
  updatePageMeta(lang) {
    const metaDescriptions = {
      tr: {
        title: 'The Prestige Hotel - Lüks Otel',
        description: 'Dünyanın en seçkin misafirlerine sunulan lüksün yeni tanımı. Şehir merkezinde mükemmel konum, dünya sınıfı hizmet.'
      },
      en: {
        title: 'The Prestige Hotel - Luxury Hotel',
        description: 'A new definition of luxury presented to the world\'s most discerning guests. Prime city center location, world-class service.'
      }
    };

    const meta = metaDescriptions[lang] || metaDescriptions.en;

    // Update title (optional - can be removed if title is static in HTML)
    // document.title = meta.title;
  }

  /**
   * Setup language switcher buttons
   */
  setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('[data-lang]');

    langButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
  }

  /**
   * Update language switcher button states
   */
  updateLanguageSwitcher() {
    const langButtons = document.querySelectorAll('[data-lang]');

    langButtons.forEach(button => {
      const lang = button.getAttribute('data-lang');
      if (lang === this.currentLanguage) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get all available languages
   */
  getAvailableLanguages() {
    return this.languages;
  }

  /**
   * Translate HTML content dynamically
   */
  translateContent(element, key) {
    if (!element) return;
    element.textContent = this.get(key);
  }

  /**
   * Format number based on locale
   */
  formatNumber(number) {
    return new Intl.NumberFormat(this.currentLanguage).format(number);
  }

  /**
   * Format date based on locale
   */
  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Intl.DateTimeFormat(this.currentLanguage, {
      ...defaultOptions,
      ...options
    }).format(new Date(date));
  }

  /**
   * Format currency based on locale
   */
  formatCurrency(amount, currency = 'TRY') {
    return new Intl.NumberFormat(this.currentLanguage, {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
}

// Initialize i18n when DOM is ready
let i18n;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n = new I18n();
  });
} else {
  i18n = new I18n();
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}
