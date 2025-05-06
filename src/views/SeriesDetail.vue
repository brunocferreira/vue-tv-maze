<template>
  <div style="background-color: black; color: #68c72b">
    <button
      class="back-button"
      @click="goBack"
    >
      Voltar
    </button>
    <div v-if="show">
      <img
        :src="show.image.medium"
        :alt="show.name"
      />
      <h2>{{ show.name }}</h2>
      <p>Gêneros: {{ show.genres.join(', ') }}</p>
      <p>Nota: {{ starRating }}</p>
      <div
        v-for="season in seasons"
        :key="season.id"
      >
        <h3>Temporada {{ season.number }}</h3>
        <div style="display: flex; overflow-x: auto">
          <div
            v-for="episode in season.episodes"
            :key="episode.id"
            class="series-episode"
          >
            <img
              :src="episode.image.medium"
              :alt="episode.name"
            />
            <h4>{{ episode.name }}</h4>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="episode.summary"></div>
          </div>
        </div>
      </div>
      <div>
        <h3
          class="cast"
        >
          Elenco
        </h3>
        <div style="display: flex; overflow-x: auto">
          <div
            v-for="member in show._embedded.cast"
            :key="member.person.id"
            class="cast-member"
          >
            <img
              :src="member.person.image.medium"
              :alt="member.person.name"
            />
            <h4
              class="person"
            >
              {{ member.person.name }}
            </h4>
            <p
              class="person"
            >
              {{ member.character.name }}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3>Comentários</h3>
        <form
          class="comment-form"
          @submit.prevent="addComment"
        >
          <textarea
            v-model="newComment"
            placeholder="Adicione um comentário..."
            class="comment-field"
            @keydown.enter.prevent="addComment"
          ></textarea>
          <button
            type="submit"
            class="submit-button"
          >
            Enviar
          </button>          
        </form>
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="comment"
        >
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import DOMPurify from 'dompurify';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

let app = null;
if (firebaseConfig != null) {
  app = initializeApp(firebaseConfig);
}

const db = app == null ? null :getFirestore();

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    console.log('Autor :>> ', "Bruno da Cunha Ferreira");
    console.log('linkedin :>> ', "https://www.linkedin.com/in/bruno-c-ferreira/");
    return {
      show: null,
      newComment: '',
      comments: [],
      sanitizedEpisodes: []
    };
  },
  computed: {
    seasons() {
      return this.sanitizedEpisodes.reduce((seasons, episode) => {
        if (!seasons[episode.season]) {
          seasons[episode.season] = {
            id: episode.season,
            number: episode.season,
            episodes: []
          };
        }
        seasons[episode.season].episodes.push(episode);
        return seasons;
      }, {});
    },
    starRating() {
      const fullStars = '⭐'.repeat(Math.round(this.show.rating.average));
      const emptyStars = '✰'.repeat(10 - Math.round(this.show.rating.average));
      return fullStars + emptyStars;
    }
  },
  async created() {
    const response = await axios.get(
      `https://api.tvmaze.com/shows/${this.id}?embed[]=episodes&embed[]=cast`
    );
    this.show = response.data;
    if (db) {
      this.loadComments();
    }
    this.sanitizeEpisodes();
  },
  methods: {
    async addComment() {
      const comment = { text: this.newComment };
      if (this.show && this.show.id != null) {
        comment.showId = this.show.id;
      }
      if (db) {
        try {
          await addDoc(collection(db, 'comments'), comment);
          await this.loadComments();
        } catch (e) {
          console.error("Erro ao gravar comentário:", e.code, e.message);
        }
      }
      this.newComment = '';
    },
    async loadComments() {
      if (db !== null) {
        const q = query(collection(db, 'comments'), where('showId', '==', this.show.id));
        const querySnapshot = await getDocs(q);
        this.comments = querySnapshot.docs.map(doc => doc.data());
      }
    },
    sanitizeEpisodes() {
      this.sanitizedEpisodes = this.show._embedded.episodes.map(episode => {
        const sanitizedEpisode = { ...episode };
        sanitizedEpisode.summary = DOMPurify.sanitize(episode.summary);
        return sanitizedEpisode;
      });
    },
    sanitizeCast() {
      this.sanitizedCast = this.show._embedded.cast.map(member => {
        const sanitizedMember = { ...member };
        sanitizedMember.character.name = DOMPurify.sanitize(member.character.name);
        sanitizedMember.person.name = DOMPurify.sanitize(member.person.name);
        return sanitizedMember;
      });
    },
    goBack() {
      window.history.back();
    }
  }
};

</script>

<style scoped>
.cast {
  margin: 1rem 2rem;
}
.person {
  margin:1rem;
}

.cast-member {
  margin-right: 10px;
}

.cast-member img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.cast-member h4,
.cast-member p {
  margin: 0;
  text-align: center;
}

.back-button {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #68c72b;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #5ab920;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.comment-field {
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.submit-button {
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #68c72b;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #5ab920;
}

.series-episode {
  margin: 1rem;
}

.comment {
  background-color: #2c2c2c;
  padding: 1rem;
}

.comment::nth-child(odd) {
  background-color: #2d2d2d;
}
</style>