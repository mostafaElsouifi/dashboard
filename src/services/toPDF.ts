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

export async function generatePDFReport(data: Record<string, any>[], selectors: string[]) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const margin = 10
  let yPosition = margin

  // Set global styles
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  const specificWidth = 50
  // Add top header: Report for Machine 1
  const reportHeader = 'Report for Machine 1'
  //  const reportHeaderWidth = doc.getStringUnitWidth(reportHeader) * 10 // Calculate width in mm
  const pageWidth = doc.internal.pageSize.getWidth()
  const reportHeaderX = (pageWidth - specificWidth) / 2 // Center position for the text
  const reportHeaderY = margin + 5 // Adjust y-coordinate for vertical centering
  doc.text(reportHeader, reportHeaderX, reportHeaderY)

  // Add date centered below the report header
  const currentDate = 'Date: ' + new Date().toLocaleDateString()
  // const currentDateWidth = doc.getStringUnitWidth(currentDate) * 10 // Calculate width in mm
  const currentDateX = (pageWidth - specificWidth + 5) / 2 // Center position for the date
  const currentDateY = reportHeaderY + 10 // Position below the report header
  doc.text(currentDate, currentDateX, currentDateY)

  // Add a line below the date
  const lineStartX = margin
  const lineEndX = pageWidth - margin
  const lineY = currentDateY + 5
  doc.line(lineStartX, lineY, lineEndX, lineY) // Add the line

  // Add table of data
  if (data.length > 0) {
    const headers = [
      { title: 'NO', dataKey: 'no' },
      ...Object.keys(data[0]).map((key) => ({ title: key, dataKey: key })),
    ]
    const rows = data.map((obj, index) => ({ no: index + 1, ...obj })) // Explicit type for row

    const tableResult = doc.autoTable({
      head: [headers.map((header) => header.title)],
      body: rows.map((row: Record<string, any>) => headers.map((header) => row[header.dataKey])), // Explicit type for row
      startY: yPosition + 30, // Add extra space between the line and the table
      margin: { top: margin },
      styles: { fontSize: 6.5, fontStyle: 'normal' },
      headStyles: { fontSize: 6.5, fontStyle: 'normal' },
      bodyStyles: { fontSize: 6.5, fontStyle: 'bold' }, // Changed to normal font style for body
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
