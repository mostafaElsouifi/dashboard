<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <h1 class="page-title" style="font-size: 2rem; line-height: 0.5 !important">Dashboard</h1>
  <section class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <TableData
        v-if="items.length > 0"
        class="w-full sm:w-[100%] mb-20 mt-4"
        :is-history="false"
        :items="items"
        :current-machine="currentMachine"
        :machine1-status="machine1Status"
        :machine2-status="machine2Status"
        @emitMachine="handleMachineChange"
        @emitPDF="saveToPdf"
        @emitCSV="saveToCSV"
      />
      <div v-else class="text-5xl text-center text-gray-400 mt-20 md:text-3xl text-xs">There Is No Data To Display</div>
    </div>
    <div
      class="flex flex-wrap align-center justify-center md:flex-nowrap md:flex-row w-[100%] gap-4 sm:justify-between"
    >
      <ApexChart v-if="items.length > 0" id="chart1" class="w-[50%] w-full md:w-6/6" :data="productionOutputData" />
      <!-- <SpeedDynamicLineChart v-if="items.length > 0" id="Chart2" class="w-[50%] w-full md:w-3/6" :data="speedData" /> -->
    </div>
    <VaCard v-if="items.length > 0" class="mt-4">
      <h1 class="p-4 text-3xl">OEE</h1>
      <VaCardContent class="flex justify-center gap-20 w-full flex-wrap">
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="availabilityRef" description="Availability" />
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="performanceRef" description="Performance" />
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="qualityRef" description="Quality" />
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="oeeRef" description="OEE" />
      </VaCardContent>
    </VaCard>
    <section v-if="items.length > 0">
      <div class="flex flex-col p-4 bg-backgroundSecondary rounded-lg mt-10">
        <h3 class="h3 mb-5">Speed</h3>
        <div class="flex items-center gap-2 justify-center flex-wrap mt-7 ml-10">
          <VaTimeInput v-model="timeValue1" manual-input class="w-[40%] md:w-auto" />
          <VaTimeInput v-model="timeValue2" manual-input class="w-[40%] md:w-auto" />
          <button
            class="w-10 px-0 py-1 bg-transparent text-gray-500 -mt-1 -ml-3 hover:text-green-600 w-[15%]"
            @click="searchSpeed"
          >
            <span class="material-symbols-outlined">search</span>
          </button>
          <button
            class="px-0 py bg-transparent text-green-500 -mt-1 -ml-3 flex"
            :class="{ 'text-red-500': speedSwitcher === 0 }"
            @click="restartRealtimeSpeed"
          >
            <span class="material-icons text-3xl">bakery_dining</span>
            <span class="-ml-11 pt-5"> RealTime</span>
          </button>
        </div>
        <div class="md:w-full">
          <SpeedByTime2
            :work-orders="SpeedBytimeData"
            :min-date="speedBytime_min_date"
            :max-date="speedBytime_max_date"
          />
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import TableData from './cards/TableData.vue'
import ApexChart from './cards/ApexChart.vue'
// import SpeedDynamicLineChart from './cards/SpeedDynamicLineChart.vue'
import SpeedByTime2 from './cards/SpeedByTime2.vue'
import { realtimeDB2, db } from '../../../includes/firebase'
import { roundToTwoDecimalPlaces, getTodayName, convertDateStringToDate } from '../../../services/utils'
import useDatabaseStore from '../../../stores/data'
import { generatePDFReport } from '../../../services/toPDF3'
import { downloadAsCSV } from '../../../services/toCSV3'
import { VaCard, VaCardContent } from 'vuestic-ui'
import CircularProgressBar from '../../../components/CircularProgressBar.vue'
import { OEE, availability, performance, quality, totals } from '../../oee/oee_calculations.js'

const databaseStore = useDatabaseStore()
const currentMachine = ref(databaseStore.currentMachine)
const machine1Status = ref(0)
const machine2Status = ref(0)
const items = ref([])
const productionOutputData = ref([])
// const speedData = ref([])

const timeValue1 = ref(new Date())
const timeValue2 = ref(new Date())

const SpeedBytimeData = ref([])
const speedBytime_min_date = ref(convertDateStringToDate('2024-07-17/00:00:00'))
const speedBytime_max_date = ref(convertDateStringToDate('2024-07-17/10:50:00'))

const todayName = getTodayName()
const plannedProductionTime = ref(0)
const idealRunRate = ref(0)
const availabilityRef = ref(0)
const performanceRef = ref(0)
const qualityRef = ref(0)
const oeeRef = ref(0)

const speedSwitcher = ref(1)
const handleMachineChange = (machine) => {
  currentMachine.value = machine
  SpeedBytimeData.value = []
  fetchData()
}

const fetchData = async () => {
  await dbData()
  const itemsArray = []
  const outputDataArray = []
  // const speedArray = []

  let data
  if (currentMachine.value === 1) {
    data = await databaseStore.fetchRealtimeData('machine1')
  } else if (currentMachine.value === 2) {
    data = await databaseStore.fetchRealtimeData('machine2')
  }

  for (const id in data) {
    if (data[id]) {
      data[id].forEach((item, index) => {
        itemsArray.push({
          workorder: item['workorder']?.trim(),
          status: item['status']?.trim(),
          completed: item['completed']?.trim(),
          speed: roundToTwoDecimalPlaces(item['speed']),
          target: item['target'],
          quantity: roundToTwoDecimalPlaces(item['quantity']),
          reject: item['reject'],
          starttime: item['starttime']?.trim(),
          endtime: item['endtime']?.trim(),
          runninghour: roundToTwoDecimalPlaces(item['runninghour']),
          stoptimeE1: roundToTwoDecimalPlaces(item['stoptimeE1']),
          stoptimeE2: roundToTwoDecimalPlaces(item['stoptimeE2']),
          stoptimeE3: roundToTwoDecimalPlaces(item['stoptimeE3']),
          date: item['date']?.trim(),
        })
        outputDataArray.push({
          quantity: Math.floor(+item['quantity']),
          rejects: Math.floor(+item['reject']),
          time: item['date']?.split('/')[1],
          reference: `wo:${index + 1}`,
        })
        // speedArray.push({
        //   speed: Math.floor(roundToTwoDecimalPlaces(item['speed'])),
        //   time: item['date']?.split('/')[1],
        // })
      })
    }
  }

  items.value = itemsArray.reverse()
  productionOutputData.value = outputDataArray
  // speedData.value = speedArray

  const [machine1LastData, machine2LastData] = await getMachinesLastData()

  const isMachine1Running = machine1LastData?.slice(0, 12).some((item) => item['status']?.trim() === 'RUN') || 0
  const isMachine2Running = machine2LastData?.slice(0, 12).some((item) => item['status']?.trim() === 'RUN') || 0

  machine1Status.value = isMachine1Running ? 1 : 0
  machine2Status.value = isMachine2Running ? 1 : 0

  const [totalStopTime, totalCount, allQuantities] = totals(items.value.slice(0, 12))
  const runTime = plannedProductionTime.value - totalStopTime
  if (plannedProductionTime.value === 0) dbData()
  availabilityRef.value = availability(runTime, plannedProductionTime.value)
  performanceRef.value = performance(totalCount, runTime, idealRunRate.value)
  qualityRef.value = quality(allQuantities, totalCount)
  oeeRef.value = OEE(availabilityRef.value, performanceRef.value, qualityRef.value)

  speedChart()
}

const startListening = () => {
  let machineRef
  if (currentMachine.value === 1) {
    machineRef = realtimeDB2.ref('machine1')
  } else if (currentMachine.value === 2) {
    machineRef = realtimeDB2.ref('machine2')
  } else {
    throw new Error('Invalid machine reference')
  }

  machineRef.on('value', () => {
    dbData()
    fetchData()
  })
}

onMounted(() => {
  dbData()
  startListening()
  fetchData()
})

const dbData = async () => {
  await db
    .collection('OEE_IdealTime')
    .doc('value')
    .get()
    .then((doc) => {
      idealRunRate.value = doc.data()?.value
    })
  await db
    .collection('OEE_production_times')
    .doc(todayName)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data()
        if (data) {
          plannedProductionTime.value = +data.productionTime
        } else {
          console.log('No data available in document!')
        }
      } else {
        console.log('No such document!')
      }
    })
    .catch((error) => {
      console.error('Error fetching planned production time:', error)
    })
}

watch(currentMachine, () => {
  dbData()
  startListening()
  fetchData()
  speedChart()
})

onUnmounted(() => {
  let machineRef
  if (currentMachine.value === 1) {
    machineRef = realtimeDB2.ref('machine1')
  } else if (currentMachine.value === 2) {
    machineRef = realtimeDB2.ref('machine2')
  }
  if (machineRef) {
    machineRef.off()
  }
})

const getMachinesLastData = async () => {
  const machine1Data = await databaseStore.fetchRealtimeData('machine1')
  const machine2Data = await databaseStore.fetchRealtimeData('machine2')
  let machine1LastData = []
  let machine2LastData = []
  for (const id in machine1Data) {
    if (machine1Data[id]) {
      machine1LastData = machine1Data[id]
    }
  }
  for (const id in machine2Data) {
    if (machine2Data[id]) {
      machine2LastData = machine2Data[id]
    }
  }
  if (machine1LastData) {
    machine1LastData = machine1LastData.map((item) => {
      delete item['speed']
      delete item['completed']
      delete item['date']
      return item
    })
  }

  if (machine2LastData) {
    machine2LastData = machine2LastData.map((item) => {
      delete item['speed']
      delete item['completed']
      delete item['date']
      return item
    })
  }

  return [machine1LastData, machine2LastData]
}

const saveToCSV = async () => {
  const [machine1LastData, machine2LastData] = await getMachinesLastData()
  downloadAsCSV(machine1LastData, 'machine1', machine2LastData, 'machine2', 'report')
}

const saveToPdf = async () => {
  const machine1Data = await databaseStore.fetchRealtimeData('machine1')
  const machine2Data = await databaseStore.fetchRealtimeData('machine2')
  let machine1LastData = []
  let machine2LastData = []
  for (const id in machine1Data) {
    if (machine1Data[id]) {
      machine1LastData = machine1Data[id]
    }
  }
  for (const id in machine2Data) {
    if (machine2Data[id]) {
      machine2LastData = machine2Data[id]
    }
  }
  machine1LastData = machine1LastData.map((item) => {
    delete item['status']
    delete item['speed']
    delete item['completed']
    delete item['date']
    item['runninghour'] = roundToTwoDecimalPlaces(+item['runninghour'])
    item['stoptimeE1'] = roundToTwoDecimalPlaces(+item['stoptimeE1'])
    item['stoptimeE2'] = roundToTwoDecimalPlaces(+item['stoptimeE2'])
    item['stoptimeE3'] = roundToTwoDecimalPlaces(+item['stoptimeE3'])
    return item
  })
  machine2LastData = machine2LastData.map((item) => {
    delete item['status']
    delete item['speed']
    delete item['completed']
    delete item['date']
    item['runninghour'] = roundToTwoDecimalPlaces(+item['runninghour'])
    item['stoptimeE1'] = roundToTwoDecimalPlaces(+item['stoptimeE1'])
    item['stoptimeE2'] = roundToTwoDecimalPlaces(+item['stoptimeE2'])
    item['stoptimeE3'] = roundToTwoDecimalPlaces(+item['stoptimeE3'])
    return item
  })

  await generatePDFReport(machine1LastData, 'machine1', machine2LastData, 'machine2', new Date().toLocaleDateString())
}

const speedChart = () => {
  SpeedBytimeData.value = []
  if (speedSwitcher.value === 0) return
  if (items.value.length > 0) {
    const lastItemDate = getItemDate(items.value[0]['date'])
    const lastItemTime = items.value[0]['date']?.split('/')[1]
    const lastItemHours = lastItemTime?.split(':')[0]
    const lastItemMins = lastItemTime?.split(':')[1]

    speedBytime_max_date.value = lastItemDate
    speedBytime_min_date.value = getOneHourBefore(lastItemDate)

    for (let i = 0; i < items.value.length; i++) {
      const date = items.value[i]?.date
      if (!date) continue

      const timeSplit = date.split('/')[1]?.split(':')
      if (!timeSplit) continue

      const hours = +timeSplit[0]
      const minutes = +timeSplit[1]

      if (
        hours * 60 + minutes >= +lastItemHours * 60 - 60 + +lastItemMins &&
        hours * 60 + minutes <= +lastItemHours * 60 + +lastItemMins
      ) {
        const speed = items.value[i]?.speed
        const workorder = items.value[i]?.workorder
        if (speed !== undefined && workorder) {
          if (SpeedBytimeData.value.length === 12) {
            for (let j = 0; j < SpeedBytimeData.value.length; j++) {
              if (SpeedBytimeData.value[j].name === workorder) {
                SpeedBytimeData.value[j].data.unshift({
                  x: convertDateStringToDate(date).getTime(),
                  y: +speed,
                })
              }
            }
          } else {
            SpeedBytimeData.value.unshift({
              name: workorder,
              data: [{ x: convertDateStringToDate(date).getTime(), y: +speed }],
            })
          }
        }
      }
    }
  }
  console.log(SpeedBytimeData.value)
}

const getItemDate = (dateString) => {
  const splitedDate = dateString.split('/')
  return convertDateStringToDate(`${splitedDate[0]}/${splitedDate[1]}`)
}

const getOneHourBefore = (dateISO) => {
  const date = new Date(dateISO)
  const oneHourBefore = new Date(date.getTime() - 60 * 60 * 1000)
  return oneHourBefore
}

const searchSpeed = () => {
  speedSwitcher.value = 0
  const startTime = convertToTime(timeValue1.value)
  const startTime_hours = +startTime.split(':')[0]
  const startTime_minutes = +startTime.split(':')[1]
  const endTime = convertToTime(timeValue2.value)
  const endTime_hours = +endTime.split(':')[0]
  const endTime_minutes = +endTime.split(':')[1]
  SpeedBytimeData.value = []

  for (let i = 0; i < items.value.length; i++) {
    const date = items.value[i]?.date
    if (!date) continue

    const timeSplit = date.split('/')[1]?.split(':')
    if (!timeSplit) continue

    const hours = +timeSplit[0]
    const minutes = +timeSplit[1]

    if (
      hours * 60 + minutes >= startTime_hours * 60 + startTime_minutes &&
      hours * 60 + minutes <= endTime_hours * 60 + endTime_minutes
    ) {
      const speed = items.value[i]?.speed
      const workorder = items.value[i]?.workorder
      if (speed !== undefined && workorder) {
        if (SpeedBytimeData.value.length === 12) {
          let found = false
          for (let j = 0; j < SpeedBytimeData.value.length; j++) {
            if (SpeedBytimeData.value[j].name === workorder) {
              SpeedBytimeData.value[j].data.unshift({
                x: convertDateStringToDate(date).getTime(),
                y: +speed,
              })
              found = true
              break
            }
          }
          if (!found) {
            SpeedBytimeData.value.unshift({
              name: workorder,
              data: [{ x: convertDateStringToDate(date).getTime(), y: +speed }],
            })
          }
        } else {
          SpeedBytimeData.value.unshift({
            name: workorder,
            data: [{ x: convertDateStringToDate(date).getTime(), y: +speed }],
          })
        }
      }
    }
  }

  speedBytime_min_date.value = convertDateStringToDate(`${items.value[0]['date']?.split('/')[0]}/${startTime}:00`)
  speedBytime_max_date.value = convertDateStringToDate(`${items.value[0]['date']?.split('/')[0]}/${endTime}:00`)
}

const convertToTime = (dateString) => {
  if (!dateString) return '00:00'
  const date = new Date(dateString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const restartRealtimeSpeed = () => {
  speedSwitcher.value = 1
  speedChart()
}
</script>

<style scoped>
.search-button {
  width: 20px;
}
</style>
