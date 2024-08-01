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

const processData = (data: Record<string, any>[], sheetName: string) => {
  const flatData: Record<string, any>[] = []
  const headers: Set<string> = new Set()

  // Process each entry in the data array
  data.forEach((entry) => {
    const flattenedEntry = flattenData(entry)
    flatData.push(flattenedEntry)
    // Collect headers
    Object.keys(flattenedEntry).forEach((header) => headers.add(header))
  })

  // Order headers
  const orderedHeaders = [
    'workorder',
    'target',
    'quantity',
    'reject',
    'starttime',
    'endtime',
    'runninghour',
    'stoptimeE1',
    'stoptimeE2',
    'stoptimeE3',
  ]

  const mainHeaders = [...orderedHeaders.filter((header) => headers.has(header))]
  const rows = flatData.map((row) => {
    return mainHeaders.map((header) => (header in row ? row[header] : ''))
  })

  // Create a new worksheet
  const wsData = [mainHeaders, ...rows]
  const ws = XLSX.utils.aoa_to_sheet(wsData)

  return { ws, sheetName }
}

export const downloadAsCSV = (
  data1: Record<string, any>[],
  sheetName1: string,
  data2: Record<string, any>[],
  sheetName2: string,
  fileName: string,
) => {
  const wb = XLSX.utils.book_new()

  const { ws: ws1, sheetName: name1 } = processData(data1, sheetName1)
  const { ws: ws2, sheetName: name2 } = processData(data2, sheetName2)

  // Append the worksheets to the workbook
  XLSX.utils.book_append_sheet(wb, ws1, name1)
  XLSX.utils.book_append_sheet(wb, ws2, name2)

  // Write the workbook to a file
  XLSX.writeFile(wb, `${fileName}.xlsx`)
}
