import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { PrimeVue } from '@primevue/core'
import Aura from '@primevue/themes/aura'
import './index.css'
import 'primeicons/primeicons.css'
import piniaPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia) // Register the persistence plugin
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'light',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})
app.mount('#app')
