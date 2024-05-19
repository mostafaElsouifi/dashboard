<template>
  <VaCard>
    <VaCardTitle>Production Speed</VaCardTitle>
    <VaCardContent>
      <BarChart :data="chartData" :options="chartOptions" style="height: 300px !important"></BarChart>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard } from 'vuestic-ui'
import { ref } from 'vue'
import BarChart from '../../../../components/va-charts/chart-types/BarChart.vue'

const chartData = ref({
  labels: ['8:00AM', '10:00AM', '12:00PM', '2:00PM', '4:00PM'],
  datasets: [
    {
      label: 'Production Speed',
      backgroundColor: ['#154EC1', '#154EC1', '#154EC1', '#154EC1', '#154EC1'],
      data: [30, 59, 80, 12, 50, 55, 40],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>
