// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import SeriesList from './views/SeriesList.vue';
import SeriesDetail from './views/SeriesDetail.vue';

const routes = [
  {
    path: '/',
    name: 'series',
    component: SeriesList
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: SeriesDetail,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
