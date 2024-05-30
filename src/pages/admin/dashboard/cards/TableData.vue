<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <VaCard>
    <VaCardTitle class="flex justify-between w-full">
      <VaBadge style="--va-badge-font-size: 0.8rem" :text="getCurrentDate()" color="#8bb900" />
      <!-- <VaBadge style="--va-badge-font-size: 0.8rem"
        :text="items[items.length - 1]['status'] ? 'stop' : 'Offline' ? 'run' : 'Online'" color="#177E36" /> -->
      <div class="buttons flex flex-wrap ml-10 mr-0">
        <VaButton
          color="danger"
          gradient
          class="mr-6 mb-2 h2"
          size="small"
          icon="download"
          style="--va-button-lg-content-py: 0.4rem"
          @click="saveToPdf"
        >
          PDF
        </VaButton>
        <VaButton color="success" gradient class="mb-2" size="small" icon="download" @click="exportAsCSV">
          CSV
        </VaButton>
      </div>
    </VaCardTitle>
    <div class="va-table-responsive w-full px-3">
      <table class="va-table va-table--clickable w-full">
        <thead>
          <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
          <tr class="bg-gray-300">
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
            <!-- <th colspan="3">stop time reason Hour</th> -->
          </tr>
          <!-- <tr class="bg-gray-300">
            <th colspan="11"></th>
            <th class="border-r-2 border-l-2 border-gray-400">E1</th>
            <th class="border-r-2 border-gray-400">E2</th>
            <th>E3</th>
          </tr>
          <tr class="bg-gray-100 border-b-2 border-gray-300">
            <td class="border-r-2 border-gray-300">1</td>
            <td class="border-r-2 border-gray-300">product 1</td>
            <td class="border-r-2 border-gray-300">Run</td>
            <td class="border-r-2 border-gray-300">Yes</td>
            <td class="border-r-2 border-gray-300">30 M/Min</td>
            <td class="border-r-2 border-gray-300">20</td>
            <td class="border-r-2 border-gray-300">40</td>
            <td class="border-r-2 border-gray-300">6</td>
            <td class="border-r-2 border-gray-300">8:00 AM</td>
            <td class="border-r-2 border-gray-300">10:00 AM</td>
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">E1</td>
            <td class="border-r-2 border-gray-300">E2</td>
            <td>E3</td>
          </tr>
          <tr class="bg-gray-100 border-b-2 border-gray-300">
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">product 1</td>
            <td class="border-r-2 border-gray-300">Run</td>
            <td class="border-r-2 border-gray-300">Yes</td>
            <td class="border-r-2 border-gray-300">30 M/Min</td>
            <td class="border-r-2 border-gray-300">20</td>
            <td class="border-r-2 border-gray-300">40</td>
            <td class="border-r-2 border-gray-300">6</td>
            <td class="border-r-2 border-gray-300">8:00 AM</td>
            <td class="border-r-2 border-gray-300">10:00 AM</td>
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">E1</td>
            <td class="border-r-2 border-gray-300">E2</td>
            <td>E3</td>
          </tr>

          <tr class="bg-gray-100 border-b-2 border-gray-300">
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">product 1</td>
            <td class="border-r-2 border-gray-300">Run</td>
            <td class="border-r-2 border-gray-300">Yes</td>
            <td class="border-r-2 border-gray-300">30 M/Min</td>
            <td class="border-r-2 border-gray-300">20</td>
            <td class="border-r-2 border-gray-300">40</td>
            <td class="border-r-2 border-gray-300">6</td>
            <td class="border-r-2 border-gray-300">8:00 AM</td>
            <td class="border-r-2 border-gray-300">10:00 AM</td>
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">E1</td>
            <td class="border-r-2 border-gray-300">E2</td>
            <td>E3</td>
          </tr>
          <tr class="bg-gray-100 border-b-2 border-gray-300">
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">product 1</td>
            <td class="border-r-2 border-gray-300">Run</td>
            <td class="border-r-2 border-gray-300">Yes</td>
            <td class="border-r-2 border-gray-300">30 M/Min</td>
            <td class="border-r-2 border-gray-300">20</td>
            <td class="border-r-2 border-gray-300">40</td>
            <td class="border-r-2 border-gray-300">6</td>
            <td class="border-r-2 border-gray-300">8:00 AM</td>
            <td class="border-r-2 border-gray-300">10:00 AM</td>
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">E1</td>
            <td class="border-r-2 border-gray-300">E2</td>
            <td>E3</td>
          </tr>
          <tr class="bg-gray-100 border-b-2 border-gray-300">
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">product 1</td>
            <td class="border-r-2 border-gray-300">Run</td>
            <td class="border-r-2 border-gray-300">Yes</td>
            <td class="border-r-2 border-gray-300">30 M/Min</td>
            <td class="border-r-2 border-gray-300">20</td>
            <td class="border-r-2 border-gray-300">40</td>
            <td class="border-r-2 border-gray-300">6</td>
            <td class="border-r-2 border-gray-300">8:00 AM</td>
            <td class="border-r-2 border-gray-300">10:00 AM</td>
            <td class="border-r-2 border-gray-300">2</td>
            <td class="border-r-2 border-gray-300">E1</td>
            <td class="border-r-2 border-gray-300">E2</td>
            <td>E3</td>
          </tr> -->

          <!-- <tr>
            <th v-for="(value, key) in items" v-if="items.length > 0" :key="key">
              
              {{ value }}
            </th>
          </tr> -->
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in items"
            v-if="items.length > 0"
            :key="i"
            class="bg-gray-100 border-b-2 border-gray-300 font-bold"
            style="font-size: 10px !important"
          >
            <td>{{ i + 1 }}</td>
            <td v-for="key in orderedKeys" :key="key">{{ item[key as keyof Item] }}</td>
          </tr>
        </tbody>
      </table>

      <!--<div class="flex justify-end mt-5">
         <VaPagination buttons-preset="secondary" :pages="6" :visible-pages="5" :boundary-links="true"
          :direction-links="true" /> 
      </div>-->
    </div>
  </VaCard>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { realtimeDB } from '../../../../includes/firebase'
import { downloadAsCSV } from '../../../../services/toCSV'
import { generatePDFReport } from '../../../../services/toPDF'
import { getCurrentDate } from '../../../../services/utils'

interface OrderedData {
  //id: string
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
}

interface Item {
  // id: string
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
}

const items = ref<Item[]>([])

const itemsRef = realtimeDB.ref('data')
//itemsRef.remove();
// Listen for real-time updates
let listener: any
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

onMounted(() => {
  listener = itemsRef.on('value', (snapshot) => {
    const data = snapshot.val()
    const itemsArray: OrderedData[] = []

    for (const id in data) {
      console.log(data)
      if (data[id]) {
        data[id].forEach((item: any) => {
          itemsArray.push({
            //id: item['workorder'],
            workorder: item['workorder'],
            status: item['status'],
            completed: item['completed'],
            speed: item['speed'],
            target: item['target'],
            quantity: item['quantity'],
            reject: item['reject'],
            starttime: item['starttime'],
            endtime: item['endtime'],
            runninghour: item['runninghour'],
            stoptimeE1: item['stoptimeE1'],
            stoptimeE2: item['stoptimeE2'],
            stoptimeE3: item['stoptimeE3'],
          })
        })
      }
    }

    items.value = itemsArray
  })
})
onUnmounted(() => {
  itemsRef.off('value', listener)
})

const exportAsCSV = () => {
  const output = items.value.map((item) => item)
  console.log(output)
  downloadAsCSV(output, 'data-date')
}

const saveToPdf = async () => {
  const output = items.value.map((item) => {
    return item
  })
  console.log(output)
  await generatePDFReport(output, ['#chart1', '#chart2'])
}
</script>

<style>
.va-table-responsive {
  overflow: auto;
}
</style>
