import './assets/main.css'
import "./assets/styles.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

// Global error handler
app.config.errorHandler = (err) => {
  console.error('Global error:', err)
}

// Mount app with router
app.use(router)
app.mount("#app")