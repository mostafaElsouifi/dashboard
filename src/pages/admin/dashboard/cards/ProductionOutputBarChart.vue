<template>
  <VaCard>
    <VaCardTitle>Production Output</VaCardTitle>
    <VaCardContent>
      <BarChart :data="chartData" :options="chartOptions" style="height: 300px !important"></BarChart>
    </VaCardContent>
  </VaCard>
</template>

<script setup lang="ts">
import { VaCard } from 'vuestic-ui'
import { ref, defineProps, watch } from 'vue'
import BarChart from '../../../../components/va-charts/chart-types/BarChart.vue'

const props = defineProps<{
  quantity: number[]
  reject?: number[]
  times: string[]
}>()

const chartData = ref<{
  labels: string[]
  datasets: {
    label: string
    backgroundColor: string[]
    data: number[]
  }[]
}>({
  labels: [],
  datasets: [
    {
      label: 'Quantity',
      backgroundColor: ['#154EC1'],
      data: [],
    },
    {
      label: 'Reject',
      backgroundColor: ['#D81717'],

      data: [],
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
})

watch(
  () => [props.quantity, props.reject, props.times],
  () => {
    chartData.value.labels = props.times
    chartData.value.datasets[0].data = props.quantity
    chartData.value.datasets[1].data = props.reject ?? []
  },
  { immediate: true }, // Ensure that the watcher is called immediately when the component is mounted
)
</script>
