"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Copy, Download, FileText } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { LeaveApplicationData } from "@/lib/types"

// Tambahkan import jsPDF di bagian atas file, di bawah import yang sudah ada
import { jsPDF } from "jspdf"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus diisi minimal 2 karakter.",
  }),
  position: z.string().min(2, {
    message: "Jabatan harus diisi.",
  }),
  department: z.string().min(2, {
    message: "Departemen harus diisi.",
  }),
  startDate: z.date({
    required_error: "Tanggal mulai cuti harus diisi.",
  }),
  endDate: z.date({
    required_error: "Tanggal selesai cuti harus diisi, masa nggak balik ngantor?",
  }),
  reason: z.string().min(5, {
    message: "Alasan cuti harus diisi minimal 5 karakter.",
  }),
  managerName: z.string().min(2, {
    message: "Nama atasan harus diisi.",
  }),
  companyName: z.string().min(2, {
    message: "Nama perusahaan harus diisi.",
  }),
  style: z.enum(["formal", "conversational", "semi-formal", "krama-inggil"]),
})

export default function LeaveTemplates() {
  const [templateData, setTemplateData] = useState<LeaveApplicationData | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      department: "",
      reason: "",
      managerName: "",
      companyName: "",
      style: "formal",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Calculate total days (including weekends and holidays)
    const startDate = new Date(values.startDate)
    const endDate = new Date(values.endDate)
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include the end date

    setTemplateData({
      ...values,
      totalDays: diffDays,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    })
  }

  function copyToClipboard() {
    if (!templateData) return

    let content = ""

    if (templateData.style === "formal") {
      content = generateFormalTemplate(templateData)
    } else if (templateData.style === "conversational") {
      content = generateConversationalTemplate(templateData)
    } else if (templateData.style === "krama-inggil") {
      content = generateKramaInggilTemplate(templateData)
    } else {
      content = generateSemiFormalTemplate(templateData)
    }

    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Template berhasil disalin ke clipboard!")
      })
      .catch((err) => {
        console.error("Gagal menyalin template: ", err)
      })
  }

  function generateFormalTemplate(data: LeaveApplicationData): string {
    const startDate = format(new Date(data.startDate), "dd MMMM yyyy", { locale: id })
    const endDate = format(new Date(data.endDate), "dd MMMM yyyy", { locale: id })

    return `Kepada Yth.,
HRD ${data.companyName}

Dengan hormat,
Saya yang bertanda tangan di bawah ini:

Nama: ${data.name}
Jabatan: ${data.position}
Departemen: ${data.department}

Bermaksud mengajukan cuti tahunan pada:
- Tanggal: ${startDate} - ${endDate}
- Jumlah Hari: ${data.totalDays} hari
- Alasan: ${data.reason}

Bersama ini saya lampirkan dokumen pendukung (jika ada).
Atas perhatiannya, saya ucapkan terima kasih.

Hormat saya,
${data.name}`
  }

  function generateConversationalTemplate(data: LeaveApplicationData): string {
    const startDate = format(new Date(data.startDate), "dd MMMM yyyy", { locale: id })
    const endDate = format(new Date(data.endDate), "dd MMMM yyyy", { locale: id })

    return `Halo ${data.managerName},

Aku mau ngajuin cuti nih dari ${startDate} sampai ${endDate} (total ${data.totalDays} hari) untuk ${data.reason}. Aku udah siapin tugas-tugasku buat didelegasikan ke rekan kerja.

Kalau butuh info lebih lanjut, kabarin aku ya!
Makasih banyak 🙏

Cheers,
${data.name}`
  }

  function generateSemiFormalTemplate(data: LeaveApplicationData): string {
    const startDate = format(new Date(data.startDate), "dd MMMM yyyy", { locale: id })
    const endDate = format(new Date(data.endDate), "dd MMMM yyyy", { locale: id })

    return `Dear ${data.managerName},

Saya ingin mengajukan cuti pada ${startDate} sampai ${endDate} untuk ${data.reason}. Berikut detailnya:
📅 Total hari: ${data.totalDays} hari
⏳ Departemen: ${data.department}
📌 Posisi: ${data.position}

Mohon konfirmasi persetujuannya.
Terima kasih!

Best regards,
${data.name}`
  }

  function generateKramaInggilTemplate(data: LeaveApplicationData): string {
    const startDate = format(new Date(data.startDate), "dd MMMM yyyy", { locale: id })
    const endDate = format(new Date(data.endDate), "dd MMMM yyyy", { locale: id })

    return `Katur Dhumateng,
Panjenenganipun Bapak/Ibu ${data.managerName}
HRD ${data.companyName}

Kanthi kurmat,
Kula ingkang tapak asma ing ngandhap punika:

Nama: ${data.name}
Jabatan: ${data.position}
Departemen: ${data.department}

Badhe nyuwun pamit cuti saking padamelan ing:
📅 Tanggal: ${startDate} dumugi ${endDate}
⏳ Cacahipun Dinten: ${data.totalDays} dinten
📌 Pawadan: ${data.reason}

Kula lampiraken dokumen pendukung (menawi wonten).
Matur nuwun awit saking kawigatosanipun.

Kanthi kurmat,
${data.name}`
  }

  // Tambahkan fungsi downloadAsPDF di dalam komponen LeaveTemplates, sebelum return statement
  function downloadAsPDF() {
    if (!templateData) return

    // Inisialisasi dokumen PDF
    const doc = new jsPDF()

    // Siapkan konten berdasarkan style yang dipilih
    let content = ""
    if (templateData.style === "formal") {
      content = generateFormalTemplate(templateData)
    } else if (templateData.style === "conversational") {
      content = generateConversationalTemplate(templateData)
    } else if (templateData.style === "krama-inggil") {
      content = generateKramaInggilTemplate(templateData)
    } else {
      content = generateSemiFormalTemplate(templateData)
    }

    // Tambahkan judul
    doc.setFontSize(16)
    doc.text("Surat Pengajuan Cuti", 105, 20, { align: "center" })

    // Tambahkan konten dengan line breaks
    doc.setFontSize(12)
    const lines = content.split("\n")
    let y = 40

    lines.forEach((line) => {
      if (line.trim() !== "") {
        doc.text(line, 20, y)
        y += 8
      } else {
        y += 4 // Spasi untuk baris kosong
      }
    })

    // Tambahkan footer
    doc.setFontSize(10)
    doc.text("Dibuat dengan Cutimaxxxing - cutimaxxxing.vercel.app", 105, 280, { align: "center" })

    // Unduh PDF dengan nama yang sesuai
    const fileName = `Surat_Cuti_${templateData.name.replace(/\s+/g, "_")}_${format(new Date(templateData.startDate), "dd-MM-yyyy")}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Prasaja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departemen</FormLabel>
                  <FormControl>
                    <Input placeholder="Product" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Perusahaan</FormLabel>
                  <FormControl>
                    <Input placeholder="PT. Sebagaimana Mestinya Kata" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Mulai Cuti</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Selesai Cuti</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => {
                          const startDate = form.getValues("startDate")
                          return date < new Date() || (startDate && date < startDate)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan Cuti</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mau ke coffee shop di luar kota" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Atasan/HRD</FormLabel>
                  <FormControl>
                    <Input placeholder="Teguh" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gaya Penulisan</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih gaya penulisan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="semi-formal">Semi-Formal</SelectItem>
                      <SelectItem value="krama-inggil">Krama Inggil (Bahasa Jawa)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Pilih gaya penulisan surat pengajuan cuti</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            <FileText className="mr-2 h-4 w-4" />
            Generate Template Surat
          </Button>
        </form>
      </Form>

      {templateData && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Template Surat Pengajuan Cuti</CardTitle>
            <CardDescription>
              {templateData.style === "formal"
                ? "Gaya Formal"
                : templateData.style === "conversational"
                  ? "Gaya Conversational"
                  : templateData.style === "krama-inggil"
                    ? "Gaya Krama Inggil (Bahasa Jawa)"
                    : "Gaya Semi-Formal"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
              {templateData.style === "formal"
                ? generateFormalTemplate(templateData)
                : templateData.style === "conversational"
                  ? generateConversationalTemplate(templateData)
                  : templateData.style === "krama-inggil"
                    ? generateKramaInggilTemplate(templateData)
                    : generateSemiFormalTemplate(templateData)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              Salin ke Clipboard
            </Button>
            <Button onClick={downloadAsPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download sebagai PDF
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
