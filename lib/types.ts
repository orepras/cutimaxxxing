export interface Holiday {
  date: string
  name: string
  type: "national" | "religious"
  description?: string
}

export interface LeaveRecommendation {
  id: string
  strategy: string
  leaveDates: string[]
  totalDays: number
  holidayPeriod: {
    start: string
    end: string
  }
  description: string
}

export interface LeaveCalculatorFormData {
  availableLeaveDays: number
  quarter?: "Q1" | "Q2" | "Q3" | "Q4"
  year: number
}

export type TemplateStyle = "formal" | "conversational" | "semi-formal" | "krama-inggil"

export interface LeaveApplicationData {
  name: string
  position: string
  department: string
  startDate: string
  endDate: string
  totalDays: number
  reason: string
  managerName: string
  companyName: string
  style: TemplateStyle
}
