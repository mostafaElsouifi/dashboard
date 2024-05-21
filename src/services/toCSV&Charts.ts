// src/utils/reportGenerator.ts
import html2canvas from 'html2canvas'
import * as XLSX from 'xlsx'

export async function captureScreenshot(selector: string): Promise<string> {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found for selector: ${selector}`)
  }
  const canvas = await html2canvas(element as HTMLElement)
  return canvas.toDataURL('image/png')
}

export async function generateReport(data: Record<string, any>[], selectors: string[]) {
  if (data.length === 0) {
    throw new Error('No data provided')
  }

  // Generate headers from the keys of the first object
  const headers = Object.keys(data[0])
  const rows = data.map((obj) => Object.values(obj))

  const workbook = XLSX.utils.book_new()
  const worksheetData = [headers, ...rows]
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data')

  for (const [index, selector] of selectors.entries()) {
    try {
      const imgData = await captureScreenshot(selector)
      const img = new Image()
      img.src = imgData

      // Wait for image to load to get its dimensions
      await new Promise((resolve, reject) => {
        img.onload = () => {
          const ws = workbook.Sheets['Data']
          const cellRef = XLSX.utils.encode_cell({ c: 0, r: rows.length + index + 2 })
          ws[cellRef] = { t: 's', v: 'Image' }

          // Add the image to the worksheet
          const imgCellRef = XLSX.utils.encode_cell({ c: 1, r: rows.length + index + 2 })
          ws[imgCellRef] = { t: 's', v: imgData }
          resolve(true)
        }
        img.onerror = () => {
          reject(new Error('Image loading failed'))
        }
      })
    } catch (error) {
      console.error(`Failed to capture screenshot for selector: ${selector}`, error)
    }
  }

  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([wbout], { type: 'application/octet-stream' })

  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'report.xlsx'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}
