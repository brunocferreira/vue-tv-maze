// src/main.js
import { createApp } from 'vue';
import App from './App.vue'; // Certifique-se de que o caminho está correto
import router from './router';

createApp(App).use(router).mount('#app');
