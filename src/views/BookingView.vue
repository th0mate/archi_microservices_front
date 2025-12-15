<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { getMovieDetails, getImageUrl, type MovieDetails } from '@/services/tmdb'
import { useAuthStore } from '@/stores/auth'
import SeatSelector from '@/components/SeatSelector.vue'
import type { Seat } from '@/stores/booking'

const route = useRoute()
const router = useRouter()
const { state: authState } = useAuthStore()

const movie = ref<MovieDetails | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

const step = ref<'showtime' | 'seats' | 'confirmation'>('showtime')
const selectedDate = ref<string>('')
const selectedShowtime = ref<{ time: string; format: string; price: number } | null>(null)
const selectedSeats = ref<Seat[]>([])
const bookingReference = ref<string>('')

const posterUrl = computed(() => getImageUrl(movie.value?.poster_path, 'w342'))

const dates = computed(() => {
  const result = []
  for (let i = 0; i < 5; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    result.push({
      value: date.toISOString().split('T')[0],
      day: date.toLocaleDateString('fr-FR', { weekday: 'short' }),
      date: date.getDate(),
      month: date.toLocaleDateString('fr-FR', { month: 'short' })
    })
  }
  return result
})

const showtimes = computed(() => [
  { time: '14:00', format: '2D', price: 11 },
  { time: '16:30', format: '2D', price: 11 },
  { time: '19:00', format: '3D', price: 14 },
  { time: '21:30', format: 'IMAX', price: 16 }
])

const total = computed(() => {
  return selectedSeats.value.reduce((sum, seat) => sum + seat.price, 0)
})

async function loadMovie() {
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
    movie.value = await getMovieDetails(movieId)
    selectedDate.value = dates.value[0].value
  } catch (e) {
    error.value = 'Impossible de charger les informations du film.'
    console.error('Error loading movie:', e)
  } finally {
    isLoading.value = false
  }
}

function selectShowtime(showtime: typeof showtimes.value[0]) {
  selectedShowtime.value = showtime
  step.value = 'seats'
}

function handleSeatsUpdate(seats: Seat[]) {
  selectedSeats.value = seats
}

function goToConfirmation() {
  if (selectedSeats.value.length > 0) {
    step.value = 'confirmation'
  }
}

function goBack() {
  if (step.value === 'confirmation') {
    step.value = 'seats'
  } else if (step.value === 'seats') {
    step.value = 'showtime'
    selectedShowtime.value = null
    selectedSeats.value = []
  }
}

function confirmBooking() {
  bookingReference.value = `CLX-${Date.now().toString(36).toUpperCase()}`
  
  const bookings = JSON.parse(localStorage.getItem('cinelux_bookings') || '[]')
  bookings.push({
    reference: bookingReference.value,
    movieId: movie.value?.id,
    movieTitle: movie.value?.title,
    date: selectedDate.value,
    showtime: selectedShowtime.value,
    seats: selectedSeats.value.map(s => `${s.row}${s.number}`),
    total: total.value,
    createdAt: new Date().toISOString()
  })
  localStorage.setItem('cinelux_bookings', JSON.stringify(bookings))
}

onMounted(loadMovie)
</script>

<template>
  <main class="booking-page">
    <div class="container">
      <div v-if="isLoading" class="booking-loading">
        <div class="skeleton" style="height: 400px; border-radius: var(--radius-xl);"></div>
      </div>

      <div v-else-if="error" class="booking-error">
        <p>{{ error }}</p>
        <RouterLink to="/films" class="btn btn-primary">
          Retour aux films
        </RouterLink>
      </div>

      <template v-else-if="movie">
        <div class="booking-progress">
          <div 
            class="progress-step" 
            :class="{ 'is-active': step === 'showtime', 'is-completed': step !== 'showtime' }"
          >
            <span class="progress-number">1</span>
            <span class="progress-label">Séance</span>
          </div>
          <div class="progress-line" :class="{ 'is-active': step !== 'showtime' }"></div>
          <div 
            class="progress-step" 
            :class="{ 'is-active': step === 'seats', 'is-completed': step === 'confirmation' }"
          >
            <span class="progress-number">2</span>
            <span class="progress-label">Places</span>
          </div>
          <div class="progress-line" :class="{ 'is-active': step === 'confirmation' }"></div>
          <div 
            class="progress-step" 
            :class="{ 'is-active': step === 'confirmation' }"
          >
            <span class="progress-number">3</span>
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
            <section v-if="step === 'showtime'" class="booking-step">
              <h2 class="step-title">Choisissez votre séance</h2>

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
                    v-for="showtime in showtimes"
                    :key="showtime.time"
                    class="time-option"
                    @click="selectShowtime(showtime)"
                  >
                    <span class="time-value">{{ showtime.time }}</span>
                    <span class="time-format">{{ showtime.format }}</span>
                    <span class="time-price">{{ showtime.price }}€</span>
                  </button>
                </div>
              </div>
            </section>

            <section v-else-if="step === 'seats'" class="booking-step">
              <div class="step-header">
                <button class="back-btn" @click="goBack">← Retour</button>
                <h2 class="step-title">Choisissez vos places</h2>
              </div>
              
              <div class="showtime-summary">
                <span class="summary-item">
                  <svg class="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                </span>
                <span class="summary-item">
                  <svg class="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {{ selectedShowtime?.time }}
                </span>
                <span class="summary-item">
                  <svg class="summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
                    <line x1="7" y1="2" x2="7" y2="22"/>
                    <line x1="17" y1="2" x2="17" y2="22"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                  </svg>
                  {{ selectedShowtime?.format }}
                </span>
              </div>

              <SeatSelector 
                :price="selectedShowtime?.price || 11" 
                @update:selected="handleSeatsUpdate"
              />

              <button 
                class="btn btn-primary btn-lg continue-btn"
                :disabled="selectedSeats.length === 0"
                @click="goToConfirmation"
              >
                Continuer ({{ selectedSeats.length }} place{{ selectedSeats.length > 1 ? 's' : '' }})
              </button>
            </section>

            <section v-else-if="step === 'confirmation'" class="booking-step">
              <template v-if="!bookingReference">
                <div class="step-header">
                  <button class="back-btn" @click="goBack">← Retour</button>
                  <h2 class="step-title">Confirmer votre réservation</h2>
                </div>

                <div class="confirmation-summary">
                  <div class="summary-row">
                    <span class="summary-label">Film</span>
                    <span class="summary-value">{{ movie.title }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Date</span>
                    <span class="summary-value">{{ new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Séance</span>
                    <span class="summary-value">{{ selectedShowtime?.time }} - {{ selectedShowtime?.format }}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Places</span>
                    <span class="summary-value">{{ selectedSeats.map(s => `${s.row}${s.number}`).join(', ') }}</span>
                  </div>
                  <div class="summary-row summary-total">
                    <span class="summary-label">Total</span>
                    <span class="summary-value">{{ total.toFixed(2) }} €</span>
                  </div>
                </div>

                <button class="btn btn-primary btn-lg confirm-btn" @click="confirmBooking">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                    <path d="M13 5v2"/>
                    <path d="M13 17v2"/>
                    <path d="M13 11v2"/>
                  </svg>
                  Confirmer la réservation
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
                  <p class="success-reference">
                    Référence: <strong>{{ bookingReference }}</strong>
                  </p>
                  <p class="success-text">
                    Vous recevrez un email de confirmation avec votre billet électronique.
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
