# The Prestige Hotel - Lüks Otel Web Sitesi

Çağdaş, modüler ve GitHub Pages'te %100 çalışan, profesyonel düzeyde bir lüks otel web sitesi.

## 🎯 Özellikler

### 🏛️ Mimari & Dosya Yapısı
- **Modüler Yapı**: CSS, JavaScript ve görüntüler ayrı klasörlerde
- **Responsive Design**: Mobil, tablet ve masaüstü uyumlu %100
- **GitHub Pages Ready**: Ekstra konfigürasyon gerekmez

### 🎨 Tasarım
- **Dark & Gold Konsepti**: Lüksün tanımı olan koyu arka plan ve altın vurguları
- **Tipografi**: 
  - Başlıklar: `Playfair Display` (Google Fonts)
  - Gövde: `Montserrat` / `Poppins` (Google Fonts)
- **Animasyonlar**: Smooth scroll, fade-up efektleri
- **CSS Variables**: Renk paletini tek yerden yönet

### 🌍 Çoklu Dil Desteği (i18n)
- **Türkçe & İngilizce**: Sayfayı yenilemeden dil değiştirme
- **localStorage**: Seçilen dil hatırlanır
- **Tüm İçerik**: HTML öğeleri `data-i18n` atributları ile çevrilir

### 📱 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| **index.html** | Ana sayfa - Hero, İstatistikler, Odalar, Hazır Rezervasyon |
| **rooms.html** | Odalar & Suitler - Deluxe, Premium Suite, Royal Penthouse |
| **services.html** | Lüks Deneyimler - Spa, Fine Dining, Concierge vb. |
| **gallery.html** | Görsel Galeri - Filtrelenebilir galeri, Lightbox |
| **contact.html** | İletişim - Harita, Form, FAQ |

### ⚙️ Fonksiyonellikler

- ✅ Sticky Navigation (scroll ile renklenen header)
- ✅ Responsive Hamburger Menu
- ✅ Rezervasyon Formu (Frontend validasyonu)
- ✅ İletişim Formu (localStorage'da saklanır)
- ✅ Galeri Filtresi & Lightbox
- ✅ Sayaç Animasyonları
- ✅ Smooth Scrolling
- ✅ SEO-friendly Meta Etiketleri
- ✅ Open Graph (Sosyal Medya Paylaşımı)

## 📁 Dosya Yapısı

```
hotel/
├── index.html                    # Ana Sayfa
├── rooms.html                    # Odalar Sayfası
├── services.html                 # Hizmetler Sayfası
├── gallery.html                  # Galeri Sayfası
├── contact.html                  # İletişim Sayfası
├── assets/
│   ├── css/
│   │   ├── style.css            # Ana Stillendirme & Bileşenler
│   │   └── responsive.css       # Responsive Tasarım
│   ├── js/
│   │   ├── lang.js              # Dil İçeriği (TR & EN)
│   │   ├── i18n.js              # Çoklu Dil Sistemi
│   │   ├── main.js              # Genel İşlevler
│   │   └── vendor/
│   │       ├── aos.js           # Scroll Animasyonları (Opsiyonel)
│   │       ├── flatpickr.js     # Tarih Seçici (Opsiyonel)
│   │       └── lightbox.js      # Galeri Lightbox (Entegre)
│   └── img/
│       ├── hero-bg.jpg
│       ├── deluxe-room.jpg
│       ├── premium-suite.jpg
│       ├── penthouse.jpg
│       ├── spa.jpg
│       ├── restaurant.jpg
│       ├── fitness.jpg
│       ├── pool.jpg
│       ├── events.jpg
│       ├── concierge.jpg
│       └── ...
├── README.md
└── LICENSE
```

## 🚀 Kullanım

### 1. Yerel Olarak Çalıştırma

```bash
# Basit HTTP Server ile
python -m http.server 8000

# Veya Node.js ile
npx http-server
```

Ardından `http://localhost:8000` adresine gidin.

### 2. GitHub Pages'te Yayınlama

```bash
# Git kurma
git init
git add .
git commit -m "Initial commit: The Prestige Hotel Web Suite"

# GitHub'a push
git remote add origin https://github.com/username/hotel.git
git branch -M main
git push -u origin main
```

Ayarlar → Pages → Source: `main` branch seçin. Site otomatik yayınlanır!

## 🎯 Özelleştirme

### Renk Değiştirme

`assets/css/style.css` dosyasında `:root` CSS değişkenlerini düzenle:

```css
:root {
  --color-primary: #1a1a1a;        /* Arka plan rengi */
  --color-secondary: #d4af37;      /* Vurgu rengi (altın) */
  --color-text: #e8e8e8;           /* Metin rengi */
  /* ... diğer renkler ... */
}
```

### Dil Ekleme

`assets/js/lang.js` dosyasında yeni dil ekle:

```javascript
const languages = {
  tr: { /* ... */ },
  en: { /* ... */ },
  fr: { /* ... */ }  // Yeni dil
};
```

### İletişim Bilgileri

HTML dosyalarında iletişim bilgilerini bul ve güncelle:

- Email: `info@prestigehotel.com` → `senin_email@example.com`
- Telefon: `+90 (212) 555-0123` → `+90 (xxx) xxx-xxxx`
- Adres: Avenida Principal 123 → Gerçek adresin

## 🔧 Teknik Detaylar

### CSS Mimarisi
- **CSS Variables**: Tüm değerler `:root` içinde merkezi
- **Mobile-First**: Küçük ekranlardan başla, büyütüle
- **BEM Naming**: Sınıf isimleri anlaşılır `component-element--modifier`
- **Responsive Breakpoints**:
  - Large: 1920px+
  - Tablet: 768px
  - Mobile: 480px

### JavaScript Modülleri
- **Navigation**: Hamburger menü, sticky header
- **i18n**: Dil yönetimi ve çeviriler
- **Forms**: Validasyon ve veriler
- **Gallery**: Filtreleme ve lightbox
- **Animations**: Scroll efektleri, sayaçlar

## 📋 Kurulum Adımları

- [x] HTML Sayfaları (5 sayfa)
- [x] CSS Stillendirme (Dark & Gold)
- [x] JavaScript İşlevler (7+ Component)
- [x] Çoklu Dil Sistemi (TR & EN)
- [x] Responsive Design (Mobile-friendly)
- [x] SEO Meta Etiketleri
- [x] Reservasyon Formu
- [x] İletişim Formu
- [x] Galeri & Lightbox
- [x] GitHub Pages Hazır

## 🌐 Demo Sayfalar

- **Ana Sayfa**: Öğeler, istatistikler, öne çıkan odalar
- **Odalar**: Deluxe, Premium Suite, Royal Penthouse detayları
- **Hizmetler**: Spa, Restoran, Concierge, Fitness, Havuz, Etkinlikler
- **Galeri**: Filtreli galerisi (Odalar, Hizmetler, Tesisler)
- **İletişim**: Harita (Google Maps), Form, FAQ

## 📞 Destek

Sorularınız veya önerileriniz için:
- Email: info@prestigehotel.com
- Telefon: +90 (212) 555-0123
- Web: https://prestigehotel.com

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır. [LICENSE](LICENSE) dosyasına bakın.

---

**Yapılan Tarih**: Şubat 2026  
**Sürüm**: 1.0  
**Durum**: Production Ready ✅