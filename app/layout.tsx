import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter, Noto_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Link from "next/link"

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const notoSerif = Noto_Serif({ 
  subsets: ["latin"],
  variable: '--font-noto-serif',
})

export const metadata: Metadata = {
  title: "Cutimaxxxing - Kalkulator Optimalisasi Cuti Indonesia",
  description: "Maksimalkan hari libur nasional dengan strategi cuti yang efisien",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} ${notoSerif.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2">
                    <CalendarIcon className="h-6 w-6 text-green-500" />
                    <span className="font-bold text-xl">Cutimaxxxing</span>
                  </Link>
                </div>
                <nav>
                  <ul className="flex gap-4">
                    <li>
                      <Link href="/about" className="text-muted-foreground hover:text-foreground">
                        Tentang
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </header>
            {children}
            <footer className="border-t mt-12">
              <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-muted-foreground">
                    © 2025 Prasaja | Merasa terbantu? Kamu bisa donasi ke{" "}
                    <a
                      href="https://saweria.co/orepras"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      saweria
                    </a>
                  </p>
                  <div className="flex gap-6">
                    <Link
                      href="https://prasaja.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Website
                    </Link>
                    <Link
                      href="https://prasaja.com/writing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Copywriting
                    </Link>
                    <Link
                      href="https://prasaja.com/contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Kontak
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
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


import './globals.css'