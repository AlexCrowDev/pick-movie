import { createApp } from 'vue'
import { createPinia } from "pinia";
import PrimeVue from 'primevue/config';
import Nora from '@primevue/themes/nora';
import { definePreset } from '@primevue/themes';
import App from './App'
import components from '@/components/UI';

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
      colorScheme: {
        light: {
          track: {
            background: '#fff',
          }
        }
      },
      root: {
        borderRadius: '10px',
      },
      track: {
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
    },
    skeleton: {
      colorScheme: {
        light: {
          background: 'rgb(91, 87, 107, 0.2)',
          animationBackground: 'rgba(255, 255, 255, 0.1)'
        }
      }
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
