<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getMovieDetails, getImageUrl } from '@/services/movieApi'
import { useAuthStore } from '@/stores/auth'
import type { Movie } from '@/types'

const route = useRoute()
const router = useRouter()
const { state: authState } = useAuthStore()

const movie = ref<Movie | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const backdropUrl = computed(() => getImageUrl(movie.value?.backdropUrl, '/placeholder-movie.jpg'))
const posterUrl = computed(() => getImageUrl(movie.value?.posterUrl, '/placeholder-movie.jpg'))
const rating = computed(() => movie.value?.voteAverage?.toFixed(1) || '0')
const year = computed(() => movie.value?.releaseDate ? new Date(movie.value.releaseDate).getFullYear() : '')
const runtime = computed(() => {
  if (!movie.value?.runtime) return ''
  const hours = Math.floor(movie.value.runtime / 60)
  const minutes = movie.value.runtime % 60
  return `${hours}h ${minutes}min`
})

async function loadMovie() {
  const movieId = Number(route.params.id)
  
  if (isNaN(movieId)) {
    error.value = 'Film non trouvé'
    isLoading.value = false
    return
  }
  
  try {
    isLoading.value = true
    error.value = null
    
    movie.value = await getMovieDetails(movieId)
  } catch (e) {
    error.value = 'Impossible de charger les informations du film.'
    console.error('Error loading movie:', e)
  } finally {
    isLoading.value = false
  }
}

function handleBooking() {
  if (!authState.isAuthenticated) {
    router.push({ path: '/connexion', query: { redirect: `/reservation/${movie.value?.id}` } })
  } else {
    router.push(`/reservation/${movie.value?.id}`)
  }
}

onMounted(loadMovie)
</script>

<template>
  <main class="movie-detail">
    <div v-if="isLoading" class="movie-detail__loading">
      <div class="container">
        <div class="skeleton" style="height: 60vh; border-radius: var(--radius-xl);"></div>
      </div>
    </div>

    <div v-else-if="error" class="movie-detail__error container">
      <p>{{ error }}</p>
      <RouterLink to="/films" class="btn btn-primary">
        Retour aux films
      </RouterLink>
    </div>

    <template v-else-if="movie">
      <section class="movie-hero">
        <div 
          class="movie-hero__backdrop"
          :style="{ backgroundImage: `url(${backdropUrl})` }"
        >
          <div class="movie-hero__overlay"></div>
        </div>
        
        <div class="movie-hero__content container">
          <div class="movie-hero__poster">
            <img :src="posterUrl" :alt="movie.title" />
          </div>
          
          <div class="movie-hero__info">
            <h1 class="movie-hero__title">{{ movie.title }}</h1>
            
            <div class="movie-hero__meta">
              <span class="meta-item meta-rating">
                <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {{ rating }}/10
              </span>
              <span class="meta-item">{{ year }}</span>
              <span class="meta-item" v-if="runtime">{{ runtime }}</span>
            </div>

            <div class="movie-hero__genres">
              <span
                v-for="genre in movie.genres"
                :key="genre.id"
                class="genre-tag"
              >
                {{ genre.name }}
              </span>
            </div>

            <div class="movie-hero__actions">
              <button class="btn btn-primary btn-lg" @click="handleBooking">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                  <path d="M13 5v2"/>
                  <path d="M13 17v2"/>
                  <path d="M13 11v2"/>
                </svg>
                Réserver des places
              </button>
              <button class="btn btn-secondary btn-lg">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Bande-annonce
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="movie-info section">
        <div class="container">
          <div class="movie-info__grid">
            <div class="movie-info__main">
              <h2 class="section-title">Synopsis</h2>
              <p class="movie-synopsis">
                {{ movie.overview || 'Aucun synopsis disponible.' }}
              </p>
            </div>

            <aside class="movie-info__sidebar">
              <div class="info-card">
                <h3 class="info-card__title">Informations</h3>
                <dl class="info-list">
                  <div class="info-item">
                    <dt>Date de sortie</dt>
                    <dd>{{ new Date(movie.releaseDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) }}</dd>
                  </div>
                  <div class="info-item" v-if="movie.runtime">
                    <dt>Durée</dt>
                    <dd>{{ runtime }}</dd>
                  </div>
                  <div class="info-item">
                    <dt>Note moyenne</dt>
                    <dd>{{ rating }}/10 ({{ movie.voteCount }} votes)</dd>
                  </div>
                </dl>
              </div>

              <div class="booking-card">
                <h3 class="booking-card__title">Réserver maintenant</h3>
                <p class="booking-card__text">
                  Choisissez votre séance et réservez vos places en quelques clics.
                </p>
                <button class="btn btn-primary" style="width: 100%;" @click="handleBooking">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                    <path d="M13 5v2"/>
                    <path d="M13 17v2"/>
                    <path d="M13 11v2"/>
                  </svg>
                  Réserver
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>

<style scoped src="@/styles/views/MovieDetailView.css"></style>
