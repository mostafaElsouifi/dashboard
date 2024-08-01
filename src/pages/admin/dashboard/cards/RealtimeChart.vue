<template>
  <div>
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import Chart from 'chart.js/auto'
import 'chartjs-adapter-date-fns' // Import the date adapter

// Define props
const props = defineProps({
  speeds: {
    type: Array,
    required: true,
  },
})

const canvasRef = ref(null)
let myChart = null

const MAX_DATA_POINTS = 12 // Keep only the latest 12 data points

// Static colors for the labels
const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(199, 199, 199, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(255, 56, 96, 1)',
  'rgba(34, 204, 112, 1)',
  'rgba(153, 152, 204, 1)',
  'rgba(255, 102, 204, 1)',
]

const data = {
  labels: [], // Timestamps
  datasets: Array.from({ length: 12 }, (_, i) => ({
    label: `Work Order ${i + 1}`,
    borderColor: colors[i],
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fill: false,
    data: [], // Speed values
  })),
}

const options = {
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'second',
        tooltipFormat: 'HH:mm:ss',
        displayFormats: {
          second: 'HH:mm:ss',
        },
      },
      title: {
        display: true,
        text: 'Time',
      },
    },
    y: {
      beginAtZero: true,
      suggestedMax: 100,
      title: {
        display: true,
        text: 'Speed',
      },
    },
  },
  animation: {
    duration: 0, // for smoother transitions
  },
  plugins: {
    legend: {
      display: true,
    },
  },
}

function addData(speeds) {
  const now = new Date()
  data.labels.push(now)

  // Set the speed values from props if the time matches, otherwise set to 0
  data.datasets.forEach((dataset, index) => {
    const speed = speeds.find((s) => new Date(s.time).getTime() === now.getTime())?.values[index] ?? 0
    dataset.data.push(speed)
  })

  // Keep only the latest 12 data points
  if (data.labels.length > MAX_DATA_POINTS) {
    data.labels.shift()
    data.datasets.forEach((dataset) => dataset.data.shift())
  }

  myChart.update()
}

// Watch for changes in props and update the chart accordingly
watch(
  () => props.speeds,
  (newSpeeds) => {
    if (myChart) {
      addData(newSpeeds)
    }
  },
)

onMounted(() => {
  nextTick(() => {
    if (canvasRef.value) {
      myChart = new Chart(canvasRef.value.getContext('2d'), {
        type: 'line',
        data: data,
        options: options,
      })
      setInterval(() => addData(props.speeds), 1000) // Update every second
    } else {
      console.error('Canvas reference is not available.')
    }
  })
})
</script>

<style scoped>
div {
  width: 100% !important;
  /* Adjust width as needed */
  height: 600px;
  /* Adjust height as needed */
}
</style>
