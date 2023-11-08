import Vue from 'vue';
import Router from 'vue-router';
import SeriesList from './views/SeriesList.vue';
import SeriesDetail from './views/SeriesDetail.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'series',
      component: SeriesList
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: SeriesDetail
    }
  ]
});
