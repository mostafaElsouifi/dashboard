<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <VaCard>
    <VaCardTitle class="flex justify-between w-full" :class="{ 'download-container': isHistory }">
      <VaBadge
        v-if="!isHistory"
        style="--va-badge-font-size: 0.8rem"
        :text="getCurrentDate()"
        color="#8bb900"
        class="justify-self-start"
      />
      <div class="buttons flex flex-wrap ml-10 mr-0">
        <VaButton
          color="danger"
          gradient
          class="mr-6 mb-2 h2"
          size="small"
          icon="download"
          style="--va-button-lg-content-py: 0.4rem"
          @click="emitPDF"
        >
          PDF
        </VaButton>
        <VaButton color="success" gradient class="mb-2" size="small" icon="download" @click="emitCSV"> CSV </VaButton>
      </div>
    </VaCardTitle>
    <div class="va-table-responsive w-full px-3">
      <div class="flex gap-5 mb-5">
        <h1
          class="mb-2 leading-6 hover:border-b-2 border-green-500 cursor-pointer"
          :class="{ 'active-machine': currentMachine === 1 }"
          @click="emitMachine(1)"
        >
          Machine 1
        </h1>
        <span
          v-if="!isHistory"
          class="material-symbols-outlined text-danger -mt-5 -ml-6 text-3xl"
          :class="{ 'text-success': machine1Status }"
        >
          wifi_1_bar
        </span>
        <h1
          class="mb-2 hover:border-b-2 border-green-500 leading-6 cursor-pointer"
          :class="{ 'active-machine': currentMachine === 2 }"
          @click="emitMachine(2)"
        >
          Machine 2
        </h1>
        <span
          v-if="!isHistory"
          class="material-symbols-outlined text-danger -mt-5 -ml-6 text-3xl"
          :class="{ 'text-success': machine2Status }"
        >
          wifi_1_bar
        </span>
      </div>

      <table class="va-table va-table--clickable w-full">
        <thead>
          <tr class="bg-tableHeaderBG text-tableHeaderText">
            <th>NO</th>
            <th>Work Order</th>
            <th>Status</th>
            <th>Completed</th>
            <th>speed</th>
            <th>Target</th>
            <th>quantity</th>
            <th>reject</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Running Hour</th>
            <th>Stop Time E1</th>
            <th>Stop Time E2</th>
            <th>Stop Time E3</th>
          </tr>
        </thead>
        <TransitionGroup tag="tbody" name="fade" class="tbody">
          <tr
            v-for="(item, i) in currentItems"
            v-if="currentItems.length > 0"
            :key="i"
            class="bg-tableRowBG border-b-2 border-gray-300 font-bold"
            style="font-size: 10px !important"
          >
            <td>{{ i + 1 }}</td>
            <td v-for="key in orderedKeys" :key="key">{{ item[key as keyof Item] }}</td>
          </tr>
        </TransitionGroup>
      </table>
      <!-- <div class="flex justify-center sm:justify-end">
        <VaPagination v-model="page" buttons-preset="secondary" :pages="totalPages" :visible-pages="4" />
      </div> -->
    </div>
  </VaCard>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, defineEmits } from 'vue'

import { getCurrentDate } from '../../../../services/utils'
const emit = defineEmits(['emitMachine', 'emitPDF', 'emitCSV'])

const emitMachine = (machine: 1 | 2) => {
  emit('emitMachine', machine)
  page.value = 1
}

const emitPDF = () => {
  emit('emitPDF')
}
const emitCSV = () => {
  emit('emitCSV')
}
//const currentMachine = ref<number>(databaseStore.currentMachine);

interface Item {
  //index: any;
  workorder?: string
  completed?: string
  endtime?: string
  quantity?: number
  reject?: number
  runninghour?: number
  speed?: number
  starttime?: string
  status?: string
  stoptimeE1?: number
  stoptimeE2?: number
  stoptimeE3?: number
  target?: number
  //index?: number
}

const props = defineProps<{
  items: Item[]
  currentMachine: number
  machine1Status: number
  machine2Status: number
  isHistory: boolean
}>()

//const currentMachine = ref(props.currentMachine);

const itemsPerPage = 12
const page = ref<number>(1)

const currentItems = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.items.slice(start, end).reverse()
})

// const totalPages = computed(() => {
//   return Math.ceil(props.items.length / itemsPerPage)
// })

const orderedKeys: string[] = [
  'workorder',
  'status',
  'completed',
  'speed',
  'target',
  'quantity',
  'reject',
  'starttime',
  'endtime',
  'runninghour',
  'stoptimeE1',
  'stoptimeE2',
  'stoptimeE3',
]

// watch(currentMachine, (newVal) => {
//   // Your logic to handle changes
//   console.log('currentMachine changed:', newVal);
// });
// const exportAsCSV = () => {
//   const output = props.items.map((item) => item as Record<string, any>)
//   downloadAsCSV(output, 'data-date.csv')
// }

// const saveToPdf = async () => {
//   const output = props.items.map((item) => item as Record<string, any>)
//   await generatePDFReport(output)
// }
</script>

<style>
.va-table-responsive {
  overflow: auto;
}

/* Define the transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

.active-machine {
  font-weight: bold;
  border-bottom: 3px solid green;
}

.download-container {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: flex-end;
}
</style>
