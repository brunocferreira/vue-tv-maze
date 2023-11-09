/* eslint-disable */
/* src/App.vue */

<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
    <!-- <SeriesList /> -->
    <!-- <SeriesDetail /> -->
  </div>
</template>

<script>
import SeriesList from "./views/SeriesList.vue";
import SeriesDetail from "./views/SeriesDetail.vue";

export default {
  name: 'App',
  components: {
    // SeriesList
    // SeriesList,
    // SeriesDetail
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
