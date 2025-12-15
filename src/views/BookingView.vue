<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getMovieDetails, getImageUrl } from '@/services/movieApi'
import { getScreeningsByMovie, joinScreening, formatScreeningDateTime, isScreeningFull, hasUserJoined } from '@/services/screeningApi'
import { useAuthStore } from '@/stores/auth'
import type { Movie, Screening } from '@/types'

const route = useRoute()
const router = useRouter()
const { state: authState } = useAuthStore()

const movie = ref<Movie | null>(null)
const screenings = ref<Screening[]>([])
const isLoading = ref(true)
const isJoining = ref(false)
const error = ref<string | null>(null)

const step = ref<'screenings' | 'confirmation'>('screenings')
const selectedDate = ref<string>('')
const selectedScreening = ref<Screening | null>(null)
const bookingSuccess = ref(false)

const posterUrl = computed(() => getImageUrl(movie.value?.posterUrl, '/placeholder-movie.jpg'))

// Regroupe les séances par date
const screeningsByDate = computed(() => {
  const grouped: Record<string, Screening[]> = {}
  screenings.value.forEach(screening => {
    if (!grouped[screening.date]) {
      grouped[screening.date] = []
    }
    grouped[screening.date].push(screening)
  })
  return grouped
})

// Dates disponibles
const dates = computed(() => {
  return Object.keys(screeningsByDate.value).sort().map(dateStr => {
    const date = new Date(dateStr)
    return {
      value: dateStr,
      day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('fr-FR', { month: 'short' })
    }
  })
})

// Séances pour la date sélectionnée
const screeningsForSelectedDate = computed(() => {
  if (!selectedDate.value) return []
  return screeningsByDate.value[selectedDate.value] || []
})

async function loadData() {
  const movieId = Number(route.params.id)
  
  if (!authState.isAuthenticated) {
    router.push({ path: '/connexion', query: { redirect: route.fullPath } })
    return
  }
  
  if (isNaN(movieId)) {
    error.value = 'Film non trouvé'
    isLoading.value = false
    return
  }
  
  try {
    isLoading.value = true
    error.value = null
    
    // Charger le film et les séances en parallèle
    const [movieData, screeningsData] = await Promise.all([
      getMovieDetails(movieId),
      getScreeningsByMovie(movieId)
    ])
    
    movie.value = movieData
    screenings.value = screeningsData
    
    // Sélectionner la première date disponible
    if (dates.value.length > 0) {
      selectedDate.value = dates.value[0].value
    }
  } catch (e) {
    error.value = 'Impossible de charger les informations.'
    console.error('Error loading data:', e)
  } finally {
    isLoading.value = false
  }
}

function selectScreening(screening: Screening) {
  if (isScreeningFull(screening)) {
    error.value = 'Cette séance est complète'
    return
  }
  
  selectedScreening.value = screening
  step.value = 'confirmation'
  error.value = null
}

function goBack() {
  step.value = 'screenings'
  selectedScreening.value = null
  error.value = null
}

async function confirmBooking() {
  if (!selectedScreening.value || !authState.user) {
    error.value = 'Veuillez sélectionner une séance'
    return
  }

  // Vérifier si l'utilisateur a déjà rejoint
  if (hasUserJoined(selectedScreening.value, authState.user.id)) {
    error.value = 'Vous avez déjà réservé cette séance'
    return
  }

  isJoining.value = true
  error.value = null

  try {
    const updatedScreening = await joinScreening(selectedScreening.value.id)
    
    // Mettre à jour la séance dans la liste
    const index = screenings.value.findIndex(s => s.id === updatedScreening.id)
    if (index !== -1) {
      screenings.value[index] = updatedScreening
    }
    selectedScreening.value = updatedScreening
    bookingSuccess.value = true
  } catch (e: any) {
    error.value = e.message || 'Impossible de confirmer la réservation'
  } finally {
    isJoining.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <main class="booking-page">
    <div class="container">
      <div v-if="isLoading" class="booking-loading">
        <div class="skeleton" style="height: 400px; border-radius: var(--radius-xl);"></div>
      </div>

      <div v-else-if="error && !movie" class="booking-error">
        <p>{{ error }}</p>
        <RouterLink to="/films" class="btn btn-primary">
          Retour aux films
        </RouterLink>
      </div>

      <template v-else-if="movie">
        <div class="booking-progress">
          <div 
            class="progress-step" 
            :class="{ 'is-active': step === 'screenings', 'is-completed': step === 'confirmation' }"
          >
            <span class="progress-number">1</span>
            <span class="progress-label">Séance</span>
          </div>
          <div class="progress-line" :class="{ 'is-active': step === 'confirmation' }"></div>
          <div 
            class="progress-step" 
            :class="{ 'is-active': step === 'confirmation' }"
          >
            <span class="progress-number">2</span>
            <span class="progress-label">Confirmation</span>
          </div>
        </div>

        <div class="booking-layout">
          <aside class="booking-movie">
            <img :src="posterUrl" :alt="movie.title" class="booking-poster" />
            <div class="booking-movie-info">
              <h2 class="booking-movie-title">{{ movie.title }}</h2>
              <div class="booking-movie-meta">
                <span v-if="movie.runtime">{{ Math.floor(movie.runtime / 60) }}h {{ movie.runtime % 60 }}min</span>
                <span v-for="genre in movie.genres.slice(0, 2)" :key="genre.id">{{ genre.name }}</span>
              </div>
            </div>
          </aside>

          <div class="booking-content">
            <!-- Étape 1: Sélection de séance -->
            <section v-if="step === 'screenings'" class="booking-step">
              <h2 class="step-title">Choisissez votre séance</h2>

              <div v-if="dates.length === 0" class="no-screenings">
                <p>Aucune séance disponible pour ce film.</p>
                <RouterLink to="/films" class="btn btn-secondary">
                  Voir d'autres films
                </RouterLink>
              </div>

              <template v-else>
                <div class="date-selector">
                  <h3 class="selector-label">Date</h3>
                  <div class="date-options">
                    <button
                      v-for="date in dates"
                      :key="date.value"
                      class="date-option"
                      :class="{ 'is-selected': selectedDate === date.value }"
                      @click="selectedDate = date.value"
                    >
                      <span class="date-day">{{ date.day }}</span>
                      <span class="date-number">{{ date.date }}</span>
                      <span class="date-month">{{ date.month }}</span>
                    </button>
                  </div>
                </div>

                <div class="time-selector">
                  <h3 class="selector-label">Horaire</h3>
                  <div class="time-options">
                    <button
                      v-for="screening in screeningsForSelectedDate"
                      :key="screening.id"
                      class="time-option"
                      :class="{ 'is-full': isScreeningFull(screening) }"
                      :disabled="isScreeningFull(screening)"
                      @click="selectScreening(screening)"
                    >
                      <span class="time-value">{{ screening.time }}</span>
                      <span class="time-hall">{{ screening.hall }}</span>
                      <span class="time-price">{{ screening.price }}€</span>
                      <span class="time-seats">{{ screening.availableSeats }} places</span>
                    </button>
                  </div>
                </div>
              </template>

              <div v-if="error" class="booking-error-message">
                <p>{{ error }}</p>
              </div>
            </section>

            <!-- Étape 2: Confirmation -->
            <section v-else-if="step === 'confirmation'" class="booking-step">
              <template v-if="!bookingSuccess">
                <div class="step-header">
                  <button class="back-btn" @click="goBack">← Retour</button>
                  <h2 class="step-title">Confirmer votre réservation</h2>
                </div>

                <div class="confirmation-summary" v-if="selectedScreening">
                  <div class="summary-row">
                    <span class="summary-label">Film</span>
                    <span class="summary-value">{{ movie.title }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Date</span>
                    <span class="summary-value">{{ new Date(selectedScreening.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Séance</span>
                    <span class="summary-value">{{ selectedScreening.time }} - {{ selectedScreening.hall }}</span>
                  </div>
                  <div class="summary-row summary-total">
                    <span class="summary-label">Prix</span>
                    <span class="summary-value">{{ selectedScreening.price.toFixed(2) }} €</span>
                  </div>
                </div>

                <div v-if="error" class="booking-error-message">
                  <p>{{ error }}</p>
                </div>

                <button 
                  class="btn btn-primary btn-lg confirm-btn" 
                  @click="confirmBooking"
                  :disabled="isJoining"
                >
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                    <path d="M13 5v2"/>
                    <path d="M13 17v2"/>
                    <path d="M13 11v2"/>
                  </svg>
                  {{ isJoining ? 'Réservation en cours...' : 'Confirmer la réservation' }}
                </button>
              </template>

              <template v-else>
                <div class="booking-success">
                  <div class="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <h2 class="success-title">Réservation confirmée !</h2>
                  <p class="success-text" v-if="selectedScreening">
                    Vous avez rejoint la séance de {{ selectedScreening.time }} le {{ new Date(selectedScreening.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) }}.
                  </p>
                  <div class="success-actions">
                    <RouterLink to="/" class="btn btn-primary">
                      Retour à l'accueil
                    </RouterLink>
                    <RouterLink to="/films" class="btn btn-secondary">
                      Voir d'autres films
                    </RouterLink>
                  </div>
                </div>
              </template>
            </section>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped src="@/styles/views/BookingView.css"></style>
