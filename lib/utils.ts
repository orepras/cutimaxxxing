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

    // Skip if this is a Cuti Bersama (we'll handle them separately)
    if (holiday.description?.includes("Cuti Bersama")) {
      return
    }

    // Check for nearby holidays (within 7 days) that could be bridged
    const nearbyHolidays = holidays.filter(h => {
      if (h.date === holiday.date) return false
      const hDate = new Date(h.date)
      const daysBetween = Math.abs(hDate.getTime() - holidayDate.getTime()) / (24 * 60 * 60 * 1000)
      return daysBetween <= 7
    })

    // If we have nearby holidays, create bridging strategies
    if (nearbyHolidays.length > 0) {
      nearbyHolidays.forEach(nearbyHoliday => {
        const nearbyDate = new Date(nearbyHoliday.date)
        const isBefore = nearbyDate < holidayDate
        const startDate = isBefore ? nearbyDate : holidayDate
        const endDate = isBefore ? holidayDate : nearbyDate
        
        const daysBetween = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) - 1
        if (daysBetween > 0 && daysBetween <= availableLeaveDays) {
          const leaveDates = []
          for (let i = 1; i <= daysBetween; i++) {
            const date = new Date(startDate)
            date.setDate(startDate.getDate() + i)
            // Skip weekends and holidays when bridging
            if (!isWeekend(date) && !isHoliday(date, holidays)) {
              leaveDates.push(date.toISOString().split("T")[0])
            }
          }

          if (leaveDates.length > 0) {
            const totalDays = (endDate.getDate() - startDate.getDate()) + 3 // Includes both holidays and weekends
            recommendations.push({
              id: `bridge-${index}-${nearbyHoliday.date}`,
              strategy: "Holiday Bridge",
              leaveDates,
              totalDays,
              holidayPeriod: {
                start: startDate.toISOString().split("T")[0],
                end: endDate.toISOString().split("T")[0],
              },
              description: `Ambil cuti ${leaveDates.length} hari antara ${holiday.name} dan ${nearbyHoliday.name} untuk mendapatkan ${totalDays} hari libur berturut-turut.`,
            })
          }
        }
      })
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
      }
    }

    // Strategy 1: Thursday holiday - take Friday off for a 4-day weekend
    if (dayOfWeek === 4) { // Thursday
      const fridayDate = new Date(holidayDate)
      fridayDate.setDate(holidayDate.getDate() + 1)
      const fridayDayName = getDayName(fridayDate)

      // Basic strategy - take Friday off (1 leave day)
      if (availableLeaveDays >= 1) {
        recommendations.push({
          id: `strategy-${index}-1a`,
          strategy: "Long Weekend",
          leaveDates: [fridayDate.toISOString().split("T")[0]],
          totalDays: 4, // Thursday (holiday) + Friday (leave) + Saturday + Sunday
          holidayPeriod: {
            start: holidayDate.toISOString().split("T")[0],
            end: new Date(holidayDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari ${fridayDayName} setelah libur ${holiday.name} untuk mendapatkan 4 hari libur berturut-turut.`,
        })

        // Extended strategy - take Friday + Monday off (2 leave days)
        if (availableLeaveDays >= 2) {
          const mondayDate = new Date(fridayDate)
          mondayDate.setDate(fridayDate.getDate() + 3) // Skip weekend
          recommendations.push({
            id: `strategy-${index}-1b`,
            strategy: "Extended Weekend",
            leaveDates: [
              fridayDate.toISOString().split("T")[0],
              mondayDate.toISOString().split("T")[0]
            ],
            totalDays: 5, // Thursday (holiday) + Friday (leave) + weekend + Monday (leave)
            holidayPeriod: {
              start: holidayDate.toISOString().split("T")[0],
              end: mondayDate.toISOString().split("T")[0],
            },
            description: `Ambil cuti pada hari ${fridayDayName} dan Senin berikutnya untuk mendapatkan 5 hari libur berturut-turut.`,
          })
        }
      }
    }

    // Strategy 2: Tuesday holiday - take Monday off for a 4-day weekend
    if (dayOfWeek === 2) { // Tuesday
      const mondayDate = new Date(holidayDate)
      mondayDate.setDate(holidayDate.getDate() - 1)
      const mondayDayName = getDayName(mondayDate)

      // Basic strategy - take Monday off (1 leave day)
      if (availableLeaveDays >= 1) {
        recommendations.push({
          id: `strategy-${index}-2a`,
          strategy: "Long Weekend",
          leaveDates: [mondayDate.toISOString().split("T")[0]],
          totalDays: 4, // Saturday + Sunday + Monday (leave) + Tuesday (holiday)
          holidayPeriod: {
            start: new Date(holidayDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            end: holidayDate.toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari ${mondayDayName} sebelum libur ${holiday.name} untuk mendapatkan 4 hari libur berturut-turut.`,
        })

        // Extended strategy - take Monday + Wednesday off (2 leave days)
        if (availableLeaveDays >= 2) {
          const wednesdayDate = new Date(holidayDate)
          wednesdayDate.setDate(holidayDate.getDate() + 1)
          recommendations.push({
            id: `strategy-${index}-2b`,
            strategy: "Extended Weekend",
            leaveDates: [
              mondayDate.toISOString().split("T")[0],
              wednesdayDate.toISOString().split("T")[0]
            ],
            totalDays: 5, // Saturday + Sunday + Monday (leave) + Tuesday (holiday) + Wednesday (leave)
            holidayPeriod: {
              start: new Date(holidayDate.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              end: wednesdayDate.toISOString().split("T")[0],
            },
            description: `Ambil cuti pada hari ${mondayDayName} dan Rabu berikutnya untuk mendapatkan 5 hari libur berturut-turut.`,
          })
        }
      }
    }

    // Strategy 3: Wednesday holiday - various options
    if (dayOfWeek === 3) { // Wednesday
      // Option 1: Take Monday-Tuesday off (2 leave days)
      if (availableLeaveDays >= 2) {
        const mondayDate = new Date(holidayDate)
        mondayDate.setDate(holidayDate.getDate() - 2)
        const tuesdayDate = new Date(holidayDate)
        tuesdayDate.setDate(holidayDate.getDate() - 1)

        recommendations.push({
          id: `strategy-${index}-3a`,
          strategy: "Midweek Break",
          leaveDates: [
            mondayDate.toISOString().split("T")[0],
            tuesdayDate.toISOString().split("T")[0]
          ],
          totalDays: 5, // Saturday + Sunday + Monday (leave) + Tuesday (leave) + Wednesday (holiday)
          holidayPeriod: {
            start: new Date(holidayDate.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            end: holidayDate.toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari Senin dan Selasa sebelum libur ${holiday.name} untuk mendapatkan 5 hari libur berturut-turut.`,
        })
      }

      // Option 2: Take Thursday-Friday off (2 leave days)
      if (availableLeaveDays >= 2) {
        const thursdayDate = new Date(holidayDate)
        thursdayDate.setDate(holidayDate.getDate() + 1)
        const fridayDate = new Date(holidayDate)
        fridayDate.setDate(holidayDate.getDate() + 2)

        recommendations.push({
          id: `strategy-${index}-3b`,
          strategy: "Midweek Break",
          leaveDates: [
            thursdayDate.toISOString().split("T")[0],
            fridayDate.toISOString().split("T")[0]
          ],
          totalDays: 5, // Wednesday (holiday) + Thursday (leave) + Friday (leave) + Saturday + Sunday
          holidayPeriod: {
            start: holidayDate.toISOString().split("T")[0],
            end: new Date(holidayDate.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari Kamis dan Jumat setelah libur ${holiday.name} untuk mendapatkan 5 hari libur berturut-turut.`,
        })
      }

      // Option 3: Take Monday-Tuesday-Thursday-Friday off (4 leave days)
      if (availableLeaveDays >= 4) {
        const mondayDate = new Date(holidayDate)
        mondayDate.setDate(holidayDate.getDate() - 2)
        const tuesdayDate = new Date(holidayDate)
        tuesdayDate.setDate(holidayDate.getDate() - 1)
        const thursdayDate = new Date(holidayDate)
        thursdayDate.setDate(holidayDate.getDate() + 1)
        const fridayDate = new Date(holidayDate)
        fridayDate.setDate(holidayDate.getDate() + 2)

        recommendations.push({
          id: `strategy-${index}-3c`,
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
    }

    // Strategy 4: Monday holiday - various options
    if (dayOfWeek === 1) { // Monday
      // Option 1: Take Tuesday-Wednesday off (2 leave days)
      if (availableLeaveDays >= 2) {
        const tuesdayDate = new Date(holidayDate)
        tuesdayDate.setDate(holidayDate.getDate() + 1)
        const wednesdayDate = new Date(holidayDate)
        wednesdayDate.setDate(holidayDate.getDate() + 2)

        recommendations.push({
          id: `strategy-${index}-4a`,
          strategy: "Extended Weekend",
          leaveDates: [
            tuesdayDate.toISOString().split("T")[0],
            wednesdayDate.toISOString().split("T")[0]
          ],
          totalDays: 5, // Saturday + Sunday + Monday (holiday) + Tuesday (leave) + Wednesday (leave)
          holidayPeriod: {
            start: new Date(holidayDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            end: wednesdayDate.toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari Selasa dan Rabu setelah libur ${holiday.name} untuk mendapatkan 5 hari libur berturut-turut.`,
        })
      }

      // Option 2: Take Tuesday-Friday off (4 leave days)
      if (availableLeaveDays >= 4) {
        const tuesdayDate = new Date(holidayDate)
        tuesdayDate.setDate(holidayDate.getDate() + 1)
        const wednesdayDate = new Date(holidayDate)
        wednesdayDate.setDate(holidayDate.getDate() + 2)
        const thursdayDate = new Date(holidayDate)
        thursdayDate.setDate(holidayDate.getDate() + 3)
        const fridayDate = new Date(holidayDate)
        fridayDate.setDate(holidayDate.getDate() + 4)

        recommendations.push({
          id: `strategy-${index}-4b`,
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
    }

    // Strategy 5: Friday holiday - various options
    if (dayOfWeek === 5) { // Friday
      // Option 1: Take Monday off (1 leave day)
      if (availableLeaveDays >= 1) {
        const mondayDate = new Date(holidayDate)
        mondayDate.setDate(holidayDate.getDate() + 3) // Skip weekend

        recommendations.push({
          id: `strategy-${index}-5a`,
          strategy: "Extended Weekend",
          leaveDates: [mondayDate.toISOString().split("T")[0]],
          totalDays: 4, // Friday (holiday) + weekend + Monday (leave)
          holidayPeriod: {
            start: holidayDate.toISOString().split("T")[0],
            end: mondayDate.toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari Senin setelah libur ${holiday.name} untuk mendapatkan 4 hari libur berturut-turut.`,
        })
      }

      // Option 2: Take Monday-Tuesday off (2 leave days)
      if (availableLeaveDays >= 2) {
        const mondayDate = new Date(holidayDate)
        mondayDate.setDate(holidayDate.getDate() + 3)
        const tuesdayDate = new Date(holidayDate)
        tuesdayDate.setDate(holidayDate.getDate() + 4)

        recommendations.push({
          id: `strategy-${index}-5b`,
          strategy: "Extended Weekend",
          leaveDates: [
            mondayDate.toISOString().split("T")[0],
            tuesdayDate.toISOString().split("T")[0]
          ],
          totalDays: 5, // Friday (holiday) + weekend + Monday (leave) + Tuesday (leave)
          holidayPeriod: {
            start: holidayDate.toISOString().split("T")[0],
            end: tuesdayDate.toISOString().split("T")[0],
          },
          description: `Ambil cuti pada hari Senin dan Selasa setelah libur ${holiday.name} untuk mendapatkan 5 hari libur berturut-turut.`,
        })
      }

      // Option 3: Take Monday-Friday off (5 leave days) for Super Long Vacation
      if (availableLeaveDays >= 5) {
        const mondayDate = new Date(holidayDate)
        mondayDate.setDate(holidayDate.getDate() + 3) // Skip weekend
        const tuesdayDate = new Date(holidayDate)
        tuesdayDate.setDate(holidayDate.getDate() + 4)
        const wednesdayDate = new Date(holidayDate)
        wednesdayDate.setDate(holidayDate.getDate() + 5)
        const thursdayDate = new Date(holidayDate)
        thursdayDate.setDate(holidayDate.getDate() + 6)
        const fridayDate = new Date(holidayDate)
        fridayDate.setDate(holidayDate.getDate() + 7)

        recommendations.push({
          id: `strategy-${index}-5c`,
          strategy: "Super Long Vacation",
          leaveDates: [
            mondayDate.toISOString().split("T")[0],
            tuesdayDate.toISOString().split("T")[0],
            wednesdayDate.toISOString().split("T")[0],
            thursdayDate.toISOString().split("T")[0],
            fridayDate.toISOString().split("T")[0]
          ],
          totalDays: 10, // Friday (holiday) + weekend + Monday-Friday (leave) + next weekend
          holidayPeriod: {
            start: holidayDate.toISOString().split("T")[0],
            end: new Date(holidayDate.getTime() + 9 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          },
          description: `Ambil cuti 5 hari pada hari Senin, Selasa, Rabu, Kamis, dan Jumat setelah libur ${holiday.name} untuk mendapatkan 10 hari libur berturut-turut.`,
        })
      }
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