<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getRandomGreeting } from '@/utils/greetingUtils'

const currentGreeting = ref(getRandomGreeting())
const isFading = ref(false)
let intervalId: number

function updateGreeting() {
  isFading.value = true // Trigger fade-out effect
  setTimeout(() => {
    currentGreeting.value = getRandomGreeting() // Update greeting text after fade-out
    isFading.value = false // Trigger fade-in effect
  }, 500) // Fade duration is 500ms, so we wait before updating
}

onMounted(() => {
  intervalId = setInterval(updateGreeting, 5000) // Change greeting every 5 seconds
})

onUnmounted(() => {
  clearInterval(intervalId) // Clean up interval when component unmounts
})
</script>

<template>
  <h4
    class="text-1xl md:text-2xl font-bold text-center transition-opacity duration-500 ease-in-out"
    :class="{ 'opacity-0': isFading, 'opacity-100': !isFading }"
  >
    {{ currentGreeting }}
  </h4>
</template>
