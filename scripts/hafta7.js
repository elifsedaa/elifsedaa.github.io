/* ===== HAFTA 7 - ETKİLEŞİMLİ ETKİNLİK KAYIT JS ===== */

// ── 1. TEMA DEĞİŞTİRME ──────────────────────────────────
const temaBtn = document.getElementById('temaBtn');
const temaBtnIcon = document.getElementById('temaBtnIcon');
const temaBtnText = document.getElementById('temaBtnText');

temaBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');

  const isDark = document.body.classList.contains('dark-theme');

  temaBtnIcon.className = isDark ? 'bi bi-sun' : 'bi bi-moon';
  temaBtnText.textContent = isDark ? 'Açık Tema' : 'Koyu Tema';

  if (isDark) {
    temaBtn.classList.remove('btn-outline-light');
    temaBtn.classList.add('btn-warning');
  } else {
    temaBtn.classList.remove('btn-warning');
    temaBtn.classList.add('btn-outline-light');
  }
});

// ── 2. FORM DOĞRULAMA VE BAŞVURU ÖZETİ ─────────────────
const form      = document.getElementById('basvuruForm');
const uyariDiv  = document.getElementById('formUyari');
const ozetDiv   = document.getElementById('basvuruOzet');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const adSoyad     = document.getElementById('adSoyad').value.trim();
  const eposta      = document.getElementById('eposta').value.trim();
  const telefon     = document.getElementById('telefon').value.trim();
  const etkinlik    = document.getElementById('etkinlik').value;
  const katilimTuru = document.getElementById('katilimTuru').value;
  const motivasyon  = document.getElementById('motivasyon').value.trim();
  const kvkk        = document.getElementById('kvkk').checked;

  if (!adSoyad || !eposta || !telefon || !etkinlik || !katilimTuru || !motivasyon || !kvkk) {
    uyariDiv.classList.remove('d-none');
    ozetDiv.innerHTML = '';
    uyariDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  
  if (telefon.replace(/\D/g, '').length < 10) {
  uyariDiv.classList.remove('d-none');
  return;
}

  uyariDiv.classList.add('d-none');

  const etkinlikIsimleri = {
    'yapay-zeka':    'Yapay Zeka Atölyesi',
    'web-gelistirme':'Web Geliştirme Semineri',
    'veri-bilimi':   'Veri Bilimi Mini Bootcamp'
  };
  const katilimIsimleri = {
    'yuz-yuze': 'Yüz Yüze',
    'online':   'Online (Canlı)',
    'hibrit':   'Hibrit'
  };

  const tarih = new Date().toLocaleDateString('tr-TR', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const satirlar = [
    { icon: 'bi-person',       label: 'Ad Soyad',       deger: adSoyad },
    { icon: 'bi-envelope',     label: 'E-posta',         deger: eposta },
    { icon: 'bi-telephone',    label: 'Telefon',         deger: telefon },
    { icon: 'bi-calendar-event', label: 'Etkinlik',      deger: etkinlikIsimleri[etkinlik] || etkinlik },
    { icon: 'bi-geo-alt',      label: 'Katılım Türü',   deger: katilimIsimleri[katilimTuru] || katilimTuru },
    { icon: 'bi-chat-left-text', label: 'Motivasyon',   deger: motivasyon },
    { icon: 'bi-clock',        label: 'Başvuru Tarihi', deger: tarih }
  ];

  const satirHTML = satirlar.map(s => `
    <div class="ozet-row">
      <span class="ozet-label">
        <i class="bi ${s.icon}"></i>${s.label}
      </span>
      <span>${s.deger}</span>
    </div>
  `).join('');

  ozetDiv.innerHTML = `
    <div class="card shadow-sm p-4 mt-2">
      <div class="ozet-success-header">
        <div class="ozet-success-icon">
          <i class="bi bi-check-lg"></i>
        </div>
        <div>
          <h5 class="mb-0 fw-bold">Başvurunuz Alındı</h5>
          <small class="text-muted">Bilgileriniz başarıyla kaydedildi.</small>
        </div>
      </div>
      ${satirHTML}
    </div>
  `;

  ozetDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
  form.reset();
});
