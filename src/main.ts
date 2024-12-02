import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import App from './app/App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, {
  theme: 'none',
});
app.use(pinia);
app.mount('#app');
