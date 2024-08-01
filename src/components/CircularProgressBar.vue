<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <div class="circular-progress">
    <svg :width="size" :height="size" viewBox="0 0 100 100">
      <circle class="circle-background" :cx="50" :cy="50" :r="radius" :stroke-width="strokeWidth" />
      <circle
        class="circle-progress"
        :cx="50"
        :cy="50"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
    </svg>
    <div class="percentage" :style="{ fontSize: size / 5 + 'px' }">{{ percentage }}%</div>
    <div class="text-center mt-5">{{ description }}</div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 100,
  },
  strokeWidth: {
    type: Number,
    default: 10,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    default: '',
  },
})

const radius = computed(() => 50 - props.strokeWidth / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value - (props.percentage / 100) * circumference.value)
</script>

<style scoped>
.circular-progress {
  position: relative;
  display: inline-block;
}

svg {
  transform: rotate(-90deg);
}

.circle-background {
  fill: none;
  stroke: #e6e6e6;
}

.circle-progress {
  fill: none;
  stroke: #4caf50;
  transition: stroke-dashoffset 0.35s;
  transform: rotate(0.25turn);
  transform-origin: 50% 50%;
}

.percentage {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
}
</style>
