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

export async function generatePDFReport(
  machine1Data: Record<string, any>[],
  machine1Name: string,
  machine2Data: Record<string, any>[],
  machine2Name: string,
  dataDate: string,
) {
  const doc = new jsPDF('p', 'mm', 'a4')
  const margin = 10
  let yPosition = margin

  const addMachineTable = (data: Record<string, any>[], machineName: string) => {
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')

    const pageWidth = doc.internal.pageSize.getWidth()
    let rowsProcessed = 0

    while (rowsProcessed < data.length) {
      if (isNaN(yPosition)) {
        console.error('yPosition is NaN before adding machine header')
        yPosition = margin // Reset yPosition to margin if it's NaN
      }

      const machineHeaderY = yPosition + 5 // Adjust y-coordinate for vertical centering

      if (typeof machineName !== 'string' || typeof machineHeaderY !== 'number' || isNaN(machineHeaderY)) {
        console.error('Invalid arguments for text:', { machineName, machineHeaderY })
        return
      }

      console.log('Adding machine name header:', machineName, machineHeaderY)
      try {
        doc.text(machineName, pageWidth / 2, machineHeaderY, { align: 'center' })
      } catch (error) {
        console.error('Error adding text:', { machineName, pageWidth, machineHeaderY, error })
      }

      const lineY = machineHeaderY + 5
      doc.line(margin, lineY, pageWidth - margin, lineY) // Add the line

      const headers = [
        { title: 'NO', dataKey: 'no' },
        { title: 'Work Order', dataKey: 'workorder' },
        { title: 'Target', dataKey: 'target' },
        { title: 'Quantity', dataKey: 'quantity' },
        { title: 'Reject', dataKey: 'reject' },
        { title: 'Start Time', dataKey: 'starttime' },
        { title: 'End Time', dataKey: 'endtime' },
        { title: 'Running Hour', dataKey: 'runninghour' },
        { title: 'Stop Time E1', dataKey: 'stoptimeE1' },
        { title: 'Stop Time E2', dataKey: 'stoptimeE2' },
        { title: 'Stop Time E3', dataKey: 'stoptimeE3' },
      ]

      const rows = data.slice(rowsProcessed, rowsProcessed + 12).map((obj, index) => ({
        no: index + 1 + rowsProcessed,
        ...obj,
      }))

      console.log('Adding table for', machineName, rows)
      try {
        const tableResult = doc.autoTable({
          head: [headers.map((header) => header.title)],
          body: rows.map((row: Record<string, any>) => headers.map((header) => row[header.dataKey])), // Explicit type for row
          startY: lineY + 10, // Add extra space between the line and the table
          margin: { top: margin },
          styles: { fontSize: 6.5, fontStyle: 'normal' },
          headStyles: { fontSize: 6.5, fontStyle: 'normal' },
          bodyStyles: { fontSize: 6.5, fontStyle: 'bold' }, // Changed to normal font style for body
          didDrawPage: (data: { finalY: any }) => {
            console.log('Table drawn on page, finalY:', data.finalY)
          },
        })

        if (typeof tableResult.finalY !== 'number' || isNaN(tableResult.finalY)) {
          console.error('Invalid finalY from autoTable:', tableResult.finalY)
          yPosition = lineY + 20 // Reset yPosition to a valid value if it's NaN
        } else {
          yPosition = tableResult.finalY + 10 // Get the y position after the table
        }
      } catch (error) {
        console.error('Error adding table:', { error })
        yPosition = lineY + 20 // Reset yPosition to a valid value if an error occurs
      }

      console.log('New yPosition after adding table:', yPosition)

      rowsProcessed += 12

      if (rowsProcessed < data.length) {
        doc.addPage()
        yPosition = margin
      }
    }
  }

  const reportHeader = 'Report for Machines'
  const pageWidth = doc.internal.pageSize.getWidth()
  const reportHeaderY = margin + 5 // Adjust y-coordinate for vertical centering

  if (typeof reportHeader !== 'string' || typeof reportHeaderY !== 'number' || isNaN(reportHeaderY)) {
    console.error('Invalid arguments for text:', { reportHeader, reportHeaderY })
    return
  }

  console.log('Adding report header:', reportHeader, reportHeaderY)
  try {
    doc.text(reportHeader, pageWidth / 2, reportHeaderY, { align: 'center' })
  } catch (error) {
    console.error('Error adding text:', { reportHeader, pageWidth, reportHeaderY, error })
  }

  const currentDate = 'Date: ' + dataDate
  const currentDateY = reportHeaderY + 10 // Position below the report header

  if (typeof currentDate !== 'string' || typeof currentDateY !== 'number' || isNaN(currentDateY)) {
    console.error('Invalid arguments for text:', { currentDate, currentDateY })
    return
  }

  console.log('Adding date:', currentDate, currentDateY)
  try {
    doc.text(currentDate, pageWidth / 2, currentDateY, { align: 'center' })
  } catch (error) {
    console.error('Error adding text:', { currentDate, pageWidth, currentDateY, error })
  }

  const lineStartX = margin
  const lineEndX = pageWidth - margin
  const lineY = currentDateY + 5
  doc.line(lineStartX, lineY, lineEndX, lineY) // Add the line

  yPosition = lineY + 10 // Update yPosition

  if (isNaN(yPosition)) {
    console.error('yPosition is NaN before adding tables')
    yPosition = margin + 20 // Reset yPosition to a valid value if it's NaN
  }

  // Add table for machine 1
  addMachineTable(machine1Data, machine1Name)

  // Ensure the second table starts on a new page
  doc.addPage()
  yPosition = margin

  // Add table for machine 2
  addMachineTable(machine2Data, machine2Name)

  console.log('Saving PDF')
  doc.save('report.pdf')
}
