<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { getImageUrl, type Movie } from '@/services/tmdb'

const props = defineProps<{
  movie: Movie
  showTimes?: boolean
}>()

const posterUrl = computed(() => getImageUrl(props.movie.poster_path, 'w500'))
const rating = computed(() => props.movie.vote_average.toFixed(1))
const year = computed(() => new Date(props.movie.release_date).getFullYear())

const showtimes = ['14:00', '17:00', '19:30', '21:45']
</script>

<template>
  <article class="movie-card">
    <RouterLink :to="`/film/${movie.id}`" class="movie-card__link">
      <div class="movie-card__poster">
        <img :src="posterUrl" :alt="movie.title" loading="lazy" />
        <div class="movie-card__overlay">
          <span class="movie-card__rating">
            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {{ rating }}
          </span>
        </div>
      </div>
      <div class="movie-card__content">
        <h3 class="movie-card__title">{{ movie.title }}</h3>
        <span class="movie-card__year">{{ year }}</span>
      </div>
    </RouterLink>
    
    <div v-if="showTimes" class="movie-card__times">
      <button
        v-for="time in showtimes"
        :key="time"
        class="movie-card__time"
      >
        {{ time }}
      </button>
    </div>
  </article>
</template>

<style scoped src="@/styles/components/MovieCard.css"></style>
