<script setup lang="ts">
import { useCVStore } from '@/stores/useCvStore'
import { Button, Dialog, Textarea } from 'primevue'
import Editor from 'primevue/editor'
import { ref } from 'vue'
import DownloadCv from '../downloadCv.vue'

const cvStore = useCVStore()

const experienceDialogVisible = ref(false)
const editingIndex = ref<number | null>(null)

const newExperience = ref({
  role: '',
  company: '',
  location: '',
  date: '',
  description: '',
})

// Open dialog for adding or editing experience
function openExperienceDialog(index = null) {
  if (index !== null) {
    // Edit mode - load the selected experience into the form
    const experience = cvStore.cvData.experience[index]
    newExperience.value = { ...experience }
    console.log('Loaded experience for editing:', experience.description) // Check if HTML is correct

    editingIndex.value = index
  } else {
    // New experience mode
    newExperience.value = {
      role: '',
      company: '',
      location: '',
      date: '',
      description: '',
    }
    editingIndex.value = null
  }
  experienceDialogVisible.value = true
}

// Save experience (add new or edit existing)
function saveExperience() {
  if (editingIndex.value !== null) {
    // Update existing experience
    cvStore.updateExperience(editingIndex.value, { ...newExperience.value })
  } else {
    // Add new experience
    cvStore.addExperience({ ...newExperience.value })
  }
  experienceDialogVisible.value = false
  newExperience.value = {
    role: '',
    company: '',
    location: '',
    date: '',
    description: '',
  }
}

// Delete an experience
function deleteExperience(index) {
  cvStore.deleteExperience(index)
}

function deleteSkill(index: number) {
  // Remove the skill at the specified index
  cvStore.cvData.skills.splice(index, 1)
}
</script>

<template>
  <!-- Experience Dialog -->
  <Dialog
    v-model:visible="experienceDialogVisible"
    closable
    closeOnEscape
    header="Experience Details"
    maximizable
    class="l"
    modal
  >
    <div class="p-4 space-y-2 flex flex-col gap-4">
      <input v-model="newExperience.role" placeholder="Role" class="w-full border px-2 py-1 my-1" />
      <input
        v-model="newExperience.company"
        placeholder="Company"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="newExperience.location"
        placeholder="Location"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="newExperience.date"
        type="date"
        placeholder="Date"
        class="w-full border px-2 py-1 my-1"
      />
      <Editor
        v-model="newExperience.description"
        placeholder="Description"
        class="w-full border px-2 py-1 my-1"
        editorStyle="height: 320px"
        rows="5"
      />
      <Button label="Save" @click="saveExperience" class="bg-blue-500 text-white w-full mt-4" />
    </div>
  </Dialog>

  <div class="space-y-6 p-4 bg-gray-100 rounded-md">
    <h2 class="text-2xl font-bold">Fill Your CV Information</h2>

    <!-- Name and Profile -->
    <div>
      <label class="block font-semibold">Name</label>
      <input
        v-model="cvStore.cvData.name"
        class="w-full border px-2 py-1"
        placeholder="Enter your name"
      />
    </div>

    <div>
      <label class="block font-semibold">Profile</label>
      <textarea
        v-model="cvStore.cvData.profile"
        class="w-full border px-2 py-1"
        placeholder="Profile summary"
      ></textarea>
    </div>

    <!-- Contact Information -->
    <div>
      <h3 class="font-semibold">Contact Information</h3>
      <input
        v-model="cvStore.cvData.contact.phone"
        placeholder="Phone"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="cvStore.cvData.contact.email"
        placeholder="Email"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="cvStore.cvData.contact.location"
        placeholder="Location"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="cvStore.cvData.contact.website"
        placeholder="LinkedIn/Website"
        class="w-full border px-2 py-1 my-1"
      />
    </div>

    <!-- Experience Section -->
    <div>
      <h3 class="font-semibold">Experience</h3>
      <ul>
        <li
          v-for="(experience, index) in cvStore.cvData.experience"
          :key="index"
          class="flex items-center gap-4 my-2 bg-white border p-2"
        >
          <span class="flex-1">{{ experience.role }} at {{ experience.company }}</span>
          <Button icon="pi pi-pencil" @click="openExperienceDialog(index)" class="p-button-text" />
          <Button
            icon="pi pi-trash"
            @click="deleteExperience(index)"
            class="p-button-text p-button-danger"
          />
        </li>
      </ul>
      <div class="pt-4">
        <Button
          label="Add Experience"
          @click="openExperienceDialog()"
          class="mt-10 bg-blue-500 text-sm text-white rounded"
        />
      </div>
    </div>

    <!-- Education -->
    <div>
      <h3 class="font-semibold">Education</h3>
      <input
        v-model="cvStore.cvData.education.degree"
        placeholder="Degree"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="cvStore.cvData.education.school"
        placeholder="School"
        class="w-full border px-2 py-1 my-1"
      />
      <input
        v-model="cvStore.cvData.education.date"
        type="date"
        placeholder="Date"
        class="w-full border px-2 py-1 my-1"
      />
    </div>

    <!-- Skills -->
    <div>
      <h3 class="font-semibold">Skills</h3>
      <div
        v-for="(skill, index) in cvStore.cvData.skills"
        :key="index"
        class="flex items-center gap-2"
      >
        <input
          v-model="cvStore.cvData.skills[index]"
          placeholder="Skill"
          class="w-full border px-2 py-1 my-1"
        />
        <Button
          icon="pi pi-times"
          @click="deleteSkill(index)"
          class="p-button-text p-button-danger"
        />
      </div>
      <button @click="cvStore.addSkill('')" class="bg-blue-500 text-white px-4 py-1 mt-2 rounded">
        Add Skill
      </button>
    </div>

    <!-- cv download -->
    <div class="hidden md:flex justify-items-end self-end items-end justify-end">
      <DownloadCv />
    </div>
  </div>
</template>

<style scoped>
/* Add custom styles if needed */
</style>
