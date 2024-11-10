<script setup lang="ts">
import jsPDF from 'jspdf'

const downloadCvAsPdf = () => {
  const doc = new jsPDF({
    unit: 'mm', // Use millimeters for units
    format: 'a4', // Set the format to A4
  })

  // Capture the content to be added to the PDF
  const cvContent = document.querySelector('.cv-content') as HTMLElement

  // Use jsPDF's `html` method to add the content
  doc.html(cvContent, {
    callback: () => {
      doc.save('cv.pdf') // Download the PDF file
    },
    x: 10, // Left margin
    y: 10, // Top margin
    width: 180, // Adjust width for A4 page
    windowWidth: document.body.scrollWidth, // Use the document's full width for HTML content
  })
}
</script>
<template>
  <Button @click="downloadCvAsPdf" class="rounded-full p-4 bg-green-600 text-white">
    <i class="pi pi-download"></i> Download CV
  </Button>
</template>
