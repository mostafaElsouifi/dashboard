<template>
  <div v-if="chartReady">
    <div class="chart-container">
      <VueApexCharts :key="chartKey" type="line" :options="chartOptions" :series="series" :height="chartHeight" />
      <div class="flex justify-center gap-3">
        <button :disabled="currentIndex === 0" class="bg-white" @click="scrollData(-1)">
          <span class="material-symbols-outlined text-black" :class="{ 'text-gray-300': currentIndex === 0 }"
            >arrow_back_ios</span
          >
        </button>
        <button :disabled="!nextEnabled" class="bg-white" @click="scrollData(1)">
          <span class="material-symbols-outlined text-black" :class="{ 'text-gray-300': !nextEnabled }"
            >arrow_forward_ios</span
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, nextTick } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['update:options'])

const chartOptions = ref({
  chart: {
    id: 'line-chart',
    type: 'line',
    toolbar: {
      show: false,
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true,
      },
    },
  },
  xaxis: {
    type: 'category',
    categories: [],
    title: {
      text: 'Start Time',
    },
  },
  yaxis: {
    title: {
      text: 'Speed',
    },
  },
  stroke: {
    curve: 'smooth',
    dashArray: Array(12).fill(4), // Create an array of 12 elements, all set to 4 for dashed lines
  },
  legend: {
    position: 'top',
  },
})

const chartKey = ref(0)
const pageSize = ref(12)
const currentIndex = ref(0)
const series = ref([])
const chartReady = ref(false)
const chartHeight = ref('400px')

const nextEnabled = ref(false)

// Function to slice the data based on current index and page size
const sliceData = () => {
  const startIdx = currentIndex.value
  const endIdx = Math.min(startIdx + pageSize.value, props.data.length)
  const slicedData = props.data.slice(startIdx, endIdx)
  const categories = slicedData.map((dataPoint) => dataPoint.time)

  // Prepare series data for 12 work orders
  const seriesData = []
  for (let i = 0; i < 12; i++) {
    const speeds = slicedData.map((dataPoint) => dataPoint[`speed${i + 1}`] || 0)
    seriesData.push({ name: `Work Order ${i + 1}`, data: speeds })
  }

  chartOptions.value.xaxis.categories = categories
  series.value = seriesData
}

const updateChart = () => {
  sliceData()
  chartKey.value++
  emit('update:options', chartOptions.value)
  chartReady.value = true
}

// Watch for changes in data and update the chart accordingly
watch(
  () => props.data,
  () => {
    currentIndex.value = Math.floor((props.data.length - 1) / pageSize.value) * pageSize.value
    nextTick(updateChart)
  },
  { immediate: true },
)

// Watch for changes in currentIndex and update currentSeries accordingly
watch(currentIndex, updateChart)

// Function to update the nextEnabled flag based on currentIndex
watch(
  currentIndex,
  (newValue) => {
    nextEnabled.value = newValue + pageSize.value < props.data.length
  },
  { immediate: true },
)

// Function to scroll data
function scrollData(direction) {
  if (direction === -1 && currentIndex.value >= pageSize.value) {
    currentIndex.value -= pageSize.value
  } else if (direction === 1 && currentIndex.value + pageSize.value < props.data.length) {
    currentIndex.value += pageSize.value
  }
}

// Function to adjust chart height based on screen width
const adjustChartHeight = () => {
  if (window.innerWidth <= 600) {
    chartHeight.value = '400px' // Increase the height for mobile screens
  } else {
    chartHeight.value = '400px' // Default height for larger screens
  }
}

// Add event listener to adjust chart height on window resize
window.addEventListener('resize', adjustChartHeight)

// Initial call to set the chart height
adjustChartHeight()

// Fetch data when the component is mounted and set currentIndex to show the last page of data
onMounted(() => {
  currentIndex.value = Math.floor((props.data.length - 1) / pageSize.value) * pageSize.value
  nextTick(updateChart)
})
</script>

<style scoped>
.chart-container {
  overflow-y: auto;
  background-color: white;
  padding-top: 10px;
}
</style>
