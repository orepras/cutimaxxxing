"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { holidays2024, holidays2025 } from "@/lib/holidays"
import { formatDate, isHoliday, isWeekend } from "@/lib/utils"

export default function HolidayCalendar() {
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<Date>(new Date())

  const holidays = year === 2024 ? holidays2024 : holidays2025

  // Function to customize calendar day rendering
  const renderDay = (day: Date) => {
    const holiday = isHoliday(day, holidays)
    const weekend = isWeekend(day)

    if (holiday) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full h-full flex items-center justify-center">
                <Badge variant="outline" className="bg-blue-100 hover:bg-blue-200 border-blue-300 text-blue-800">
                  {day.getDate()}
                </Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-sm">
                <p className="font-bold">{holiday.name}</p>
                <p>{formatDate(day)}</p>
                {holiday.description && <p className="text-xs text-muted-foreground">{holiday.description}</p>}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    if (weekend) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-red-500 font-medium">{day.getDate()}</span>
        </div>
      )
    }

    return <span>{day.getDate()}</span>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Select value={year.toString()} onValueChange={(value) => setYear(Number.parseInt(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm">Libur Nasional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm">Weekend</span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg p-4 md:p-6 lg:p-8 max-w-full mx-auto">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={setMonth}
          className="rounded-md w-full max-w-full mx-auto md:text-lg lg:text-xl"
          components={{
            Day: ({ date, ...props }) => (
              <div {...props} className="p-1 md:p-2 lg:p-3">
                {renderDay(date)}
              </div>
            ),
          }}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Daftar Libur Nasional {year}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {holidays.map((holiday) => (
            <Card key={holiday.date} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{holiday.name}</h4>
                    <p className="text-sm text-muted-foreground">{formatDate(new Date(holiday.date))}</p>
                    {holiday.description && <p className="text-xs text-muted-foreground mt-1">{holiday.description}</p>}
                  </div>
                  <Badge
                    variant={holiday.type === "national" ? "default" : "outline"}
                    className={holiday.type === "religious" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}
                  >
                    {holiday.type === "national" ? "Nasional" : "Keagamaan"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
