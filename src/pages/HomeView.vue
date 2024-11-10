<script setup lang="ts">
import { Button, Dialog } from 'primevue'
import GreetingComponent from '@/components/common/GreetingComponent.vue'
import { ref } from 'vue'
import CvTemplates from '@/components/common/CvTemplates.vue'

const visible = ref(false)
</script>

<template>
  <header class="text-center pt-4 text-white">
    <GreetingComponent />
  </header>
  <main class="flex justify-center text-center gap-4 items-center min-h-[70vh]">
    <div>
      <!-- Animated text -->
      <h1 class="text-2xl md:text-5xl font-bold mb-4 animate-pulse pb-2">
        Haven't you created your CV yet?
      </h1>

      <!-- Animated button -->
      <Button
        severity="secondary"
        label="Create CV"
        @click="visible = true"
        class="p-button-rounded p-button-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
      />
    </div>
  </main>

  <Dialog v-model:visible="visible" modal header="Choose Template">
    <CvTemplates />
  </Dialog>
</template>
