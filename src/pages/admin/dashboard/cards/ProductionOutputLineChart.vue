<template>
  <VaCard>
    <VaCardTitle>Production Output</VaCardTitle>
    <VaCardContent>
      <LineChart :data="chartData" :options="chartOptions" style="height: 300px !important"></LineChart>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard } from 'vuestic-ui'
import { ref } from 'vue'
import LineChart from '../../../../components/va-charts/chart-types/LineChart.vue'

const chartData = ref({
  labels: ['8:00AM', '10:00AM', '12:00PM', '2:00PM', '4:00PM'],
  datasets: [
    {
      label: 'Production Output',
      backgroundColor: 'yellow',
      data: [8000, 9000, 10000, 12000, 50000, 55000, 4000],
    },
    {
      label: 'Production Output',
      backgroundColor: 'red',
      data: [5, 2, 5, 3, 2, 1, 40],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})
</script>
