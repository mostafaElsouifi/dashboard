// src/utils/exportToExcel.ts
import * as XLSX from 'xlsx'

// Helper function to flatten nested data
const flattenData = (obj: any, parentKey = '', res: Record<string, any> = {}): Record<string, any> => {
  for (const key in obj) {
    const propName = parentKey ? `${parentKey} ${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenData(obj[key], propName, res)
    } else {
      res[propName] = obj[key]
    }
  }
  return res
}

export const downloadAsCSV = (data: Record<string, any>[], fileName: string) => {
  const flatData: Record<string, any>[] = []
  const headers: Set<string> = new Set()

  // Process each entry in the data array
  data.forEach((entry) => {
    Object.entries(entry).forEach(([, machines]) => {
      Object.entries(machines).forEach(([machine, details]) => {
        // Flatten the details
        const flattenedDetails = flattenData(details)
        flatData.push({ machine, ...flattenedDetails })
        // Collect headers
        Object.keys(flattenedDetails).forEach((header) => headers.add(header))
      })
    })
  })

  // Order headers
  const orderedHeaders = [
    'work order',
    'status',
    'completed',
    'Avg speed m-in',
    'target',
    'quantity',
    'reject',
    'start time',
    'end time',
    'Running Hour',
    'Stop Time reason E1',
    'Stop Time reason E2',
    'Stop Time reason E3',
  ]

  const mainHeaders = ['Machine', ...orderedHeaders.filter((header) => headers.has(header))]
  const nestedHeaders = [
    'Machine',
    ...orderedHeaders.map((header) => (header.startsWith('Stop Time reason') ? header.split(' ')[2] : '')),
  ]

  const rows = flatData.map((row) => {
    return mainHeaders.map((header) => row[header] || '')
  })

  // Create a new workbook and a new worksheet
  const wb = XLSX.utils.book_new()
  const wsData = [mainHeaders, nestedHeaders, ...rows]
  const ws = XLSX.utils.aoa_to_sheet(wsData)

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Write the workbook to a file
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}
