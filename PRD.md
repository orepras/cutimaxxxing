# Product Requirements Document (PRD): Cutimaxxxing

## 📋 Ringkasan Produk

Cutimaxxxing adalah aplikasi web yang membantu karyawan Indonesia memaksimalkan hari libur dengan strategi cuti yang efisien. Aplikasi ini menganalisis hari libur nasional dan weekend untuk memberikan rekomendasi kapan sebaiknya mengambil cuti untuk mendapatkan periode libur yang lebih panjang.

## 🎯 Tujuan Produk

1. Membantu karyawan Indonesia merencanakan cuti mereka dengan lebih efisien
2. Memaksimalkan waktu libur dengan jumlah hari cuti yang terbatas
3. Menyederhanakan proses pengajuan cuti dengan template surat yang siap pakai
4. Memberikan visualisasi kalender libur nasional untuk perencanaan yang lebih baik

## 👥 User Personas

### 1. Karyawan Perusahaan
- **Profil**: Karyawan full-time dengan jatah cuti terbatas (12-14 hari per tahun)
- **Kebutuhan**: Ingin memaksimalkan waktu liburan dengan cuti yang terbatas
- **Frustrasi**: Sulit merencanakan cuti yang efisien tanpa melihat pola hari libur nasional

### 2. Manager Tim
- **Profil**: Manager atau tim leader yang mengelola jadwal cuti anggota tim
- **Kebutuhan**: Membantu tim mendapatkan istirahat yang optimal
- **Frustrasi**: Kesulitan mengkoordinasikan cuti tim agar tidak tumpang tindih

### 3. HR Professional
- **Profil**: Profesional HR yang mengelola kebijakan cuti perusahaan
- **Kebutuhan**: Alat untuk membantu karyawan merencanakan cuti dengan lebih baik
- **Frustrasi**: Banyak karyawan yang tidak menggunakan jatah cuti mereka secara optimal

## 🔍 Fitur dan Pertimbangan

### 1. Kalender Libur Nasional

**Deskripsi**: Visualisasi hari libur nasional dan weekend dalam format kalender.

**Pertimbangan**:
- Menggunakan data libur nasional resmi dari pemerintah Indonesia dan Bank Indonesia (BI)
- Menandai libur nasional dan libur keagamaan untuk konteks yang lebih jelas
- Menampilkan informasi tiap hari libur yang tersedia
- Menggunakan warna berbeda untuk weekend dan hari libur nasional untuk kemudahan identifikasi
- Mendukung tampilan untuk tahun 2024 dan 2025 (meskipun 2024 udah lewat, tidak apa-apa lah ya)

**Implementasi**:
- Komponen kalender interaktif dengan kemampuan navigasi bulan
- Tooltip untuk menampilkan detail hari libur
- Daftar libur nasional di bawah kalender untuk quick references
- Filter berdasarkan tahun (2024, 2025)

### 2. Kalkulator Optimalisasi Cuti

**Deskripsi**: Kalkulasi yang menganalisis pola hari libur dan memberikan rekomendasi strategi cuti terbaik.

**Pertimbangan**:
- Fokus pada efisiensi (jumlah hari libur dibagi jumlah hari cuti)
- Mempertimbangkan berbagai pola hari libur yang kadang agak nanggung (hari Kamis, Selasa, dll.)
- Memberikan rekomendasi untuk liburan panjang (9+ hari) dan long weekend (3-4 hari)
- Memungkinkan filter berdasarkan kuartal untuk perencanaan yang lebih spesifik, mengikuti quarter planning perusahaan
- Mendukung input jumlah hari cuti yang tersedia

**Implementasi**:
- Form input untuk jumlah hari cuti, kuartal, dan tahun
- Kalkulasi yang menghitung kombinasi cuti optimal
- Tampilan rekomendasi dengan detail strategi, tanggal, dan efisiensi
- Highlight untuk strategi "Super Long Vacation" dengan background khusus, agar terlihat sedikit lebih 'spesial'

### 3. Template Surat Pengajuan Cuti

**Deskripsi**: Generator template surat pengajuan cuti dengan berbagai gaya penulisan.

**Pertimbangan**:
- Menyediakan berbagai gaya penulisan untuk kebutuhan berbeda (formal, conversational, semi-formal, krama inggil)
- Memastikan format surat sesuai dengan standar umum
- Memungkinkan kustomisasi data pribadi dan detail cuti
- Menyediakan opsi untuk menyalin ke clipboard atau mengunduh sebagai PDF

**Implementasi**:
- Form input untuk data pribadi dan detail cuti
- Pemilihan gaya penulisan melalui dropdown
- Preview template surat secara real-time
- Fungsi untuk menyalin ke clipboard
- Fungsi untuk mengunduh sebagai PDF menggunakan jsPDF

### 4. UI/UX

**Deskripsi**: Antarmuka pengguna yang intuitif dan responsif.

**Pertimbangan**:
- Desain yang bersih dan modern dengan fokus pada kemudahan penggunaan
- Responsif untuk berbagai ukuran layar (mobile, tablet, desktop)
- Konsistensi visual dalam penggunaan warna, tipografi, dan komponen
- Navigasi yang jelas antara berbagai fitur
- Feedback visual untuk interaksi pengguna

**Implementasi**:
- Layout responsif menggunakan Tailwind CSS
- Komponen UI dari Shadcn UI untuk konsistensi, reusability juga
- Sistem tab untuk navigasi antar fitur utama
- Hero section yang menarik dengan call-to-action yang jelas

### 5. Konten Informatif

**Deskripsi**: Konten yang memberikan informasi tentang pentingnya cuti dan cara mengoptimalkannya.

**Pertimbangan**:
- Menyediakan informasi tentang manfaat mengambil cuti
- Menjelaskan cara kerja aplikasi
- Menjawab pertanyaan umum tentang penggunaan aplikasi
- Memberikan informasi tentang pembuat aplikasi, saya (Prasaja), hehe

**Implementasi**:
- Halaman "Tentang" dengan informasi tentang aplikasi dan pembuatnya
- Halaman FAQ dengan jawaban untuk pertanyaan umum
- Section "Mengapa Cuti Itu Penting?" dengan penjelasan manfaat cuti
- Section "Cutimaxxxing untuk Semua" yang menjelaskan manfaat untuk berbagai pengguna

## 🛠️ Spesifikasi Teknis

### Frontend
- **Framework**: Next.js dengan App Router
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Komponen UI**: Shadcn UI
- **Form Handling**: React Hook Form dengan Zod validation
- **PDF Generation**: jsPDF

### Deployment
- **Hosting**: Vercel
- **Domain**: cutimaxxxing.vercel.app

### Data
- **Hari Libur**: Data statis dalam format JSON
- **State Management**: React useState dan useContext untuk state lokal

## 📈 Metrik Keberhasilan

1. **Engagement**: Jumlah pengguna yang menggunakan kalkulator cuti
2. **Retention**: Jumlah pengguna yang kembali menggunakan aplikasi
3. **Conversion**: Jumlah pengguna yang mengunduh template surat cuti
4. **Satisfaction**: Feedback pengguna melalui form kontak

## 🗓️ Roadmap Pengembangan

### Fase 1: MVP (Current)
- Kalender Libur Nasional
- Kalkulator Optimalisasi Cuti
- Template Surat Pengajuan Cuti
- Halaman Tentang dan FAQ

### Fase 2: Peningkatan Fitur
- Dukungan untuk sistem kerja 6 hari
- Dukungan untuk sistem shift
- Integrasi dengan kalender Google/Outlook
- Notifikasi pengingat cuti

### Fase 3: Ekspansi
- Dukungan multi-bahasa
- Versi mobile (PWA)
- Akun pengguna untuk menyimpan preferensi
- Dashboard untuk perusahaan(?)

## 🔄 Proses Update

- **Data Hari Libur**: Update tahunan berdasarkan keputusan pemerintah
- **Fitur Baru**: Berdasarkan feedback pengguna dan prioritas roadmap
- **Bug Fixes**: Segera setelah ditemukan dan diverifikasi

## 📝 Kesimpulan

Cutimaxxxing dirancang untuk menyediakan solusi untuk perencanaan cuti yang lebih baik.

## 📊 Analisis Kompetitor

### Kompetitor Langsung
- **Kalender Libur**
   - **Kelebihan**: Data libur yang lengkap
   - **Kekurangan**: Tidak ada fitur rekomendasi cuti
   - **Diferensiasi Kita**: Kombinasi kalender dengan kalkulasi rekomendasi cuti

### Kompetitor Tidak Langsung
- **Aplikasi HR**
   - **Kelebihan**: Terintegrasi dengan sistem perusahaan
   - **Kekurangan**: Tidak fokus pada optimalisasi cuti
   - **Diferensiasi Kita**: Fokus khusus pada optimalisasi cuti dengan kalkukasi yang terekomendasi

## 🔍 Analisis SWOT

### Strengths (Kekuatan)
- Kalkulasi optimalisasi cuti yang lumayan oke lah
- Template surat cuti dengan berbagai gaya bahasa
- Tampilan yang intuitif dan modern
- Fokus khusus pada kebutuhan karyawan Indonesia

### Weaknesses (Kelemahan)
- Ketergantungan pada data libur nasional yang akurat
- Belum ada integrasi dengan sistem kalender atau HR
- Belum ada fitur personalisasi untuk pengguna

### Opportunities (Peluang)
- Ekspansi ke negara lain dengan penyesuaian data libur
- Kerjasama dengan perusahaan untuk integrasi dengan sistem HR
- Pengembangan fitur premium untuk personalisasi lebih lanjut

### Threats (Ancaman)
- Perubahan kebijakan libur nasional yang mendadak
- Kompetitor dengan fitur serupa
- Ketergantungan pada browser dan perangkat pengguna untuk PDF generation

## 🔮 Visi Jangka Panjang

Dalam jangka panjang, Cutimaxxxing bertujuan untuk menjadi platform yang bisa saja mengelola waktu istirahat karyawan, dengan fitur-fitur seperti:

1. **Personalisasi Lengkap**: Rekomendasi cuti berdasarkan preferensi dan riwayat pengguna
2. **Integrasi Sistem**: Terintegrasi dengan sistem HR dan kalender perusahaan
3. **Analitik Lanjutan**: Analisis pola cuti dan dampaknya terhadap produktivitas
4. **Komunitas**: Platform untuk berbagi tips dan pengalaman liburan optimal

Dengan visi ini, Cutimaxxxing tidak hanya membantu karyawan memaksimalkan cuti mereka, tetapi juga mendorong budaya work-life balance yang lebih baik di Indonesia.
