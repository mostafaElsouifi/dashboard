<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
  <VaLayout v-if="breakpoint.lgUp" class="h-screen bg-[var(--va-background-secondary)]">
    <template #left>
      <RouterLink
        class="bg-primary h-full flex items-center justify-center"
        style="width: 35vw"
        to="/"
        aria-label="Visit homepage"
      >
        <p class="text-lg text-white">Automation Systems</p>
      </RouterLink>
    </template>
    <template #content>
      <main class="h-full flex items-center justify-center mx-auto max-w-[420px]">
        <RouterView />
      </main>
    </template>
  </VaLayout>

  <VaLayout v-else class="h-screen bg-[var(--va-background-secondary)]">
    <template #content>
      <div class="p-4">
        <main class="h-full flex flex-row justify-start mx-auto max-w-[420px]">
          <div class="flex flex-col content-start">
            <RouterLink class="mb-20" to="/" aria-label="Visit homepage">
              <p class="text-lg">Automation Systems</p>
            </RouterLink>
            <RouterView />
          </div>
        </main>
      </div>
    </template>
  </VaLayout>
</template>

<script lang="ts" setup>
import { useBreakpoint } from 'vuestic-ui'

const breakpoint = useBreakpoint()
</script>
