<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <VaModal v-model="isOpen" fullscreen hide-default-actions>
    <template #default>
      <div class="p-4 flex gap-5">
        {{ `Date : ${year} - ${month} - ${day}` }}
      </div>
      <TableData
        :items="items"
        :current-machine="currentMachine"
        :is-history="true"
        @emitMachine="handleMachineChange"
        @emitPDF="saveToPdf"
        @emitCSV="saveToCSV"
      />
      <div class="flex items-center gap-2 justify-center flex-wrap mt-7 ml-10">
        <VaTimeInput v-model="timeValue1" manual-input class="w-[40%] md:w-auto" />
        <VaTimeInput v-model="timeValue2" manual-input class="w-[40%] md:w-auto" />
        <button
          class="w-10 px-0 py-1 bg-transparent text-gray-500 -mt-1 -ml-3 hover:text-green-600 w-[15%]"
          @click="searchSpeed"
        >
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
      <div id="speed-chart" class="md:w-full">
        <SpeedByTime2
          :work-orders="SpeedBytimeData"
          :min-date="speedBytime_min_date"
          :max-date="speedBytime_max_date"
        />
      </div>
    </template>
  </VaModal>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { VaModal } from 'vuestic-ui'
import TableData from '../pages/admin/dashboard/cards/TableData.vue'
import { db } from '../includes/firebase'
import SpeedByTime2 from '../pages/admin/dashboard/cards/SpeedByTime2.vue'
import { convertDateStringToDate, roundToTwoDecimalPlaces } from '../services/utils'
import { generatePDFReport } from '../services/toPDF3'
import { downloadAsCSV } from '../services/toCSV3'
const timeValue1 = ref(new Date())
const timeValue2 = ref(new Date())

const SpeedBytimeData = ref([])
const speedBytime_min_date = ref(convertDateStringToDate(`2024-7-17/06:00:00`))
const speedBytime_max_date = ref(convertDateStringToDate('2024-7-17/10:50:00'))
const months = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 },
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 },
]

const props = defineProps({
  day: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
})

const machine1Data = ref([])
const machine2Data = ref([])
const items = ref([])
const currentMachine = ref(1)
const isOpen = ref(true)

watch(
  () => props.day,
  (newVal) => {
    if (newVal) {
      isOpen.value = true
    }
  },
)

onMounted(async () => {
  await fetchMachineData()
  updateItems()
})

watch(currentMachine, async () => {
  if (currentMachine.value === 2 && machine2Data.value.length === 0) {
    await fetchMachineData()
  }
  updateItems()
})

const fetchMachineData = async () => {
  const monthNumber = findMonthIndex(props.month) + 1

  try {
    const machine1DataPromises = [
      fetchData('machine1', `${props.year}-${monthNumber}-${props.day}-0`),
      fetchData('machine1', `${props.year}-${monthNumber}-${props.day}-1`),
      fetchData('machine1', `${props.year}-${monthNumber}-${props.day}-2`),
      fetchData('machine1', `${props.year}-${monthNumber}-${props.day}-3`),
      fetchData('machine1', `${props.year}-${monthNumber}-${props.day}-4`),
      fetchData('machine1', `${props.year}-${monthNumber}-${props.day}-5`),
    ]

    const machine1Results = await Promise.all(machine1DataPromises)
    machine1Data.value = machine1Results.flatMap((result) => result?.data ?? [])
    machine1Data.value = machine1Data.value.reverse()

    machine1Data.value.forEach((item) => {
      item['speed'] = roundToTwoDecimalPlaces(item['speed'])
      item['runninghour'] = roundToTwoDecimalPlaces(item['runninghour'])
      item['stoptimeE1'] = roundToTwoDecimalPlaces(item['stoptimeE1'])
      item['stoptimeE2'] = roundToTwoDecimalPlaces(item['stoptimeE2'])
      item['stoptimeE3'] = roundToTwoDecimalPlaces(item['stoptimeE3'])
      item['quantity'] = roundToTwoDecimalPlaces(item['quantity'])
    })
    const machine2DataPromises = [
      fetchData('machine2', `${props.year}-${monthNumber}-${props.day}-0`),
      fetchData('machine2', `${props.year}-${monthNumber}-${props.day}-1`),
      fetchData('machine2', `${props.year}-${monthNumber}-${props.day}-2`),
      fetchData('machine2', `${props.year}-${monthNumber}-${props.day}-3`),
      fetchData('machine2', `${props.year}-${monthNumber}-${props.day}-4`),
      fetchData('machine2', `${props.year}-${monthNumber}-${props.day}-5`),
    ]

    const machine2Results = await Promise.all(machine2DataPromises)
    machine2Data.value = machine2Results.flatMap((result) => result?.data ?? [])
    machine2Data.value = machine2Data.value.reverse()
    machine2Data.value.forEach((item) => {
      item['speed'] = roundToTwoDecimalPlaces(item['speed'])
      item['runninghour'] = roundToTwoDecimalPlaces(item['runninghour'])
      item['stoptimeE1'] = roundToTwoDecimalPlaces(item['stoptimeE1'])
      item['stoptimeE2'] = roundToTwoDecimalPlaces(item['stoptimeE2'])
      item['stoptimeE3'] = roundToTwoDecimalPlaces(item['stoptimeE3'])
      item['quantity'] = roundToTwoDecimalPlaces(item['quantity'])
    })
  } catch (e) {
    console.log(e)
  }
}

const fetchData = async (machine, date) => {
  try {
    const doc = await db.collection(machine).doc(date).get()
    if (doc.exists) {
      return doc.data()
    } else {
      console.log('No such document!')
      return null
    }
  } catch (error) {
    console.error('Error fetching document:', error)
    return null
  }
}

const findMonthIndex = (monthName) => {
  return months.findIndex((month) => month.name === monthName)
}

const updateItems = () => {
  if (currentMachine.value === 1) {
    items.value = machine1Data.value
    console.log(items.value[0]['date'])
  } else if (currentMachine.value === 2) {
    items.value = machine2Data.value
    console.log(items.value[0]['date'])
  }
}

const handleMachineChange = async (machine) => {
  currentMachine.value = machine
  if (machine === 2 && machine2Data.value.length === 0) {
    await fetchMachineData()
  }
  updateItems()
}

const searchSpeed = () => {
  let currentMonth = ''
  months.forEach((m, i) => {
    if (m.name === props.month) currentMonth = i + 1
  })
  const startTime = convertToTime(timeValue1.value)
  const startTime_hours = +startTime.split(':')[0]
  const startTime_minutes = +startTime.split(':')[1]
  const endTime = convertToTime(timeValue2.value)
  const endTime_hours = +endTime.split(':')[0]
  const endTime_minutes = +endTime.split(':')[1]
  SpeedBytimeData.value = []

  for (let i = 0; i < items.value.length; i++) {
    const hours = +items.value[i]['date'].split('/')[1].split(':')[0]
    const minutes = +items.value[i]['date'].split('/')[1].split(':')[2]
    //console.log(`${hours}:${minutes} - ${startTime_hours} : ${startTime_minutes}`)
    if (
      hours * 60 + minutes >= startTime_hours * 60 + startTime_minutes &&
      hours * 60 + minutes <= endTime_hours * 60 + endTime_minutes
    ) {
      if (SpeedBytimeData.value.length === 12) {
        for (let j = 0; j < SpeedBytimeData.value.length; j++) {
          if (SpeedBytimeData.value[j].name === items.value[i]['workorder']) {
            SpeedBytimeData.value[j].data.unshift({
              x: convertDateStringToDate(items.value[i]['date']).getTime(),
              y: +items.value[i]['speed'],
            })
          }
        }
      } else {
        SpeedBytimeData.value.unshift({
          name: items.value[i]['workorder'],
          data: [{ x: convertDateStringToDate(items.value[i]['date']).getTime(), y: +items.value[i]['speed'] }],
        })
      }
    }
  }

  speedBytime_min_date.value = convertDateStringToDate(`${props.year}-${currentMonth}-${props.day}/${startTime}:00`)
  speedBytime_max_date.value = convertDateStringToDate(`${props.year}-${currentMonth}-${props.day}/${endTime}:00`)
}

// function to conver date to a time
const convertToTime = (dateString) => {
  const date = new Date(dateString)
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const saveToPdf = async () => {
  let machine1 = machine1Data.value
  let machine2 = machine2Data.value
  machine1 = machine1.slice(-12).reverse()
  machine2 = machine2.slice(-12).reverse()
  const date = new Date(machine1[0]['date'].split('/')[0]).toLocaleDateString()
  await generatePDFReport(machine1, 'machine1', machine2, 'machine2', date)
}
const saveToCSV = async () => {
  let machine1 = machine1Data.value
  let machine2 = machine2Data.value
  machine1 = machine1.slice(-12).reverse()
  machine2 = machine2.slice(-12).reverse()

  downloadAsCSV(machine1, 'machine1', machine2, 'machine2', 'report')
}
</script>

<style scoped>
.p-4 {
  padding: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.active-machine {
  font-weight: bold;
}
</style>
