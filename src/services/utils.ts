/* eslint-disable @typescript-eslint/no-unused-vars */
export const sleep = (ms = 0) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Validation */
export const validators = {
  email: (v: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(v) || 'Please enter a valid email address'
  },
  required: (v: any) => !!v || 'This field is required',
}

export const getCurrentDate = (): string => {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

export const getCurrentTime = (): string => {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
export const roundToTwoDecimalPlaces = (num: number | string): number => {
  // Convert the input to a number if it's a string
  const value = typeof num === 'string' ? parseFloat(num) : num

  // Round to two decimal places and return the result
  return parseFloat(value.toFixed(2))
}

export const getTodayName = (): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDayIndex = new Date().getDay()
  return days[currentDayIndex]
}

export const convertDateStringToDate = (dateString: string): Date => {
  // Split the string by "/" to separate date and time parts
  const [datePart, timePart] = dateString.split('/')

  // Split the date part by "-" to get year, month, and day
  const [year, month, day] = datePart.split('-').map(Number) // Use map(Number) to convert strings to numbers

  // Split the time part by ":" to get hours, minutes, and seconds
  const [hours, minutes, seconds] = timePart.split(':').map(Number) // Use map(Number) to convert strings to numbers

  // Create a new Date object using the parsed parts (note: months are 0-based in JavaScript)
  return new Date(year, month - 1, day, hours + 8, minutes, seconds)
}
