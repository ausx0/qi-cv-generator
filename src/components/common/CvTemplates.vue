<script setup lang="ts">
import templates from '@/data/templates.json'
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
    <div
      v-for="(template, index) in templates"
      :key="template.id"
      class="relative p-4 shadow-lg rounded-md overflow-hidden transform transition duration-300 hover:scale-105"
    >
      <img
        :src="template.image"
        :alt="template.title"
        class="w-full h-48 object-fill rounded-md mb-4"
      />
      <h3 class="text-xl font-bold mb-4 pb-4 text-center">{{ template.title }}</h3>

      <div v-if="index < templates.length - 2" class="text-center">
        <router-link
          :to="template.link"
          class="px-4 py-2 rounded-md text-white my-6 bg-indigo-500 transition duration-200"
        >
          Choose Template
        </router-link>
      </div>

      <div
        v-else
        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-lg font-semibold italic"
      >
        Coming Soon
      </div>
    </div>
  </div>
</template>
