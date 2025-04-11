import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Code, MessageSquare } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Tentang Cutimaxxxing</h1>
          <p className="text-xl text-muted-foreground">
            Aplikasi yang membantu karyawan memaksimalkan hari libur dengan strategi cuti yang efisien.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Cerita di Balik Cutimaxxxing</h2>
          <p>
            Cutimaxxxing lahir dari pengalaman pribadi saya sebagai karyawan, yang sering merasa belum memaksimalkan cuti dengan baik. Padahal dengan jumlah cuti yang terbatas (paling banyak sih pernah dapat 14 hari cuti) saya rasa bisa memaksimalkan cuti dengan baik.
            </p>
            <p>Saat awal bulan, saya selalu iseng cek kalender untuk melihat hari libur. Padahal, ada pendekatan yang lebih efektif untuk memaksimalkan jatah cuti.
            </p>
          <p>
            Karena sepertinya keisengan tersebut cukup berguna untuk diri sendiri, saya memutuskan untuk membuat aplikasi yang bisa membantu sesama karyawan di Indonesia merencanakan cuti mereka dengan lebih baik.
          </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Fitur Utama</CardTitle>
              <CardDescription>Yang membuat Cutimaxxxing berbeda dari kompetitor (kalau ada)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full h-fit">
                  <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">Kalender Libur Nasional</h3>
                  <p className="text-sm text-muted-foreground">
                    Visualisasi hari libur nasional dan weekend untuk perencanaan yang lebih baik
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full h-fit">
                  <CalculatorIcon className="h-5 w-5 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h3 className="font-medium">Penghitungan Optimalisasi Cuti</h3>
                  <p className="text-sm text-muted-foreground">
                    Rekomendasi strategi cuti terbaik berdasarkan efisiensi hari libur
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full h-fit">
                  <FileTextIcon className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h3 className="font-medium">Template Surat Cuti</h3>
                  <p className="text-sm text-muted-foreground">
                    Template surat pengajuan cuti dengan berbagai gaya penulisan (karena saya jago nulis, haha)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-green-500">
                <img
                  src="https://prasaja.com/images/prasaja-ava.png"
                  alt="Foto Profil Prasaja"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <CardTitle>Tentang Pembuat</CardTitle>
                <CardDescription>UX Writer & Product Developer</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Halo! Saya Prasaja, seorang UX writer dan front-end developer yang senang membangun produk digital yang
                intuitif dan bermanfaat.
              </p>
              <p>
                Saya menggabungkan keahlian dalam menulis konten yang jelas dengan kemampuan teknis untuk menciptakan
                pengalaman digital yang membantu menyelesaikan masalah nyata.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button asChild variant="outline" className="flex gap-2">
                  <Link href="https://prasaja.com" target="_blank" rel="noopener noreferrer">
                    <Code className="h-4 w-4" />
                    Kunjungi Website
                  </Link>
                </Button>
                <Button
                  asChild
                  className="flex gap-2 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  <Link href="https://prasaja.com#contact" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="h-4 w-4" />
                    Hubungi Saya
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 rounded-xl">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-semibold">Butuh solusi digital yang efektif?</h2>
            <p className="text-lg">
              Saya menawarkan jasa web development dengan copywriting yang efektif membantu bisnis
              meningkatkan konversi, engagement, dan menciptakan pengalaman digital yang berkesan bagi pengguna.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" variant="outline">
                <Link href="https://prasaja.com/portfolio" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-5 w-5" />
                  Lihat Portfolio
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                <Link href="https://prasaja.com/contact" target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Konsultasikan Proyek Anda
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  )
}

function CalculatorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <line x1="8" x2="16" y1="6" y2="6" />
      <line x1="16" x2="16" y1="14" y2="18" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 10h.01" />
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
