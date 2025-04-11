import type { Holiday } from "./types"

export const holidays2024: Holiday[] = [
  {
    date: "2024-01-01",
    name: "Tahun Baru 2024",
    type: "national",
  },
  {
    date: "2024-02-08",
    name: "Tahun Baru Imlek 2575",
    type: "religious",
  },
  {
    date: "2024-03-11",
    name: "Isra Mikraj Nabi Muhammad SAW",
    type: "religious",
  },
  {
    date: "2024-03-29",
    name: "Wafat Isa Al Masih",
    type: "religious",
  },
  {
    date: "2024-03-31",
    name: "Hari Raya Nyepi",
    type: "religious",
  },
  {
    date: "2024-04-10",
    name: "Hari Raya Idul Fitri 1445 H",
    type: "religious",
  },
  {
    date: "2024-04-11",
    name: "Hari Raya Idul Fitri 1445 H",
    type: "religious",
  },
  {
    date: "2024-05-01",
    name: "Hari Buruh Internasional",
    type: "national",
  },
  {
    date: "2024-05-09",
    name: "Kenaikan Isa Al Masih",
    type: "religious",
  },
  {
    date: "2024-05-23",
    name: "Hari Raya Waisak",
    type: "religious",
  },
  {
    date: "2024-06-01",
    name: "Hari Lahir Pancasila",
    type: "national",
  },
  {
    date: "2024-06-17",
    name: "Hari Raya Idul Adha 1445 H",
    type: "religious",
  },
  {
    date: "2024-07-07",
    name: "Tahun Baru Islam 1446 H",
    type: "religious",
  },
  {
    date: "2024-08-17",
    name: "Hari Kemerdekaan RI",
    type: "national",
  },
  {
    date: "2024-09-16",
    name: "Maulid Nabi Muhammad SAW",
    type: "religious",
  },
  {
    date: "2024-12-25",
    name: "Hari Raya Natal",
    type: "national",
  },
]

export const holidays2025: Holiday[] = [
  {
    date: "2025-01-01",
    name: "Tahun Baru 2025",
    type: "national",
  },
  {
    date: "2025-01-28",
    name: "Cuti Bersama Tahun Baru Imlek 2576",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-01-29",
    name: "Tahun Baru Imlek 2576",
    type: "religious",
  },
  {
    date: "2025-03-01",
    name: "Isra Mikraj Nabi Muhammad SAW",
    type: "religious",
  },
  {
    date: "2025-03-19",
    name: "Hari Raya Nyepi",
    type: "religious",
  },
  {
    date: "2025-03-28",
    name: "Cuti Bersama Hari Suci Nyepi",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-04-02",
    name: "Cuti Bersama Idul Fitri",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-04-03",
    name: "Cuti Bersama Idul Fitri",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-04-04",
    name: "Cuti Bersama Idul Fitri",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-04-07",
    name: "Cuti Bersama Idul Fitri",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-04-18",
    name: "Wafat Isa Al Masih",
    type: "religious",
  },
  {
    date: "2025-03-31",
    name: "Hari Raya Idul Fitri 1446 H",
    type: "religious",
  },
  {
    date: "2025-04-01",
    name: "Hari Raya Idul Fitri 1446 H",
    type: "religious",
  },
  {
    date: "2025-05-01",
    name: "Hari Buruh Internasional",
    type: "national",
  },
  {
    date: "2025-05-13",
    name: "Cuti Bersama Hari Raya Waisak",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-05-29",
    name: "Kenaikan Isa Al Masih",
    type: "religious",
  },
  {
    date: "2025-05-30",
    name: "Cuti Bersama Kenaikan Yesus Kristus",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-06-01",
    name: "Hari Lahir Pancasila",
    type: "national",
  },
  {
    date: "2025-06-09",
    name: "Cuti Bersama Idul Adha",
    type: "national",
    description: "Cuti Bersama BI",
  },
  {
    date: "2025-06-12",
    name: "Hari Raya Waisak",
    type: "religious",
  },
  {
    date: "2025-06-07",
    name: "Hari Raya Idul Adha 1446 H",
    type: "religious",
  },
  {
    date: "2025-06-27",
    name: "Tahun Baru Islam 1447 H",
    type: "religious",
  },
  {
    date: "2025-08-17",
    name: "Hari Kemerdekaan RI",
    type: "national",
  },
  {
    date: "2025-09-05",
    name: "Maulid Nabi Muhammad SAW",
    type: "religious",
  },
  {
    date: "2025-12-25",
    name: "Hari Raya Natal",
    type: "national",
  },
  {
    date: "2025-12-26",
    name: "Cuti Bersama Natal",
    type: "national",
    description: "Cuti Bersama BI",
  },
]

export function getHolidaysByYear(year: number): Holiday[] {
  if (year === 2024) return holidays2024
  if (year === 2025) return holidays2025
  return []
}
