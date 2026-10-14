# Rencana Implementasi Landing Page – InBody Clinic

Dokumen ini adalah rencana implementasi desain layout _landing page_ **InBody Clinic** (klinik kesehatan wanita & limfatik, Double Bay, Sydney) menggunakan **HTML, CSS (Vanilla), dan JavaScript**, dengan dukungan library eksternal ringan.

---

## 1. Ringkasan Desain

Halaman satu-halaman (_single page_) dengan nuansa **elegan, tenang, dan medis-premium**.

| Aspek       | Observasi dari layout                                                                                    |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| Palet warna | 6 warna dari gambar palet: off-white hangat, putih, navy, sage, sage muda, abu muda (lihat Bagian 5)     |
| Tipografi   | Heading serif elegan (mirip _Cormorant Garamond_), body sans-serif bersih (mirip _Montserrat_)           |
| Gaya        | Banyak whitespace, ikon _line-art_ tipis, tombol pill (rounded penuh), foto lifestyle lembut             |
| Aksen       | Heading memakai dua warna (navy + sage italic) untuk kata kunci, mis. _Expert Care._ dan _your journey._ |

---

## 2. Struktur Section (dari atas ke bawah)

1. **Top Bar** – info kontak (lokasi, email, telepon), background sage.
2. **Navbar** – logo kiri; menu: Home, About, Our Services (dropdown), Our Clinic, Contact Us; tombol CTA "BOOK AN APPOINTMENT".
3. **Hero** – kiri: eyebrow text, H1 3 baris ("Women's Health. Lymphatic Health. _Expert Care._"), deskripsi, tombol CTA, 3 ikon nilai (Evidence-Based Care, Personalised Treatment, A Holistic Approach). Kanan: foto besar terapis dengan mesin, tepi kiri foto memudar (_gradient mask_).
4. **Our Services** – eyebrow, heading dua warna, grid 3×2 kartu layanan (ikon dalam lingkaran sage, judul, deskripsi, tombol panah bulat):
   - Lymphatic Health
   - Lipedema Care
   - Post-Operative Recovery
   - Pregnancy & Postpartum
   - Skin Health & Body Contouring
   - Women's Health Physiotherapy
5. **The InBody Difference** – dua kolom: kiri foto bahu wanita dengan overlay teks ("More than a treatment. _A healthier you._" + RESET • REBUILD • RECONNECT); kanan panel abu-hijau dengan heading "Specialised care. Real results." + 3 poin berikon (Specialised Expertise, Personalised Care, Evidence-Based Treatment).
6. **Testimonial** – background foto interior (vas tanaman, memudar di kiri), kutipan serif italic dengan tanda kutip besar, label "– OUR PATIENT", dot pagination (slider).
7. **CTA Banner** – foto pemandangan teluk/marina Sydney, teks kanan "Your health journey _starts here._" + tombol "BOOK AN APPOINTMENT".
8. **Footer** – background navy; logo, menu (Home, About, Our Service, Our Clinic, Contact Us), ikon sosial (Facebook, TikTok, Email, WhatsApp, Instagram), tagline "Double Bay | Sydney – A healthier you, for what's next", copyright.

---

## 3. Tech Stack & Library

| Kebutuhan          | Pilihan                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Struktur           | HTML5 semantik (`header`, `nav`, `main`, `section`, `footer`)                                                            |
| Styling            | Vanilla CSS + CSS Variables (design tokens), Flexbox & Grid                                                              |
| Font               | Google Fonts: **Cormorant Garamond** (heading), **Montserrat** (body)                                                    |
| Ikon               | **Lucide** / **Phosphor Icons** (line-art tipis) atau SVG inline kustom; ikon sosial via **Font Awesome** / Simple Icons |
| Slider testimonial | **Swiper.js** (CDN) – atau JS native bila ingin tanpa dependensi                                                         |
| Animasi scroll     | **AOS (Animate On Scroll)** atau `IntersectionObserver` native                                                           |
| Build tool         | Tidak wajib (static site). Opsional: Vite untuk dev server                                                               |

---

## 4. Struktur Folder

```
inbody-clinic/
├── index.html
├── css/
│   ├── tokens.css        # variabel warna, font, spacing
│   ├── base.css          # reset, tipografi, utilitas
│   ├── components.css    # tombol, kartu, ikon, badge
│   └── sections.css      # style per-section + responsif
├── js/
│   ├── main.js           # inisialisasi
│   ├── nav.js            # menu mobile & mega-menu dropdown
│   └── hero-slider.js    # carousel 3-slide hero, autoplay, kontrol & gestur
├── assets/
│   ├── images/           # hero, difference, testimonial, cta (WebP)
│   ├── icons/            # SVG ikon layanan
│   └── logo/             # logo header & footer
└── RENCANA_IMPLEMENTASI.md
```

---

## 5. Design Tokens (CSS Variables)

Palet mengikuti gambar referensi warna (6 warna):

| Token               | Hex       | Fungsi utama           | Peran visual                           |
| ------------------- | --------- | ---------------------- | -------------------------------------- |
| `--color-bg`        | `#F7F6F2` | Main background        | Warm, feminine, editorial              |
| `--color-surface`   | `#FFFFFF` | Content/background     | Clean, clinical, spacious              |
| `--color-navy`      | `#1F3859` | Heading, text, footer  | Authority, sophistication, readability |
| `--color-sage`      | `#8AA29B` | CTA, accent            | Calm, wellness, premium                |
| `--color-sage-soft` | `#D0DCD8` | Soft background/accent | Gentle transition, visual relief       |
| `--color-border`    | `#E8E8E6` | Border/divider         | Structure tanpa terlihat berat         |

```css
:root {
  /* Warna (dari gambar palet) */
  --color-bg: #f7f6f2;
  --color-surface: #ffffff;
  --color-navy: #1f3859;
  --color-sage: #8aa29b;
  --color-sage-soft: #d0dcd8;
  --color-border: #e8e8e6;

  /* Turunan (hover/teks) */
  --color-sage-hover: #748d86;
  --color-text: var(--color-navy);

  --font-heading: "Cormorant Garamond", serif;
  --font-body: "Montserrat", sans-serif;

  --radius-pill: 999px;
  --container: 1200px;
  --shadow-soft: 0 10px 30px rgba(31, 56, 89, 0.08);
}
```

> [!NOTE]
> Gambar palet tidak mencantumkan kode hex, jadi nilai di atas diperkirakan dari tampilan warnanya. Jika ada file desain asli (Figma), ambil hex pastinya dengan _color picker_. `--color-sage-hover` adalah turunan (sage sedikit lebih gelap) dan bukan bagian dari 6 warna palet.

**Pemetaan pemakaian:**

- `--color-bg`: background utama halaman, section testimonial.
- `--color-surface`: area konten, kartu, navbar.
- `--color-navy`: heading, teks, footer, border tombol panah.
- `--color-sage`: tombol CTA, top bar, aksen italic pada heading, ikon.
- `--color-sage-soft`: lingkaran ikon layanan, panel "InBody Difference".
- `--color-border`: garis pemisah dan border kartu.

---

## 6. Tahapan Implementasi

### Fase 1 – Persiapan

- [x] Buat struktur folder & file dasar.
- [x] Kumpulkan/siapkan aset: logo, foto hero, foto "difference", foto testimonial, foto marina, ikon layanan. (Jika belum ada, buat dengan _image generation_ atau ganti dengan foto stok berlisensi.)
- [x] Siapkan format gambar & ukuran responsif.

### Fase 2 – Fondasi CSS

- [x] Definisikan design tokens, reset, tipografi, `.container`, utilitas spacing.
- [x] Komponen: `.btn` (pill, varian solid sage & outline), `.eyebrow` (uppercase, letter-spacing lebar), `.icon-circle`, `.arrow-btn` (lingkaran outline berpanah), `.section-title` (dua warna).

### Fase 3 – Header

- [x] Top bar (flex, ikon + teks kecil).
- [x] Navbar sticky dengan dropdown "Our Services" & tombol CTA.
- [x] Menu hamburger untuk mobile (JS toggle, `aria-expanded`).

### Fase 4 – Hero

> [!WARNING]
> **Perlu revisi tata letak** – lihat Bagian 10.1.

- [x] Layout 2 kolom (Grid 5/7); foto kanan dengan `mask-image: linear-gradient` agar tepi kiri memudar.
- [x] H1 serif besar dengan `<em>` sage untuk "Expert Care."
- [x] Baris 3 ikon nilai.

### Fase 5 – Services

- [x] Grid 3 kolom (→ 2 kolom tablet → 1 kolom mobile).
- [x] Kartu: ikon lingkaran, judul, deskripsi, tombol panah dengan hover (geser panah & isi warna).
- [x] Setiap kartu menjadi tautan ke halaman layanan (`<a>`).

### Fase 6 – The InBody Difference

> [!WARNING]
> **Perlu revisi tata letak** – lihat Bagian 10.2.

- [x] Grid 2 kolom: foto dengan overlay teks (kiri) + panel sage-light (kanan).
- [x] 3 poin berikon dalam grid; stack di mobile.

### Fase 7 – Testimonial

> [!WARNING]
> **Perlu revisi tata letak & slider dihapus** – lihat Bagian 10.3.

- [x] Background foto dengan gradient overlay putih di kiri agar teks terbaca.
- ~~Inisialisasi slider testimonial (fade/slide, autoplay, pagination dot kustom).~~ _(dibatalkan – desain tidak memiliki slider)_
- ~~Siapkan minimal 3 testimoni (data statis di HTML atau array JS).~~ _(diganti: 1 testimoni statis)_

### Fase 8 – CTA Banner & Footer

> [!WARNING]
> **Hanya bagian CTA Banner yang direvisi** (Bagian 10.4). Footer tidak diubah.

- [x] Banner foto marina dengan teks kanan & tombol.
- [x] Footer navy: grid logo | menu | sosial | tagline; garis pemisah vertikal.

### Fase 9 – Interaktivitas & Polish

- [x] Animasi fade-up saat scroll (AOS/IntersectionObserver).
- [x] Hover micro-interaction pada tombol, kartu, dan ikon.
- [x] Smooth scroll untuk anchor link; _sticky header_ dengan perubahan bayangan saat scroll.

### Fase 10 – Responsif, Aksesibilitas & SEO

- [x] Breakpoint: 1200 / 992 / 768 / 480 px (pendekatan mobile-first).
- [x] `alt` pada semua gambar, kontras warna ≥ WCAG AA, fokus keyboard terlihat, `aria-label` pada tombol ikon.
- [x] `<title>`, meta description, Open Graph, satu `<h1>`, hierarki heading benar, ID unik pada elemen interaktif.
- [x] Schema.org `MedicalBusiness` (JSON-LD) dengan alamat Double Bay, Sydney.
- [x] `loading="lazy"` untuk gambar di bawah fold; preload font & hero image.

### Fase 11 – QA & Deploy

- [x] Uji di Chrome / browser (DevTools / subagent).
- [x] Audit konsol browser & rendering visual tanpa error.
- [x] Bandingkan visual dengan gambar layout (pixel/spacing check).
- [ ] Deploy ke Netlify / Vercel / GitHub Pages (opsional jika diinginkan pengguna).

---

## 7. Catatan Teknis Penting

- **Hero fade foto**: gunakan `mask-image: linear-gradient(to right, transparent, #000 25%)` pada elemen gambar.
- **Heading dua warna**: bungkus kata kunci dengan `<span class="accent">` (`color: var(--color-sage); font-style: italic`).
- **Eyebrow**: `font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase`.
- **Tombol panah bulat**: lingkaran 36px, `border: 1px solid var(--color-navy)`, hover → background navy, ikon putih.
- **Testimoni overlay**: `linear-gradient(90deg, var(--color-surface) 30%, transparent 70%)` di atas gambar background.
- **Ikon**: pakai stroke `1.25–1.5px` agar konsisten dengan gaya line-art desain.

---

## 8. Estimasi Waktu

| Fase                       | Estimasi     |
| -------------------------- | ------------ |
| Persiapan & aset           | 2–3 jam      |
| Fondasi CSS & komponen     | 2 jam        |
| Header + Hero              | 3 jam        |
| Services + Difference      | 3 jam        |
| Testimonial + CTA + Footer | 3 jam        |
| Interaksi & animasi        | 2 jam        |
| Responsif, A11y, SEO       | 3 jam        |
| QA & deploy                | 2 jam        |
| **Total**                  | **± 20 jam** |

---

## 9. Kriteria Selesai (Definition of Done)

- Tampilan desktop sesuai gambar layout (tata letak, warna, tipografi).
- Responsif sempurna di mobile & tablet.
- Seluruh tombol CTA, menu, dan kartu layanan berfungsi (tautan/anchor).
- Slider testimonial berjalan, animasi halus tanpa lag.
- Skor Lighthouse ≥ 90 pada semua kategori utama.
- Tanpa error pada konsol browser.

---

## 10. Rencana Perbaikan Tampilan (Revisi 1)

> [!NOTE]
> Implementasi fungsional sudah aman. Revisi ini **hanya menyangkut tata letak & aset visual** agar sama dengan gambar desain halaman Home. Bagian yang direvisi: **Fase 4 (Hero), Fase 6 (The InBody Difference), Fase 7 (Testimonial – tanpa slider), dan Fase 8 (hanya CTA Banner)**. Navbar, Top Bar, Services, dan Footer tidak diubah.

### 10.0 Temuan Umum (Penyebab Utama Perbedaan)

| #   | Implementasi sekarang                                                                       | Desain asli                                                                                 |
| --- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1   | Section dibungkus `.container` (lebar maks 1200px) dan kartu ber-_border-radius_ + _shadow_ | Section **full-bleed** (selebar layar), **tanpa** sudut membulat & bayangan                 |
| 2   | Ada _padding_ vertikal besar (4.5–6.5rem) antar section sehingga terlihat "terpisah-pisah"  | Section **menempel** satu sama lain, tinggi ditentukan oleh foto/konten                     |
| 3   | Foto sebagai kartu terpisah di samping teks                                                 | Foto menjadi **latar/sisi penuh** section; tepi foto **memudar (fade)** ke warna background |
| 4   | Overlay gelap + teks putih (Difference)                                                     | **Tanpa overlay gelap**; teks navy di atas area terang foto                                 |
| 5   | Eyebrow berwarna sage                                                                       | Eyebrow berwarna **navy/gelap** (kecuali bila ditentukan lain)                              |

### 10.0.1 Penggantian Aset

Gambar baru dari pengguna menggantikan aset sebelumnya. **Nama file target dipertahankan** sehingga `src` di `index.html` tidak perlu diubah.

| Gambar baru (isi)                           | Dimensi asli      | Ganti file                      | Dipakai di            |
| ------------------------------------------- | ----------------- | ------------------------------- | --------------------- |
| Teluk dengan perahu layar (siang cerah)     | 1024×341 (±3:1)   | `assets/images/cta.jpg`         | CTA Banner            |
| Terapis berblazer pinstripe + mesin klinik  | 1024×670 (±3:2)   | `assets/images/hero.jpg`        | Hero                  |
| Vas kaca + ranting hijau, meja marmer putih | 1024×341 (±3:1)   | `assets/images/testimonial.jpg` | Testimonial           |
| Foto hitam-putih bahu wanita berkain putih  | 1024×735 (±1.4:1) | `assets/images/difference.jpg`  | The InBody Difference |

- [x] Salin keempat gambar ke `assets/images/` dengan nama di atas (timpa file lama).
- [x] Pastikan tidak ada file gambar lama yang tertinggal (file ditimpa, bukan ditambah).
- [x] Perbarui atribut `alt`, `width`, `height` pada `<img>` sesuai dimensi/isi gambar baru.
- [x] (Opsional) Kompres ke WebP + `srcset` bila ukuran file terlalu besar.

---

### 10.1 Fase 4 – Hero

**Target tata letak (desktop ≥ 992px)**

```
+-----------------------------------------------------------+
| eyebrow                         |  [FOTO terapis full-bleed|
| H1 (3 baris)                    |   sampai tepi kanan layar|
| deskripsi                       |   tepi kiri memudar ke   |
| [BOOK AN APPOINTMENT ->]        |   background]            |
| ikon  ikon  ikon                |                          |
+-----------------------------------------------------------+
```

| Aspek          | Sekarang                                            | Perbaikan                                                                                                                                                                                      |
| -------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wrapper foto   | Kartu ber-radius + shadow di dalam `.container`     | Foto **absolut/full-bleed**: menempel ke tepi **kanan** layar dan menempati **tinggi penuh** hero (dari bawah navbar sampai bawah hero). Hapus `border-radius` & `box-shadow`                  |
| Lebar foto     | Kolom 0.95fr (±45%)                                 | Lebar ±**56–58%** layar, dirapatkan ke kanan; teks di kolom kiri (maks ±46%), `z-index` teks di atas foto                                                                                      |
| Fade tepi kiri | `mask-image` 0–18%                                  | `mask-image: linear-gradient(to right, transparent 0%, #000 25%)` + tambahan _overlay_ `linear-gradient(90deg, var(--color-bg) 0%, transparent 30%)` agar menyatu mulus dengan background hero |
| Crop foto      | `height: 640px`, `object-fit: cover`                | `object-fit: cover; object-position: 75% center;` supaya terapis + mesin tetap terlihat di bidang ±1:1 (gambar asli landscape 3:2)                                                             |
| Tinggi hero    | Ditentukan padding                                  | `min-height: clamp(560px, 56vw, 820px)`, `padding` vertikal dipindah ke kolom teks, konten teks di-_center_ vertikal                                                                           |
| Eyebrow        | Warna sage                                          | Warna navy (`.eyebrow-dark`)                                                                                                                                                                   |
| 3 ikon nilai   | Ada garis pemisah `border-top`, `flex: 1` (melebar) | **Hapus garis pemisah**; susun satu baris, rata kiri, `gap: 2.5–3rem`, lebar sesuai konten; ikon di atas, label kecil di bawah                                                                 |
| Container teks | `.container` 1200px                                 | Padding kiri disejajarkan dengan logo navbar (gunakan `.container-wide`/padding ±5vw)                                                                                                          |

**Responsif**

- ≤ 992px: foto pindah **di bawah** teks, lebar penuh (tinggi ±420px), fade pindah ke **tepi atas** (`to bottom`).
- ≤ 768px: H1 ±2.4rem, tiga ikon tetap satu baris (wrap bila sempit), foto tinggi ±320px.

**Checklist**

- [x] Ubah markup hero: pindahkan `<img>` ke wrapper full-bleed (`.hero-media`) di luar `.container`.
- [x] Tulis ulang `.section-hero`, `.hero-grid`, `.hero-image-wrapper`, `.hero-image` di `sections.css`.
- [x] Hapus border-top & `flex:1` pada `.hero-values`; rapikan jarak ikon.
- [x] Ubah eyebrow hero ke varian navy.
- [x] Uji pada lebar 1536, 1280, 1024, 768, 390px.

---

### 10.2 Fase 6 – The InBody Difference

**Target tata letak (desktop)**

```
+--------------------------+--------------------------------------+
| FOTO B/W (±40% lebar)    | PANEL sage-soft (±60% lebar)         |
| teks navy di area kosong | eyebrow                              |
| "More than a treatment.  | H2 "Specialised care. Real results." |
|  A healthier you."       | paragraf                             |
| ---                      | [ikon]      [ikon]      [ikon]       |
| RESTORE.                 |  judul       judul       judul       |
| REBALANCE.               |  deskripsi   deskripsi   deskripsi   |
| RECONNECT.               |                                      |
+--------------------------+--------------------------------------+
```

| Aspek              | Sekarang                                                        | Perbaikan                                                                                                                                                                                    |
| ------------------ | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wrapper            | Kartu ber-radius + shadow dalam `.container`, `padding: 5rem 0` | **Full-bleed**, tanpa radius/shadow/padding; `display:grid; grid-template-columns: 40% 60%`; `min-height ±480px`                                                                             |
| Overlay foto       | Gradient navy gelap + teks putih                                | **Hapus overlay gelap & opacity**. Foto B/W tampil apa adanya; area kiri foto sudah terang sehingga teks **navy** terbaca                                                                    |
| Crop foto          | Default center                                                  | `object-fit: cover; object-position: 70% center;` agar bahu tetap di sisi kanan sel & area kosong di kiri untuk teks                                                                         |
| Teks overlay       | Putih, kiri-atas, `justify-content: space-between`              | Heading navy (serif, ±2.6rem): _More / than a / treatment._ lalu _A healthier you._ **sage italic**; padding kiri ±3rem, posisi vertikal tengah-atas                                         |
| Tagline            | Satu baris putih                                                | **Tiga baris bertumpuk** (RESTORE. / REBALANCE. / RECONNECT.), uppercase, letter-spacing lebar, navy, didahului **garis pendek sage (±40px)**                                                |
| Panel kanan        | `padding 4rem 3.5rem`, rata tengah vertikal                     | Warna `--color-sage-soft`, `padding ±3.5rem 4rem 3.5rem 3.5rem`, konten tengah vertikal                                                                                                      |
| 3 poin             | **Daftar vertikal**, ikon dalam lingkaran putih, judul serif    | **3 kolom horizontal** (`grid-template-columns: repeat(3,1fr)`, `gap ±1.5rem`); ikon _line-art_ **tanpa lingkaran** di atas; judul **sans-serif tebal kecil (±0.85rem)**; deskripsi ±0.78rem |
| Heading & paragraf | `.section-title` 2.8rem                                         | Heading ±2.4rem, paragraf ±0.88rem, lebar teks dibatasi agar tidak terlalu panjang                                                                                                           |

**Responsif**

- ≤ 992px: grid 1 kolom (foto atas tinggi ±380px, panel di bawah); 3 poin tetap 3 kolom di tablet, **1 kolom** di ≤ 600px.

**Checklist**

- [x] Keluarkan `.difference-grid` dari `.container`; hapus radius/shadow/padding section.
- [x] Hapus `.difference-overlay` gradient & `opacity` pada gambar; ganti warna teks ke navy/sage.
- [x] Ubah tagline menjadi 3 baris + garis pendek.
- [x] Ubah `.difference-points` menjadi grid 3 kolom; hilangkan lingkaran ikon; ganti `<h4>` ke gaya sans-serif tebal.
- [x] Uji keterbacaan teks overlay pada berbagai lebar layar.

---

### 10.3 Fase 7 – Testimonial (Tanpa Slider)

**Target tata letak (desktop)**

```
+-----------------------------------------------------------+
| REAL WOMEN, REAL STORIES.     (putih memudar ke kanan)     |
| " The care and expertise ...   [FOTO vas + ranting hijau, |
|   ... like myself again. "      menempel di sisi kanan,    |
| - OUR PATIENT                   tepi kiri memudar ke putih]|
+-----------------------------------------------------------+
```

| Aspek          | Sekarang                                                | Perbaikan                                                                                                                                                                              |
| -------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Slider         | Ada autoplay, 3 testimoni, dot pagination (`slider.js`) | **Hapus slider**: tampilkan **1 testimoni statis** (teks asli desain)                                                                                                                  |
| Wrapper        | Kartu ber-radius dalam `.container`, `padding 6.5rem 0` | **Full-bleed**, tanpa radius/shadow; `min-height ±400–420px`; background putih                                                                                                         |
| Foto           | Memenuhi seluruh kartu                                  | Foto diposisikan **di sisi kanan** (±70–75% lebar), `object-fit: cover`, dengan **fade putih di tepi kiri** (`mask-image` atau gradient putih 0→30%) sehingga menyatu dengan area teks |
| Teks           | Kolom ±650px, di tengah kartu                           | Kolom kiri maks ±40–45% lebar layar; padding kiri **sejajar dengan Hero** (±5vw); konten tengah vertikal                                                                               |
| Tanda kutip    | Satu karakter besar terpisah di atas teks               | **Tanda kutip inline**: `“` di awal & `”` di akhir kalimat, warna navy/sage, ukuran sedikit lebih besar dari teks (serif)                                                              |
| Kutipan        | 2.2rem italic                                           | ±1.9–2rem serif italic, `line-height 1.35`, lebar maks ±520px (±3 baris)                                                                                                               |
| Label penulis  | `<cite>` uppercase                                      | Format **"– OUR PATIENT"** uppercase, letter-spacing lebar, navy                                                                                                                       |
| Dot pagination | Ada dan fungsional                                      | **Dihapus** (lihat Poin Diskusi #2)                                                                                                                                                    |
| Eyebrow        | Navy kecil                                              | Tetap: "REAL WOMEN, REAL STORIES."                                                                                                                                                     |

**Perubahan kode**

- `index.html`: ganti `<div class="testimonial-slider-container">` menjadi `<figure>` + `<blockquote>` + `<figcaption>`; hapus `id="testimonial-quote"`, `id="testimonial-author"` dan blok `.testimonial-dots`.
- `js/slider.js`: **hapus file**; `js/main.js`: hapus `import { initTestimonialSlider }` dan pemanggilannya.
- `css/sections.css`: hapus `.testimonial-dots`, `.dot`, `.dot.is-active`, `.testimonial-quote-mark`; tulis ulang `.section-testimonial`, `.testimonial-wrapper`, `.testimonial-bg`, `.testimonial-mask`.
- `RENCANA_IMPLEMENTASI.md` Bagian 4 (struktur folder): hapus baris `slider.js`.

**Responsif**

- ≤ 992px: foto menjadi latar penuh dengan gradient putih ±85% dari kiri agar teks tetap terbaca; ≤ 768px: kutipan ±1.5rem, padding 2rem 1.5rem.

**Checklist**

- [x] Hapus markup, JS, dan CSS slider seperti di atas.
- [x] Ubah layout menjadi full-bleed dengan foto di kanan + fade kiri.
- [x] Implementasikan tanda kutip inline & label "– OUR PATIENT".
- [x] Pastikan tidak ada error konsol akibat file/fungsi slider yang dihapus.

---

### 10.4 Fase 8 – CTA Banner (Footer Tidak Diubah)

**Target tata letak (desktop)**

```
+-----------------------------------------------------------+
| [FOTO teluk full-bleed, memudar ke putih di kanan] | TAKE |
|                                                     | THE  |
|                                                     | NEXT |
|                                    Your health journey      |
|                                    starts here.             |
|                                    paragraf + [BOOK ... ->] |
+-----------------------------------------------------------+
```

| Aspek         | Sekarang                                                                          | Perbaikan                                                                                                                                          |
| ------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wrapper       | Kartu ber-radius + shadow, `padding 4.5rem 0`, dua kolom (gambar & teks terpisah) | **Full-bleed**, tanpa radius/shadow/padding; `min-height ±300px`                                                                                   |
| Foto          | Kolom kiri 1.2fr dengan mask kanan                                                | Foto jadi **latar seluruh section** (`object-fit: cover; object-position: center 65%` agar air + perahu terlihat; bagian langit dipotong)          |
| Fade ke putih | `mask-image` pada gambar                                                          | Overlay `linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255,255,255,.85) 62%, #fff 75%)` sehingga sisi kanan putih bersih untuk teks |
| Blok teks     | Kolom kanan 0.8fr, background putih solid                                         | Diposisikan di **sisi kanan** (lebar ±34–36%, `padding-right ±5vw`), rata kiri, tengah vertikal, tanpa background solid                            |
| Heading       | `.section-title` 2.8rem                                                           | ±2.2–2.4rem; baris 2 _starts here._ sage italic                                                                                                    |
| Paragraf      | 0.95rem                                                                           | ±0.85rem, lebar maks ±360px                                                                                                                        |
| Eyebrow       | Sage                                                                              | Navy ("TAKE THE NEXT STEP")                                                                                                                        |
| Tombol        | Sage pill + panah                                                                 | Tidak berubah                                                                                                                                      |

**Responsif**

- ≤ 992px: foto di atas (tinggi ±240px) + fade ke putih di **bawah**; teks di bawah foto, rata kiri, `padding 2rem 1.5rem`.

**Checklist**

- [x] Ubah markup: `<img>` jadi latar (`.cta-bg`), teks dibungkus `.cta-content` di atas overlay.
- [x] Tulis ulang `.section-cta-banner`, `.cta-banner-card`, `.cta-banner-bg`, `.cta-banner-content`.
- [x] Pastikan footer tetap tidak berubah.

---

### 10.5 Urutan Eksekusi Perbaikan

1. Ganti aset gambar (10.0.1).
2. Perbaiki **Hero** (10.1) → cek visual.
3. Perbaiki **The InBody Difference** (10.2) → cek visual.
4. Perbaiki **Testimonial**, hapus slider (10.3) → cek konsol browser.
5. Perbaiki **CTA Banner** (10.4) → cek visual.
6. Uji responsif (1536 / 1280 / 1024 / 768 / 390px) & bandingkan sejajar dengan gambar desain.
7. Perbarui checklist di dokumen ini.

### 10.6 Kriteria Selesai Revisi

- Tidak ada kartu ber-radius/shadow pada Hero, Difference, Testimonial, dan CTA Banner; semuanya full-bleed seperti desain.
- Tepi foto Hero, Testimonial, dan CTA memudar ke background tanpa garis tegas.
- Difference tidak memakai overlay gelap; 3 poin tampil horizontal.
- Testimonial berupa satu kutipan statis tanpa dot/slider; `slider.js` tidak lagi ada dan tidak ada error konsol.
- Teks mudah dibaca di semua breakpoint; Navbar, Services, dan Footer tidak berubah.

### 10.7 Poin Diskusi (Mohon Konfirmasi Sebelum Eksekusi)

1. **Tagline Difference**: pada desain tulisannya kurang jelas terbaca (mirip "RESTORE. REBALANCE. RECONNECT."). Di rencana awal tertulis "RESET • REBUILD • RECONNECT". Mana yang benar?
2. **Dot di Testimonial**: desain menampilkan dua titik kecil di bawah teks. Karena Anda menyebut tidak ada slider, titik tersebut **dihapus**. Apakah ingin tetap ditampilkan sebagai hiasan statis?
3. **Foto Hero**: gambar baru berformat landscape, sedangkan area foto di desain mendekati persegi. Di-_crop_ ke arah terapis + mesin (kanan). Apakah posisi crop ini sesuai?
4. **Tinggi section**: nilai tinggi (Hero ±820px, Difference ±480px, Testimonial ±410px, CTA ±300px) diperkirakan dari proporsi gambar desain; akan disetel ulang setelah dilihat langsung di browser.

---

## 11. Rencana Perbaikan Tampilan (Revisi 2)

> [!NOTE]
> Revisi 2 mencakup **4 pekerjaan**: (11.1) slider pada Hero, (11.2) penggantian seluruh ikon ke **Phosphor Icons**, (11.3) dropdown "Our Services" bergaya _mega-menu_, dan (11.4) perapian layout Footer. Di luar itu (Topbar, Services, Difference, Testimonial, CTA Banner) **tidak diubah**, kecuali penggantian ikon pada 11.2.

### 11.0 Ringkasan Perubahan

| #   | Area                  | Kondisi sekarang                                                 | Target                                                                                                                                                           |
| --- | --------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Hero                  | 1 slide statis (terapis + mesin)                                 | **3 slide** (slider), slide 1 = tampilan yang sudah ada, slide 2 & 3 = desain baru                                                                               |
| 2   | Ikon                  | SVG inline kustom (stroke Lucide-style) + SVG di `assets/icons/` | Seluruh ikon halaman Home memakai **Phosphor Icons**                                                                                                             |
| 3   | Dropdown Our Services | Dropdown kecil 1 kolom (6 tautan)                                | **Panel lebar 4 kolom** (judul serif + daftar tautan bergaris pemisah), sudut membulat                                                                           |
| 4   | Footer                | Grid 3 kolom, ikon sosial dalam lingkaran, tagline rata kanan    | Layout rapi seperti desain footer: logo + copyright (kiri), menu + ikon sosial (tengah), tagline (kanan) dipisah garis vertikal; ikon sosial **tanpa lingkaran** |

---

### 11.1 Hero Slider (3 Slide)

**Aset baru** – nama file mengikuti pola `hero.jpg` (slide 1 sudah ada dan tidak diubah):

| Slide | Isi gambar                                                                             | File                       | Status                                    |
| ----- | -------------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------- |
| 1     | Terapis berblazer pinstripe + mesin (_Women's Health. Lymphatic Health. Expert Care._) | `assets/images/hero.jpg`   | **Sudah terimplementasi** – dipertahankan |
| 2     | Dua terapis berseragam navy melihat tablet (_Move Better. Feel Lighter. Live Better._) | `assets/images/hero-2.jpg` | Baru                                      |
| 3     | Terapis tersenyum di depan rak produk (_Care Designed Around You._)                    | `assets/images/hero-3.jpg` | Baru                                      |

> [!IMPORTANT]
> Gambar referensi slide 2 & 3 adalah **desain lengkap (teks + foto)**. Teks, tombol, dan ikon dibuat ulang dengan HTML/CSS; yang dipakai sebagai aset hanya **fotonya** (di-_crop_ tanpa teks). Bila file foto asli tanpa teks tersedia, gunakan itu agar hasilnya tajam.

**Layout per slide (desktop ≥ 992px)**

| Aspek       | Slide 1 (ada)                                                                                                   | Slide 2 (baru)                                                                                                 | Slide 3 (baru)                                                                                                            |
| ----------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Posisi teks | Kiri                                                                                                            | **Kanan**                                                                                                      | **Atas** (kiri)                                                                                                           |
| Posisi foto | Kanan, fade di tepi kiri                                                                                        | **Kiri**, fade di tepi **kanan** (`to left`)                                                                   | **Bawah**, lebar penuh, fade di tepi **atas** (`to bottom`)                                                               |
| Eyebrow     | SCIENCE. EXPERIENCE. A HEALTHIER YOU.                                                                           | SPECIALISED LYMPHATIC CARE                                                                                     | WOMEN'S HEALTH & WELLBEING                                                                                                |
| Heading     | Women's Health. / Lymphatic Health. / _Expert Care._                                                            | Move Better. / Feel Lighter. / _Live Better._                                                                  | Care Designed _Around You._ (1 baris, "Around You." sage)                                                                 |
| Deskripsi   | Personalised, evidence-based care to help you feel stronger, lighter, and more like you at every stage of life. | Specialised lymphatic care designed to support circulation, reduce swelling, and help your body feel its best. | Personalised treatment and expert guidance to support your health, confidence, and wellbeing through every stage of life. |
| 3 nilai     | Baris horizontal, ikon di atas label, di bawah tombol                                                           | Sama (di kanan), sebaran lebih lebar                                                                           | **Daftar vertikal** di kolom kanan atas, ikon di kiri label                                                               |
| Tombol      | BOOK AN APPOINTMENT →                                                                                           | Sama                                                                                                           | Sama                                                                                                                      |

**Struktur markup (disarankan)**

```html
<section
  class="section-hero"
  id="hero"
  aria-roledescription="carousel"
  aria-label="Welcome to InBody Clinic"
>
  <div class="hero-slides">
    <article
      class="hero-slide is-active hero-slide--text-left"
      aria-roledescription="slide"
      aria-label="1 of 3"
    >
      …
    </article>
    <article
      class="hero-slide hero-slide--text-right"
      aria-roledescription="slide"
      aria-label="2 of 3"
    >
      …
    </article>
    <article
      class="hero-slide hero-slide--text-top"
      aria-roledescription="slide"
      aria-label="3 of 3"
    >
      …
    </article>
  </div>
  <div class="hero-controls">
    <!-- dot pagination + panah prev/next -->
    <button class="hero-arrow hero-prev" aria-label="Previous slide"></button>
    <div class="hero-dots" role="tablist"></div>
    <button class="hero-arrow hero-next" aria-label="Next slide"></button>
  </div>
</section>
```

- Hanya **satu `<h1>`** di halaman: slide aktif memakai `<h1>`; slide lain memakai `<h2 class="hero-title">` (atau semua `<p class="hero-title">` + `<h1>` sr-only) agar hierarki heading tetap benar.

**Perilaku slider**

- Transisi **fade** (opacity + sedikit _translate_) 600–800 ms; slide aktif `position: relative`, lainnya `position: absolute; inset: 0; opacity: 0; pointer-events: none`.
- **Autoplay** 6 detik; berhenti saat _hover_/fokus, dan saat `prefers-reduced-motion: reduce`.
- Kontrol: **dot pagination** (3 titik, aktif = navy/sage), panah kiri/kanan kecil; navigasi **keyboard** (←/→) dan **swipe** di mobile.
- Tinggi hero tetap (`min-height: clamp(560px, 56vw, 820px)`) agar tidak "melompat" antar slide.
- Library: **JS native** (tanpa dependensi) di file baru `js/hero-slider.js`; opsi alternatif **Swiper.js** bila ingin gestur lebih halus.

**Responsif**

- ≤ 992px: semua slide memakai pola yang sama dengan Slide 1 (teks di atas, foto di bawah, fade `to bottom`); slide 3 daftar nilai berubah menjadi baris horizontal.
- ≤ 768px: H1 ±2.4rem; dot dipindah ke tengah bawah; panah disembunyikan (swipe saja).

**Perubahan file**

- `index.html`: bungkus konten hero saat ini menjadi `.hero-slide` pertama; tambah 2 slide + kontrol.
- `css/sections.css`: tambah `.hero-slides`, `.hero-slide`, varian `--text-left/right/top`, `.hero-controls`, `.hero-dots`, `.hero-arrow`; variasi `mask-image` per arah fade.
- `js/hero-slider.js` (baru) + import di `js/main.js`.
- `assets/images/hero-2.jpg`, `hero-3.jpg` (baru).
- Struktur folder (Bagian 4): tambahkan `hero-slider.js`.

**Checklist**

- [x] Siapkan & optimalkan `hero-2.jpg` dan `hero-3.jpg` (crop tanpa teks).
- [x] Ubah markup hero menjadi 3 slide; slide 1 tidak berubah tampilan.
- [x] Tulis CSS layout per slide (kiri / kanan / atas) + fade sesuai arah.
- [x] Implementasi `js/hero-slider.js` (fade, autoplay, dot, panah, keyboard, swipe, reduced-motion).
- [x] Pastikan hanya ada satu `<h1>` dan atribut ARIA carousel benar.
- [x] Uji pada 1536, 1280, 1024, 768, 390px.

---

### 11.2 Penggantian Ikon ke Phosphor Icons

**Library**: **Phosphor Icons** (https://phosphoricons.com), gaya **Light** (stroke tipis, sesuai gaya line-art desain); sosial memakai **Fill/Regular**.

**Cara pemasangan (pilih satu)**
| Opsi | Keterangan |
|---|---|
| A. **Web font via CDN** (disarankan) | `<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css">` (+ `fill/style.css` bila perlu). Pakai: `<i class="ph-light ph-leaf"></i>` |
| B. SVG sprite lokal | Unduh SVG Phosphor ke `assets/icons/` dan pakai `<img>`/`<svg>`; tanpa dependensi jaringan |

Ukuran & warna diatur lewat CSS (`font-size`, `color: currentColor`) sehingga ikut palet (navy/sage).

**Pemetaan ikon (seluruh halaman Home)**

| Lokasi                                                    | Sekarang                   | Phosphor (usulan)                                                                                                                     |
| --------------------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Topbar – lokasi                                           | SVG pin                    | `ph-map-pin`                                                                                                                          |
| Topbar – email                                            | SVG amplop                 | `ph-envelope-simple`                                                                                                                  |
| Topbar – telepon                                          | SVG telepon                | `ph-phone`                                                                                                                            |
| Navbar – panah dropdown                                   | chevron SVG                | `ph-caret-down`                                                                                                                       |
| Tombol CTA – panah                                        | SVG panah                  | `ph-arrow-right`                                                                                                                      |
| Hero – Evidence-Based Care                                | daun                       | `ph-leaf`                                                                                                                             |
| Hero – Personalised Treatment                             | hati                       | `ph-heart`                                                                                                                            |
| Hero – A Holistic Approach                                | orang                      | `ph-users-three` (sesuai desain: 3 orang)                                                                                             |
| Services – Lymphatic Health                               | `lymphatic-health.svg`     | `ph-drop`                                                                                                                             |
| Services – Lipedema Care                                  | `lipedema-care.svg`        | `ph-person-simple`                                                                                                                    |
| Services – Post-Operative Recovery                        | `post-op-recovery.svg`     | `ph-first-aid-kit`                                                                                                                    |
| Services – Pregnancy & Postpartum                         | `pregnancy-postpartum.svg` | `ph-baby`                                                                                                                             |
| Services – Skin Health & Body Contouring                  | `skin-contouring.svg`      | `ph-sparkle`                                                                                                                          |
| Services – Women's Health Physiotherapy                   | `womens-physio.svg`        | `ph-heartbeat`                                                                                                                        |
| Services – tombol panah kartu                             | SVG panah                  | `ph-arrow-right`                                                                                                                      |
| Difference – Specialised Expertise                        | topi wisuda                | `ph-graduation-cap`                                                                                                                   |
| Difference – Personalised Care                            | 2 orang                    | `ph-users`                                                                                                                            |
| Difference – Evidence-Based Treatment                     | perisai centang            | `ph-shield-check`                                                                                                                     |
| Footer – Facebook / TikTok / Email / WhatsApp / Instagram | SVG kustom                 | `ph-facebook-logo` / `ph-tiktok-logo` / `ph-envelope-simple` / `ph-whatsapp-logo` / `ph-instagram-logo` (varian **fill**, lihat 11.4) |
| Mobile toggle                                             | 3 garis CSS                | (tetap CSS, atau `ph-list` / `ph-x`)                                                                                                  |

> [!NOTE]
> Nama ikon di atas adalah usulan terdekat dengan desain; dapat disesuaikan setelah dilihat di browser. Logo (`assets/logo/logo.png`) **bukan ikon** dan tidak diganti.

**Checklist**

- [x] Pasang stylesheet Phosphor (CDN) dan `preconnect`.
- [x] Ganti semua `<svg>` inline di `index.html` dengan elemen `<i class="ph-light …">` sesuai tabel.
- [x] Ganti `<img src="assets/icons/*.svg">` pada kartu Services; hapus file SVG lama yang tidak terpakai.
- [x] Sesuaikan CSS ukuran/warna ikon (`.icon-circle i`, `.hero-value-icon i`, `.arrow-btn i`, dll.); hapus aturan `svg` yang tidak terpakai.
- [x] Tambahkan `aria-hidden="true"` pada ikon dekoratif; `aria-label` pada tombol ikon.
- [x] Verifikasi tidak ada ikon kotak kosong (font gagal dimuat) dan konsol bersih.

---

### 11.3 Dropdown "Our Services" (Mega-Menu)

**Target tata letak (desktop)**

```
+--------------------------------------------------------------------------+
|  Pregnancy &        Lymphatic         Pain & TMJ        Body             |
|  Postpartum         Drainage          Relief            Contouring       |
|  ----------------   ---------------   ---------------   ---------------  |
|  Pregnancy Massage  Post-Surgical     TMJ, Jaw &        Clinical         |
|  & Circulation ...  Recovery          Headache ...      Cellulite ...    |
|  ----------------   ---------------   ---------------   ---------------  |
|  Recovery & Core    Clinical Lymph.   Chronic Pain,     Lymphatic Reset  |
|  Restoration        Drainage Sydney   Stress & ...      & Fluid ...      |
|  ----------------   ---------------   ---------------   ---------------  |
|  Postnatal Lymph.   Lipedema & ...    Endometriosis &   Hormonal Skin    |
|  Drainage           Leg Care          Pelvic Pain ...   Tightening ...   |
+--------------------------------------------------------------------------+
```

| Aspek         | Sekarang                              | Perbaikan                                                                                                                                                                   |
| ------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bentuk panel  | Dropdown 260px, 1 kolom               | **Panel lebar** (±960px, `max-width: calc(100vw - 4rem)`), tengah terhadap navbar, **4 kolom** (`grid-template-columns: repeat(4, 1fr)`), `gap ±2rem`                       |
| Kotak         | `border-radius` kecil                 | Latar putih, `border: 1px solid var(--color-border)`, **radius ±24px**, `padding ±2.2rem 2.4rem`, bayangan lembut                                                           |
| Judul kolom   | –                                     | Serif (Cormorant Garamond) ±1.5rem, navy, **semibold**; 2 baris bila panjang                                                                                                |
| Daftar tautan | 6 tautan datar                        | Tautan sans-serif ±0.82rem navy, tiap item dipisah **garis tipis** (`border-top: 1px solid var(--color-border)`), `padding .8rem 0`; hover → warna sage + garis bawah tipis |
| Isi menu      | Lymphatic Health, Lipedema Care, dst. | Sesuai desain (lihat tabel isi)                                                                                                                                             |
| Pemicu        | `:hover`                              | `:hover` **dan** `:focus-within` + tombol toggle (`aria-expanded`) untuk keyboard; tutup dengan `Esc`/klik luar                                                             |
| Animasi       | translateY + fade                     | fade + translateY 8px, 200 ms; tanpa "celah hover" antara tautan dan panel (gunakan `padding-top` jembatan/`::before`)                                                      |

**Isi menu (sesuai gambar desain)**

| Kolom                      | Item                                                                                                                                                                                                          |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pregnancy & Postpartum** | Pregnancy Massage & Circulation Support · Recovery & Core Restoration · Postnatal Lymphatic Drainage                                                                                                          |
| **Lymphatic Drainage**     | Post-Surgical Recovery · Clinical Lymphatic Drainage Sydney · Lipedema & Inflammatory Leg Care                                                                                                                |
| **Pain & TMJ Relief**      | TMJ, Jaw & Headache Treatment · Chronic Pain, Stress & Inflammation · Endometriosis & Pelvic Pain Support · Endometriosis & Pelvic Pain Support _(item ke-4 duplikat di desain – lihat Poin Diskusi 11.5 #2)_ |
| **Body Contouring**        | Clinical Cellulite Remodelling · Lymphatic Reset & Fluid Retention Treatment · Hormonal Skin Tightening & Firmness Treatment                                                                                  |

**Responsif**

- ≤ 992px: panel 2 kolom.
- ≤ 768px (menu hamburger): panel menjadi **accordion** – judul kolom jadi tombol yang membuka/menutup daftar; tanpa bayangan/border, `padding-left 1rem`.

**Perubahan file**

- `index.html`: ganti isi `.dropdown-menu` dengan 4 `.mega-col` (`<h3>` + `<ul>`/`<a>`); tambah `aria-expanded` pada pemicu.
- `css/sections.css`: tulis ulang `.dropdown-menu`, `.dropdown-link`; tambah `.mega-menu`, `.mega-col`, `.mega-title`, `.mega-link`.
- `js/nav.js`: tambah toggle keyboard (`Esc`, `aria-expanded`) & accordion mobile.

**Checklist**

- [x] Bangun markup mega-menu 4 kolom dengan isi sesuai desain.
- [x] Styling panel (radius, border, garis pemisah, tipografi serif/sans).
- [x] Posisi panel tengah & tidak keluar viewport (1280–1536px).
- [x] Aksesibilitas keyboard (`focus-within`, `Esc`, `aria-expanded`).
- [x] Versi mobile accordion.

---

### 11.4 Footer – Rapikan Layout & Ikon Sama dengan Desain

**Target tata letak (desktop)** – mengacu gambar footer:

```
+-------------------------------------------------------------------------+
|  [LOGO]          Home   About   Our Service   Our Clinic   Contact Us  | DOUBLE BAY | SYDNEY
|                  (f) (tiktok) (mail) (whatsapp) (instagram)            | A HEALTHIER YOU, FOR WHAT'S NEXT
|  ©2026 InBody Clinic, All Right Reserved.                              |
+-------------------------------------------------------------------------+
```

| Aspek            | Sekarang                                                 | Perbaikan                                                                                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Grid             | 3 kolom + baris `.footer-bottom` terpisah di bawah garis | **1 baris, 3 kolom**: `grid-template-columns: auto 1fr auto`, rata atas (`align-items: start`), `padding ±2.5rem 0`; tanpa garis horizontal pemisah                                                                                                                |
| Kolom kiri       | Logo saja                                                | **Logo + teks copyright** di bawah logo ("©2026 InBody Clinic, All Right Reserved." – huruf kecil ±0.7rem, putih 80%)                                                                                                                                              |
| `.footer-bottom` | Copyright kiri + deskripsi kanan                         | **Dihapus** (copyright pindah ke kolom kiri; deskripsi kanan dihilangkan agar sama dengan desain)                                                                                                                                                                  |
| Menu             | Rata tengah, `gap 2rem`                                  | Satu baris, **rata kiri di kolom tengah**, `gap ±2.5–3rem`, ±0.85rem putih                                                                                                                                                                                         |
| Ikon sosial      | Dalam lingkaran semi-transparan 32px                     | **Tanpa lingkaran**, ikon putih ±22px, `gap ±1rem`, di **bawah menu** (rata kiri sejajar menu); hover → warna sage                                                                                                                                                 |
| Ikon             | SVG kustom                                               | **Phosphor**: `ph-facebook-logo`, `ph-tiktok-logo`, `ph-envelope-simple`, `ph-whatsapp-logo`, `ph-instagram-logo` (varian **fill** untuk logo merek; **regular/bold** untuk amplop) — urutan sama dengan desain                                                    |
| Kolom kanan      | Rata kanan, `border-left`                                | Pemisah **garis vertikal putih tipis** (±1px, tinggi sesuai blok), teks **rata kiri**: baris 1 `DOUBLE BAY \| SYDNEY` (uppercase, letter-spacing lebar, ±0.7rem), baris 2 `A HEALTHIER YOU, FOR WHAT'S NEXT` (uppercase, sans-serif kecil, **bukan italic serif**) |
| Latar            | Navy                                                     | Tetap navy (`--color-navy`)                                                                                                                                                                                                                                        |
| Logo             | `filter: brightness(0) invert(1)`                        | Tetap putih; tinggi ±48–56px                                                                                                                                                                                                                                       |

**Responsif**

- ≤ 992px: grid 1 kolom, semua rata kiri; urutan: logo → menu → sosial → tagline → copyright; garis vertikal jadi garis horizontal tipis di atas tagline.
- ≤ 768px: menu **wrap** 2–3 baris, ikon sosial tetap satu baris.

**Perubahan file**

- `index.html`: susun ulang `<footer>` (logo+copyright | nav+sosial | tagline); hapus `.footer-bottom`; ganti SVG sosial dengan ikon Phosphor.
- `css/sections.css`: tulis ulang `.footer`, `.footer-top`, `.footer-brand`, `.footer-nav`, `.footer-menu`, `.footer-socials`, `.footer-social-link`, `.footer-tagline-col`, `.footer-city`, `.footer-motto`; hapus `.footer-bottom`.

**Checklist**

- [x] Susun ulang markup footer sesuai tata letak target.
- [x] Rapikan CSS grid, jarak, dan tipografi footer.
- [x] Ganti ikon sosial ke Phosphor (tanpa lingkaran).
- [x] Pindahkan copyright ke bawah logo; hapus `.footer-bottom`.
- [x] Uji responsif (1536 / 1280 / 1024 / 768 / 390px).

---

### 11.5 Urutan Eksekusi & Poin Diskusi

**Urutan eksekusi**

1. Pasang Phosphor Icons & ganti seluruh ikon (11.2) – dikerjakan lebih dulu agar slider, dropdown, dan footer langsung memakai ikon baru.
2. Footer (11.4).
3. Dropdown Our Services (11.3).
4. Hero slider: siapkan aset → markup → CSS → JS (11.1).
5. Uji responsif & konsol browser; perbarui checklist dokumen ini.

**Kriteria selesai Revisi 2**

- Hero memiliki 3 slide; slide 1 identik dengan tampilan sekarang; slide 2 & 3 sesuai layout desain; autoplay, dot, panah, keyboard, dan swipe berfungsi.
- Tidak ada ikon SVG kustom/Lucide tersisa di halaman Home; semua ikon berasal dari Phosphor.
- Dropdown Our Services tampil sebagai panel 4 kolom sesuai desain dan dapat dipakai dengan keyboard.
- Footer tersusun 1 baris 3 kolom dengan ikon sosial tanpa lingkaran, sesuai gambar footer.
- Bagian lain tidak berubah; tidak ada error pada konsol.

**Poin diskusi (mohon konfirmasi sebelum eksekusi)**

1. **Aset slide 2 & 3**: gambar yang dikirim berisi teks desain. Apakah tersedia foto aslinya (tanpa teks)? Bila tidak, foto akan di-_crop_ dari gambar tersebut (kualitas bisa sedikit lebih rendah).
2. **Dropdown – item duplikat**: pada kolom _Pain & TMJ Relief_ desain, "Endometriosis & Pelvic Pain Support" muncul dua kali. Apakah ini disengaja, atau item ke-4 diganti layanan lain?
3. **Tautan dropdown**: seluruh item sementara menuju `#services` (belum ada halaman layanan). Apakah ada URL tujuan masing-masing?
4. **Kontrol slider**: apakah panah kiri/kanan ditampilkan, atau cukup dot pagination (desain tidak menampilkan kontrol)?
5. **Kecepatan autoplay** 6 detik – sesuai, atau ingin lebih lambat/cepat?
6. **Teks footer**: desain menulis "All Right Reserved" (tanpa "s"); mengikuti desain atau dikoreksi menjadi "All Rights Reserved"? Teks deskripsi di kanan bawah footer lama dihapus – setuju?

---

## 12. Rencana Perbaikan Tampilan (Revisi 3)

> [!NOTE]
> Revisi 3 mencakup **3 pekerjaan**: (12.1) perbaikan **Slide 3** agar penuh seperti Slide 1 & 2 + **tombol slider di depan gambar**, (12.2) **animasi slider** bergeser dari kanan ke kiri, dan (12.3) **tata letak Footer** yang lebih rapi dan tidak terlalu penuh. Bagian lain (Topbar, Navbar, mega-menu, Services, Difference, Testimonial, CTA Banner) **tidak diubah**.

### 12.0 Ringkasan Perubahan

| #   | Area                 | Kondisi sekarang                                                                                              | Target                                                                                                            |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Hero – Slide 3       | Foto hanya berupa strip tipis di bagian atas section, sisanya kosong (latar krem); tidak setinggi Slide 1 & 2 | Slide 3 **setinggi & seluas Slide 1 & 2**: foto memenuhi bagian bawah sampai tepi section, tanpa ruang kosong     |
| 2   | Hero – tombol slider | Tombol (panah + dot) tampak berada **di bawah/di luar gambar** karena slide 3 pendek                          | Tombol **selalu di depan gambar** (overlay, `z-index` di atas foto) pada ketiga slide                             |
| 3   | Hero – animasi       | Fade (opacity)                                                                                                | **Geser horizontal**: slide baru masuk dari **kanan** dan slide lama keluar ke **kiri**                           |
| 4   | Footer               | Grid 3 kolom dalam 1 baris yang padat (menu 5 link + ikon + tagline 2 baris + copyright dalam 1 blok)         | Layout **2 tingkat** yang lega: baris utama (logo · menu · tagline) + baris bawah tipis (copyright · ikon sosial) |

---

### 12.1 Slide 3 Penuh & Tombol Slider di Depan Gambar

**Akar masalah (hasil pemeriksaan kode saat ini)**

| Temuan                                                                                                        | Lokasi                                             | Dampak                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.hero-slides` hanya punya `min-height`, sedangkan `.hero-slide` memakai `height: 100%`                       | `css/sections.css` (`.hero-slides`, `.hero-slide`) | Persentase tinggi terhadap `min-height` dihitung `auto`, sehingga slide aktif (`position: relative`) **mengecil mengikuti isi teksnya**. Slide 1 & 2 tampak penuh karena isinya tinggi; Slide 3 isinya pendek (teks di atas) → section ikut pendek |
| `.hero-media--bottom` memakai `position: absolute; bottom: 0; height: 48%`                                    | `css/sections.css`                                 | Karena tinggi slide 3 mengecil, foto menjadi strip tipis dan tampak terpotong di bawah teks; sisanya kosong                                                                                                                                        |
| `.hero-controls` diletakkan `absolute; bottom: 2rem` relatif ke `.section-hero` (tinggi tetap), bukan ke foto | `css/sections.css`                                 | Pada Slide 3, tombol jatuh di area kosong di bawah foto, terlihat "di luar gambar"                                                                                                                                                                 |
| Foto `hero-3.jpg` berukuran 1024×318 (rasio ±3.2:1)                                                           | `assets/images/hero-3.jpg`                         | Cocok untuk strip lebar; perlu dibuat mengisi area bawah (±55% tinggi hero) tanpa terlalu di-_crop_                                                                                                                                                |

**Perbaikan tata letak Slide 3 (desktop ≥ 992px)**

```
+------------------------------------------------------------------+  ← tinggi sama dengan slide 1 & 2
|  WOMEN'S HEALTH & WELLBEING                 ◌ Evidence-Based Care |
|  Care Designed Around You.                  ♡ Personalised Treatm.|  ← area teks (±45%)
|  deskripsi ...                              ⚇ A Holistic Approach |
|  [ BOOK AN APPOINTMENT → ]                                        |
|~~~~~~~~~~~~~~~~~ fade dari warna latar ~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|  [ foto terapis + rak produk, lebar penuh, sampai tepi bawah ]    |  ← area foto (±55%)
|                        ( ‹  ● ● ▬  › )                           |  ← kontrol overlay di depan foto
+------------------------------------------------------------------+
```

| Aspek                  | Sekarang                                 | Perbaikan                                                                                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tinggi slide           | Mengikuti isi teks (±180px)              | **Sama untuk semua slide** = `clamp(580px, 56vw, 780px)` (token yang sama dengan section)                                                                                                                                                                    |
| Cara menyamakan tinggi | `height: 100%` pada `.hero-slide`        | `.hero-slides` menjadi **CSS grid satu sel**: `display: grid`; semua `.hero-slide` memakai `grid-area: 1 / 1`; `height: auto` (menghapus `position: absolute` / `inset` / `height: 100%`). Tinggi baris otomatis = `min-height` section atau slide tertinggi |
| Foto                   | `height: 48%`, bawah                     | `.hero-media--bottom { height: 56%; width: 100%; bottom: 0; }` – melebar sampai tepi viewport (bukan terbatas container), `object-fit: cover; object-position: center 25%`                                                                                   |
| Fade foto              | `mask-image` `to bottom` 35%             | Dipertahankan; naikkan area pudar ke ±30% agar transisi dari teks mulus                                                                                                                                                                                      |
| Teks                   | `padding: 3.8rem 0 0`                    | Tetap di atas (`align-items: flex-start`), `z-index` di atas foto; beri `padding-bottom` agar tidak menimpa wajah terapis                                                                                                                                    |
| Resolusi foto          | 1024×318                                 | Diregangkan ±1.4× pada layar 1440px. **Opsi**: pakai foto asli beresolusi lebih tinggi bila tersedia; bila tidak, tetap di-_crop_ dari gambar sekarang + `image-rendering` default                                                                           |
| Mobile ≤ 992px         | Foto 340px setelah teks (slide menyusut) | Slide mengisi tinggi yang sama dengan slide lain; `.hero-media--bottom { margin-top: auto; height: 340px }` sehingga **foto menempel di tepi bawah** dan tidak ada ruang kosong                                                                              |

**Tombol slider di depan gambar**

| Aspek                    | Sekarang                                               | Perbaikan                                                                                                                                                                                                                            |
| ------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Posisi                   | `absolute; bottom: 2rem; left: 50%` di `.section-hero` | Tetap `absolute` di dalam `.section-hero` (pusat bawah), kini **di atas foto** karena foto Slide 3 mencapai tepi bawah; `z-index: 10` (di atas slide `2` & media `1`)                                                                |
| Keterbacaan di atas foto | Panah putih + dot tembus pandang navy                  | Bungkus kontrol dalam **kapsul kaca**: `background: rgba(255,255,255,.72); backdrop-filter: blur(8px); padding: .5rem 1rem; border-radius: var(--radius-pill); box-shadow: var(--shadow-soft)` sehingga terbaca di foto terang/gelap |
| Dot                      | Navy 25% / aktif sage                                  | Non-aktif `rgba(31,56,89,.35)`, aktif pil sage (tetap sesuai palet)                                                                                                                                                                  |
| Panah                    | 36px, putih                                            | 34–36px, hover navy; tetap `<button>` dengan `aria-label`                                                                                                                                                                            |
| Mobile ≤ 768px           | Panah disembunyikan                                    | Tetap: panah disembunyikan, kapsul hanya berisi dot, `bottom: 1rem`                                                                                                                                                                  |

**Perubahan file**

- `css/sections.css`: ubah `.hero-slides` / `.hero-slide` ke grid satu sel; perbarui `.hero-media--bottom`, `.hero-mask--top`, `.hero-controls`; sesuaikan blok `@media (max-width: 992px)` (hapus `display: none` pada slide non-aktif, ganti dengan `visibility`).
- `index.html`: tidak berubah struktur (kontrol sudah berada di dalam `.section-hero`); bila perlu tambahkan pembungkus `.hero-controls-inner` untuk kapsul kaca.

---

### 12.2 Animasi Slider: Bergeser Kanan → Kiri

**Perilaku**

| Aksi                                                                      | Slide lama                               | Slide baru                                                                    |
| ------------------------------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| Berikutnya (autoplay, panah ›, swipe kiri, dot ke slide lebih besar, `→`) | Keluar ke **kiri** (`translateX(-100%)`) | Masuk dari **kanan** (`translateX(100%) → 0`)                                 |
| Sebelumnya (panah ‹, swipe kanan, dot ke slide lebih kecil, `←`)          | Keluar ke **kanan**                      | Masuk dari **kiri** (arah dibalik agar terasa natural; lihat Poin Diskusi #1) |
| Dari slide 3 → slide 1 (putaran)                                          | Keluar ke kiri                           | Slide 1 diposisikan dulu di kanan (tanpa transisi), lalu masuk dari kanan     |

- Durasi **700 ms**, easing `cubic-bezier(.65, 0, .25, 1)` (awal lambat – akhir halus); kedua slide bergerak bersamaan sehingga terlihat satu "film strip".
- Konten (teks, tombol, nilai) ikut bergeser bersama foto karena transform diterapkan pada seluruh `.hero-slide`.
- `.section-hero` tetap `overflow: hidden` agar slide yang berada di luar tidak terlihat/bergulir horizontal.

**Rancangan teknis (kelas status, tanpa library)**

```css
.hero-slides {
  display: grid;
  min-height: clamp(580px, 56vw, 780px);
}

.hero-slide {
  grid-area: 1 / 1;
  transform: translateX(100%); /* menunggu di kanan */
  visibility: hidden;
  transition:
    transform 700ms cubic-bezier(0.65, 0, 0.25, 1),
    visibility 0s linear 700ms; /* sembunyikan setelah selesai geser */
}
.hero-slide.is-active {
  transform: translateX(0);
  visibility: visible;
  transition-delay: 0s;
  z-index: 2;
}
.hero-slide.is-leaving {
  transform: translateX(-100%);
  visibility: visible;
  transition-delay: 0s;
}
/* arah balik (prev) */
.hero-slides.is-reverse .hero-slide {
  transform: translateX(-100%);
}
.hero-slides.is-reverse .hero-slide.is-leaving {
  transform: translateX(100%);
}
.hero-slide.no-anim {
  transition: none;
} /* penempatan awal sebelum masuk */
```

| Langkah di `js/hero-slider.js` (`goToSlide(index, direction)`)                                                                                | Keterangan                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 1. Tentukan arah (`next` = +1, `prev` = -1)                                                                                                   | Dot: bandingkan `index` dengan `currentIndex`; putaran 3→1 tetap dianggap `next` |
| 2. Tandai slide lama `is-leaving`, hapus `is-active`                                                                                          | Meluncur keluar                                                                  |
| 3. Slide baru: tambah `no-anim`, set posisi awal (kanan/kiri) → paksa _reflow_ (`void el.offsetWidth`) → hapus `no-anim` → tambah `is-active` | Menjamin slide baru selalu mulai dari sisi yang benar, termasuk saat putaran     |
| 4. Setelah `transitionend` (atau `setTimeout` 750 ms sebagai cadangan) hapus `is-leaving`                                                     | Slide lama kembali ke posisi tunggu & `visibility: hidden`                       |
| 5. Kunci `isAnimating` selama transisi                                                                                                        | Cegah klik beruntun / autoplay bertabrakan                                       |
| 6. Perbarui `aria-hidden`, `aria-selected`, dot aktif seperti sebelumnya                                                                      | Aksesibilitas tetap                                                              |
| 7. `prefers-reduced-motion: reduce`                                                                                                           | Tanpa geser: `transition: none` (pindah instan) dan autoplay tetap nonaktif      |

**Penyesuaian terkait**

- Mobile ≤ 992px: hapus `display: none` pada slide non-aktif (merusak animasi); semua slide tetap tertumpuk di grid sel yang sama. Tinggi section = slide tertinggi; slide yang lebih pendek mendorong fotonya ke bawah dengan `margin-top: auto` sehingga tidak ada ruang kosong.
- Elemen fokus pada slide tersembunyi tidak bisa di-_tab_ (sudah ditangani oleh `visibility: hidden`).
- Autoplay 6 detik, jeda saat hover/fokus: **tidak berubah**.
- _Swipe_: tetap memicu transisi sama (tanpa efek menyeret jari).

**Perubahan file**

- `css/sections.css`: ganti aturan fade (`opacity` + `scale`) dengan aturan geser di atas; perbarui blok mobile.
- `js/hero-slider.js`: tambah parameter arah, kelas `is-leaving` / `is-reverse` / `no-anim`, kunci `isAnimating`, `transitionend`.
- `index.html`: tidak berubah.

---

### 12.3 Footer – Tata Letak Lebih Rapi & Tidak Terlalu Penuh

**Diagnosa kondisi sekarang** (`.footer-container`: `grid 1.15fr 1.6fr 1fr`, `gap 3.5rem`)

| Masalah                      | Penyebab                                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| Terlalu penuh / sesak        | Tiga kolom menampung 6 jenis elemen sekaligus: logo, copyright, 5 menu, 5 ikon, tagline 2 baris         |
| Menu mudah _wrap_ tidak rapi | 5 link dengan `gap 2.5rem` + ikon di bawahnya berebut lebar kolom tengah (±1.6fr)                       |
| Tagline sempit & bertumpuk   | Teks uppercase dengan `letter-spacing` lebar pada kolom ±1fr cenderung terpecah menjadi 3–4 baris       |
| Tidak seimbang secara visual | Kolom kiri (logo + copyright) pendek, kolom tengah tinggi (menu + ikon), kolom kanan di tengah vertikal |

**Target tata letak (desktop ≥ 992px) – 2 tingkat**

```
+----------------------------------------------------------------------------------+
|  [LOGO]       Home   About   Our Service   Our Clinic   Contact Us   | DOUBLE BAY | SYDNEY
|                                                                       | A HEALTHIER YOU,
|                                                                       | FOR WHAT'S NEXT
|----------------------------------------------------------------------------------|  ← garis tipis putih 14%
|  ©2026 InBody Clinic, All Right Reserved.                  (f) (tt) (✉) (wa) (ig) |
+----------------------------------------------------------------------------------+
```

| Aspek         | Sekarang                                      | Perbaikan                                                                                                                                                                                                                                                                           |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Struktur      | `.footer-container` 3 kolom                   | **Dua baris**: `.footer-main` (logo · menu · tagline) dan `.footer-bar` (copyright · sosial)                                                                                                                                                                                        |
| Baris utama   | –                                             | `display: grid; grid-template-columns: auto 1fr auto; align-items: center; column-gap: 3rem` – menu berada di tengah (`justify-self: center`)                                                                                                                                       |
| Logo          | Tinggi 48px, kolom 1.15fr                     | Tinggi **44px**, kolom lebar `auto` (tidak melebar)                                                                                                                                                                                                                                 |
| Menu          | `gap 2.5rem`, bisa _wrap_                     | Satu baris, `gap 2rem`, `font-size .85rem`, `white-space: nowrap`; _wrap_ hanya di layar kecil                                                                                                                                                                                      |
| Tagline       | Dalam kolom sempit                            | Kolom `auto` di kanan dengan **garis vertikal** di kirinya (`padding-left 1.75rem`), teks rata kiri: baris 1 `DOUBLE BAY \| SYDNEY` (`.74rem`, spasi huruf `.16em`), baris 2 `A HEALTHIER YOU, FOR WHAT'S NEXT` (`.7rem`, spasi huruf `.1em`, `max-width ±260px` agar rapi 2 baris) |
| Baris bawah   | Copyright di bawah logo, sosial di bawah menu | `.footer-bar`: `display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; margin-top: 2rem; border-top: 1px solid rgba(255,255,255,.14)` – copyright **kiri**, ikon sosial **kanan**                                                                 |
| Ikon sosial   | 1.35rem, gap 1.35rem, di kolom tengah         | 1.3rem, `gap 1.25rem`, **tanpa lingkaran** (tetap), hover → sage; urutan tetap Facebook · TikTok · Email · WhatsApp · Instagram                                                                                                                                                     |
| Copyright     | `.74rem`, di bawah logo                       | `.72rem`, putih 70%, sejajar dengan ikon sosial                                                                                                                                                                                                                                     |
| Padding       | `3.5rem 0 3rem`                               | `3.25rem 0 1.75rem` (lebih seimbang karena ada baris bawah)                                                                                                                                                                                                                         |
| Latar & palet | Navy                                          | Tetap navy, teks putih, aksen hover sage                                                                                                                                                                                                                                            |

**Responsif**

| Lebar    | Perilaku                                                                                                                                                                                                                                                                                        |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≤ 1200px | Kurangi `column-gap` menjadi `2rem`, menu `gap 1.5rem`                                                                                                                                                                                                                                          |
| ≤ 992px  | `.footer-main` menjadi 1 kolom, rata kiri, urutan: logo → menu (boleh _wrap_, `gap 1rem 1.75rem`) → tagline (garis vertikal diganti **garis horizontal tipis** di atasnya). `.footer-bar` berubah `flex-direction: column`, `align-items: flex-start`, `gap 1.25rem` (sosial di atas copyright) |
| ≤ 480px  | Menu 2–3 baris, ikon sosial tetap satu baris, logo 40px                                                                                                                                                                                                                                         |

**Perubahan file**

- `index.html`: bungkus ulang `<footer>` menjadi `.footer-main` (`.footer-brand`, `.footer-menu`, `.footer-tagline-col`) dan `.footer-bar` (`.footer-copyright`, `.footer-socials`). Isi teks & tautan **tidak berubah**.
- `css/sections.css`: tulis ulang `.footer`, `.footer-container` → `.footer-main`, tambah `.footer-bar`; sesuaikan `.footer-brand-col` / `.footer-center-col` (dihapus), `.footer-tagline-*`, dan blok responsif (≤1200 / ≤992 / ≤480px).

> [!NOTE]
> Perubahan ini menggantikan tata letak footer 3 kolom pada **11.4** (copyright di bawah logo dan ikon sosial di bawah menu) karena terbukti terlalu penuh. Tagline, ikon Phosphor tanpa lingkaran, dan palet tetap sama.

---

### 12.4 Checklist & Urutan Eksekusi

**Urutan eksekusi**

1. Hero: ubah `.hero-slides` ke grid satu sel (menyamakan tinggi semua slide) → perbaiki Slide 3 (12.1).
2. Hero: kontrol di depan gambar (kapsul kaca) (12.1).
3. Hero: animasi geser kanan → kiri di CSS + `js/hero-slider.js` (12.2).
4. Footer: ubah markup & CSS 2 tingkat (12.3).
5. Uji responsif (1536 / 1280 / 1024 / 768 / 390px) & konsol browser; perbarui checklist.

**Checklist – Hero (12.1 & 12.2)**

- [x] Ubah `.hero-slides` / `.hero-slide` menjadi grid satu sel; tinggi semua slide sama.
- [x] Slide 3: foto mengisi ±56% bagian bawah, lebar penuh, menempel di tepi bawah; tanpa ruang kosong.
- [x] Slide 3: fade atas foto & jarak teks–foto rapi di 1536 / 1280 / 1024px.
- [x] Kontrol (panah + dot) berada **di depan** foto pada ketiga slide (kapsul kaca, `z-index` benar).
- [x] Animasi geser: slide baru dari kanan, slide lama keluar ke kiri (700 ms).
- [x] Putaran slide 3 → 1 tetap masuk dari kanan; arah dibalik untuk "sebelumnya".
- [x] Kunci klik beruntun (`isAnimating`) & `transitionend` dengan cadangan timeout.
- [x] `prefers-reduced-motion`: tanpa animasi geser.
- [x] Mobile ≤ 992px: semua slide penuh, foto menempel bawah, animasi geser tetap berjalan.
- [x] Tetap hanya satu `<h1>`; ARIA carousel, dot, keyboard, swipe, autoplay tetap berfungsi.

**Checklist – Footer (12.3)**

- [x] Susun ulang markup: `.footer-main` + `.footer-bar`.
- [x] CSS grid `auto 1fr auto`, menu tengah satu baris, tagline rapi 2 baris dengan garis vertikal.
- [x] Baris bawah: copyright kiri, ikon sosial kanan, garis pemisah tipis.
- [x] Responsif 1200 / 992 / 480px (garis vertikal → horizontal, menu _wrap_ rapi).
- [x] Verifikasi tidak ada teks menumpuk atau terpotong; konsol bersih.

**Kriteria selesai Revisi 3**

- Slide 3 setinggi dan sepenuh Slide 1 & 2; foto memenuhi bagian bawah tanpa area kosong.
- Tombol slider tampil di depan gambar pada seluruh slide dan terbaca jelas.
- Perpindahan slide bergeser dari kanan ke kiri dengan mulus, termasuk putaran 3 → 1.
- Footer terlihat lega, seimbang, dan tidak sesak di desktop, tablet, dan mobile.
- Bagian lain tidak berubah; tidak ada error pada konsol.

**Poin diskusi (mohon konfirmasi sebelum eksekusi)**

1. **Arah "sebelumnya"**: saat menekan panah ‹ / swipe kanan, apakah arah geser **dibalik** (masuk dari kiri, rekomendasi) atau tetap kanan → kiri?
2. **Posisi tombol**: tetap satu kapsul di **tengah bawah** (rekomendasi), atau panah diletakkan di **tepi kiri & kanan** vertikal tengah dengan dot di tengah bawah?
3. **Foto Slide 3**: apakah tersedia foto asli beresolusi lebih tinggi (min. ±1600 px lebar) agar tidak terlihat buram saat dilebarkan penuh?
4. **Footer**: apakah layout 2 tingkat (logo · menu · tagline di atas; copyright · sosial di bawah) sesuai, atau ada referensi gambar footer yang diinginkan?

---

## 13. Rencana Halaman About (Revisi 4)

> [!NOTE]
> Revisi 4 menambah **halaman baru `about.html`** ("Meet Your Therapist – Saila Insua López") berdasarkan gambar desain. Halaman Home (`index.html`) hanya berubah pada **tautan menu** (About → `about.html`). Topbar, Navbar, dan Footer memakai **komponen yang sama** dengan Home agar konsisten.

### 13.0 Analisis Gambar Desain

Halaman terdiri dari **6 blok** dari atas ke bawah:

| #   | Blok                            | Latar          | Isi (hasil analisis gambar)                                                                                                           |
| --- | ------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Topbar                          | Sage `#8aa29b` | Pin _New South Wales, Double Bay_ · email *Sailainsua@gmail.com* · telepon _+61 424 912 490_ (ikon putih, teks putih kecil)           |
| 2   | Navbar                          | Putih          | Logo kiri · menu: Home, **About (aktif)**, Our Services ▾, Our Clinic, Contact Us · tombol sage pill **BOOK AN APPOINTMENT →**        |
| 3   | **Meet Your Therapist** (intro) | Krem `#f7f6f2` | Kolom kiri: eyebrow, H1 nama, subjudul, paragraf, 3 baris keahlian berpanah, 2 tombol. Kolom kanan: foto potret dengan sudut membulat |
| 4   | **Stats band**                  | Sage           | 4 kartu berbingkai tipis (outline putih), angka/judul besar serif + keterangan kecil                                                  |
| 5   | **Experience & expertise**      | Putih          | Kolom kiri: judul 2 warna + paragraf. Kolom kanan: grid 2×2 kartu abu terang dengan ikon                                              |
| 6   | Footer                          | Navy `#1f3859` | Logo, menu 5 tautan, ikon sosial, tagline _DOUBLE BAY \| SYDNEY – A HEALTHIER YOU, FOR WHAT'S NEXT_, copyright                        |

**Pemetaan terhadap sistem desain yang sudah ada** (`css/tokens.css`)

| Elemen desain                          | Token / komponen yang dipakai                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| Warna latar krem, sage, navy, abu      | `--color-bg`, `--color-sage`, `--color-navy`, `--color-border` (abu kartu ≈ `#e8e8e6`) |
| Judul serif (H1/H2, angka stats)       | `--font-heading` (Cormorant Garamond)                                                  |
| Teks, label, tombol                    | `--font-body` (Montserrat)                                                             |
| Eyebrow _MEET YOUR THERAPIST ———_      | `.eyebrow.eyebrow-dark` + garis pendek (`::after`)                                     |
| Tombol _VIEW SERVICES →_               | `.btn.btn-sage` + `.btn-arrow` (sudah ada)                                             |
| Judul 2 warna _Experience & expertise_ | `.section-title` + `.accent` (**varian non-italic**, lihat 13.5)                       |
| Sudut foto & kartu                     | `--radius-md` (foto), `--radius-sm` (kartu)                                            |
| Ikon                                   | Phosphor Light (sudah dimuat di `index.html`)                                          |

### 13.1 Struktur File

```
inbody-clinic/
├── about.html                  ← BARU
├── css/about.css               ← BARU (hanya gaya khusus halaman About)
├── assets/images/about-saila.jpg   ← BARU (foto Saila, lihat poin diskusi 1)
├── index.html                  ← ubah tautan menu "About"
├── js/main.js                  ← tidak berubah (dipakai ulang)
└── js/nav.js, hero-slider.js   ← tidak berubah
```

- `about.html` memuat `tokens.css → base.css → components.css → sections.css → about.css` dan `js/main.js` (`type="module"`). `initHeroSlider()` sudah aman karena ada pengecekan `if (!heroSection) return;`.
- Topbar, Navbar (+ mega-menu), dan Footer disalin dari `index.html` (markup identik); perbedaan hanya pada tautan & kelas aktif.
- `<title>`: _About Saila Insua López | Spain-trained Physiotherapist – InBody Clinic Sydney_; satu `<h1>` (nama Saila); meta description & Open Graph sendiri; JSON-LD `Person` (jobTitle _Physiotherapist_, worksFor _InBody Clinic_).

### 13.2 Navigasi (Home ↔ About)

| Lokasi                                                        | Sekarang                  | Perubahan                                                     |
| ------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| `index.html` – menu _About_                                   | `#difference`             | `about.html`                                                  |
| `about.html` – menu _Home_                                    | –                         | `index.html` (logo juga ke `index.html`)                      |
| `about.html` – menu _About_                                   | –                         | `class="nav-link active"` + `aria-current="page"`             |
| Menu _Our Clinic_, _Contact Us_, tombol _Book an Appointment_ | `#difference`, `#contact` | di About menuju `index.html#difference`, `index.html#contact` |
| Tautan dropdown _Our Services_                                | `#services`               | `index.html#services`                                         |
| Footer _About_                                                | –                         | `about.html`                                                  |

### 13.3 Blok 3 – Meet Your Therapist (`.about-intro`)

**Layout desktop**: `container`, grid 2 kolom `1fr 1.1fr`, `gap 4rem`, `align-items: center`, padding `4rem 0`, latar `--color-bg`.

| Elemen                                        | Spesifikasi                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Eyebrow                                       | `MEET YOUR THERAPIST` + garis sage pendek 56px di kanan (`::after`), `.75rem`, spasi huruf `.22em`                                                                                                                                                                                                                       |
| H1                                            | **Saila Insua López** – Cormorant Garamond 600, `clamp(2.6rem, 4vw, 3.4rem)`, navy                                                                                                                                                                                                                                       |
| Subjudul                                      | _Spain-trained physiotherapist_ – serif `1.45rem`, **sage**                                                                                                                                                                                                                                                              |
| Paragraf                                      | _With over 20 years of clinical experience, Saila specialises in women's health, dermatofunctional therapy and advanced lymphatic care._ – `.95rem`, `max-width 440px`, navy, `line-height 1.6`                                                                                                                          |
| Daftar keahlian (`<ul class="about-skills">`) | 3 baris, tiap baris: ikon · label · panah `ph-caret-right`; garis pemisah `1px solid --color-border` atas & bawah; padding `.9rem 0`; hover: geser panah 4px + label sage                                                                                                                                                |
| Ikon baris                                    | **Women's Health** → `ph-flower-lotus` · **Dermatofunctional Therapy** → `ph-waves` · **Advanced Lymphatic Care** → `ph-drop` (sage, `1.25rem`)                                                                                                                                                                          |
| Tombol utama                                  | `.btn.btn-sage.btn-arrow` – **VIEW SERVICES →** → `index.html#services`                                                                                                                                                                                                                                                  |
| Tautan sekunder                               | `✉ Contact Saila` (`ph-envelope-simple` + teks Montserrat navy `.95rem`, tanpa bingkai; hover → sage) → `mailto:` / `index.html#contact`                                                                                                                                                                                 |
| Foto                                          | `about-saila.jpg`, rasio **±4:3** (≈ 415×310), `object-fit: cover`, `object-position: center`, `border-radius: var(--radius-md)`, `box-shadow: var(--shadow-soft)`; `width/height` eksplisit, `loading="eager"` + `fetchpriority="high"`, `alt="Saila Insua López, Spain-trained physiotherapist, in the InBody Clinic"` |

Animasi: kolom kiri & foto memakai `data-animate` (fade-up yang sudah ada), foto tertunda 120 ms.

### 13.4 Blok 4 – Stats Band (`.about-stats`)

**Layout**: latar sage; `container`; grid 4 kolom, `gap 1.25rem`; padding `3rem 0`.

| Kartu | Judul (serif besar) | Keterangan                    |
| ----- | ------------------- | ----------------------------- |
| 1     | **20+**             | Years of Clinical experience  |
| 2     | **Spain trained**   | Physiotherapist               |
| 3     | **Sydney**          | InBody Clinic                 |
| 4     | **Clinical Tutor**  | Mentoring healthcare students |

- Kartu: `border: 1px solid rgba(255,255,255,.55)`, `border-radius: 4px`, `padding: 2.25rem 1rem`, tinggi sama (`min-height 100px`), isi dipusatkan.
- Judul: Cormorant Garamond 600, putih, `clamp(1.8rem, 2.6vw, 2.4rem)`; keterangan: Montserrat `.72rem`, putih 85%.
- Hover: latar `rgba(255,255,255,.08)` + naik 3px (`--transition-normal`).
- Markup semantik: `<ul>` dengan 4 `<li>`; angka **20+** boleh dianimasikan _count-up_ (opsional, tidak wajib).

### 13.5 Blok 5 – Experience & Expertise (`.about-expertise`)

**Layout**: latar putih, `container`, grid 2 kolom `1fr 1.25fr`, `gap 4rem`, `align-items: center`, padding `5rem 0`.

| Elemen     | Spesifikasi                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Judul      | `Experience` (navy) + baris kedua `& expertise` (**sage, tegak/non-italic**) – `.section-title`, `clamp(2.8rem, 4.5vw, 3.8rem)`; varian `.accent--upright { font-style: normal; font-weight: 600 }` di `about.css` |
| Paragraf   | _Advanced manual therapy, Vodder and Leduc lymphatic drainage, and INDIBA® radiofrequency technology._ – `.95rem`, `max-width 420px`                                                                               |
| Grid kartu | `grid-template-columns: 1fr 1fr`, `gap 1rem`                                                                                                                                                                       |

**Kartu keahlian** (`.expertise-card`): latar abu terang `#e8e8e6`, `border-radius 8px`, padding `1.4rem 1.25rem`, layout flex: ikon kiri (`1.6rem`, abu-sage `#8aa29b` 80%) · teks kanan.

| #   | Judul (Montserrat 700, navy `.9rem`) | Deskripsi (serif/abu `.8rem`, `#8b9aa0`)                | Ikon Phosphor      |
| --- | ------------------------------------ | ------------------------------------------------------- | ------------------ |
| 1   | Post-surgical recovery               | Collaborating with Sydney surgeons to support recovery. | `ph-stethoscope`   |
| 2   | Lymphatic therapy                    | Advanced Vodder and Leduc techniques.                   | `ph-waves`         |
| 3   | Women's life stages                  | Fertility, pregnancy, postpartum and hormonal support.  | `ph-gender-female` |
| 4   | Tissue rehabilitation                | Connective tissue care and recovery.                    | `ph-plant`         |

- Hover: `translateY(-4px)`, `--shadow-soft`, ikon → navy.
- Catatan kontras: deskripsi abu muda pada kartu abu terang kurang terbaca (≈ 2.9:1). **Disarankan** memakai `--color-text-muted` `#536b82` (≈ 5.1:1) untuk deskripsi agar memenuhi WCAG AA – visual tetap lembut.
- Posisi kartu dirapikan sejajar presisi 2×2 (`align-items: stretch`, tinggi kartu sama `height: 100%`, tanpa offset `translateY`).

### 13.6 Blok 6 – Footer

- Memakai **footer 2 tingkat dari 12.3** (`.footer-main` + `.footer-bar`) tanpa perubahan CSS.
- Tautan: Home → `index.html`, About → `about.html`, Our Service → `index.html#services`, Our Clinic → `index.html#difference`, Contact Us → `index.html#contact`.

> [!NOTE]
> Gambar desain memperlihatkan footer 3 kolom lama (copyright di bawah logo, ikon sosial di bawah menu). Karena Revisi 3 sudah menggantinya menjadi 2 tingkat yang lebih lega, rancangan ini **mengikuti footer yang sekarang berlaku** agar konsisten di seluruh situs (lihat poin diskusi 3).

### 13.7 Responsif

| Lebar    | Perilaku                                                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ≥ 1200px | Layout seperti desain (container 1200px)                                                                                                                                       |
| ≤ 1200px | `.about-intro` gap `3rem`; stats gap `1rem`                                                                                                                                    |
| ≤ 992px  | `.about-intro` → 1 kolom: **foto di atas teks** (`order: -1`, tinggi `min(60vw, 380px)`); `.about-expertise` → 1 kolom (judul → paragraf → grid kartu); stats → **2×2**        |
| ≤ 768px  | Padding section dikurangi (`3rem 0`); H1 `2.4rem`; kartu keahlian tetap 2 kolom                                                                                                |
| ≤ 480px  | Stats 2×2 dengan font lebih kecil (`1.5rem`); kartu keahlian → **1 kolom**; tombol _View Services_ & _Contact Saila_ ditumpuk, lebar penuh; tanpa efek `translateY` pada kartu |

Aksesibilitas: `prefers-reduced-motion` mematikan animasi hover/entrance; semua tautan memiliki _focus ring_ (gaya global); ikon dekoratif `aria-hidden="true"`; satu `<h1>`, `<h2>` untuk "Experience & expertise", `<h3>` untuk judul kartu.

### 13.8 Urutan Eksekusi

1. Siapkan aset foto `about-saila.jpg` (crop dari gambar desain bila foto asli belum ada).
2. Buat `about.html`: salin Topbar/Navbar/Footer, atur tautan & status aktif (13.2).
3. Bangun `.about-intro` (13.3) + `css/about.css` bagian dasar.
4. Bangun `.about-stats` (13.4).
5. Bangun `.about-expertise` + 4 kartu (13.5).
6. Perbarui tautan menu _About_ di `index.html` (13.2).
7. Uji responsif (1536 / 1280 / 1024 / 768 / 390px), keyboard, konsol; perbarui checklist.

**Checklist – About (13.1 – 13.8)**

- [x] Siapkan `assets/images/about-saila.jpg` (±1200 px lebar, dikompres < 150 KB).
- [x] Buat `about.html` (meta SEO, OG, JSON-LD, satu `<h1>`, ID unik pada elemen interaktif).
- [x] Tautan menu: Home ↔ About bekerja di kedua halaman; _About_ aktif di `about.html`.
- [x] Topbar & Navbar (+ mega-menu, menu mobile) berfungsi di `about.html`.
- [x] `.about-intro`: eyebrow, H1, subjudul, paragraf, 3 baris keahlian, 2 tombol, foto.
- [x] `.about-stats`: 4 kartu outline pada latar sage.
- [x] `.about-expertise`: judul 2 warna + grid 2×2 kartu dengan ikon Phosphor.
- [x] Footer 2 tingkat dengan tautan yang benar.
- [x] Responsif 1200 / 992 / 768 / 480px; tidak ada teks menumpuk atau terpotong.
- [x] Kontras teks memenuhi AA; fokus keyboard terlihat; konsol bersih.
- [x] Halaman Home tidak berubah selain tautan _About_.

**Kriteria selesai Revisi 4**

- `about.html` tampil sesuai gambar desain pada desktop, dan tersusun rapi pada tablet & mobile.
- Gaya konsisten dengan Home (palet navy/sage/krem, Cormorant Garamond + Montserrat, ikon Phosphor).
- Navigasi antar-halaman berfungsi dua arah; menu _About_ aktif di halaman About.
- Tidak ada error pada konsol; halaman Home tidak mengalami regresi.

**Poin diskusi (mohon konfirmasi sebelum eksekusi)**

1. **Foto Saila**: apakah tersedia foto asli beresolusi tinggi (min. ±1200 px lebar) untuk `about-saila.jpg`? Bila tidak, foto akan di-_crop_ dari gambar desain (kualitas lebih rendah).
2. **Kontak berbeda**: desain menulis email **Sailainsua@gmail.com** dan telepon **+61 424 912 490**, sedangkan `index.html` memakai `hello@inbodyclinic.com` dan `+61 424 912 400`. Mana yang benar? Apakah Topbar di **kedua halaman** disamakan?
3. **Footer**: ikuti footer 2 tingkat yang sekarang (rekomendasi), atau pakai footer 3 kolom seperti pada gambar About?
4. **Tautan tombol**: _View Services_ → `index.html#services` dan _Contact Saila_ → `mailto:Sailainsua@gmail.com` atau `index.html#contact`? Apakah baris keahlian (Women's Health dst.) perlu tautan ke halaman layanan?
5. **Menu "Our Clinic"**: saat ini mengarah ke `#difference` di Home. Apakah akan dibuat halaman terpisah nanti, atau tetap?
6. **Kartu stats**: apakah angka **20+** perlu animasi _count-up_ saat tampil di layar?
7. **Teks bahasa**: konten tetap bahasa Inggris seperti desain (rekomendasi)?

---

## 14. Rencana Halaman Contact Us (Revisi 5)

> [!NOTE]
> Revisi 5 menambah **halaman baru `contact.html`** berdasarkan gambar desain. Topbar, Navbar, dan Footer memakai komponen yang sama dengan Home & About. Halaman lain hanya berubah pada **tautan menu "Contact Us"** (→ `contact.html`). Blok CTA `#contact` di Home **tidak diubah**.

### 14.0 Analisis Gambar Desain

Halaman terdiri dari **5 blok** (atas → bawah):

| #   | Blok                | Latar               | Isi (hasil analisis gambar)                                                                                   |
| --- | ------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| 1   | Topbar              | Sage `#8aa29b`      | Sama dengan About: _New South Wales, Double Bay_ · *Sailainsua@gmail.com* · _+61 424 912 490_                 |
| 2   | Navbar              | Putih               | Home, About, Our Services ▾, Our Clinic, **Contact Us (aktif)**, tombol **BOOK AN APPOINTMENT →**             |
| 3   | **Page Hero**       | Sage-soft `#d0dcd8` | Terpusat: eyebrow _WE'RE HERE FOR YOU_, H1 **Contact Us**, paragraf sambutan 2 baris                          |
| 4   | **Contact Content** | Putih               | **2 kolom sama lebar.** Kiri: _Have Questions?_ + 4 kartu info (2×2) + peta. Kanan: _Get In Touch_ + formulir |
| 5   | Footer              | Navy `#1f3859`      | Sama dengan halaman lain                                                                                      |

**Rincian isi Blok 3 – Page Hero**

- Eyebrow: `WE'RE HERE FOR YOU`
- H1: `Contact Us`
- Paragraf: _Welcome to InBody Clinic. Our mission is to support women at every stage of life with expert, compassionate care. We'd be honoured to walk this journey with you._

**Rincian isi Blok 4 – kolom kiri (`.contact-info`)**

- Eyebrow `A CONVERSATION CAN BE A FIRST STEP` · H2 **Have Questions?**
- Paragraf: _Your Partner in Women's Health & Recovery. Reach out to our team and we'll help you find the right care for your needs._
- 4 kartu info (latar krem, ikon dalam lingkaran putih, judul serif):

| #   | Ikon Phosphor        | Judul           | Isi                                                 | Tindakan                           |
| --- | -------------------- | --------------- | --------------------------------------------------- | ---------------------------------- |
| 1   | `ph-phone`           | Call Us         | Emergency? Call us **+61 424 912 490**              | `tel:+61424912490`                 |
| 2   | `ph-envelope-simple` | Send Us Mail    | **Sailainsua@gmail.com**                            | `mailto:Sailainsua@gmail.com`      |
| 3   | `ph-map-pin`         | Find the Clinic | Level 1, 336 New South Head Rd, Double Bay NSW 2028 | tautan Google Maps (petunjuk arah) |
| 4   | `ph-clock`           | Clinic Hours    | Weekdays · 9:00 am – 7:00 pm                        | teks (tanpa tautan)                |

- Peta Google Maps (kartu lebar penuh kolom, sudut membulat, rasio ±2.8:1).

**Rincian isi Blok 4 – kolom kanan (`.contact-form-wrap`)**

- Eyebrow `WE'D LOVE TO HEAR FROM YOU` · H2 **Get In Touch**
- Paragraf: _Tell us a little about what you're looking for. Our caring team will be in touch to help you take the next step._
- Formulir: **Name** + **Email** (2 kolom sebaris) · **Subject** (lebar penuh) · **Message** (textarea) · tombol **SEND MESSAGE →**
- Placeholder: _Your name_ · *you@example.com* · _How can we help?_ · _Share a little about what you need..._

**Pemetaan terhadap sistem desain** (`css/tokens.css`, `components.css`)

| Elemen desain           | Token / komponen                                             |
| ----------------------- | ------------------------------------------------------------ |
| Latar hero              | `--color-sage-soft` (`#d0dcd8`)                              |
| Latar kartu info        | `--color-bg` (`#f7f6f2`)                                     |
| Judul & angka serif     | `--font-heading` (Cormorant Garamond)                        |
| Teks, label, input      | `--font-body` (Montserrat)                                   |
| Eyebrow                 | `.eyebrow.eyebrow-dark` (sudah ada)                          |
| Tombol _SEND MESSAGE →_ | `.btn.btn-sage` + `.btn-arrow` (sudah ada)                   |
| Sudut                   | kartu `--radius-sm` (6–8px), peta `--radius-md`, input `2px` |
| Bayangan hover          | `--shadow-subtle` / `--shadow-soft`                          |

### 14.1 Struktur Layout Profesional

**Wireframe desktop (≥ 993px)**

```
+--------------------------------------------------------------------------------+
| TOPBAR  (sage)                                                                 |
+--------------------------------------------------------------------------------+
| NAVBAR  [logo]      Home About Services▾ Clinic [Contact Us]  [BOOK ... →]     |
+--------------------------------------------------------------------------------+
|                             .contact-hero  (sage-soft)                         |
|                              WE'RE HERE FOR YOU                                |
|                                 Contact Us   <h1>                              |
|                   Welcome to InBody Clinic. Our mission is ...                 |
+--------------------------------------------------------------------------------+
|                        .contact-section  (white)    container 1200px           |
|  +---------------------------------+   gap 6rem  +-------------------------+   |
|  | area "info"                     |             | area "form" (span 2 row)|   |
|  |  A CONVERSATION CAN BE ...      |             |  WE'D LOVE TO HEAR ...  |   |
|  |  Have Questions?  <h2>          |             |  Get In Touch   <h2>    |   |
|  |  paragraf                       |             |  paragraf               |   |
|  |  +-----------+ +-----------+    |             |  Name        Email      |   |
|  |  | Call Us   | | Send Mail |    |             |  [_______]  [_______]   |   |
|  |  +-----------+ +-----------+    |             |  Subject                |   |
|  |  | Find Clinic| |Clinic Hrs |    |             |  [___________________]  |   |
|  |  +-----------+ +-----------+    |             |  Message                |   |
|  +---------------------------------+             |  [___________________]  |   |
|  | area "map"  (Google Maps)       |             |  [___________________]  |   |
|  |  [==========================]   |             |  (SEND MESSAGE  →)      |   |
|  +---------------------------------+             +-------------------------+   |
+--------------------------------------------------------------------------------+
| FOOTER (navy, 2 tingkat)                                                       |
+--------------------------------------------------------------------------------+
```

**Prinsip struktur layout**

| Prinsip                                     | Penerapan                                                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Grid 12-kolom virtual, `container` 1200px   | Konten 2 kolom setara: `grid-template-columns: 1fr 1fr; column-gap: 6rem`                                                                                       |
| Area grid bernama (urutan konten fleksibel) | `grid-template-areas: "info form" "map form"` – **form membentang 2 baris** sehingga tinggi kolom kanan menyesuaikan kiri                                       |
| Alignment baseline antar kolom              | Eyebrow, H2, dan paragraf kedua kolom **sejajar**; blok intro diberi `min-height` (`≥ 993px`) agar kartu info dan field _Name/Email_ mulai pada garis yang sama |
| Irama jarak (skala 8px)                     | Section `5rem 0 6rem`; eyebrow→H2 `1rem`; H2→paragraf `1.25rem`; paragraf→konten `2.25rem`; gap kartu `1rem`; gap field `1.5rem`                                |
| Hierarki visual                             | 1 `<h1>` (Contact Us) → 2 `<h2>` (Have Questions? / Get In Touch) → `<h3>` judul kartu                                                                          |
| Satu aksi utama                             | Hanya satu tombol utama sage (_Send Message_); kontak lain berupa tautan sekunder pada kartu                                                                    |
| Whitespace                                  | Tanpa pembungkus kotak pada form (latar putih bersih) agar tampil lega seperti desain                                                                           |

**Struktur HTML (semantik)**

```html
<main id="main-content">
  <section class="contact-hero" aria-labelledby="contact-hero-title">
    <div class="container"> eyebrow · <h1> · <p> </div>
  </section>

  <section class="contact-section" aria-label="Contact details and enquiry form">
    <div class="container contact-grid">
      <div class="contact-info">            <!-- area: info -->
        eyebrow · <h2> · <p>
        <ul class="contact-cards"> 4 × <li class="contact-card"> </ul>
      </div>

      <div class="contact-form-wrap">       <!-- area: form -->
        eyebrow · <h2> · <p>
        <form class="contact-form" id="contact-form" novalidate> ... </form>
      </div>

      <div class="contact-map">             <!-- area: map -->
        <iframe title="Map showing InBody Clinic in Double Bay" loading="lazy"> </iframe>
      </div>
    </div>
  </section>
</main>
```

### 14.2 Struktur File

```
inbody-clinic/
├── contact.html               ← BARU
├── css/contact.css            ← BARU (gaya khusus halaman Contact)
├── js/contact.js              ← BARU (validasi & kirim formulir)
├── index.html                 ← ubah tautan "Contact Us" (menu + footer)
├── about.html                 ← ubah tautan "Contact Us" (menu + footer)
└── js/main.js, nav.js         ← tidak berubah (dipakai ulang)
```

- `contact.html` memuat `tokens → base → components → sections → contact.css` dan dua skrip modul: `js/main.js` (nav, animasi) + `js/contact.js`.
- Topbar, Navbar (+ mega-menu), dan Footer disalin dari `about.html` (markup identik); _Contact Us_ ber-kelas `active` + `aria-current="page"`.
- SEO: `<title>` _Contact Us | InBody Clinic – Women's Health Physiotherapy, Double Bay Sydney_; meta description; Open Graph; JSON-LD `ContactPage` + `MedicalBusiness` (alamat lengkap, telepon, email, `openingHoursSpecification` Mo–Fr 09:00–19:00).

### 14.3 Blok 3 – Page Hero (`.contact-hero`)

| Properti | Spesifikasi                                                                    |
| -------- | ------------------------------------------------------------------------------ |
| Latar    | `--color-sage-soft`; padding `5rem 0 4.5rem`; teks rata tengah                 |
| Eyebrow  | `WE'RE HERE FOR YOU` – `.eyebrow.eyebrow-dark`, `.75rem`, spasi huruf `.22em`  |
| H1       | **Contact Us** – Cormorant Garamond 600, `clamp(2.8rem, 4.6vw, 4rem)`, navy    |
| Paragraf | `.95rem`, `line-height 1.7`, `max-width 560px`, `margin: 1.25rem auto 0`, navy |
| Animasi  | `data-animate` fade-up (yang sudah ada)                                        |

### 14.4 Blok 4 – Kolom Kiri (`.contact-info`)

| Elemen                  | Spesifikasi                                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow                 | `A CONVERSATION CAN BE A FIRST STEP` – `.eyebrow.eyebrow-dark`                                                                   |
| H2                      | **Have Questions?** – serif 600, `clamp(2.4rem, 3.6vw, 3.4rem)`, navy                                                            |
| Paragraf                | `.95rem`, `line-height 1.65`, `max-width 460px`                                                                                  |
| Grid kartu              | `.contact-cards`: `grid-template-columns: 1fr 1fr; gap: 1rem; list-style: none`                                                  |
| Kartu (`.contact-card`) | Latar `--color-bg`, `border-radius 6px`, padding `1.6rem 1.5rem`, tinggi seragam (`align-items: stretch`)                        |
| Ikon                    | Lingkaran putih 44px (`.contact-card-icon`), ikon Phosphor Light `1.2rem` navy, rata tengah                                      |
| Judul kartu             | Serif 600 `1.6rem` navy, `margin: 1.1rem 0 .5rem` (`<h3>`)                                                                       |
| Isi kartu               | Montserrat `.82rem`, navy 85%, `line-height 1.55`; nomor/email/alamat berupa tautan: hover → garis bawah sage + warna sage-hover |
| Hover kartu             | `translateY(-3px)` + `--shadow-subtle` (`--transition-normal`)                                                                   |

**Peta (`.contact-map`)**

- `<iframe>` Google Maps embed (pencarian: _InBody Clinic, Level 1, 336 New South Head Rd, Double Bay NSW 2028_), `title`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, `allowfullscreen`.
- Wadah: `border-radius: var(--radius-md)`, `overflow: hidden`, `box-shadow: var(--shadow-subtle)`, `aspect-ratio: 16 / 6` (min tinggi `220px`), `margin-top: 1rem`.
- Tautan kecil _Open in Google Maps ↗_ di pojok kanan bawah (kapsul putih, `ph-arrow-up-right`) sebagai cadangan bila embed gagal dimuat.

### 14.5 Blok 4 – Kolom Kanan (`.contact-form-wrap`)

| Elemen                  | Spesifikasi                                                                                                        |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Eyebrow / H2 / paragraf | `WE'D LOVE TO HEAR FROM YOU` · **Get In Touch** · gaya sama dengan kolom kiri                                      |
| Form                    | `display: grid; gap: 1.5rem`; baris 1: `grid-template-columns: 1fr 1fr; gap 1.25rem` (Name · Email)                |
| Label                   | Montserrat 600 `.82rem` navy, `margin-bottom .5rem`                                                                |
| Input / textarea        | Latar putih, `border: 1px solid #dcdcd8`, `border-radius 2px`, input tinggi `52px`, padding `0 1rem`, font `.9rem` |
| Placeholder             | Warna sage terang; **label tetap terlihat** (tidak mengandalkan placeholder)                                       |
| Textarea                | `min-height 150px`, `resize: vertical`, padding `1rem`                                                             |
| Fokus                   | `border-color: var(--color-sage)` + `box-shadow: 0 0 0 3px rgba(138,162,155,.25)`                                  |
| Error                   | `border-color: #b3475a`, pesan di bawah field (`.82rem`, ikon `ph-warning-circle`), `aria-invalid="true"`          |
| Tombol                  | `.btn.btn-sage.btn-arrow` – **SEND MESSAGE →** (`type="submit"`, `id="contact-submit-btn"`)                        |

**Daftar field**

| Field        | `id` / `name`                 | Tipe               | Wajib                 | `autocomplete`    |
| ------------ | ----------------------------- | ------------------ | --------------------- | ----------------- |
| Name         | `contact-name` / `name`       | `text`             | Ya                    | `name`            |
| Email        | `contact-email` / `email`     | `email`            | Ya (format valid)     | `email`           |
| Subject      | `contact-subject` / `subject` | `text`             | Ya                    | `off`             |
| Message      | `contact-message` / `message` | `textarea`         | Ya (min. 10 karakter) | `off`             |
| _(honeypot)_ | `website`                     | `text` tersembunyi | –                     | `off` (anti-spam) |

**Perilaku formulir (`js/contact.js`)**

1. `novalidate` + validasi sendiri saat `submit` dan `blur`; fokus dipindah ke field pertama yang salah.
2. Saat mengirim: tombol `disabled`, teks → _SENDING…_, ikon berputar.
3. Berhasil: formulir diganti panel konfirmasi (`role="status"`, `aria-live="polite"`, ikon `ph-check-circle`, teks _Thank you — we'll be in touch shortly._) + tombol _Send another message_.
4. Gagal: pesan galat umum di atas tombol (`role="alert"`) tanpa menghapus isi field.
5. Honeypot terisi → permintaan diabaikan diam-diam.

### 14.6 Navigasi

| Lokasi                                                         | Sekarang                          | Perubahan                                           |
| -------------------------------------------------------------- | --------------------------------- | --------------------------------------------------- |
| `index.html` – menu _Contact Us_                               | `#contact`                        | `contact.html`                                      |
| `index.html` – footer _Contact Us_                             | `#contact`                        | `contact.html`                                      |
| `about.html` – menu & footer _Contact Us_                      | `index.html#contact`              | `contact.html`                                      |
| `contact.html` – menu _Home / About / Our Clinic_              | –                                 | `index.html`, `about.html`, `index.html#difference` |
| `contact.html` – dropdown _Our Services_, footer _Our Service_ | –                                 | `index.html#services`                               |
| `contact.html` – menu & footer _Contact Us_                    | –                                 | `class="active"` + `aria-current="page"`            |
| Tombol _Book an Appointment_                                   | `#contact` / `index.html#contact` | **lihat poin diskusi 2**                            |

### 14.7 Responsif

| Lebar    | Perilaku                                                                                                                                                                                           |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≥ 1200px | Layout seperti desain (gap kolom `6rem`)                                                                                                                                                           |
| ≤ 1200px | `column-gap: 4rem`; kartu `padding 1.4rem 1.25rem`                                                                                                                                                 |
| ≤ 992px  | Grid → **1 kolom** dengan urutan `info → form → map` (`grid-template-areas: "info" "form" "map"`), sehingga formulir tampil sebelum peta; `min-height` intro dihapus; hero padding `4rem 0 3.5rem` |
| ≤ 768px  | Section `3.5rem 0 4rem`; H1 `2.6rem`, H2 `2.2rem`; peta `aspect-ratio 4 / 3`                                                                                                                       |
| ≤ 480px  | Kartu info → **1 kolom**; baris Name/Email → **1 kolom**; tombol _Send Message_ lebar penuh; input tinggi `50px` (target sentuh ≥ 44px)                                                            |

**Aksesibilitas & kualitas**

- Setiap input punya `<label for>`; pesan error dihubungkan via `aria-describedby`; ikon dekoratif `aria-hidden="true"`.
- Kontras: placeholder dipilih ≥ 3:1 dan tidak menggantikan label; teks isi memakai navy (kontras tinggi).
- `prefers-reduced-motion`: matikan animasi hover/entrance dan ikon berputar.
- Peta `loading="lazy"` agar tidak menghambat render awal; gambar/aset lain tidak ditambah.
- Satu `<h1>`, ID unik pada elemen interaktif (`contact-form`, `contact-name`, `contact-email`, `contact-subject`, `contact-message`, `contact-submit-btn`).

### 14.8 Urutan Eksekusi

1. Buat `contact.html`: salin Topbar/Navbar/Footer dari `about.html`, atur tautan & status aktif (14.6).
2. Bangun `.contact-hero` (14.3) + `css/contact.css` dasar.
3. Bangun grid `.contact-grid` + `.contact-info` + 4 kartu + peta (14.1, 14.4).
4. Bangun formulir `.contact-form` (14.5) dan `js/contact.js` (validasi, status kirim, honeypot).
5. Perbarui tautan _Contact Us_ di `index.html` & `about.html` (14.6).
6. Uji responsif (1536 / 1280 / 1024 / 768 / 390px), validasi form, keyboard, konsol; perbarui checklist.

**Checklist – Contact Us (14.1 – 14.8)**

- [ ] Buat `contact.html` (meta SEO, OG, JSON-LD, satu `<h1>`, ID unik pada elemen interaktif).
- [ ] Topbar, Navbar (+ mega-menu, menu mobile), Footer berfungsi; _Contact Us_ aktif.
- [ ] `.contact-hero`: eyebrow, H1, paragraf, latar sage-soft.
- [ ] Grid 2 kolom dengan area `info / form / map`; eyebrow, H2, paragraf kedua kolom sejajar.
- [ ] 4 kartu info (ikon, judul, isi, tautan `tel:` / `mailto:` / peta) berukuran sama.
- [ ] Peta Google Maps tampil, sudut membulat, tautan cadangan _Open in Google Maps_.
- [ ] Formulir 4 field + tombol; validasi, pesan error, status mengirim, panel sukses.
- [ ] Tautan _Contact Us_ di `index.html` dan `about.html` mengarah ke `contact.html`.
- [ ] Responsif 1200 / 992 / 768 / 480px; urutan mobile `info → form → map`; tidak ada teks menumpuk.
- [ ] Kontras & fokus keyboard memadai; konsol bersih; halaman lain tidak berubah selain tautan.

**Kriteria selesai Revisi 5**

- `contact.html` tampil sesuai gambar desain pada desktop dan tersusun rapi pada tablet & mobile.
- Layout 2 kolom seimbang: heading kedua kolom sejajar, kartu seragam, formulir lega.
- Formulir tervalidasi dan memberi umpan balik yang jelas; peta dan tautan kontak berfungsi.
- Gaya konsisten dengan Home & About; tidak ada error pada konsol.

**Poin diskusi (mohon konfirmasi sebelum eksekusi)**

1. **Pengiriman formulir**: situs ini statis (tanpa backend). Pilih: (a) layanan formulir pihak ketiga seperti Formspree / Web3Forms (**rekomendasi**; perlu endpoint/kunci dari Anda), (b) endpoint Node di `server.js` + SMTP, atau (c) sementara memakai _fallback_ `mailto:` ke `Sailainsua@gmail.com`. Tanpa jawaban, saya pakai (c) dengan atribut `data-endpoint` yang siap diisi nanti.
2. **Tombol _Book an Appointment_** (navbar): diarahkan ke `contact.html` (rekomendasi), atau tetap ke `index.html#contact`?
3. **Jam operasional**: desain hanya menulis _Weekdays 9:00 am – 7:00 pm_. Apakah Sabtu/Minggu tutup? Apakah perlu ditulis eksplisit?
4. **Peta**: pakai _embed_ interaktif Google Maps (rekomendasi, tajam & bisa digeser) atau gambar statis seperti pada desain (berisi tampilan kartu Google yang dapat usang)?
5. **Footer**: tetap footer 2 tingkat yang berlaku (rekomendasi) atau 3 kolom seperti pada gambar?
6. **Teks "Emergency? Call us"**: tetap sesuai desain, atau diubah (mis. _Call us_) karena klinik fisioterapi bukan layanan gawat darurat?
7. **Konsistensi kontak**: Topbar Home masih memakai `hello@inbodyclinic.com` / `+61 424 912 400` sedangkan About & Contact memakai `Sailainsua@gmail.com` / `+61 424 912 490`. Apakah Topbar **Home** disamakan (di luar lingkup rancangan ini kecuali Anda setuju)?
8. **Field Subject**: tetap input teks bebas seperti desain, atau diganti pilihan layanan (dropdown)?

---

## 15. Rencana Halaman Layanan: Clinical Cellulite Remodelling (Revisi 6)

> [!NOTE]
> Revisi 6 menambah **halaman baru `cellulite-remodelling.html`** (kategori _Body Contouring_ → _Clinical Cellulite Remodelling_ pada mega-menu) berdasarkan gambar desain. Halaman dibuat sebagai **templat halaman layanan** (kelas berawalan `svc-`, file `css/service.css`) agar 11 halaman layanan lain di mega-menu dapat memakai struktur yang sama tanpa menulis ulang CSS. Topbar, Navbar, dan Footer memakai komponen yang sama dengan halaman lain.

### 15.0 Analisis Gambar Desain

Gambar berukuran kecil (±407 px lebar); semua ukuran di bawah dikonversi ke skala `container` 1200 px (faktor ≈ 3.25). Halaman terdiri dari **7 blok**:

| #   | Blok                      | Latar                       | Isi singkat                                                                     | Tinggi desktop (±) |
| --- | ------------------------- | --------------------------- | ------------------------------------------------------------------------------- | ------------------ |
| 1   | Topbar                    | Sage                        | Sama dengan About/Contact                                                       | 40 px              |
| 2   | Navbar                    | Putih                       | **Our Services (aktif)**; tombol _Book an Appointment →_                        | 80 px              |
| 3   | **Hero layanan**          | Krem `#f7f6f2`              | Kiri: eyebrow, H1 4 baris, paragraf, tombol, 3 poin kecil. Kanan: foto          | ±620 px            |
| 4   | **Ideal If You Notice**   | Putih                       | Kiri: foto 2 terapis. Kanan: eyebrow, H2, paragraf, daftar bernomor 01–05       | ±715 px            |
| 5   | **Different Types…**      | Abu terang `#e8e8e6`        | Eyebrow, H2 2 baris, paragraf terpusat, 3 kartu putih                           | ±585 px            |
| 6   | **The Treatment & …**     | Putih                       | H2 2 baris terpusat, 2 kartu (Clinical Protocol · Treatment Approaches), kutipan | ±890 px            |
| 7   | **CTA band** + Footer     | Sage-soft `#d0dcd8` / Navy  | _Discuss your Body Contouring_ + tombol navy _Contact the Clinic →_             | ±175 px            |

### 15.1 Transkripsi Teks (persis seperti gambar)

> [!IMPORTANT]
> Teks berikut dibaca dari gambar beresolusi rendah. Item bertanda ⚠ kurang terbaca / tampak tidak konsisten dan **perlu konfirmasi** (lihat poin diskusi).

**Blok 3 – Hero**

| Elemen            | Teks                                                                                                                                                                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow           | `CLINICAL CELLULITE REMODELLING`                                                                                                                                                                                                    |
| H1 (4 baris)      | `Treatment for` / `Cellulite, Fluid` / `Retention &` _`Tissue`_ / _`Congestion`_ (kata _Tissue Congestion_ sage miring)                                                                                                            |
| Label kecil       | `INBODY CLINIC · BODY CONTOURING`                                                                                                                                                                                                   |
| Paragraf (4 baris)| _Cellulite is rarely just fat. It is often associated with poor circulation, lymphatic stagnation, and connective tissue fibrosis. When fluids accumulate and connective tissue becomes rigid, the skin may develop visible dimpling and uneven texture_ |
| Tombol            | `LEARN MORE →` (sage)                                                                                                                                                                                                               |
| 3 poin kecil ⚠    | ikon + teks 2 baris: (1) ⚠ _Care is rarely…_ (2) _Clinically guided care_ (3) _Gently considered approach_ — teks pertama tidak terbaca                                                                                             |

**Blok 4 – Ideal If You Notice**

| Elemen   | Teks                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow  | `TARGETED INDICATIONS`                                                                                                                    |
| H2       | `Ideal If` _`You Notice`_                                                                                                                 |
| Paragraf | _Cellulite is rarely just fat. It is often associated with poor circulation, lymphatic stagnation, and connective tissue fibrosis_       |
| Daftar   | `01` Visible cellulite · `02` Swollen or heavy legs · `03` Fluid retention · `04` Uneven skin texture · `05` ⚠ stubborn areas (huruf kecil di gambar → ditulis _Stubborn areas_) |

**Blok 5 – Different Types of Cellulite We Address**

| Elemen   | Teks                                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow  | `ADAPTED PROTOCOLS`                                                                                                               |
| H2       | `Different Types of` / _`Cellulite We Address`_ (baris 2 sage miring)                                                             |
| Paragraf | _The protocol is adapted to address different types of cellulite, working on the entire tissue environment to progressively remodel the skin._ |
| Kartu 1  | `01` · _Edematous Cellulite_ · ⚠ _Never intended to be painful, ensuring maximum comfort during your recovery._                   |
| Kartu 2  | `02` · _Fibrous Cellulite_ · ⚠ _Carefully adjusted to your specific surgery, individual needs, and healing stage._                |
| Kartu 3  | `03` · _Hormonal Cellulite_ · ⚠ _Safely supports tissue recovery while respecting your surgical structures._                      |

**Blok 6 – The Treatment & What to Expect**

| Elemen         | Teks                                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H2             | `The Treatment &` / _`What to Expect`_                                                                                                                                      |
| Kartu kiri     | Judul _Clinical Protocol_ · sub _The treatment combines:_ · `01` Clinical lymphatic drainage · `02` Connective tissue massage · `03` INDIBA radiofrequency to stimulate circulation and collagen · `04` ⚠ Targeted botanical formulations from CELInetic International |
| Kartu kanan    | Judul _Treatment Approaches_ · sub _Treatment Outcome & Focus_ · **Headline:** Restoring Tissue Health · ⚠ **Deskripsi:** This treatment works on the entire tissue environment, improving circulation and reducing congestion to progressively remodel the skin. · ⚠ **Hasil:** Over time, tissues feel lighter, smoother, and less congested. |
| Kutipan        | _"The treatment is gentle, rhythmic, and highly specific, allowing the nervous system to regulate while circulation improves."_                                              |

**Blok 7 – CTA band**

| Elemen   | Teks                                                                                          |
| -------- | --------------------------------------------------------------------------------------------- |
| H2       | `Discuss your` _`Body Contouring`_ (kata kedua sage miring)                                   |
| Paragraf | _Ask how our clinical therapies can support circulation, skin elasticity, and natural body renewal._ |
| Tombol   | `Contact the Clinic →` (kapsul **navy**, teks putih, tanpa huruf kapital)                     |

### 15.2 Struktur Layout & Wireframe (desktop ≥ 993px)

```
+--------------------------------------------------------------------------------+
| TOPBAR / NAVBAR  (Our Services ▾ = aktif)                                      |
+--------------------------------------------------------------------------------+
| .svc-hero  (krem)                                                              |
|  CLINICAL CELLULITE REMODELLING             +-----------------------------+    |
|  Treatment for                              |                             |    |
|  Cellulite, Fluid                           |   FOTO TORSO (glow merah)   |    |
|  Retention & Tissue                         |   rasio ±5:4, sudut bulat   |    |
|  Congestion                                 |                             |    |
|  INBODY CLINIC · BODY CONTOURING            +-----------------------------+    |
|  paragraf (4 baris)                                                            |
|  (LEARN MORE →)                                                                |
|  ♡ teks   ✧ teks   ◌ teks                                                      |
+--------------------------------------------------------------------------------+
| .svc-indications  (putih)                                                      |
|  +-------------------+  gap 4.5rem   TARGETED INDICATIONS                      |
|  |                   |               Ideal If You Notice                       |
|  |  FOTO 2 TERAPIS   |               paragraf                                  |
|  |  rasio ±9:10      |               ───────────────────────────               |
|  |                   |               01  Visible cellulite                     |
|  |                   |               02  Swollen or heavy legs   ...           |
|  +-------------------+               05  Stubborn areas                        |
+--------------------------------------------------------------------------------+
| .svc-types  (abu #e8e8e6)               ADAPTED PROTOCOLS                      |
|                   Different Types of / Cellulite We Address                    |
|                          paragraf terpusat (2 baris)                           |
|   +-----------------+   +-----------------+   +-----------------+              |
|   | 01              |   | 02              |   | 03              |              |
|   | Edematous       |   | Fibrous         |   | Hormonal        |              |
|   | Cellulite       |   | Cellulite       |   | Cellulite       |              |
|   | deskripsi       |   | deskripsi       |   | deskripsi       |              |
|   +-----------------+   +-----------------+   +-----------------+              |
+--------------------------------------------------------------------------------+
| .svc-treatment (putih)           The Treatment & / What to Expect              |
|   +---------------------------+  gap 3.5rem  +----------------------------+    |
|   | Clinical Protocol         |              | Treatment Approaches       |    |
|   | The treatment combines:   |              | Treatment Outcome & Focus  |    |
|   | [01  Clinical lymphatic ] |              |  ◉ Headline: ...           |    |
|   | [02  Connective tissue  ] |              |  ∿ Deskripsi: ...          |    |
|   | [03  INDIBA ...         ] |              |  ☰ Hasil: ...              |    |
|   | [04  Targeted botanical ] |              |                            |    |
|   +---------------------------+              +----------------------------+    |
|        “The treatment is gentle, rhythmic, and highly specific, ...”           |
+--------------------------------------------------------------------------------+
| .svc-cta (sage-soft)  Discuss your Body Contouring          (Contact the Clinic →) |
|                       Ask how our clinical therapies ...                       |
+--------------------------------------------------------------------------------+
| FOOTER (2 tingkat, sama dengan halaman lain)                                   |
+--------------------------------------------------------------------------------+
```

**Prinsip struktur**

| Prinsip                  | Penerapan                                                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Container & grid         | `container` 1200px; tiap blok memakai grid sendiri; padding vertikal section `5rem 0` (hero `4rem 0 4.5rem`)      |
| Ritme warna latar        | krem → putih → abu → putih → sage-soft → navy (selang-seling agar blok mudah dibedakan)                           |
| Hierarki heading         | 1 `<h1>` (hero) → `<h2>` per blok (4 buah) → `<h3>` judul kartu                                                  |
| Pola judul 2 warna       | Kelas `.svc-title` + `.accent` (sage, miring) – dipakai pada H1 & semua H2, konsisten dengan Home/About           |
| Semantik daftar          | Daftar indikasi = `<ol>`; kartu tipe = `<ul>`; baris protokol = `<ol>`                                           |
| Templat dapat dipakai ulang | Semua kelas `svc-*`; isi per layanan hanya mengganti teks/gambar                                              |

### 15.3 Struktur File

```
inbody-clinic/
├── cellulite-remodelling.html          ← BARU
├── css/service.css                     ← BARU (templat gaya halaman layanan, awalan svc-)
├── assets/images/cellulite-hero.jpg    ← BARU (foto torso, lihat poin diskusi 1)
├── assets/images/cellulite-consult.jpg ← BARU (foto 2 terapis, lihat poin diskusi 1)
├── index.html / about.html / contact.html ← ubah tautan mega-menu "Clinical Cellulite Remodelling"
└── js/main.js, nav.js                  ← tidak berubah (dipakai ulang)
```

- `cellulite-remodelling.html` memuat `tokens → base → components → sections → service.css` dan `js/main.js` (animasi `data-animate`, menu).
- Topbar/Navbar/Footer disalin dari `contact.html`. Menu **Our Services** diberi kelas `active` (tombol dropdown) dan tautan *Clinical Cellulite Remodelling* di mega-menu diberi `aria-current="page"`.
- SEO: `<title>` _Clinical Cellulite Remodelling Sydney | Cellulite & Fluid Retention Treatment – InBody Clinic Double Bay_; meta description (±155 karakter); Open Graph; JSON-LD `Service` (`serviceType` _Cellulite remodelling_, `provider` InBody Clinic, `areaServed` Double Bay, Sydney).

### 15.4 Blok 3 – Hero Layanan (`.svc-hero`)

**Layout**: `container`, grid 2 kolom `1.05fr 1fr`, `gap 3.5rem`, `align-items: center`, latar `--color-bg`, padding `4rem 0 4.5rem`.

| Elemen            | Spesifikasi (agar hasil sama dengan gambar)                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow           | `.eyebrow.eyebrow-dark`, `.72rem`, spasi huruf `.22em`, `margin-bottom 1.25rem`                                                                                  |
| H1                | Cormorant Garamond 600, `clamp(2.6rem, 4vw, 3.2rem)` (≈ 3rem), `line-height 1.15`, navy; **pemenggalan baris tetap 4 baris** dengan `<br>` setelah _Treatment for_, _Cellulite, Fluid_, dan _Retention & Tissue_ (`<br>` disembunyikan ≤ 768px agar mengalir wajar); _Tissue Congestion_ = `<em class="accent">` |
| Label kecil       | `INBODY CLINIC · BODY CONTOURING`, Montserrat 500 `.66rem`, spasi huruf `.14em`, navy 70%, `margin: 1.5rem 0 .5rem`                                              |
| Paragraf          | `.9rem`, `line-height 1.65`, `max-width 540px` (membentuk 4 baris), navy                                                                                          |
| Tombol            | `.btn.btn-sage.btn-arrow` – **LEARN MORE →** (`href="#treatment"`), `margin-top 1.75rem`                                                                          |
| 3 poin kecil      | `<ul class="svc-hero-points">`, flex 3 kolom `gap 1.5rem`, `margin-top 1.75rem`; tiap item: ikon Phosphor Light `1.1rem` sage (`ph-heart`, `ph-seal-check`, `ph-hand-heart`) + teks `.66rem` 2 baris navy 80%, `line-height 1.35` |
| Foto (`.svc-hero-media`) | `cellulite-hero.jpg`, `aspect-ratio 5 / 4`, `object-fit cover`, `object-position center 30%`, `border-radius var(--radius-lg)`, `box-shadow var(--shadow-soft)`; `width/height` eksplisit, `fetchpriority="high"`; `alt="Close-up of a woman's abdomen with a soft red glow highlighting the area of tissue congestion"` |

### 15.5 Blok 4 – Ideal If You Notice (`.svc-indications`)

**Layout**: latar putih, `container`, grid 2 kolom `0.9fr 1fr`, `gap 4.5rem`, `align-items: center`, padding `5rem 0`.

| Elemen   | Spesifikasi                                                                                                                                                      |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Foto     | `cellulite-consult.jpg`, `aspect-ratio 9 / 10` (≈ 520×575), `object-fit cover`, `border-radius var(--radius-sm)` (8px), `box-shadow var(--shadow-subtle)`; `alt="Two clinicians in navy scrubs reviewing a treatment plan together"` |
| Eyebrow  | `TARGETED INDICATIONS` – `.eyebrow` warna sage (bukan navy), `.7rem`                                                                                             |
| H2       | **Ideal If** _You Notice_ – serif 600 `clamp(2.3rem, 3.6vw, 2.9rem)`, `.accent` pada _You Notice_                                                                |
| Paragraf | `.88rem`, `line-height 1.65`, `max-width 460px`, `margin 1rem 0 1.75rem`                                                                                          |
| Daftar   | `<ol class="svc-list">`: tiap `<li>` flex, `gap 1.5rem`, `padding .95rem 0`, `border-bottom 1px solid #d9d9d6` (baris pertama juga `border-top`); nomor `01–05` Montserrat 500 `.75rem` sage-deep, lebar tetap `2rem`; label `.92rem` navy |
| Hover    | baris: label → sage-hover, garis bawah sage (`--transition-fast`) — hanya efek halus, tanpa pergeseran tata letak                                                 |

### 15.6 Blok 5 – Different Types of Cellulite We Address (`.svc-types`)

**Layout**: latar `#e8e8e6`, padding `5rem 0 5.5rem`, rata tengah.

| Elemen   | Spesifikasi                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Eyebrow  | `ADAPTED PROTOCOLS` – sage, `.7rem`, spasi huruf `.22em`                                                                                          |
| H2       | Baris 1 navy **Different Types of**, baris 2 sage miring _Cellulite We Address_ (`<br>`); serif 600 `clamp(2.4rem, 4vw, 3.2rem)`, `line-height 1.12` |
| Paragraf | `.85rem`, warna `--color-sage-deep`, `max-width 520px`, `margin: 1.25rem auto 2.75rem`, 2 baris                                                    |
| Grid     | `.svc-types-grid`: `grid-template-columns: repeat(3, 1fr)`, `gap 1.75rem`, `list-style none`, kartu **setinggi sama** (`align-items: stretch`)     |
| Kartu    | Latar putih, `border-radius 4px`, `padding 2.25rem 1.75rem`, `box-shadow var(--shadow-subtle)`, rata tengah                                       |
| Isi kartu| Nomor `01–03` Montserrat 500 `.9rem` sage-deep → judul (`<h3>`) serif **miring** 600 `1.6rem` navy, `margin .6rem 0 .75rem` → deskripsi `.78rem`, `line-height 1.6`, sage-deep |
| Hover    | `translateY(-4px)` + `--shadow-soft` (`--transition-normal`)                                                                                      |

### 15.7 Blok 6 – The Treatment & What to Expect (`.svc-treatment`)

**Layout**: latar putih, `id="treatment"`, padding `5rem 0 4rem`.

| Elemen        | Spesifikasi                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H2            | **The Treatment &** / _What to Expect_ – terpusat, 2 baris, serif 600 `clamp(2.4rem, 4vw, 3.2rem)`, `margin-bottom 3rem`                                                    |
| Grid          | `.svc-treatment-grid`: `grid-template-columns: 1.1fr 1fr`, `gap 3.5rem`, `align-items: stretch`                                                                              |
| Kartu (`.svc-panel`) | Latar putih, `border: 1px solid #ececea`, `border-radius 8px`, `box-shadow var(--shadow-soft)`, padding `2.25rem 2rem 2.5rem`                                         |
| Judul kartu   | Serif **miring** 600 `1.9rem` navy, terpusat; sub-judul serif miring `.95rem` sage-deep, terpusat, `margin-bottom 1.5rem`                                                    |
| Kiri – baris protokol | `<ol class="svc-steps">`, `gap .7rem`; tiap `<li>`: latar `#e8e8e6`, `border-radius 3px`, `min-height 3.6rem`, padding `.8rem 1.15rem`, flex `align-items center gap 1.1rem`; nomor serif miring 600 `1.35rem` navy (lebar `2rem`); teks `.82rem` navy |
| Kanan – butir hasil | `<ul class="svc-outcomes">`, `gap 1.6rem`; tiap `<li>` flex `gap 1rem`: lingkaran ikon 30px (`background rgba(138,162,155,.18)`, ikon Phosphor Light `1rem` sage-deep: `ph-seal-check`, `ph-pulse`, `ph-list-checks`) + teks `.82rem` `line-height 1.6`; label (**Headline:**, **Deskripsi:**, **Hasil:**) = `<strong>` navy |
| Kutipan       | `<blockquote class="svc-quote">`: terpusat, Montserrat 400 `.85rem`, navy 85%, `max-width 760px`, `margin: 2.75rem auto 0`; tanda kutip lurus `" "` seperti gambar                  |

### 15.8 Blok 7 – CTA Band (`.svc-cta`)

**Layout**: latar `--color-sage-soft`, padding `3rem 0`, `container` flex `justify-content: space-between; align-items: center; gap 2rem`.

| Elemen   | Spesifikasi                                                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| H2       | **Discuss your** _Body Contouring_ – serif 600 `clamp(1.9rem, 3vw, 2.4rem)`, `.accent` pada _Body Contouring_                                     |
| Paragraf | `.82rem`, navy, `max-width 460px`, `margin-top .5rem`                                                                                              |
| Tombol   | Kelas baru `.btn-navy` (di `service.css`): latar `--color-navy`, teks putih, `font-weight 500`, `.85rem`, `text-transform: none`, `letter-spacing .02em`, padding `.95rem 2rem`, `border-radius pill`; hover → `--color-navy-hover` + `translateY(-2px)`; isi _Contact the Clinic_ + `ph-arrow-right`; `href="contact.html"` |

### 15.9 Palet & Token Tambahan

| Token (lokal di `service.css`)                | Nilai       | Dipakai pada                                              |
| --------------------------------------------- | ----------- | --------------------------------------------------------- |
| `--svc-gray`                                  | `#e8e8e6`   | Latar blok 5 & baris protokol (setara `--color-border`)   |
| `--svc-line`                                  | `#d9d9d6`   | Garis pemisah daftar indikasi                             |
| `--color-sage-deep`                           | `#5f7a73`   | Teks kecil sage (kontras ≈ 4.9:1 di atas putih) — sedikit lebih tua dari sage gambar agar lolos WCAG AA |

Warna lain memakai token yang ada (`--color-bg`, `--color-sage`, `--color-sage-soft`, `--color-navy`, `--color-navy-hover`, `--shadow-subtle`, `--shadow-soft`, `--radius-*`).

### 15.10 Navigasi

| Lokasi                                                         | Sekarang    | Perubahan                                                            |
| -------------------------------------------------------------- | ----------- | -------------------------------------------------------------------- |
| `index.html` / `about.html` / `contact.html` – mega-menu _Clinical Cellulite Remodelling_ | `#services` / `index.html#services` | `cellulite-remodelling.html` (hanya item ini; item lain tidak diubah) |
| `cellulite-remodelling.html` – menu Home / About / Our Clinic / Contact Us | – | `index.html`, `about.html`, `index.html#difference`, `contact.html` |
| `cellulite-remodelling.html` – item mega-menu lain, footer _Our Service_ | – | `index.html#services`                                                |
| `cellulite-remodelling.html` – tombol _Book an Appointment_    | –           | `contact.html#contact-form`                                          |
| Hero _Learn More_ → `#treatment`; CTA _Contact the Clinic_ → `contact.html` | – | seperti tabel                                                        |

### 15.11 Responsif

| Lebar    | Perilaku                                                                                                                                                                                  |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ≥ 1200px | Layout seperti gambar                                                                                                                                                                     |
| ≤ 1200px | Gap kolom hero `3rem`, indikasi `3.5rem`; grid treatment `gap 2.5rem`                                                                                                                      |
| ≤ 992px  | Hero → 1 kolom (teks lalu foto `aspect-ratio 4/3`); Indikasi → 1 kolom (**foto di atas teks**, `aspect-ratio 4/3`); Treatment → 1 kolom (Clinical Protocol lalu Treatment Approaches); Types tetap 3 kolom dengan padding kartu `1.75rem 1.25rem`; CTA tetap sebaris |
| ≤ 768px  | Section `3.5rem 0`; H1 `2.5rem` (`<br>` dinonaktifkan); Types → **1 kolom** (maks. lebar 480px, terpusat); CTA → kolom (teks di atas, tombol di bawah, rata kiri)                           |
| ≤ 480px  | 3 poin hero → vertikal; kartu `.svc-panel` padding `1.75rem 1.25rem`; baris protokol `min-height 3.2rem`; tombol _Learn More_ & _Contact the Clinic_ lebar penuh                           |

**Aksesibilitas & kualitas**: satu `<h1>`; `<ol>` untuk daftar bernomor; ikon dekoratif `aria-hidden="true"`; `alt` deskriptif pada 2 foto; `prefers-reduced-motion` mematikan hover/entrance; fokus keyboard terlihat; gambar bawah-lipatan `loading="lazy"`; ID unik pada elemen interaktif (`svc-learn-more-btn`, `svc-contact-btn`).

### 15.12 Urutan Eksekusi

1. Siapkan aset `cellulite-hero.jpg` & `cellulite-consult.jpg` (kompres, < 150 KB masing-masing).
2. Buat `cellulite-remodelling.html`: salin Topbar/Navbar/Footer dari `contact.html`, atur tautan & status aktif (15.10).
3. Buat `css/service.css`: token lokal + `.btn-navy` + blok 3 (15.4).
4. Bangun blok 4 (15.5) dan blok 5 (15.6).
5. Bangun blok 6 (15.7) dan blok 7 (15.8).
6. Perbarui tautan mega-menu pada `index.html`, `about.html`, `contact.html` (15.10).
7. **Cocokkan dengan gambar** (checklist kesesuaian di bawah) pada lebar 1440 px, lalu uji responsif (1536 / 1280 / 1024 / 768 / 390px), keyboard, konsol.

**Checklist kesesuaian visual terhadap gambar (wajib lulus)**
- [x] H1 tampil **4 baris**: _Treatment for / Cellulite, Fluid / Retention & Tissue / Congestion_, dengan _Tissue Congestion_ sage miring.
- [x] Hero: label kecil, paragraf 4 baris, tombol sage, dan 3 poin ikon berada **di kolom kiri**, foto torso di kolom kanan.
- [x] Foto 2 terapis berada di **kiri**, teks di **kanan**; daftar 01–05 dengan garis tipis pemisah.
- [x] Blok abu: judul 2 baris (baris 2 sage miring), paragraf terpusat 2 baris, **3 kartu putih sama tinggi** dengan judul miring.
- [x] _The Treatment & What to Expect_: 2 kartu berdampingan; kiri 4 baris abu bernomor, kanan 3 butir berikon; kutipan terpusat di bawahnya.
- [x] CTA band sage-soft: judul + paragraf di kiri, tombol **navy** di kanan; footer navy di bawahnya.
- [x] Urutan warna latar: krem → putih → abu → putih → sage-soft → navy.

**Checklist – Halaman Layanan (15.1 – 15.12)**
- [x] Aset 2 foto siap dan terkompres.
- [x] `cellulite-remodelling.html` (meta SEO, OG, JSON-LD, satu `<h1>`, ID unik).
- [x] Topbar/Navbar/Footer berfungsi; _Our Services_ aktif; mega-menu menandai halaman ini.
- [x] Blok 3–7 selesai sesuai spesifikasi dan lulus checklist kesesuaian visual.
- [x] Tautan mega-menu _Clinical Cellulite Remodelling_ di 3 halaman lain mengarah ke halaman baru.
- [x] Responsif 1200 / 992 / 768 / 480px; tidak ada teks menumpuk atau terpotong.
- [x] Kontras & fokus keyboard memadai; konsol bersih; halaman lain tidak berubah selain tautan mega-menu.

**Kriteria selesai Revisi 6**
- Halaman tampil **sesuai gambar desain** pada desktop (urutan blok, pemenggalan judul, komposisi kolom, warna latar) dan rapi pada tablet & mobile.
- Gaya konsisten dengan Home/About/Contact; `service.css` dapat dipakai ulang sebagai templat layanan.
- Navigasi berfungsi; tidak ada error pada konsol.

**Poin diskusi (mohon konfirmasi sebelum eksekusi)**
1. **Aset foto**: foto pada gambar hanya ±160–200 px lebar sehingga **tidak bisa di-crop** (akan buram). Mohon sediakan 2 file asli (min. 1000 px lebar): foto torso dengan glow merah dan foto 2 terapis. Bila ada di `D:\Documents\assets`, sebutkan nama berkas.
2. **Teks bertanda ⚠**: (a) 3 poin kecil di hero tidak terbaca (poin 1) — mohon teks asli; (b) deskripsi 3 kartu tipe selulit tampak **tersalin dari halaman pasca-operasi** (_"…your specific surgery…"_, _"…your surgical structures"_) dan tidak relevan untuk selulit — pakai persis seperti gambar atau Anda beri teks baru?; (c) label **Deskripsi** / **Hasil** berbahasa Indonesia sedangkan **Headline** berbahasa Inggris — pakai apa adanya atau diseragamkan menjadi _Headline / Description / Result_ (rekomendasi)?; (d) nama **CELInetic International** — ejaan sudah benar?; (e) _stubborn areas_ ditulis huruf kecil di gambar — boleh dikapitalisasi?
3. **Footer**: gambar menampilkan footer 3 kolom lama; rancangan ini tetap memakai **footer 2 tingkat** agar konsisten dengan halaman lain. Setuju?
4. **Warna teks sage kecil**: gambar memakai sage terang (kontras rendah). Rancangan memakai `#5f7a73` (sedikit lebih tua) agar terbaca. Setuju, atau harus persis seperti gambar?
5. **Nama berkas halaman**: `cellulite-remodelling.html` (rekomendasi) atau nama lain?
6. **Cakupan templat**: apakah 11 halaman layanan lain (mega-menu) akan dibuat menyusul dengan templat yang sama? Sementara itu tautannya tetap ke `#services`.
7. **Tombol _Learn More_** pada hero: scroll ke blok _Treatment_ (`#treatment`, rekomendasi) atau ke halaman/blok lain?

