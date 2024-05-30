<!-- eslint-disable vue/script-indent -->
<!-- eslint-disable vue/script-indent -->
<template>
  <VaCollapse v-model="value" class="min-w-96" header="Januray">
    <VaCollapse v-model="value2" class="min-w-96" header="1-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
              {{ key }}
            </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
            class="bg-gray-100 border-b-2 border-gray-300">
            <td>{{ i + 1 }}</td>
            <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
          </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
    <VaCollapse v-model="value3" class="min-w-96" header="2-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
              {{ key }}
            </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
            class="bg-gray-100 border-b-2 border-gray-300">
            <td>{{ i + 1 }}</td>
            <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
          </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
    <VaCollapse v-model="value4" class="min-w-96" header="3-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
              {{ key }}
            </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
            class="bg-gray-100 border-b-2 border-gray-300">
            <td>{{ i + 1 }}</td>
            <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
          </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
    <VaCollapse v-model="value5" class="min-w-96" header="4-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
              {{ key }}
            </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
            class="bg-gray-100 border-b-2 border-gray-300">
            <td>{{ i + 1 }}</td>
            <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
          </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
  </VaCollapse>
  <VaCollapse v-model="value6" class="min-w-96" header="February">
    <VaCollapse v-model="value2" class="min-w-96" header="1-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
          {{ key }}
        </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
        class="bg-gray-100 border-b-2 border-gray-300">
        <td>{{ i + 1 }}</td>
        <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
      </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
    <VaCollapse v-model="value3" class="min-w-96" header="2-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
          {{ key }}
        </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
        class="bg-gray-100 border-b-2 border-gray-300">
        <td>{{ i + 1 }}</td>
        <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
      </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
    <VaCollapse v-model="value4" class="min-w-96" header="3-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
          {{ key }}
        </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
        class="bg-gray-100 border-b-2 border-gray-300">
        <td>{{ i + 1 }}</td>
        <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
      </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
    <VaCollapse v-model="value5" class="min-w-96" header="4-1-2024">
      <div class="va-table-responsive w-full px-3">
        <table class="va-table va-table--clickable w-full">
          <thead>
            <h1 class="mb-2 border-b-2 border-green-500">Machine 1</h1>
            <tr class="bg-gray-300">
              <th>NO</th>
              <th>Work Order</th>
              <th>Status</th>
              <th>Completed</th>
              <th>Avg speed M/Min</th>
              <th>Target</th>
              <th>quantity</th>
              <th>reject</th>
              <th>Start time</th>
              <th>End time</th>
              <th>Running Hour</th>
              <th colspan="3">stop time reason Hour</th>
            </tr>
            <tr class="bg-gray-300">
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
            </tr>

            <tr>
              <!-- <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
          {{ key }}
        </th> -->
            </tr>
          </thead>
          <tbody>
            <!-- <tr v-for="(item, i) in items" v-if="items.length > 0" :key="item.id"
        class="bg-gray-100 border-b-2 border-gray-300">
        <td>{{ i + 1 }}</td>
        <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
      </tr> -->
          </tbody>
        </table>
        <div class="flex justify-end mt-5">
          <VaPagination
            buttons-preset="secondary"
            :pages="6"
            :visible-pages="5"
            :boundary-links="true"
            :direction-links="true"
          />
        </div>
      </div>
    </VaCollapse>
  </VaCollapse>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      value: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
    }
  },
})
</script>
