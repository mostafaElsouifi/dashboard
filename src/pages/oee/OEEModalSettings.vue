<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <VaModal
    v-model="localShowModal"
    message=""
    ok-text="Save"
    blur
    class="responsive"
    @ok="saveData"
    @update:modelValue="updateShowModal"
  >
    <h3 class="h3 mb-5">Update Settings</h3>
    <div class="va-table-responsive w-full flex justify-center border border-1 mb-5">
      <table class="va-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Production Time</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(day, index) in days" :key="index">
            <td>{{ day.name }}</td>
            <td>
              <input
                v-model="day.productionTime"
                :disabled="!day.editing"
                type="number"
                class="px-2 w-[90%]"
                :class="{ 'bg-gray-200': !day.editing }"
              />
            </td>
            <td>
              <button class="m-0 p-0 px-2 bg-warning text-black" @click="enableEditing(index)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <label>Ideal run rate</label>
    <VaInput v-model="idealTime" placeholder="Set Ideal Time" class="mt-3" />
  </VaModal>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue'
import { db } from '../../includes/firebase'

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:showModal'])

const localShowModal = ref(props.showModal)
const days = ref([
  { name: 'Monday', productionTime: 0, editing: false },
  { name: 'Tuesday', productionTime: 0, editing: false },
  { name: 'Wednesday', productionTime: 0, editing: false },
  { name: 'Thursday', productionTime: 0, editing: false },
  { name: 'Friday', productionTime: 0, editing: false },
  { name: 'Saturday', productionTime: 0, editing: false },
  { name: 'Sunday', productionTime: 0, editing: false },
])

const idealTime = ref('')

watch(
  () => props.showModal,
  (newVal) => {
    localShowModal.value = newVal
    if (newVal) {
      loadData()
    }
  },
)

const updateShowModal = (value) => {
  emit('update:showModal', value)
}

const enableEditing = (index) => {
  days.value[index].editing = !days.value[index].editing
}

const saveData = async () => {
  try {
    const batch = db.batch()
    days.value.forEach((day) => {
      const docRef = db.collection('OEE_production_times').doc(day.name)
      batch.set(docRef, { productionTime: day.productionTime })
    })
    batch.set(db.collection('OEE_IdealTime').doc('value'), { value: +idealTime.value })
    await batch.commit()
    //alert('Data saved successfully!');
    localShowModal.value = false // Close the modal after saving
    days.value.forEach((day) => (day.editing = false))
  } catch (error) {
    console.error('Error saving document: ', error)
  }
}

const loadData = async () => {
  try {
    const querySnapshot = await db.collection('OEE_production_times').get()
    querySnapshot.forEach((doc) => {
      const day = days.value.find((d) => d.name === doc.id)
      if (day) {
        day.productionTime = doc.data().productionTime
      }
    })

    const idealTimeDoc = await db.collection('OEE_IdealTime').doc('value').get()
    if (idealTimeDoc.exists) {
      idealTime.value = idealTimeDoc.data().value
      console.log(idealTime.value)
    } else {
      console.error('Ideal time document not found!')
    }
  } catch (error) {
    console.error('Error loading document: ', error)
  }
}

onMounted(() => {
  if (localShowModal.value) {
    loadData()
  }
})
</script>
