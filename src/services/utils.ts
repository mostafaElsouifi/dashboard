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

  // Get day, month, and year
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1 // Months are zero-based, so add 1
  const year = currentDate.getFullYear()

  // Format the date string as "day-month-year"
  const formattedDate = `${day}-${month}-${year}`

  return formattedDate
}
