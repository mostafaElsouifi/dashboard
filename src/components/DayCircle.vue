<template>
  <div
    class="flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 text-black text-lg font-semibold shadow-sm"
  >
    {{ day }}
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Number,
      required: true,
    },
  },
}
</script>
