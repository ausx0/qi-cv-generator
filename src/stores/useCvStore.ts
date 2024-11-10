import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'

export const useCVStore = defineStore('cvStore', () => {
  // Load initial data from localStorage if available
  const storedCVData = localStorage.getItem('cvData')
  const cvData = ref(
    storedCVData
      ? JSON.parse(storedCVData)
      : {
          name: '',
          profile: '',
          contact: {
            phone: '',
            email: '',
            location: '',
            website: '',
          },
          experience: [] as Array<{
            role: string
            company: string
            location: string
            date: string
            description: string[]
          }>,
          education: {
            degree: '',
            school: '',
            date: '',
          },
          certifications: [] as string[],
          skills: [] as string[],
        },
  )

  // Watch for changes in cvData and save to localStorage
  watchEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData.value))
  })

  function addExperience(experience: (typeof cvData.value.experience)[0]) {
    cvData.value.experience.push(experience)
  }

  function addCertification(certification: string) {
    cvData.value.certifications.push(certification)
  }

  function addSkill(skill: string) {
    cvData.value.skills.push(skill)
  }

  function deleteSkill(index: number) {
    cvData.value.skills.splice(index, 1)
  }

  // Update an experience by index
  function updateExperience(index: number, updatedExperience: (typeof cvData.value.experience)[0]) {
    if (index >= 0 && index < cvData.value.experience.length) {
      cvData.value.experience[index] = updatedExperience
    }
  }

  // Delete an experience by index
  function deleteExperience(index: number) {
    if (index >= 0 && index < cvData.value.experience.length) {
      cvData.value.experience.splice(index, 1)
    }
  }

  return {
    cvData,
    addExperience,
    addCertification,
    addSkill,
    updateExperience,
    deleteExperience,
    deleteSkill,
  }
})
