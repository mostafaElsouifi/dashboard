<template>
  <VaButtonToggle v-model="theme" color="background-element" border-color="background-element" :options="options" />
</template>
<script lang="ts" setup>
import { computed } from 'vue'

import { useColors } from 'vuestic-ui'

const { applyPreset, currentPresetName } = useColors()
import useUserStore from '../../../stores/user'

const userStore = useUserStore()

const theme = computed({
  get() {
    return currentPresetName.value
  },
  set(value) {
    applyPreset(value)
    userStore.updateUserTheme(value)
  },
})

const options = [
  { label: 'dark', value: 'dark' },
  { label: 'light', value: 'light' },
]
</script>
