# Leave Calculator Rules

This document explains the rules and strategies used in the leave calculator to optimize holiday planning.

## Basic Concepts

- **Holiday Types**:
  - National Holidays (`type: "national"`)
  - Religious Holidays (`type: "religious"`)
  - Joint Leave/Cuti Bersama (`description: "Cuti Bersama BI"`)

- **Weekend Definition**:
  - Saturday and Sunday are considered weekends
  - Sunday is day 0, Saturday is day 6 in the calculation

## Filtering Rules

1. **Quarter-based Filtering**:
   - Q1: January, February, March (months 0-2)
   - Q2: April, May, June (months 3-5)
   - Q3: July, August, September (months 6-8)
   - Q4: October, November, December (months 9-11)

2. **Holiday Sorting**:
   - All holidays are sorted by date in ascending order
   - Cuti Bersama dates are considered in relation to their associated holidays

## Leave Strategies

### 1. Cuti Bersama Strategy
- If a holiday has an associated Cuti Bersama within 7 days:
  - Recommend taking leave on the Cuti Bersama date
  - Results in 4 days off (including weekend)
  - Takes priority over other strategies

### 2. Thursday Holiday Strategy (Long Weekend)
- When a holiday falls on Thursday:
  - Recommend taking Friday off
  - Results in 4 consecutive days off:
    * Thursday (Holiday)
    * Friday (Leave)
    * Saturday (Weekend)
    * Sunday (Weekend)

### 3. Tuesday Holiday Strategy (Long Weekend)
- When a holiday falls on Tuesday:
  - Recommend taking Monday off
  - Results in 4 consecutive days off:
    * Saturday (Weekend)
    * Sunday (Weekend)
    * Monday (Leave)
    * Tuesday (Holiday)

### 4. Wednesday Holiday Strategy (Super Long Vacation)
- When a holiday falls on Wednesday and user has ≥4 leave days:
  - Recommend taking Monday, Tuesday, Thursday, Friday off
  - Results in 9 consecutive days off:
    * Saturday (Weekend)
    * Sunday (Weekend)
    * Monday (Leave)
    * Tuesday (Leave)
    * Wednesday (Holiday)
    * Thursday (Leave)
    * Friday (Leave)
    * Saturday (Weekend)
    * Sunday (Weekend)

### 5. Monday Holiday Strategy (Super Long Vacation)
- When a holiday falls on Monday and user has ≥4 leave days:
  - Recommend taking Tuesday through Friday off
  - Results in 9 consecutive days off:
    * Saturday (Weekend)
    * Sunday (Weekend)
    * Monday (Holiday)
    * Tuesday (Leave)
    * Wednesday (Leave)
    * Thursday (Leave)
    * Friday (Leave)
    * Saturday (Weekend)
    * Sunday (Weekend)

### 6. Friday Holiday Strategy (Super Long Vacation)
- When a holiday falls on Friday and user has ≥4 leave days:
  - Recommend taking Monday through Thursday off next week
  - Results in 9 consecutive days off:
    * Friday (Holiday)
    * Saturday (Weekend)
    * Sunday (Weekend)
    * Monday (Leave)
    * Tuesday (Leave)
    * Wednesday (Leave)
    * Thursday (Leave)
    * Friday (Normal)
    * Saturday (Weekend)

## Recommendation Sorting

Recommendations are sorted based on efficiency:
1. Filter out recommendations that require more leave days than available
2. Calculate efficiency ratio = total days off / leave days used
3. Sort in descending order of efficiency
4. Present top recommendations to user

## Special Cases

1. **Connected Holidays**:
   - When holidays or Cuti Bersama are within 7 days of each other
   - System recommends taking leave days between them to create longer vacation periods

2. **Cuti Bersama Priority**:
   - If a holiday has an associated Cuti Bersama, the system prioritizes recommendations around the Cuti Bersama date
   - This helps align with official government and company leave policies

3. **Weekend Optimization**:
   - All strategies are designed to maximize the use of weekends
   - This ensures the most efficient use of leave days 