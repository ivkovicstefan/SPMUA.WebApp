import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue, { defaultOptions } from 'primevue/config'
import Tooltip from 'primevue/tooltip'

// Import TailwindCSS library
import './assets/tailwind.css'
// Import PrimeVue custom theme
import './assets/theme.css'
// Import PrimeIcons icon pack
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  locale: {
    ...defaultOptions.locale,
    dayNames: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
    dayNamesShort: ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'],
    dayNamesMin: ['Ne', 'Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su'],
    monthNames: [
      'Januar',
      'Februar',
      'Mart',
      'April',
      'Maj',
      'Jun',
      'Jul',
      'Avgust',
      'Septembar',
      'Oktobar',
      'Novembar',
      'Decembar'
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Maj',
      'Jun',
      'Jul',
      'Avg',
      'Sep',
      'Okt',
      'Nov',
      'Dec'
    ],
    today: 'Danas',
    firstDayOfWeek: 1
  }
})
app.directive('tooltip', Tooltip)

app.mount('#app')
