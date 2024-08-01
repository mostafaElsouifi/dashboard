<template>
  <div>
    <div class="chart-container bg-chartBackground">
      <VueApexCharts
        v-if="series.length && chartOptions.xaxis.categories.length"
        :key="chartKey"
        type="bar"
        :options="chartOptions"
        :series="series"
        :height="chartHeight"
        class="bg-chartBackground"
        @mounted="chartMounted"
        @updated="chartUpdated"
        @error="chartError"
      />
      <div class="flex justify-center gap-3 buttons-container bg-chartBackground">
        <button :disabled="currentIndex === 0" class="bg-chartBackground" @click="scrollData(-1)">
          <span class="material-symbols-outlined text-chartText" :class="{ 'text-gray-500': currentIndex === 0 }"
            >arrow_back_ios</span
          >
        </button>
        <button :disabled="!nextEnabled" class="bg-chartBackground" @click="scrollData(1)">
          <span class="material-symbols-outlined text-chartText" :class="{ 'text-gray-500': !nextEnabled }"
            >arrow_forward_ios</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, defineProps, defineEmits, onMounted, watchEffect } from 'vue'
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
    id: 'stacked-bar',
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
  },
  xaxis: {
    type: 'category',
    categories: [],
    title: {
      text: 'Time',
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
    },
  },
  colors: ['#154ec1', '#DC2525'],
  legend: {
    position: 'top',
  },
  tooltip: {
    y: {
      formatter: (val, opts) => {
        const { seriesIndex, dataPointIndex } = opts
        const reference = series.value[seriesIndex].data[dataPointIndex].reference
        return `${val} / ${reference}`
      },
    },
  },
})

const chartKey = ref(0)
const pageSize = 12
const currentIndex = ref(0)
const series = ref([])

const nextEnabled = ref(false)

const chartHeight = ref('400px')

// Function to slice the data based on current index and page size
const sliceData = () => {
  const startIdx = currentIndex.value
  const endIdx = Math.min(startIdx + pageSize, props.data.length)
  const slicedData = props.data.slice(startIdx, endIdx)

  if (slicedData.length === 0) return

  const timeLabel = slicedData[0].time
  const quantities = slicedData.map((dataPoint) => ({
    x: dataPoint.time,
    y: dataPoint.quantity,
    reference: dataPoint.reference, // Adding reference to the data point
  }))
  const rejects = slicedData.map((dataPoint) => ({
    x: dataPoint.time,
    y: dataPoint.rejects,
    reference: dataPoint.reference, // Adding reference to the data point
  }))

  chartOptions.value.xaxis.categories = [timeLabel] // Set the single time label
  series.value = [
    { name: 'Quantity', data: quantities },
    { name: 'Rejects', data: rejects },
  ]
}

const updateChart = () => {
  sliceData()
  chartKey.value++
  emit('update:options', chartOptions.value)
}

// Watch for changes in data and update the chart accordingly
watch(
  () => props.data,
  () => {
    currentIndex.value = Math.floor((props.data.length - 1) / pageSize) * pageSize
    updateChart()
  },
  { immediate: true },
)

// Watch for changes in currentIndex and update currentSeries accordingly
watch(currentIndex, updateChart)

// Function to update the nextEnabled flag based on currentIndex
watchEffect(() => {
  nextEnabled.value = currentIndex.value + pageSize < props.data.length
})

// Function to scroll data
function scrollData(direction) {
  if (direction === -1 && currentIndex.value >= pageSize) {
    currentIndex.value -= pageSize
  } else if (direction === 1 && currentIndex.value + pageSize < props.data.length) {
    currentIndex.value += pageSize
  }
}

// Event handlers for debugging
const chartMounted = () => {
  console.log('Chart mounted successfully')
}

const chartUpdated = () => {
  console.log('Chart updated successfully')
}

const chartError = (error) => {
  console.error('Chart error:', error)
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
  currentIndex.value = Math.floor((props.data.length - 1) / pageSize) * pageSize
  updateChart()
})
</script>

<style scoped>
.chart-container {
  overflow-y: auto;
  /*background-color: white*/
  padding-top: 10px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

@media (max-width: 600px) {
  .chart-container {
    height: auto;
    /* Allow container to adjust based on content */
  }
}
</style>
