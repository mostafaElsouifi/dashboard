<template>
  <div id="wrapper">
    <div id="chart-line2">
      <VueApexCharts key="chart2" type="line" height="350" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { defineProps } from 'vue'

const props = defineProps({
  workOrders: {
    type: Array,
    default: () => [],
  },
  minDate: {
    type: Date,
    default: () => new Date(),
  },
  maxDate: {
    type: Date,
    default: () => new Date(),
  },
  xaxisFormat: {
    type: Object,
    default: () => ({
      type: 'datetime',
      labels: {
        format: 'HH:mm',
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
          hour: 'HH:mm',
        },
      },
    }),
  },
})

const series = ref([])
const chartOptions = ref({
  chart: {
    id: 'chart2',
    type: 'line',
    height: 350,
    dropShadow: {
      enabled: true,
      enabledOnSeries: [1],
    },
    toolbar: {
      autoSelected: 'pan',
      show: false,
    },
  },
  colors: [
    '#008FFB',
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
    '#546E7A',
    '#26A69A',
    '#D10CE8',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFA500',
  ],
  stroke: {
    width: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    curve: 'straight',
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: [1, 0.75],
  },
  markers: {
    size: 0,
  },
  yaxis: {
    labels: {
      style: {
        colors: '#008FFB',
      },
    },
    title: {
      text: 'Speed',
      style: {
        color: '#008FFB',
      },
    },
  },
  xaxis: {
    ...props.xaxisFormat,
    min: props.minDate.getTime(),
    max: props.maxDate.getTime(),
  },
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'center',
  },
  tooltip: {
    x: {
      format: 'HH:mm',
    },
  },
})

// Watch for changes in props and update series and chart options
watch(
  [() => props.workOrders, () => props.minDate, () => props.maxDate],
  ([newWorkOrders, newMinDate, newMaxDate]) => {
    series.value = newWorkOrders
    chartOptions.value = {
      ...chartOptions.value,
      xaxis: {
        ...chartOptions.value.xaxis,
        min: newMinDate.getTime(),
        max: newMaxDate.getTime(),
      },
    }
  },
  { immediate: true },
)

onMounted(() => {
  series.value = props.workOrders
  chartOptions.value.xaxis.min = props.minDate.getTime()
  chartOptions.value.xaxis.max = props.maxDate.getTime()
})
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#chart-line2,
#chart-line {
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
}
</style>
