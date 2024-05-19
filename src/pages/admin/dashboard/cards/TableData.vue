<!-- eslint-disable vue/first-attribute-linebreak -->
<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <VaCard>
    <VaCardTitle class="flex justify-between w-full">
      <VaBadge style="--va-badge-font-size: 0.8rem" text="Wedensady - 7/5/2024" color="#8bb900" />
      <div class="buttons flex flex-wrap ml-10 mr-0">
        <VaButton
          color="danger"
          gradient
          class="mr-6 mb-2 h2"
          size="small"
          icon="download"
          style="--va-button-lg-content-py: 0.4rem"
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
          <tr class="bg-gray-300">
            <th>No</th>
            <th v-for="(value, key) in items[0].values" v-if="items.length > 0" :key="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in items"
            v-if="items.length > 0"
            :key="item.id"
            class="bg-gray-100 border-b-2 border-gray-300"
          >
            <td>{{ i + 1 }}</td>
            <td v-for="(value, key) in item.values" :key="key">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </VaCard>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { realtimeDB } from '../../../../includes/firebase'
import { downloadAsCSV } from '../../../../services/toCSV'
interface Item {
  id: string
  values: any
}

const items = ref<Item[]>([])

const itemsRef = realtimeDB.ref('data')

// Listen for real-time updates
let listener: any
onMounted(() => {
  listener = itemsRef.on('value', (snapshot) => {
    const data = snapshot.val()
    const itemsArray: Item[] = []
    for (const id in data) {
      itemsArray.push({ id, values: data[id] })
    }
    items.value = itemsArray
  })
})
onUnmounted(() => {
  itemsRef.off('value', listener)
})

const exportAsCSV = () => {
  const output = items.value.map((item) => item.values)
  downloadAsCSV(output, 'data-date')
}
</script>

<style>
.va-table-responsive {
  overflow: auto;
}
</style>
