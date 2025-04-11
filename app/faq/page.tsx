import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MessageSquare } from "lucide-react"

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Pertanyaan Umum</h1>
          <p className="text-xl text-muted-foreground">
            Jawaban untuk pertanyaan yang bisa saja ditanyakan terkait Cutimaxxxing
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">Apa itu Cutimaxxxing?</AccordionTrigger>
            <AccordionContent>
              Cutimaxxxing adalah aplikasi yang membantu karyawan Indonesia memaksimalkan hari libur nasional dengan
              strategi cuti yang efisien. Aplikasi ini memberikan rekomendasi kapan sebaiknya mengambil cuti untuk
              mendapatkan periode libur yang lebih panjang.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">Bagaimana cara kerja kalkulator cuti?</AccordionTrigger>
            <AccordionContent>
              Kalkulator cuti bekerja dengan menganalisis pola hari libur nasional dan weekend, kemudian menghitung
              kombinasi cuti terbaik untuk mendapatkan periode libur terpanjang dengan jumlah cuti minimal. Kalkulasi cutimaxxing memprioritaskan efisiensi cuti (jumlah hari libur dibagi jumlah hari cuti).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">Apakah data hari libur nasional selalu diperbarui?</AccordionTrigger>
            <AccordionContent>
              Ya, cutimaxxxing memperbarui data hari libur nasional setiap tahun berdasarkan keputusan pemerintah. Saat ini,
              aplikasi mendukung data untuk tahun 2024 dan 2025. Data untuk tahun-tahun berikutnya akan ditambahkan
              setelah diumumkan secara resmi.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">Apakah aplikasi ini gratis?</AccordionTrigger>
            <AccordionContent>
              Ya, Cutimaxxxing sepenuhnya gratis untuk digunakan. Jika kamu merasa terbantu dengan aplikasi ini, kamu
              dapat memberikan {" "}
              <a
              href="https://saweria.co/orepras"
              className="underline font-medium hover:text-blue-800 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer">donasi melalui Saweria
              </a>{" "} untuk mendukung pengembangan lebih lanjut.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">Apakah rekomendasi cuti memperhitungkan kebijakan perusahaan?</AccordionTrigger>
            <AccordionContent>
              Cutimaxxxing memberikan rekomendasi berdasarkan hari libur nasional dan weekend. Aplikasi ini tidak
              memperhitungkan kebijakan cuti spesifik perusahaanmu. Pastikan untuk menyesuaikan rekomendasi dengan
              kebijakan perusahaanmu sebelum mengajukan cuti.
              <p className="mt-2 text-blue-600 dark:text-blue-400">
                Bila perusahaanmu membutuhkan rekomendasi custom yang bisa dipakai dalam jangka panjang, saya bisa
                membantu mengembangkan solusi yang disesuaikan dengan kebijakan dan kebutuhan spesifik perusahaan.
                Silakan{" "}
                <a
                  href="https://prasaja.com/contact"
                  className="underline font-medium hover:text-blue-800 dark:hover:text-blue-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hubungi saya
                </a>{" "}
                untuk informasi lebih lanjut.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">Bagaimana cara menggunakan template surat cuti?</AccordionTrigger>
            <AccordionContent>
              Isi formulir dengan data pribadi dan detail cutimu, pilih gaya penulisan yang diinginkan (formal,
              conversational, semi-formal, atau bahkan krama inggil!), lalu klik tombol "Generate Template Surat". Template yang dihasilkan
              dapat disalin ke clipboard atau diunduh sebagai PDF untuk digunakan dalam pengajuan cuti.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7">
            <AccordionTrigger className="text-left">Apakah Cutimaxxxing mendukung sistem kerja selain 5 hari?</AccordionTrigger>
            <AccordionContent>
              Saat ini, Cutimaxxxing dioptimalkan untuk sistem kerja 5 hari (Senin-Jumat). Kami berencana untuk
              menambahkan dukungan untuk sistem kerja lain seperti shift atau 6 hari kerja di masa mendatang.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8">
            <AccordionTrigger className="text-left">Siapa yang membuat Cutimaxxxing?</AccordionTrigger>
            <AccordionContent>
              Cutimaxxxing dibuat oleh Prasaja, seorang UX writer dan front-end developer. Untuk informasi lebih lanjut
              tentang pembuat, kunjungi personal site saya, di{" "}
              <Link
                href="https://prasaja.com"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                prasaja.com
              </Link>
              .
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-xl">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold">Punya pertanyaan lain?</h2>
            <p>
              Jika kamu memiliki pertanyaan yang belum terjawab di sini, jangan ragu untuk menghubungi saya langsung.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Link href="https://prasaja.com/contact" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-5 w-5" />
                Hubungi Prasaja
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
