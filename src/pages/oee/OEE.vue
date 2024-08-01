<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="page-title" style="font-size: 2rem; line-height: 0.5 !important">OEE</h1>
      <button class="md:-mt-5 mt-0 bg-warning text-black flex gap-2 font-bold" @click="toggleModal">
        OEE Settings
        <span class="material-symbols-outlined"> settings </span>
      </button>
    </div>
    <OEEModalSettings :show-modal="showModal" @close="showModal = false" />
    <VaCard class="mt-4">
      <VaCardContent class="flex justify-center gap-20 w-full flex-wrap">
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="progress" description="Availability" />
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="progress" description="Performance" />
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="progress" description="Quality" />
        <CircularProgressBar :size="100" :stroke-width="15" :percentage="progress" description="OEE" />
      </VaCardContent>
      <VaCardContent>
        <h1 class="text-center mt-5">
          <span>Item : </span>
          <input type="text" value="F" class="border border-gray-500 w-[50%] pl-3" />
        </h1>
        <div class="mt-5 border-b-2 border-gray-500 flex justify-evenly text-md md:text-lg flex-wrap">
          <span>Speed :<strong class="border bordr-gray-400 px-2 mx-4">65</strong>Pcs/Min</span>
          <span>Good <strong class="border bordr-gray-400 px-2 mx-4">34</strong>Ctn</span>
          <span>Reject <strong class="border bordr-gray-400 px-2 mx-4">559</strong>Pcs</span>
        </div>
        <div class="flex justify-between gap-3">
          <div class="mt-10 w-[50%]">
            <h2 class="font-bold mb-3">States in Minutes</h2>
            <div class="flex mb-5 flex-wrap">
              <span class="font-bold mb-2">Testing </span>
              <VaProgressBar size="large" content-inside :model-value="50">
                {{ 50 }}
              </VaProgressBar>
            </div>
            <div class="flex mb-5 flex-wrap">
              <span class="font-bold mb-2">Speed Loss</span>
              <VaProgressBar size="large" content-inside :model-value="10" color="danger">
                {{ 10 }}
              </VaProgressBar>
            </div>
            <div class="flex mb-5 flex-wrap">
              <span class="w-[25%] font-bold mb-2">Running</span>
              <VaProgressBar size="large" content-inside :model-value="30" color="success">
                {{ 30 }}
              </VaProgressBar>
            </div>
            <div class="flex mb-5 flex-wrap">
              <span class="w-[25%] font-bold mb-2">Downtime </span>
              <VaProgressBar size="large" content-inside :model-value="10" color="warning">
                {{ 10 }}
              </VaProgressBar>
            </div>
          </div>
          <div class="va-table-responsive mt-10">
            <h2 class="mb-3 text-md font-bold">Top 3 unplanned Downtime</h2>
            <table class="va-table va-table--hoverable border border-gray-700">
              <thead>
                <tr>
                  <th>Reason Code</th>
                  <th>Minute</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Reason Code</td>
                  <td>Minute</td>
                </tr>
                <tr>
                  <td>Reason Code</td>
                  <td>Minute</td>
                </tr>
                <tr>
                  <td>Reason Code</td>
                  <td>Minute</td>
                </tr>
                <tr>
                  <td>Reason Code</td>
                  <td>Minute</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </VaCardContent>
    </VaCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VaCard, VaCardContent, VaProgressBar } from 'vuestic-ui'
import CircularProgressBar from '../../components/CircularProgressBar.vue'
import OEEModalSettings from './OEEModalSettings.vue'

const progress = ref(90)
const showModal = ref(false)

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<style>
.va-progress-bar__buffer {
  color: black !important;
}
</style>
