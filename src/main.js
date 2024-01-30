import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import oGescel from '..\\src\\services\\gescel.js'

const pinia = createPinia()

const app = createApp(App)

//app.use(pinia)

registerPlugins(app)

app.mount('#app')