"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import HolidayCalendar from "@/components/holiday-calendar"
import LeaveCalculator from "@/components/leave-calculator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LeaveTemplates from "@/components/leave-templates"
import { CalendarClock, Calculator, FileText, ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import { Button } from "@/components/ui/button"

export default function Home() {
  const calculatorTabRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("calendar")

  useEffect(() => {
    const handleTabSwitch = (event: CustomEvent) => {
      setActiveTab(event.detail)
    }

    window.addEventListener('switchTab', handleTabSwitch as EventListener)
    return () => {
      window.removeEventListener('switchTab', handleTabSwitch as EventListener)
    }
  }, [])

  const scrollToCalculator = () => {
    setActiveTab("calculator")
    setTimeout(() => {
      calculatorTabRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const getNextTab = () => {
    if (activeTab === "calendar")
      return { value: "calculator", label: "Kalkulator Cuti", icon: <Calculator className="mr-2 h-5 w-5" /> }
    if (activeTab === "calculator")
      return { value: "templates", label: "Template Surat", icon: <FileText className="mr-2 h-5 w-5" /> }
    return { value: "calendar", label: "Kalender Libur", icon: <CalendarClock className="mr-2 h-5 w-5" /> }
  }

  const handleNextTab = () => {
    setActiveTab(getNextTab().value)
    window.scrollTo({ top: calculatorTabRef.current?.offsetTop || 0, behavior: "smooth" })
  }

  return (
    <main>
      <HeroSection scrollToCalculator={scrollToCalculator} />

      <div className="container mx-auto px-4 py-12">
        <div ref={calculatorTabRef}>
          <Tabs
            defaultValue={activeTab}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-5xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8 sticky top-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-lg shadow-sm">
              <TabsTrigger value="calendar" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <CalendarClock className="mr-2 h-4 w-4" />
                Kalender Libur
              </TabsTrigger>
              <TabsTrigger value="calculator" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <Calculator className="mr-2 h-4 w-4" />
                Kalkulator Cuti
              </TabsTrigger>
              <TabsTrigger value="templates" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                <FileText className="mr-2 h-4 w-4" />
                Template Surat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Kalender Libur Nasional</CardTitle>
                  <CardDescription>Lihat hari libur nasional dan weekend untuk merencanakan cutimu</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading calendar...</div>}>
                    <HolidayCalendar />
                  </Suspense>

                  <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg text-center">
                    <p className="text-lg font-medium mb-3">Banyak hari libur, kan? 🎉</p>
                    <p className="mb-4">Yuk, coba hitung strategi cuti terbaik dengan kalkulator cuti!</p>
                    <Button
                      onClick={() => setActiveTab("calculator")}
                      className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                    >
                      <Calculator className="mr-2 h-4 w-4" />
                      Coba Kalkulator Cuti
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calculator">
              <Card>
                <CardHeader>
                  <CardTitle>Kalkulator Optimalisasi Cuti</CardTitle>
                  <CardDescription>
                    Dapatkan rekomendasi cuti terbaik berdasarkan jumlah hari cuti yang tersedia
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeaveCalculator />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates">
              <Card>
                <CardHeader>
                  <CardTitle>Template Surat Pengajuan Cuti</CardTitle>
                  <CardDescription>
                    Gunakan template surat pengajuan cuti untuk mempermudah proses administrasi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LeaveTemplates />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bottom navigation */}
            
          </Tabs>
        </div>
      </div>
    </main>
  )
}
