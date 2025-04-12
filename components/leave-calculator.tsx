"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Calendar, CalendarCheck, CalendarClock, CalendarDays, FileText, CalendarPlus, ArrowRight } from "lucide-react"
import { calculateOptimalLeave, formatDate } from "@/lib/utils"
import type { LeaveRecommendation } from "@/lib/types"
import { getHolidaysByYear } from "@/lib/holidays"

// Function to generate ICS content
function generateICSContent(recommendation: LeaveRecommendation) {
  const startDate = new Date(recommendation.leaveDates[0])
  const endDate = new Date(recommendation.leaveDates[recommendation.leaveDates.length - 1])
  
  // Format dates for ICS
  const formatDateForICS = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Leave Calculator//EN
BEGIN:VEVENT
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:Cuti ${recommendation.totalDays} Hari
DESCRIPTION:${recommendation.description}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}

// Function to download ICS file
function downloadICS(recommendation: LeaveRecommendation) {
  const icsContent = generateICSContent(recommendation)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `cuti-${formatDate(new Date(recommendation.leaveDates[0]))}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const formSchema = z.object({
  availableLeaveDays: z.coerce
    .number()
    .min(1, {
      message: "Jumlah hari cuti harus minimal 1 hari.",
    })
    .max(30, {
      message: "Jumlah hari cuti maksimal 30 hari.",
    }),
  quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]),
  year: z.coerce.number().min(2024).max(2025),
})

export default function LeaveCalculator() {
  const [recommendations, setRecommendations] = useState<LeaveRecommendation[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availableLeaveDays: 12,
      year: new Date().getFullYear(),
      quarter: "Q2",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const holidays = getHolidaysByYear(values.year)
    const optimalLeave = calculateOptimalLeave(values.availableLeaveDays, holidays, values.year, values.quarter)
    setRecommendations(optimalLeave)
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="availableLeaveDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Hari Cuti</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="12" {...field} />
                  </FormControl>
                  <FormDescription>Jumlah hari cuti yang tersedia</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quarter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Periode</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Q1">Q1 (Jan-Mar)</SelectItem>
                      <SelectItem value="Q2">Q2 (Apr-Jun)</SelectItem>
                      <SelectItem value="Q3">Q3 (Jul-Sep)</SelectItem>
                      <SelectItem value="Q4">Q4 (Okt-Des)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Pilih periode yang diinginkan</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih Tahun" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Tahun untuk perencanaan cuti</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            <CalendarCheck className="mr-2 h-4 w-4" />
            Hitung Rekomendasi Cuti
          </Button>
        </form>
      </Form>

      {recommendations.length > 0 ? (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Rekomendasi Cuti Terbaik</h3>
          <div className="grid grid-cols-1 gap-6">
            {recommendations.slice(0, 5).map((recommendation) => (
              <Card key={recommendation.id} className="overflow-hidden">
                <CardHeader
                  className={`${
                    recommendation.strategy === "Super Long Vacation"
                      ? "bg-gradient-to-r from-amber-100 via-yellow-200 to-amber-100 dark:from-amber-900/40 dark:via-yellow-700/40 dark:to-amber-900/40"
                      : "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{recommendation.strategy}</CardTitle>
                      <CardDescription>
                        {formatDate(new Date(recommendation.holidayPeriod.start))} -{" "}
                        {formatDate(new Date(recommendation.holidayPeriod.end))}
                      </CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200 px-4 py-2 text-base font-bold">
                      {recommendation.totalDays} Hari Libur
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">{recommendation.description}</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Tanggal Cuti yang Disarankan:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recommendation.leaveDates.map((date) => (
                          <Badge key={date} variant="outline" className="bg-blue-50">
                            <Calendar className="mr-1 h-3 w-3" />
                            {formatDate(new Date(date))}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Alert>
                      <CalendarClock className="h-4 w-4" />
                      <AlertTitle>Efisiensi Cuti</AlertTitle>
                      <AlertDescription>
                        Ambil {recommendation.leaveDates.length} hari cuti untuk mendapatkan {recommendation.totalDays}{" "}
                        hari libur berturut-turut.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/50 py-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      <span>{recommendation.leaveDates.length} hari cuti</span>
                    </div>
                    <div className="flex gap-2">
                      
                      <Button
                        variant="default"
                        size="sm"
                        className="flex items-center h-9 bg-blue-600 hover:bg-blue-700"
                        onClick={() => downloadICS(recommendation)}
                      >
                        <CalendarPlus className="mr-1 h-4 w-4" />
                        Simpan ke Kalender
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <CalendarClock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Belum Ada Rekomendasi</h3>
          <p className="text-muted-foreground max-w-md mb-4">
            Masukkan jumlah hari cuti yang kamu punya, lalu  klik "Hitung Rekomendasi Cuti" untuk mendapatkan
            rekomendasi cuti terbaik.  
          </p>
          <p className="text-muted-foreground max-w-md mb-4">
            Kamu bisa juga membuat template surat cuti lho!
          </p>
          <Button variant="outline" onClick={() => window.dispatchEvent(new CustomEvent('switchTab', { detail: 'templates' }))} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
            <FileText className="mr-2 h-4 w-4 text-white" />
            Buat Template Surat Cuti
          </Button>
        </div>
      )}
    </div>
  )
}
