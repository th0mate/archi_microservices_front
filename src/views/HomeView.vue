<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSlider from '@/components/HeroSlider.vue'
import MovieCard from '@/components/MovieCard.vue'
import { getNowPlaying, getUpcoming, type Movie } from '@/services/tmdb'

const featuredMovies = ref<Movie[]>([])
const nowPlaying = ref<Movie[]>([])
const upcoming = ref<Movie[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

async function loadMovies() {
  try {
    isLoading.value = true
    error.value = null

    const [nowPlayingRes, upcomingRes] = await Promise.all([
      getNowPlaying(),
      getUpcoming()
    ])

    nowPlaying.value = nowPlayingRes.results.slice(0, 8)
    upcoming.value = upcomingRes.results.slice(0, 8)
    
    featuredMovies.value = nowPlayingRes.results.slice(0, 5)
  } catch (e) {
    error.value = 'Impossible de charger les films. Veuillez réessayer.'
    console.error('Error loading movies:', e)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadMovies)
</script>

<template>
  <main class="home">
    <HeroSlider v-if="featuredMovies.length" :movies="featuredMovies" />
    
    <div v-else-if="isLoading" class="hero-skeleton">
      <div class="skeleton" style="height: 85vh;"></div>
    </div>

    <div v-if="error" class="error-message container">
      <p>{{ error }}</p>
      <button class="btn btn-primary" @click="loadMovies">Réessayer</button>
    </div>

    <section class="section movies-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>
            À l'affiche
          </h2>
          <RouterLink to="/films" class="section-link">
            Voir tout
            <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>

        <div v-if="isLoading" class="movies-grid">
          <div v-for="i in 4" :key="i" class="skeleton movie-skeleton"></div>
        </div>

        <div v-else class="movies-grid">
          <MovieCard
            v-for="movie in nowPlaying"
            :key="movie.id"
            :movie="movie"
            :show-times="true"
          />
        </div>
      </div>
    </section>

    <section class="section movies-section movies-section--dark">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Prochainement
          </h2>
          <RouterLink to="/films?filter=upcoming" class="section-link">
            Voir tout
            <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </RouterLink>
        </div>

        <div v-if="isLoading" class="movies-grid">
          <div v-for="i in 4" :key="i" class="skeleton movie-skeleton"></div>
        </div>

        <div v-else class="movies-grid">
          <MovieCard
            v-for="movie in upcoming"
            :key="movie.id"
            :movie="movie"
          />
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Rejoignez CinéLux</h2>
          <p class="cta-text">
            Inscrivez-vous pour profiter d'offres exclusives et réserver vos places en quelques clics.
          </p>
          <div class="cta-actions">
            <RouterLink to="/inscription" class="btn btn-primary btn-lg">
              Créer un compte
            </RouterLink>
            <RouterLink to="/connexion" class="btn btn-secondary btn-lg">
              Se connecter
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped src="@/styles/views/HomeView.css"></style>
