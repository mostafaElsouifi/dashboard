/* eslint-disable prefer-const */
const availability = (runTime, plannedProductionTime) => {
  if (runTime === 0 || plannedProductionTime === 0) return 0
  return parseFloat(((runTime / plannedProductionTime) * 100).toFixed(1))
}

const runTime = (plannedProductionTime, stopTime) => {
  return plannedProductionTime - stopTime
}

const performance = (totalCount, runTime, idealRunRate) => {
  if (runTime === 0 || totalCount === 0) return 0
  return parseFloat(((totalCount / runTime / idealRunRate) * 100).toFixed(1))
}

const quality = (goodCount, totalCount) => {
  return parseFloat(((goodCount / totalCount) * 100).toFixed(1))
}
const totals = (dataArr) => {
  let totalStopTime = 0,
    totalCount = 0,
    allQauntites = 0,
    allRejects = 0
  for (let i = 0; i < dataArr.length; i++) {
    totalStopTime += +dataArr[i]['stoptimeE1']
    totalStopTime += +dataArr[i]['stoptimeE2']
    totalStopTime += +dataArr[i]['stoptimeE3']
    allQauntites += +dataArr[i]['quantity']
    allRejects += +dataArr[i]['reject']
  }

  totalCount = allQauntites + allRejects

  return [totalStopTime, totalCount, allQauntites, allRejects]
}

const OEE = (availability, performance, quality) => {
  return parseFloat((((((availability / 100) * performance) / 100) * quality) / 100) * 100).toFixed(2)
}
export { OEE, availability, runTime, performance, quality, totals }
