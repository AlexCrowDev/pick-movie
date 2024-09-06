import { createApp } from 'vue'
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/nora';
import App from './App'
import components from '@/components/UI';
import { definePreset } from '@primevue/themes';

const pinia = createPinia()
const app = createApp(App)

components.forEach(component => {
  app.component(component.name, component)
})

const MyPreset = definePreset(Nora, {
  semantic: {
    primary: 'rgb(122, 91, 247)'
  },
  components: {
    slider: {
      root: {
        borderRadius: '10px',
      },
      track: {
        background: '#fff',
        // borderRadius: '10px',
        size: '8px',
      },
      range: {
        background: 'rgb(122, 91, 247)',
      },
      handle: {
        background: 'rgb(122, 91, 247)',
        width: '20px',
        height: '20px',
      },
    }
  }
})


app
  .use(pinia)
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
    },
  })
  .mount('#app');
