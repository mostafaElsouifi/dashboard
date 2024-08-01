<template>
  <div id="chart">
    <VueApexCharts type="line" height="350" :options="chartOptions" :series="series"></VueApexCharts>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

// Register the component
const series = ref([
  {
    type: 'line',
    name: 'Work Order 1',
    data: [
      { x: '8:00 AM', y: 600 },
      { x: '8:00 AM', y: 700 },

      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 200 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 190 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 2',
    data: [
      { x: '8:00 AM', y: 0 },
      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 3',
    data: [
      { x: '8:00 AM', y: 0 },

      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 900 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 4',
    data: [
      { x: '8:00 AM', y: 0 },

      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 100 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 5',
    data: [
      { x: '8:00 AM', y: 99 },

      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 800 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 6',
    data: [
      { x: '8:00 AM', y: 0 },

      { x: '', y: 0 },
      { x: '9:00 AM', y: 920 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 5 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 7',
    data: [
      { x: '8:00 AM', y: 0 },

      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 1300 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 8',
    data: [
      { x: '8:00 AM', y: 0 },
      { x: '', y: 190 },

      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 9',
    data: [
      { x: '8:00 AM', y: 0 },
      { x: '', y: 77 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 10',
    data: [
      { x: '8:00 AM', y: 0 },
      { x: '', y: 0 },

      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 11',
    data: [
      { x: '8:00 AM', y: 0 },
      { x: '', y: 5 },
      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
  {
    type: 'line',
    name: 'Work Order 12',
    data: [
      { x: '8:00 AM', y: 0 },
      { x: '', y: 0 },
      { x: '9:00 AM', y: 0 },
      { x: '10:00 AM', y: 0 },
      { x: '10:30 AM', y: 0 },
      { x: '11:00 AM', y: 0 },
      { x: '11:30 AM', y: 0 },
      { x: '12:00 PM', y: 0 },
    ],
  },
])

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'line',
    animations: {
      speed: 500,
    },
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
  colors: [
    '#d4526e',
    '#33b2df',
    '#d4526e',
    '#33b2df',
    '#941E1E',
    '#337C13',
    '#153756',
    '#6749B2',
    '#FB9803',
    '#DDDD01',
    '#EC9F9F',
    '#4090D9',
  ],
  dataLabels: {
    enabled: false,
  },
  fill: {
    opacity: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  stroke: {
    curve: 'straight',
    width: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
  },
  legend: {
    show: false,
    customLegendItems: [
      'Work Order 1',
      'Work Order 2',
      'Work Order 3',
      'Work Order 4',
      'Work Order 5',
      'Work Order 6',
      'Work Order 7',
      'Work Order 8',
      'Work Order 9',
      'Work Order 10',
      'Work Order 11',
      'Work Order 12',
    ],
    inverseOrder: true,
  },
  title: {
    text: 'Speed Over Time',
  },
  markers: {
    hover: {
      sizeOffset: 5,
    },
  },
})
</script>
