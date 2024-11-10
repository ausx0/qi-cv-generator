<script setup lang="ts">
import { ref } from 'vue'
import CvForm from '@/components/CvTemplates/CvForm.vue'
import ModernTemplate from '@/components/CvTemplates/modernTemplate.vue'
import { Button, Dialog } from 'primevue'
import DownloadCv from '@/components/downloadCv.vue'

const openDialog = ref(false)
</script>
<template>
  <div class="flex justify-between w-full h-full gap-6 items-center px-8">
    <div class="text-black">
      <CvForm />
    </div>
    <div class="hidden md:flex h-full w-full">
      <ModernTemplate />
    </div>
  </div>

  <div class="fixed right-0 bottom-[20%] p-1 md:hidden">
    <Button @click="openDialog = true" class="rounded-full p-4 bg-indigo-600">
      <i class="pi pi-search"></i>
    </Button>
  </div>

  <Dialog v-model:visible="openDialog" class="h-full w-full" modal header="">
    <ModernTemplate />
  </Dialog>

  <!-- Download Button -->
  <div class="fixed right-0 bottom-20 p-1 md:hidden"><DownloadCv /></div>
</template>
