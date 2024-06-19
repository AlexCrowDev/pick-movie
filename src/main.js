import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App'
import components from '@/components/UI';

const pinia = createPinia()
const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

app
  .use(pinia)
  .mount('#app');
