import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';

// Import TailwindCSS library
import './assets/tailwind.css'
// Import PrimeVue custom theme
import './assets/theme.css'
// Import PrimeIcons icon pack
import 'primeicons/primeicons.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
