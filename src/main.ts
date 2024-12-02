import { app } from './app/App';
import PrimeVue from 'primevue/config';

app.use(PrimeVue, {
  theme: 'none',
});
app.mount('#app');
