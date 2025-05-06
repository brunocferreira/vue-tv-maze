<!-- ./views/SeriesList.vue -->
<template>
  <div class="series-list">
    <img
      src="https://static.tvmaze.com/images/tvm-header-logo.png"
      alt="Logo TV MAZE"
      class="logo"
    >
    <div class="grid">
      <div
        v-for="(show, index) in displayedShows"
        :key="index"
        class="grid-item"
      >
        <router-link
          :to="`/detail/${show.id}`"
        >
          <img
            :src="show.image.medium"
            :alt="show.name"
          />
          <h2>{{ show.name }}</h2>
        </router-link>
      </div>
    </div>
    <button
      class="load-more"
      @click="loadMore"
    >
      Exibir Mais
    </button>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    console.log('Autor :>> ', "Bruno da Cunha Ferreira");
    console.log('linkedin :>> ', "https://www.linkedin.com/in/bruno-c-ferreira/");
    return {
      shows: [],
      displayCount: 20
    };
  },
  computed: {
    displayedShows() {
      return this.shows.slice(0, this.displayCount);
    }
  },
  async created() {
    const response = await axios.get('https://api.tvmaze.com/shows');
    this.shows = response.data;
  },
  methods: {
    loadMore() {
      this.displayCount += 20;
    }
  }
};
</script>

<style scoped>
.series-list {
  background-color: black;
  color: #68c72b;
  padding-block: 1rem;
}

.logo {
  width: 100hv;
  max-width: 80%;
  height: auto;
  display: block;
  margin: 3rem auto;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.grid-item {
  text-align: center;
}

.load-more {
  background-color: #68c72b;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  transition: background-color 0.3s ease;
}

.load-more:hover {
  background-color: #5ab920;
}

.series-list a {
  color: #68c72b;
  text-decoration: none;
}

.series-list a:hover {
  color: #5ab920;
}

</style>

