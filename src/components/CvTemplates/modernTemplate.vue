<script setup lang="ts">
import { useCVStore } from '@/stores/useCvStore'
import { Phone } from 'lucide-vue-next'
import { Divider } from 'primevue'

const cvStore = useCVStore()
</script>

<template>
  <div
    class="max-w-4xl w-full p-6 text-start bg-white text-black font-sans flex flex-col gap-6 cv-content md:aspect-square"
  >
    <!-- Header Section -->
    <header class="mb-6 text-center">
      <h1 class="text-4xl font-bold py-2">{{ cvStore.cvData.name }}</h1>
      <p class="text-lg py-2">{{ cvStore.cvData.profile }}</p>
      <div class="flex justify-center gap-4 text-sm mt-2">
        <span>No: {{ cvStore.cvData.contact.phone }}</span>
        <span>Mail: {{ cvStore.cvData.contact.email }}</span>
        <span>Location: {{ cvStore.cvData.contact.location }}</span>
        <a
          href="{{ cvStore.cvData.contact.website }}"
          target="_blank"
          class="text-blue-600 underline"
          >LinkedIn</a
        >
      </div>
    </header>

    <!-- Profile Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold border-b pb-1 mb-2">Profile</h2>
      <p>{{ cvStore.cvData.profile }}</p>
    </section>

    <!-- Experience Section -->
    <section class="m-8">
      <h2 class="text-2xl font-semibold border-b pb-1 mb-4">Professional Experience</h2>
      <div v-for="(exp, index) in cvStore.cvData.experience" :key="exp.role" class="mb-4">
        <h3 class="text-lg font-bold">{{ exp.role }}</h3>
        <p class="italic">{{ exp.company }} - {{ exp.date }}</p>
        <p v-html="exp.description"></p>
        <div v-if="index < cvStore.cvData.experience.length - 1"><Divider /></div>
      </div>
    </section>

    <!-- Education Section -->
    <section class="mb-8">
      <h2 class="text-2xl font-semibold border-b pb-1 mb-2">Education</h2>
      <p class="font-semibold">{{ cvStore.cvData.education.degree }}</p>
      <p class="text-sm italic">
        {{ cvStore.cvData.education.school }} - {{ cvStore.cvData.education.date }}
      </p>
    </section>

    <!-- Certification Section -->
    <!-- <section class="mb-8">
      <h2 class="text-2xl font-semibold border-b pb-1 mb-2">Certification</h2>
      <ul class="list-disc list-inside">
        <li v-for="cert in cvStore.cvData.certifications" :key="cert">{{ cert }}</li>
      </ul>
    </section> -->

    <!-- Skills Section -->
    <section>
      <h2 class="text-2xl font-semibold border-b pb-1 mb-2">Technical Skills</h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="skill in cvStore.cvData.skills"
          :key="skill"
          class="px-2 py-1 bg-gray-200 rounded-md"
        >
          {{ skill }}
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Add custom styles here if needed */
</style>
