import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Holiday, LeaveRecommendation } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
  }).format(date)
}

export function getDayName(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(date)
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
}

export function isHoliday(date: Date, holidays: Holiday[]): Holiday | undefined {
  // Convert the input date to local date string (YYYY-MM-DD)
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  const dateString = localDate.toISOString().split('T')[0]
  return holidays.find((holiday) => holiday.date === dateString)
}

export function calculateOptimalLeave(
  availableLeaveDays: number,
  holidays: Holiday[],
  year: number,
  quarter?: "Q1" | "Q2" | "Q3" | "Q4",
): LeaveRecommendation[] {
  // Filter holidays by quarter if specified
  let filteredHolidays = [...holidays]
  if (quarter) {
    const quarterMonths = {
      Q1: [0, 1, 2], // Jan, Feb, Mar
      Q2: [3, 4, 5], // Apr, May, Jun
      Q3: [6, 7, 8], // Jul, Aug, Sep
      Q4: [9, 10, 11], // Oct, Nov, Dec
    }

    filteredHolidays = holidays.filter((holiday) => {
      const holidayDate = new Date(holiday.date)
      return quarterMonths[quarter].includes(holidayDate.getMonth())
    })
  }

  // Sort holidays by date
  filteredHolidays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const recommendations: LeaveRecommendation[] = []

  // Process each holiday to find optimal leave strategies
  filteredHolidays.forEach((holiday, index) => {
    const holidayDate = new Date(holiday.date)
    const dayOfWeek = holidayDate.getDay() // 0 (Sunday) to 6 (Saturday)

    // Skip if this is a Cuti Bersama
    if (holiday.description?.includes("Cuti Bersama")) {
      return
    }

    // Check if there's a Cuti Bersama associated with this holiday
    const cutiBersama = holidays.find(h => {
      const hDate = new Date(h.date)
      return h.description?.includes("Cuti Bersama") && 
             h.name.includes(holiday.name) // Check if Cuti Bersama is related to this holiday
    })

    if (cutiBersama) {
      const cutiBersamaDate = new Date(cutiBersama.date)
      const daysBetween = Math.abs(holidayDate.getTime() - cutiBersamaDate.getTime()) / (24 * 60 * 60 * 1000)

      if (daysBetween <= 7) { // If Cuti Bersama is within a week
        const cutiBersamaDayName = getDayName(cutiBersamaDate)
        recommendations.push({
          id: `strategy-${index}-cuti-bersama`,
          strategy: "Long Weekend",
          leaveDates: [cutiBersama.date],
          totalDays: 4,
          holidayPeriod: {
            start: new Date(cutiBersamaDate.getTime() - (24 * 60 * 60 * 1000)).toISOString().split("T")[0], // Start from Sunday
            end: new Date(cutiBersamaDate.getTime() + (2 * 24 * 60 * 60 * 1000)).toISOString().split("T")[0], // End on Wednesday
          },
          description: `Ambil cuti pada hari ${cutiBersamaDayName} pada libur ${cutiBersama.name} untuk mendapatkan 4 hari libur berturut-turut.`,
        })
        return // Skip other strategies for this holiday
      }
    }

    // Strategy 1: Thursday holiday - take Friday off for a 4-day weekend
    if (dayOfWeek === 4) {
      // Thursday
      const fridayDate = new Date(holidayDate)
      fridayDate.setDate(holidayDate.getDate() + 1)
      const fridayDayName = getDayName(fridayDate)

      // Check if there's a Cuti Bersama before the holiday
      const cutiBersamaBefore = holidays.find(h => {
        const hDate = new Date(h.date)
        return h.description?.includes("Cuti Bersama") && 
               hDate.getTime() < holidayDate.getTime() &&
               Math.abs(hDate.getTime() - holidayDate.getTime()) <= 7 * 24 * 60 * 60 * 1000 // within 7 days
      })

      if (cutiBersamaBefore) {
        // If there's a Cuti Bersama nearby, recommend taking days between them
        const startDate = new Date(cutiBersamaBefore.date)
        const endDate = new Date(holidayDate)
        const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
        
        if (daysBetween <= availableLeaveDays) {
          const leaveDates = []
          for (let i = 1; i < daysBetween; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            leaveDates.push(date.toISOString().split("T")[0])
          }

          recommendations.push({
            id: `strategy-${index}-1a`,
            strategy: "Extended Long Weekend",
            leaveDates,
            totalDays: daysBetween + 2, // Include the Cuti Bersama and holiday
            holidayPeriod: {
              start: startDate.toISOString().split("T")[0],
              end: holidayDate.toISOString().split("T")[0],
            },
            description: `Ambil cuti ${daysBetween - 1} hari antara ${formatDate(startDate)} dan ${formatDate(holidayDate)} untuk mendapatkan ${daysBetween + 2} hari libur berturut-turut.`,
          })
        }
      } else {
        // Original strategy for Thursday holiday
        recommendations.push({
          id: `strategy-${index}-1`,
          strategy: "Long Weekend",
          leaveDates: [fridayDate.toISOString().split("T")[0]],
          totalDays: 4, // Thursday (holiday) + Friday (leave) + Saturday + Sunday
          holidayPeriod: {
            start: holidayDate.toISOString().split("T")[0],
            end: new Date(holidayDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari ${fridayDayName} setelah libur ${holiday.name} untuk mendapatkan 4 hari libur berturut-turut.`,
        })
      }
    }

    // Strategy 2: Tuesday holiday - take Monday off for a 4-day weekend
    if (dayOfWeek === 2) {
      // Tuesday
      const mondayDate = new Date(holidayDate)
      mondayDate.setDate(holidayDate.getDate() - 1)
      const mondayDayName = getDayName(mondayDate)

      recommendations.push({
        id: `strategy-${index}-2`,
        strategy: "Long Weekend",
        leaveDates: [mondayDate.toISOString().split("T")[0]],
        totalDays: 4, // Saturday + Sunday + Monday (leave) + Tuesday (holiday)
        holidayPeriod: {
          start: new Date(holidayDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          end: holidayDate.toISOString().split("T")[0],
        },
        description: `Ambil cuti pada hari ${mondayDayName} sebelum libur ${holiday.name} untuk mendapatkan 4 hari libur berturut-turut.`,
      })
    }

    // Strategy 3: Wednesday holiday - take Monday, Tuesday, Thursday, Friday off for a 9-day vacation
    if (dayOfWeek === 3 && availableLeaveDays >= 4) {
      // Wednesday
      const mondayDate = new Date(holidayDate)
      mondayDate.setDate(holidayDate.getDate() - 2)

      const tuesdayDate = new Date(holidayDate)
      tuesdayDate.setDate(holidayDate.getDate() - 1)

      const thursdayDate = new Date(holidayDate)
      thursdayDate.setDate(holidayDate.getDate() + 1)

      const fridayDate = new Date(holidayDate)
      fridayDate.setDate(holidayDate.getDate() + 2)

      recommendations.push({
        id: `strategy-${index}-3`,
        strategy: "Super Long Vacation",
        leaveDates: [
          mondayDate.toISOString().split("T")[0],
          tuesdayDate.toISOString().split("T")[0],
          thursdayDate.toISOString().split("T")[0],
          fridayDate.toISOString().split("T")[0],
        ],
        totalDays: 9, // Saturday + Sunday + Monday (leave) + Tuesday (leave) + Wednesday (holiday) + Thursday (leave) + Friday (leave) + Saturday + Sunday
        holidayPeriod: {
          start: new Date(holidayDate.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          end: new Date(holidayDate.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
        description: `Ambil cuti 4 hari pada hari Senin, Selasa, Kamis, dan Jumat di sekitar libur ${holiday.name} untuk mendapatkan 9 hari libur berturut-turut.`,
      })
    }

    // Strategy 4: Monday holiday - take Tuesday-Friday off for a 9-day vacation
    if (dayOfWeek === 1 && availableLeaveDays >= 4) {
      // Monday
      const tuesdayDate = new Date(holidayDate)
      tuesdayDate.setDate(holidayDate.getDate() + 1)

      const wednesdayDate = new Date(holidayDate)
      wednesdayDate.setDate(holidayDate.getDate() + 2)

      const thursdayDate = new Date(holidayDate)
      thursdayDate.setDate(holidayDate.getDate() + 3)

      const fridayDate = new Date(holidayDate)
      fridayDate.setDate(holidayDate.getDate() + 4)

      recommendations.push({
        id: `strategy-${index}-4`,
        strategy: "Super Long Vacation",
        leaveDates: [
          tuesdayDate.toISOString().split("T")[0],
          wednesdayDate.toISOString().split("T")[0],
          thursdayDate.toISOString().split("T")[0],
          fridayDate.toISOString().split("T")[0],
        ],
        totalDays: 9, // Saturday + Sunday + Monday (holiday) + Tuesday (leave) + Wednesday (leave) + Thursday (leave) + Friday (leave) + Saturday + Sunday
        holidayPeriod: {
          start: new Date(holidayDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          end: new Date(holidayDate.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
        description: `Ambil cuti 4 hari pada hari Selasa, Rabu, Kamis, dan Jumat setelah libur ${holiday.name} untuk mendapatkan 9 hari libur berturut-turut.`,
      })
    }

    // Strategy 5: Friday holiday - take Monday-Thursday off for a 9-day vacation
    if (dayOfWeek === 5 && availableLeaveDays >= 4) {
      // Friday
      const mondayDate = new Date(holidayDate)
      mondayDate.setDate(holidayDate.getDate() + 3)

      const tuesdayDate = new Date(holidayDate)
      tuesdayDate.setDate(holidayDate.getDate() + 4)

      const wednesdayDate = new Date(holidayDate)
      wednesdayDate.setDate(holidayDate.getDate() + 5)

      const thursdayDate = new Date(holidayDate)
      thursdayDate.setDate(holidayDate.getDate() + 6)

      recommendations.push({
        id: `strategy-${index}-5`,
        strategy: "Super Long Vacation",
        leaveDates: [
          mondayDate.toISOString().split("T")[0],
          tuesdayDate.toISOString().split("T")[0],
          wednesdayDate.toISOString().split("T")[0],
          thursdayDate.toISOString().split("T")[0],
        ],
        totalDays: 9, // Friday (holiday) + Saturday + Sunday + Monday (leave) + Tuesday (leave) + Wednesday (leave) + Thursday (leave) + Friday + Saturday
        holidayPeriod: {
          start: holidayDate.toISOString().split("T")[0],
          end: new Date(holidayDate.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        },
        description: `Ambil cuti 4 hari pada hari Senin, Selasa, Rabu, dan Kamis setelah libur ${holiday.name} untuk mendapatkan 9 hari libur berturut-turut.`,
      })
    }
  })

  // Sort recommendations by efficiency (total days / leave days)
  return recommendations
    .filter((rec) => rec.leaveDates.length <= availableLeaveDays)
    .sort((a, b) => {
      const efficiencyA = a.totalDays / a.leaveDates.length
      const efficiencyB = b.totalDays / b.leaveDates.length
      return efficiencyB - efficiencyA
    })
}
