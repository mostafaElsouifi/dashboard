// src/utils/reportGenerator.ts
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import 'jspdf-autotable' // Import to add autoTable to jsPDF

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => { finalY: number }
  }
}

export async function captureScreenshot(selector: string): Promise<string> {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Element not found for selector: ${selector}`)
  }
  const canvas = await html2canvas(element as HTMLElement)
  return canvas.toDataURL('image/png')
}

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

export async function generatePDFReport(data: Record<string, any>[], selectors: string[]) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const margin = 10
  let yPosition = margin

  // Add table of data
  if (data.length > 0) {
    // Flatten the first item to get the headers
    const flatData = data.map((item) => flattenData(item))
    const headers = Object.keys(flatData[0]).map((key) => ({ title: key, dataKey: key }))
    const rows = flatData.map((obj) => Object.values(obj))

    const tableResult = doc.autoTable({
      head: [headers.map((header) => header.title)],
      body: rows,
      startY: yPosition,
      margin: { top: margin },
      styles: { fontSize: 8 },
    })

    yPosition = tableResult.finalY + 10 // Get the y position after the table
  }

  // Capture and add screenshots
  if (selectors.length > 0) {
    const screenshotHeight = (297 - 2 * margin - 10) / 2 // A4 height is 297mm
    const screenshotWidth = 210 - 2 * margin // A4 width is 210mm

    for (let i = 0; i < selectors.length; i += 2) {
      const firstSelector = selectors[i]
      const secondSelector = selectors[i + 1]

      const firstImgData = await captureScreenshot(firstSelector)
      const secondImgData = secondSelector ? await captureScreenshot(secondSelector) : null

      doc.addPage()
      doc.addImage(firstImgData, 'PNG', margin, margin, screenshotWidth, screenshotHeight)
      if (secondImgData) {
        doc.addImage(secondImgData, 'PNG', margin, margin + screenshotHeight + 10, screenshotWidth, screenshotHeight)
      }
    }
  }

  // Save the PDF
  doc.save('report.pdf')
}
