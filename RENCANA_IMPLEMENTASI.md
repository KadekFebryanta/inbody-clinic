# Rencana Implementasi Landing Page – InBody Clinic

Dokumen ini adalah rencana implementasi desain layout *landing page* **InBody Clinic** (klinik kesehatan wanita & limfatik, Double Bay, Sydney) menggunakan **HTML, CSS (Vanilla), dan JavaScript**, dengan dukungan library eksternal ringan.

---

## 1. Ringkasan Desain

Halaman satu-halaman (*single page*) dengan nuansa **elegan, tenang, dan medis-premium**.

| Aspek | Observasi dari layout |
|---|---|
| Palet warna | 6 warna dari gambar palet: off-white hangat, putih, navy, sage, sage muda, abu muda (lihat Bagian 5) |
| Tipografi | Heading serif elegan (mirip *Cormorant Garamond*), body sans-serif bersih (mirip *Montserrat*) |
| Gaya | Banyak whitespace, ikon *line-art* tipis, tombol pill (rounded penuh), foto lifestyle lembut |
| Aksen | Heading memakai dua warna (navy + sage italic) untuk kata kunci, mis. *Expert Care.* dan *your journey.* |

---

## 2. Struktur Section (dari atas ke bawah)

1. **Top Bar** – info kontak (lokasi, email, telepon), background sage.
2. **Navbar** – logo kiri; menu: Home, About, Our Services (dropdown), Our Clinic, Contact Us; tombol CTA "BOOK AN APPOINTMENT".
3. **Hero** – kiri: eyebrow text, H1 3 baris ("Women's Health. Lymphatic Health. *Expert Care.*"), deskripsi, tombol CTA, 3 ikon nilai (Evidence-Based Care, Personalised Treatment, A Holistic Approach). Kanan: foto besar terapis dengan mesin, tepi kiri foto memudar (*gradient mask*).
4. **Our Services** – eyebrow, heading dua warna, grid 3×2 kartu layanan (ikon dalam lingkaran sage, judul, deskripsi, tombol panah bulat):
   - Lymphatic Health
   - Lipedema Care
   - Post-Operative Recovery
   - Pregnancy & Postpartum
   - Skin Health & Body Contouring
   - Women's Health Physiotherapy
5. **The InBody Difference** – dua kolom: kiri foto bahu wanita dengan overlay teks ("More than a treatment. *A healthier you.*" + RESET • REBUILD • RECONNECT); kanan panel abu-hijau dengan heading "Specialised care. Real results." + 3 poin berikon (Specialised Expertise, Personalised Care, Evidence-Based Treatment).
6. **Testimonial** – background foto interior (vas tanaman, memudar di kiri), kutipan serif italic dengan tanda kutip besar, label "– OUR PATIENT", dot pagination (slider).
7. **CTA Banner** – foto pemandangan teluk/marina Sydney, teks kanan "Your health journey *starts here.*" + tombol "BOOK AN APPOINTMENT".
8. **Footer** – background navy; logo, menu (Home, About, Our Service, Our Clinic, Contact Us), ikon sosial (Facebook, TikTok, Email, WhatsApp, Instagram), tagline "Double Bay | Sydney – A healthier you, for what's next", copyright.

---

## 3. Tech Stack & Library

| Kebutuhan | Pilihan |
|---|---|
| Struktur | HTML5 semantik (`header`, `nav`, `main`, `section`, `footer`) |
| Styling | Vanilla CSS + CSS Variables (design tokens), Flexbox & Grid |
| Font | Google Fonts: **Cormorant Garamond** (heading), **Montserrat** (body) |
| Ikon | **Lucide** / **Phosphor Icons** (line-art tipis) atau SVG inline kustom; ikon sosial via **Font Awesome** / Simple Icons |
| Slider testimonial | **Swiper.js** (CDN) – atau JS native bila ingin tanpa dependensi |
| Animasi scroll | **AOS (Animate On Scroll)** atau `IntersectionObserver` native |
| Build tool | Tidak wajib (static site). Opsional: Vite untuk dev server |

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
│   └── nav.js            # menu mobile & dropdown
├── assets/
│   ├── images/           # hero, difference, testimonial, cta (WebP)
│   ├── icons/            # SVG ikon layanan
│   └── logo/             # logo header & footer
└── RENCANA_IMPLEMENTASI.md
```

---

## 5. Design Tokens (CSS Variables)

Palet mengikuti gambar referensi warna (6 warna):

| Token | Hex | Fungsi utama | Peran visual |
|---|---|---|---|
| `--color-bg` | `#F7F6F2` | Main background | Warm, feminine, editorial |
| `--color-surface` | `#FFFFFF` | Content/background | Clean, clinical, spacious |
| `--color-navy` | `#1F3859` | Heading, text, footer | Authority, sophistication, readability |
| `--color-sage` | `#8AA29B` | CTA, accent | Calm, wellness, premium |
| `--color-sage-soft` | `#D0DCD8` | Soft background/accent | Gentle transition, visual relief |
| `--color-border` | `#E8E8E6` | Border/divider | Structure tanpa terlihat berat |

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
> Gambar palet tidak mencantumkan kode hex, jadi nilai di atas diperkirakan dari tampilan warnanya. Jika ada file desain asli (Figma), ambil hex pastinya dengan *color picker*. `--color-sage-hover` adalah turunan (sage sedikit lebih gelap) dan bukan bagian dari 6 warna palet.

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
- [x] Kumpulkan/siapkan aset: logo, foto hero, foto "difference", foto testimonial, foto marina, ikon layanan. (Jika belum ada, buat dengan *image generation* atau ganti dengan foto stok berlisensi.)
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
- ~~Inisialisasi slider testimonial (fade/slide, autoplay, pagination dot kustom).~~ *(dibatalkan – desain tidak memiliki slider)*
- ~~Siapkan minimal 3 testimoni (data statis di HTML atau array JS).~~ *(diganti: 1 testimoni statis)*

### Fase 8 – CTA Banner & Footer
> [!WARNING]
> **Hanya bagian CTA Banner yang direvisi** (Bagian 10.4). Footer tidak diubah.
- [x] Banner foto marina dengan teks kanan & tombol.
- [x] Footer navy: grid logo | menu | sosial | tagline; garis pemisah vertikal.

### Fase 9 – Interaktivitas & Polish
- [x] Animasi fade-up saat scroll (AOS/IntersectionObserver).
- [x] Hover micro-interaction pada tombol, kartu, dan ikon.
- [x] Smooth scroll untuk anchor link; *sticky header* dengan perubahan bayangan saat scroll.

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

| Fase | Estimasi |
|---|---|
| Persiapan & aset | 2–3 jam |
| Fondasi CSS & komponen | 2 jam |
| Header + Hero | 3 jam |
| Services + Difference | 3 jam |
| Testimonial + CTA + Footer | 3 jam |
| Interaksi & animasi | 2 jam |
| Responsif, A11y, SEO | 3 jam |
| QA & deploy | 2 jam |
| **Total** | **± 20 jam** |

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

| # | Implementasi sekarang | Desain asli |
|---|---|---|
| 1 | Section dibungkus `.container` (lebar maks 1200px) dan kartu ber-*border-radius* + *shadow* | Section **full-bleed** (selebar layar), **tanpa** sudut membulat & bayangan |
| 2 | Ada *padding* vertikal besar (4.5–6.5rem) antar section sehingga terlihat "terpisah-pisah" | Section **menempel** satu sama lain, tinggi ditentukan oleh foto/konten |
| 3 | Foto sebagai kartu terpisah di samping teks | Foto menjadi **latar/sisi penuh** section; tepi foto **memudar (fade)** ke warna background |
| 4 | Overlay gelap + teks putih (Difference) | **Tanpa overlay gelap**; teks navy di atas area terang foto |
| 5 | Eyebrow berwarna sage | Eyebrow berwarna **navy/gelap** (kecuali bila ditentukan lain) |

### 10.0.1 Penggantian Aset

Gambar baru dari pengguna menggantikan aset sebelumnya. **Nama file target dipertahankan** sehingga `src` di `index.html` tidak perlu diubah.

| Gambar baru (isi) | Dimensi asli | Ganti file | Dipakai di |
|---|---|---|---|
| Teluk dengan perahu layar (siang cerah) | 1024×341 (±3:1) | `assets/images/cta.jpg` | CTA Banner |
| Terapis berblazer pinstripe + mesin klinik | 1024×670 (±3:2) | `assets/images/hero.jpg` | Hero |
| Vas kaca + ranting hijau, meja marmer putih | 1024×341 (±3:1) | `assets/images/testimonial.jpg` | Testimonial |
| Foto hitam-putih bahu wanita berkain putih | 1024×735 (±1.4:1) | `assets/images/difference.jpg` | The InBody Difference |

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

| Aspek | Sekarang | Perbaikan |
|---|---|---|
| Wrapper foto | Kartu ber-radius + shadow di dalam `.container` | Foto **absolut/full-bleed**: menempel ke tepi **kanan** layar dan menempati **tinggi penuh** hero (dari bawah navbar sampai bawah hero). Hapus `border-radius` & `box-shadow` |
| Lebar foto | Kolom 0.95fr (±45%) | Lebar ±**56–58%** layar, dirapatkan ke kanan; teks di kolom kiri (maks ±46%), `z-index` teks di atas foto |
| Fade tepi kiri | `mask-image` 0–18% | `mask-image: linear-gradient(to right, transparent 0%, #000 25%)` + tambahan *overlay* `linear-gradient(90deg, var(--color-bg) 0%, transparent 30%)` agar menyatu mulus dengan background hero |
| Crop foto | `height: 640px`, `object-fit: cover` | `object-fit: cover; object-position: 75% center;` supaya terapis + mesin tetap terlihat di bidang ±1:1 (gambar asli landscape 3:2) |
| Tinggi hero | Ditentukan padding | `min-height: clamp(560px, 56vw, 820px)`, `padding` vertikal dipindah ke kolom teks, konten teks di-*center* vertikal |
| Eyebrow | Warna sage | Warna navy (`.eyebrow-dark`) |
| 3 ikon nilai | Ada garis pemisah `border-top`, `flex: 1` (melebar) | **Hapus garis pemisah**; susun satu baris, rata kiri, `gap: 2.5–3rem`, lebar sesuai konten; ikon di atas, label kecil di bawah |
| Container teks | `.container` 1200px | Padding kiri disejajarkan dengan logo navbar (gunakan `.container-wide`/padding ±5vw) |

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

| Aspek | Sekarang | Perbaikan |
|---|---|---|
| Wrapper | Kartu ber-radius + shadow dalam `.container`, `padding: 5rem 0` | **Full-bleed**, tanpa radius/shadow/padding; `display:grid; grid-template-columns: 40% 60%`; `min-height ±480px` |
| Overlay foto | Gradient navy gelap + teks putih | **Hapus overlay gelap & opacity**. Foto B/W tampil apa adanya; area kiri foto sudah terang sehingga teks **navy** terbaca |
| Crop foto | Default center | `object-fit: cover; object-position: 70% center;` agar bahu tetap di sisi kanan sel & area kosong di kiri untuk teks |
| Teks overlay | Putih, kiri-atas, `justify-content: space-between` | Heading navy (serif, ±2.6rem): *More / than a / treatment.* lalu *A healthier you.* **sage italic**; padding kiri ±3rem, posisi vertikal tengah-atas |
| Tagline | Satu baris putih | **Tiga baris bertumpuk** (RESTORE. / REBALANCE. / RECONNECT.), uppercase, letter-spacing lebar, navy, didahului **garis pendek sage (±40px)** |
| Panel kanan | `padding 4rem 3.5rem`, rata tengah vertikal | Warna `--color-sage-soft`, `padding ±3.5rem 4rem 3.5rem 3.5rem`, konten tengah vertikal |
| 3 poin | **Daftar vertikal**, ikon dalam lingkaran putih, judul serif | **3 kolom horizontal** (`grid-template-columns: repeat(3,1fr)`, `gap ±1.5rem`); ikon *line-art* **tanpa lingkaran** di atas; judul **sans-serif tebal kecil (±0.85rem)**; deskripsi ±0.78rem |
| Heading & paragraf | `.section-title` 2.8rem | Heading ±2.4rem, paragraf ±0.88rem, lebar teks dibatasi agar tidak terlalu panjang |

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

| Aspek | Sekarang | Perbaikan |
|---|---|---|
| Slider | Ada autoplay, 3 testimoni, dot pagination (`slider.js`) | **Hapus slider**: tampilkan **1 testimoni statis** (teks asli desain) |
| Wrapper | Kartu ber-radius dalam `.container`, `padding 6.5rem 0` | **Full-bleed**, tanpa radius/shadow; `min-height ±400–420px`; background putih |
| Foto | Memenuhi seluruh kartu | Foto diposisikan **di sisi kanan** (±70–75% lebar), `object-fit: cover`, dengan **fade putih di tepi kiri** (`mask-image` atau gradient putih 0→30%) sehingga menyatu dengan area teks |
| Teks | Kolom ±650px, di tengah kartu | Kolom kiri maks ±40–45% lebar layar; padding kiri **sejajar dengan Hero** (±5vw); konten tengah vertikal |
| Tanda kutip | Satu karakter besar terpisah di atas teks | **Tanda kutip inline**: `“` di awal & `”` di akhir kalimat, warna navy/sage, ukuran sedikit lebih besar dari teks (serif) |
| Kutipan | 2.2rem italic | ±1.9–2rem serif italic, `line-height 1.35`, lebar maks ±520px (±3 baris) |
| Label penulis | `<cite>` uppercase | Format **"– OUR PATIENT"** uppercase, letter-spacing lebar, navy |
| Dot pagination | Ada dan fungsional | **Dihapus** (lihat Poin Diskusi #2) |
| Eyebrow | Navy kecil | Tetap: "REAL WOMEN, REAL STORIES." |

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

| Aspek | Sekarang | Perbaikan |
|---|---|---|
| Wrapper | Kartu ber-radius + shadow, `padding 4.5rem 0`, dua kolom (gambar & teks terpisah) | **Full-bleed**, tanpa radius/shadow/padding; `min-height ±300px` |
| Foto | Kolom kiri 1.2fr dengan mask kanan | Foto jadi **latar seluruh section** (`object-fit: cover; object-position: center 65%` agar air + perahu terlihat; bagian langit dipotong) |
| Fade ke putih | `mask-image` pada gambar | Overlay `linear-gradient(90deg, transparent 0%, transparent 45%, rgba(255,255,255,.85) 62%, #fff 75%)` sehingga sisi kanan putih bersih untuk teks |
| Blok teks | Kolom kanan 0.8fr, background putih solid | Diposisikan di **sisi kanan** (lebar ±34–36%, `padding-right ±5vw`), rata kiri, tengah vertikal, tanpa background solid |
| Heading | `.section-title` 2.8rem | ±2.2–2.4rem; baris 2 *starts here.* sage italic |
| Paragraf | 0.95rem | ±0.85rem, lebar maks ±360px |
| Eyebrow | Sage | Navy ("TAKE THE NEXT STEP") |
| Tombol | Sage pill + panah | Tidak berubah |

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
3. **Foto Hero**: gambar baru berformat landscape, sedangkan area foto di desain mendekati persegi. Di-*crop* ke arah terapis + mesin (kanan). Apakah posisi crop ini sesuai?
4. **Tinggi section**: nilai tinggi (Hero ±820px, Difference ±480px, Testimonial ±410px, CTA ±300px) diperkirakan dari proporsi gambar desain; akan disetel ulang setelah dilihat langsung di browser.

---

## 11. Rencana Perbaikan Tampilan (Revisi 2)

> [!NOTE]
> Revisi 2 mencakup **4 pekerjaan**: (11.1) slider pada Hero, (11.2) penggantian seluruh ikon ke **Phosphor Icons**, (11.3) dropdown "Our Services" bergaya *mega-menu*, dan (11.4) perapian layout Footer. Di luar itu (Topbar, Services, Difference, Testimonial, CTA Banner) **tidak diubah**, kecuali penggantian ikon pada 11.2.

### 11.0 Ringkasan Perubahan

| # | Area | Kondisi sekarang | Target |
|---|---|---|---|
| 1 | Hero | 1 slide statis (terapis + mesin) | **3 slide** (slider), slide 1 = tampilan yang sudah ada, slide 2 & 3 = desain baru |
| 2 | Ikon | SVG inline kustom (stroke Lucide-style) + SVG di `assets/icons/` | Seluruh ikon halaman Home memakai **Phosphor Icons** |
| 3 | Dropdown Our Services | Dropdown kecil 1 kolom (6 tautan) | **Panel lebar 4 kolom** (judul serif + daftar tautan bergaris pemisah), sudut membulat |
| 4 | Footer | Grid 3 kolom, ikon sosial dalam lingkaran, tagline rata kanan | Layout rapi seperti desain footer: logo + copyright (kiri), menu + ikon sosial (tengah), tagline (kanan) dipisah garis vertikal; ikon sosial **tanpa lingkaran** |

---

### 11.1 Hero Slider (3 Slide)

**Aset baru** – nama file mengikuti pola `hero.jpg` (slide 1 sudah ada dan tidak diubah):

| Slide | Isi gambar | File | Status |
|---|---|---|---|
| 1 | Terapis berblazer pinstripe + mesin (*Women's Health. Lymphatic Health. Expert Care.*) | `assets/images/hero.jpg` | **Sudah terimplementasi** – dipertahankan |
| 2 | Dua terapis berseragam navy melihat tablet (*Move Better. Feel Lighter. Live Better.*) | `assets/images/hero-2.jpg` | Baru |
| 3 | Terapis tersenyum di depan rak produk (*Care Designed Around You.*) | `assets/images/hero-3.jpg` | Baru |

> [!IMPORTANT]
> Gambar referensi slide 2 & 3 adalah **desain lengkap (teks + foto)**. Teks, tombol, dan ikon dibuat ulang dengan HTML/CSS; yang dipakai sebagai aset hanya **fotonya** (di-*crop* tanpa teks). Bila file foto asli tanpa teks tersedia, gunakan itu agar hasilnya tajam.

**Layout per slide (desktop ≥ 992px)**

| Aspek | Slide 1 (ada) | Slide 2 (baru) | Slide 3 (baru) |
|---|---|---|---|
| Posisi teks | Kiri | **Kanan** | **Atas** (kiri) |
| Posisi foto | Kanan, fade di tepi kiri | **Kiri**, fade di tepi **kanan** (`to left`) | **Bawah**, lebar penuh, fade di tepi **atas** (`to bottom`) |
| Eyebrow | SCIENCE. EXPERIENCE. A HEALTHIER YOU. | SPECIALISED LYMPHATIC CARE | WOMEN'S HEALTH & WELLBEING |
| Heading | Women's Health. / Lymphatic Health. / *Expert Care.* | Move Better. / Feel Lighter. / *Live Better.* | Care Designed *Around You.* (1 baris, "Around You." sage) |
| Deskripsi | Personalised, evidence-based care to help you feel stronger, lighter, and more like you at every stage of life. | Specialised lymphatic care designed to support circulation, reduce swelling, and help your body feel its best. | Personalised treatment and expert guidance to support your health, confidence, and wellbeing through every stage of life. |
| 3 nilai | Baris horizontal, ikon di atas label, di bawah tombol | Sama (di kanan), sebaran lebih lebar | **Daftar vertikal** di kolom kanan atas, ikon di kiri label |
| Tombol | BOOK AN APPOINTMENT → | Sama | Sama |

**Struktur markup (disarankan)**
```html
<section class="section-hero" id="hero" aria-roledescription="carousel" aria-label="Welcome to InBody Clinic">
  <div class="hero-slides">
    <article class="hero-slide is-active hero-slide--text-left"  aria-roledescription="slide" aria-label="1 of 3">…</article>
    <article class="hero-slide hero-slide--text-right"           aria-roledescription="slide" aria-label="2 of 3">…</article>
    <article class="hero-slide hero-slide--text-top"             aria-roledescription="slide" aria-label="3 of 3">…</article>
  </div>
  <div class="hero-controls">  <!-- dot pagination + panah prev/next -->
    <button class="hero-arrow hero-prev" aria-label="Previous slide"></button>
    <div class="hero-dots" role="tablist"></div>
    <button class="hero-arrow hero-next" aria-label="Next slide"></button>
  </div>
</section>
```
- Hanya **satu `<h1>`** di halaman: slide aktif memakai `<h1>`; slide lain memakai `<h2 class="hero-title">` (atau semua `<p class="hero-title">` + `<h1>` sr-only) agar hierarki heading tetap benar.

**Perilaku slider**
- Transisi **fade** (opacity + sedikit *translate*) 600–800 ms; slide aktif `position: relative`, lainnya `position: absolute; inset: 0; opacity: 0; pointer-events: none`.
- **Autoplay** 6 detik; berhenti saat *hover*/fokus, dan saat `prefers-reduced-motion: reduce`.
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
- [ ] Siapkan & optimalkan `hero-2.jpg` dan `hero-3.jpg` (crop tanpa teks).
- [ ] Ubah markup hero menjadi 3 slide; slide 1 tidak berubah tampilan.
- [ ] Tulis CSS layout per slide (kiri / kanan / atas) + fade sesuai arah.
- [ ] Implementasi `js/hero-slider.js` (fade, autoplay, dot, panah, keyboard, swipe, reduced-motion).
- [ ] Pastikan hanya ada satu `<h1>` dan atribut ARIA carousel benar.
- [ ] Uji pada 1536, 1280, 1024, 768, 390px.

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

| Lokasi | Sekarang | Phosphor (usulan) |
|---|---|---|
| Topbar – lokasi | SVG pin | `ph-map-pin` |
| Topbar – email | SVG amplop | `ph-envelope-simple` |
| Topbar – telepon | SVG telepon | `ph-phone` |
| Navbar – panah dropdown | chevron SVG | `ph-caret-down` |
| Tombol CTA – panah | SVG panah | `ph-arrow-right` |
| Hero – Evidence-Based Care | daun | `ph-leaf` |
| Hero – Personalised Treatment | hati | `ph-heart` |
| Hero – A Holistic Approach | orang | `ph-users-three` (sesuai desain: 3 orang) |
| Services – Lymphatic Health | `lymphatic-health.svg` | `ph-drop` |
| Services – Lipedema Care | `lipedema-care.svg` | `ph-person-simple` |
| Services – Post-Operative Recovery | `post-op-recovery.svg` | `ph-first-aid-kit` |
| Services – Pregnancy & Postpartum | `pregnancy-postpartum.svg` | `ph-baby` |
| Services – Skin Health & Body Contouring | `skin-contouring.svg` | `ph-sparkle` |
| Services – Women's Health Physiotherapy | `womens-physio.svg` | `ph-heartbeat` |
| Services – tombol panah kartu | SVG panah | `ph-arrow-right` |
| Difference – Specialised Expertise | topi wisuda | `ph-graduation-cap` |
| Difference – Personalised Care | 2 orang | `ph-users` |
| Difference – Evidence-Based Treatment | perisai centang | `ph-shield-check` |
| Footer – Facebook / TikTok / Email / WhatsApp / Instagram | SVG kustom | `ph-facebook-logo` / `ph-tiktok-logo` / `ph-envelope-simple` / `ph-whatsapp-logo` / `ph-instagram-logo` (varian **fill**, lihat 11.4) |
| Mobile toggle | 3 garis CSS | (tetap CSS, atau `ph-list` / `ph-x`) |

> [!NOTE]
> Nama ikon di atas adalah usulan terdekat dengan desain; dapat disesuaikan setelah dilihat di browser. Logo (`assets/logo/logo.png`) **bukan ikon** dan tidak diganti.

**Checklist**
- [ ] Pasang stylesheet Phosphor (CDN) dan `preconnect`.
- [ ] Ganti semua `<svg>` inline di `index.html` dengan elemen `<i class="ph-light …">` sesuai tabel.
- [ ] Ganti `<img src="assets/icons/*.svg">` pada kartu Services; hapus file SVG lama yang tidak terpakai.
- [ ] Sesuaikan CSS ukuran/warna ikon (`.icon-circle i`, `.hero-value-icon i`, `.arrow-btn i`, dll.); hapus aturan `svg` yang tidak terpakai.
- [ ] Tambahkan `aria-hidden="true"` pada ikon dekoratif; `aria-label` pada tombol ikon.
- [ ] Verifikasi tidak ada ikon kotak kosong (font gagal dimuat) dan konsol bersih.

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

| Aspek | Sekarang | Perbaikan |
|---|---|---|
| Bentuk panel | Dropdown 260px, 1 kolom | **Panel lebar** (±960px, `max-width: calc(100vw - 4rem)`), tengah terhadap navbar, **4 kolom** (`grid-template-columns: repeat(4, 1fr)`), `gap ±2rem` |
| Kotak | `border-radius` kecil | Latar putih, `border: 1px solid var(--color-border)`, **radius ±24px**, `padding ±2.2rem 2.4rem`, bayangan lembut |
| Judul kolom | – | Serif (Cormorant Garamond) ±1.5rem, navy, **semibold**; 2 baris bila panjang |
| Daftar tautan | 6 tautan datar | Tautan sans-serif ±0.82rem navy, tiap item dipisah **garis tipis** (`border-top: 1px solid var(--color-border)`), `padding .8rem 0`; hover → warna sage + garis bawah tipis |
| Isi menu | Lymphatic Health, Lipedema Care, dst. | Sesuai desain (lihat tabel isi) |
| Pemicu | `:hover` | `:hover` **dan** `:focus-within` + tombol toggle (`aria-expanded`) untuk keyboard; tutup dengan `Esc`/klik luar |
| Animasi | translateY + fade | fade + translateY 8px, 200 ms; tanpa "celah hover" antara tautan dan panel (gunakan `padding-top` jembatan/`::before`) |

**Isi menu (sesuai gambar desain)**

| Kolom | Item |
|---|---|
| **Pregnancy & Postpartum** | Pregnancy Massage & Circulation Support · Recovery & Core Restoration · Postnatal Lymphatic Drainage |
| **Lymphatic Drainage** | Post-Surgical Recovery · Clinical Lymphatic Drainage Sydney · Lipedema & Inflammatory Leg Care |
| **Pain & TMJ Relief** | TMJ, Jaw & Headache Treatment · Chronic Pain, Stress & Inflammation · Endometriosis & Pelvic Pain Support · Endometriosis & Pelvic Pain Support *(item ke-4 duplikat di desain – lihat Poin Diskusi 11.5 #2)* |
| **Body Contouring** | Clinical Cellulite Remodelling · Lymphatic Reset & Fluid Retention Treatment · Hormonal Skin Tightening & Firmness Treatment |

**Responsif**
- ≤ 992px: panel 2 kolom.
- ≤ 768px (menu hamburger): panel menjadi **accordion** – judul kolom jadi tombol yang membuka/menutup daftar; tanpa bayangan/border, `padding-left 1rem`.

**Perubahan file**
- `index.html`: ganti isi `.dropdown-menu` dengan 4 `.mega-col` (`<h3>` + `<ul>`/`<a>`); tambah `aria-expanded` pada pemicu.
- `css/sections.css`: tulis ulang `.dropdown-menu`, `.dropdown-link`; tambah `.mega-menu`, `.mega-col`, `.mega-title`, `.mega-link`.
- `js/nav.js`: tambah toggle keyboard (`Esc`, `aria-expanded`) & accordion mobile.

**Checklist**
- [ ] Bangun markup mega-menu 4 kolom dengan isi sesuai desain.
- [ ] Styling panel (radius, border, garis pemisah, tipografi serif/sans).
- [ ] Posisi panel tengah & tidak keluar viewport (1280–1536px).
- [ ] Aksesibilitas keyboard (`focus-within`, `Esc`, `aria-expanded`).
- [ ] Versi mobile accordion.

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

| Aspek | Sekarang | Perbaikan |
|---|---|---|
| Grid | 3 kolom + baris `.footer-bottom` terpisah di bawah garis | **1 baris, 3 kolom**: `grid-template-columns: auto 1fr auto`, rata atas (`align-items: start`), `padding ±2.5rem 0`; tanpa garis horizontal pemisah |
| Kolom kiri | Logo saja | **Logo + teks copyright** di bawah logo ("©2026 InBody Clinic, All Right Reserved." – huruf kecil ±0.7rem, putih 80%) |
| `.footer-bottom` | Copyright kiri + deskripsi kanan | **Dihapus** (copyright pindah ke kolom kiri; deskripsi kanan dihilangkan agar sama dengan desain) |
| Menu | Rata tengah, `gap 2rem` | Satu baris, **rata kiri di kolom tengah**, `gap ±2.5–3rem`, ±0.85rem putih |
| Ikon sosial | Dalam lingkaran semi-transparan 32px | **Tanpa lingkaran**, ikon putih ±22px, `gap ±1rem`, di **bawah menu** (rata kiri sejajar menu); hover → warna sage |
| Ikon | SVG kustom | **Phosphor**: `ph-facebook-logo`, `ph-tiktok-logo`, `ph-envelope-simple`, `ph-whatsapp-logo`, `ph-instagram-logo` (varian **fill** untuk logo merek; **regular/bold** untuk amplop) — urutan sama dengan desain |
| Kolom kanan | Rata kanan, `border-left` | Pemisah **garis vertikal putih tipis** (±1px, tinggi sesuai blok), teks **rata kiri**: baris 1 `DOUBLE BAY \| SYDNEY` (uppercase, letter-spacing lebar, ±0.7rem), baris 2 `A HEALTHIER YOU, FOR WHAT'S NEXT` (uppercase, sans-serif kecil, **bukan italic serif**) |
| Latar | Navy | Tetap navy (`--color-navy`) |
| Logo | `filter: brightness(0) invert(1)` | Tetap putih; tinggi ±48–56px |

**Responsif**
- ≤ 992px: grid 1 kolom, semua rata kiri; urutan: logo → menu → sosial → tagline → copyright; garis vertikal jadi garis horizontal tipis di atas tagline.
- ≤ 768px: menu **wrap** 2–3 baris, ikon sosial tetap satu baris.

**Perubahan file**
- `index.html`: susun ulang `<footer>` (logo+copyright | nav+sosial | tagline); hapus `.footer-bottom`; ganti SVG sosial dengan ikon Phosphor.
- `css/sections.css`: tulis ulang `.footer`, `.footer-top`, `.footer-brand`, `.footer-nav`, `.footer-menu`, `.footer-socials`, `.footer-social-link`, `.footer-tagline-col`, `.footer-city`, `.footer-motto`; hapus `.footer-bottom`.

**Checklist**
- [ ] Susun ulang markup footer sesuai tata letak target.
- [ ] Rapikan CSS grid, jarak, dan tipografi footer.
- [ ] Ganti ikon sosial ke Phosphor (tanpa lingkaran).
- [ ] Pindahkan copyright ke bawah logo; hapus `.footer-bottom`.
- [ ] Uji responsif (1536 / 1280 / 1024 / 768 / 390px).

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
1. **Aset slide 2 & 3**: gambar yang dikirim berisi teks desain. Apakah tersedia foto aslinya (tanpa teks)? Bila tidak, foto akan di-*crop* dari gambar tersebut (kualitas bisa sedikit lebih rendah).
2. **Dropdown – item duplikat**: pada kolom *Pain & TMJ Relief* desain, "Endometriosis & Pelvic Pain Support" muncul dua kali. Apakah ini disengaja, atau item ke-4 diganti layanan lain?
3. **Tautan dropdown**: seluruh item sementara menuju `#services` (belum ada halaman layanan). Apakah ada URL tujuan masing-masing?
4. **Kontrol slider**: apakah panah kiri/kanan ditampilkan, atau cukup dot pagination (desain tidak menampilkan kontrol)?
5. **Kecepatan autoplay** 6 detik – sesuai, atau ingin lebih lambat/cepat?
6. **Teks footer**: desain menulis "All Right Reserved" (tanpa "s"); mengikuti desain atau dikoreksi menjadi "All Rights Reserved"? Teks deskripsi di kanan bawah footer lama dihapus – setuju?
