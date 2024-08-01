<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <h1 class="page-title" style="font-size: 1.5rem; line-height: 0.5 !important">History</h1>
  <div id="date-selector" class="flex flex-col gap-1 mt-5">
    <select v-model="selectedYear" name="year" class="bg-inputBackground p-2 text-xl focus:outline-none">
      <option value="" selected name="default">Select year</option>
      <option v-for="year in Object.keys(availableDates)" :key="year" :value="year">{{ year }}</option>
    </select>
    <Transition name="fade">
      <select
        v-if="selectedYear"
        v-model="selectedMonth"
        name="month"
        class="bg-inputBackground p-1 text-lg focus:outline-none"
      >
        <option value="" selected name="default">Select month</option>
        <option v-for="month in availableDates[selectedYear]" :key="month.name" :value="month.name">
          {{ month.name }}
        </option>
      </select>
    </Transition>
    <TransitionGroup v-if="selectedMonth && selectedYear" name="fade" tag="div" class="flex flex-wrap gap-3 mt-4">
      <DayCircle
        v-for="i in getDaysInMonth(selectedMonth)"
        :key="i"
        :class="{
          'bg-green-500 text-white': dayChosen === i,
          'bg-red-600 cursor-not-allowed hover:bg-red-500 text-white': !isDayAvailable(i),
          'bg-green-600 text-white hover:bg-green-500': isDayAvailable(i),
        }"
        :day="i"
        class="hover:bg-green-500 hover:text-white cursor-pointer"
        @click="isDayAvailable(i) ? selectDay(i) : null"
      />
    </TransitionGroup>
    <DataPreviewModal
      v-if="showModal"
      :day="dayChosen"
      :month="selectedMonth"
      :year="selectedYear"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DayCircle from '../../components/DayCircle.vue'
import DataPreviewModal from '../../components/DataPreviewModal.vue'
import { db } from '../../includes/firebase'
const availableDates = ref({})
const selectedYear = ref('')
const selectedMonth = ref('')
const dayChosen = ref(null) // State to keep track of the chosen day
const showModal = ref(false) // State to control the modal visibility
const allYears = ref([])
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

const selectDay = (day) => {
  dayChosen.value = day
  showModal.value = true
}

const fetchHistoryDates = async () => {
  const snapshot = await db.collection('machine1').get()
  snapshot.forEach((doc) => {
    const date = doc.id // Assuming the document ID is the date in 'YYYY-MM-DD' format
    const [year, month, day] = date.split('-')
    if (!availableDates.value[year]) {
      availableDates.value[year] = []
      allYears.value.push(year)
    }

    const monthIndex = parseInt(month, 10) - 1
    const monthName = months[monthIndex].name

    let monthEntry = availableDates.value[year].find((m) => m.name === monthName)
    if (!monthEntry) {
      monthEntry = { name: monthName, days: months[monthIndex].days, availableDays: [] }
      availableDates.value[year].push(monthEntry)
    }
    if (!monthEntry.availableDays.includes(parseInt(day, 10))) {
      monthEntry.availableDays.push(parseInt(day, 10))
    }
  })
}

const getDaysInMonth = (monthName) => {
  const month = months.find((m) => m.name === monthName)
  return month ? month.days : 0
}

const isDayAvailable = (day) => {
  if (!selectedYear.value || !selectedMonth.value) return false
  const monthEntry = availableDates.value[selectedYear.value].find((m) => m.name === selectedMonth.value)
  return monthEntry ? monthEntry.availableDays.includes(day) : false
}

onMounted(() => {
  fetchHistoryDates()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.cursor-not-allowed {
  cursor: not-allowed;
}
</style>
