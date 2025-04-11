"use client"

import { Button } from "@/components/ui/button"
import {
  CalendarClock,
  ArrowRight,
  Battery,
  Brain,
  Heart,
  Sparkles,
  UserIcon,
  UsersIcon,
  BuildingIcon,
  CheckIcon,
} from "lucide-react"

export default function HeroSection({ scrollToCalculator }: { scrollToCalculator: () => void }) {
  return (
    <div className="py-16 md:py-24 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full">
            <CalendarClock className="h-10 w-10 text-blue-600" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span>Ambil Jatah Cuti Dikit </span>
            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
              Bisa Liburan Panjaaang!
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            Kamu bisa mendapatkan rekomendasi cuti terbaik untuk libur lebih panjang dengan strategi cuti yang efisien.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              size="lg"
              className="w-full text-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              onClick={scrollToCalculator}
            >
              Hitung Cuti Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full max-w-3xl">
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-green-500">12+</h3>
              <p className="text-muted-foreground">Hari Libur Nasional</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-blue-500">30+</h3>
              <p className="text-muted-foreground">Strategi Cuti</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-purple-500">9+</h3>
              <p className="text-muted-foreground">Hari Libur Berturut-turut</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits of taking leave section */}
      <div className="container mx-auto max-w-5xl mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mengapa Cuti Itu Penting?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mengambil waktu istirahat dari pekerjaan bukan hanya tentang liburan, tapi juga tentang kesehatan dan
            produktivitas jangka panjang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <Battery className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Memulihkan Energi</h3>
              <p className="text-muted-foreground">
                Cuti membantu mengurangi kelelahan mental dan fisik, memungkinkan tubuh dan pikiran untuk beristirahat
                dan memulihkan energi yang terkuras selama bekerja.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Meningkatkan Kreativitas</h3>
              <p className="text-muted-foreground">
                Waktu istirahat dari rutinitas kerja dapat merangsang kreativitas dan membantu menemukan solusi baru
                untuk masalah yang dihadapi di tempat kerja.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
              <Heart className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Kesehatan Mental</h3>
              <p className="text-muted-foreground">
                Cuti membantu mengurangi stres dan mencegah burnout, yang berdampak positif pada kesehatan mental dan
                kesejahteraan secara keseluruhan.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md flex items-start gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Produktivitas Lebih Tinggi</h3>
              <p className="text-muted-foreground">
                Setelah cuti, karyawan cenderung kembali dengan semangat baru dan produktivitas yang lebih tinggi,
                menghasilkan kinerja yang lebih baik dalam jangka panjang.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            onClick={scrollToCalculator}
          >
            Optimalkan Cuti Kamu Sekarang
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* For different user profiles section */}
      <div className="container mx-auto max-w-5xl mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cutimaxxxing untuk Semua</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solusi perencanaan cuti yang membantu semua pihak dalam organisasi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-fit mb-4">
              <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Untuk Karyawan</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Dapatkan rekomendasi cuti terbaik untuk liburan lebih panjang</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Rencanakan cuti dengan visualisasi kalender yang jelas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Buat surat pengajuan cuti dengan berbagai gaya bahasa</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-fit mb-4">
              <UsersIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Untuk Manager</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Rekomendasikan cutimaxxxing ke tim untuk perencanaan cuti</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Bantu tim mendapatkan istirahat yang optimal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Tingkatkan produktivitas dan kepuasan tim</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-fit mb-4">
              <BuildingIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Untuk Perusahaan</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Komunikasikan cuti dengan berbagai gaya bahasa yang tidak kaku</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Dukung work-life balance yang lebih baik untuk karyawan</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Tingkatkan retensi karyawan dengan kebijakan cuti yang fleksibel</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
