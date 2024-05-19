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
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentDate = new Date()

  // Get day of the week, month, day, and year
  const dayOfWeek = daysOfWeek[currentDate.getDay()]
  const month = months[currentDate.getMonth()]
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()

  // Format the date string
  const formattedDate = `${dayOfWeek.toUpperCase()} - ${day}/${currentDate.getMonth() + 1}/${year}`

  return formattedDate
}
