# Cutimaxxxing - Kalkulator Optimalisasi Cuti Indonesia

Cutimaxxxing adalah aplikasi web yang membantu karyawan Indonesia memaksimalkan hari libur dengan strategi cuti yang efisien. Aplikasi ini memberikan rekomendasi kapan sebaiknya mengambil cuti untuk mendapatkan periode libur yang lebih panjang.

## 🌟 Fitur Utama

- **Kalender Libur Nasional**: Visualisasi hari libur nasional dan weekend untuk perencanaan yang lebih baik
- **Kalkulator Optimalisasi Cuti**: Rekomendasi strategi cuti terbaik berdasarkan efisiensi hari libur
- **Template Surat Cuti**: Template surat pengajuan cuti dengan berbagai gaya penulisan (formal, conversational, semi-formal, bahkan krama inggil!)

## 🚀 Demo

Kunjungi [Cutimaxxxing](https://cutimaxxxing.work) untuk menggunakan aplikasi ini.

## 💻 Teknologi

Tech stack yang dipakai untuk membuat Cutimaxxxing:

- [Next.js](https://nextjs.org/) - React framework dengan fitur server-side rendering
- [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) - Komponen UI yang dapat digunakan kembali
- [React Hook Form](https://react-hook-form.com/) - Form validation
- [Zod](https://zod.dev/) - Schema validation
- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation

## 🛠️ Instalasi dan Local Development

### Prasyarat

- Node.js 18.x atau lebih baru
- npm atau yarn

### Langkah-langkah

1. Clone repositori
   ```bash
   git clone https://github.com/orepras/.git
   cd 

2. Install dependensi
  ```shellscript
  npm install
  # atau
  yarn
  ```

3. Jalankan server pengembangan
  ```shellscript
  npm run dev
  # atau
  yarn dev
  ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser Anda


## 📊 Struktur Proyek

```
/
├── app/                    # Next.js App Router
│   ├── about/              # Halaman Tentang
│   ├── faq/                # Halaman FAQ
│   ├── layout.tsx          # Layout utama
│   └── page.tsx            # Halaman utama
├── components/             # Komponen React
│   ├── ui/                 # Komponen UI yang basic (shadcn)
│   ├── hero-section.tsx    # Section hero
│   ├── holiday-calendar.tsx # Kalender libur
│   ├── leave-calculator.tsx # Kalkulator cuti
│   └── leave-templates.tsx  # Template surat cuti
├── lib/                    # Utilitas dan fungsi
│   ├── holidays.ts         # Data hari libur
│   ├── types.ts            # Type definitions
│   └── utils.ts            # Fungsi utility
├── public/                 # Aset statis
└── ...                     # File konfigurasi lainnya
```

## 🤝 Kontribusi

Kontribusi selalu diterima dengan baik! Kalau kamu ingin berkontribusi:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/fitur-kece`)
3. Commit changes-nya (`git commit -m 'Nambahin fitur-kece'`)
4. Push ke branch (`git push origin feature/fitur-kece`)
5. Buka Pull Request


## 📝 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 📞 Kontak

Prasaja - [Website](https://prasaja.com) - [Email](mailto:prasaja@hey.com)
