<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue'
import {RouterLink} from 'vue-router'
import {getImageUrl, type Movie} from '@/services/tmdb'

const props = defineProps<{
  movies: Movie[]
}>()

const currentIndex = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null

const currentMovie = computed(() => props.movies[currentIndex.value])
const backdropUrl = computed(() => getImageUrl(currentMovie.value?.backdrop_path, 'original'))
const rating = computed(() => currentMovie.value?.vote_average?.toFixed(1) || '0')

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % props.movies.length
}

function prevSlide() {
  currentIndex.value = (currentIndex.value - 1 + props.movies.length) % props.movies.length
}

function goToSlide(index: number) {
  currentIndex.value = index
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 6000)
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

onMounted(() => {
  if (props.movies.length > 1) {
    startAutoplay()
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<template>
  <section
      class="hero"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
  >
    <div class="hero__background">
      <TransitionGroup name="fade">
        <div
            v-for="(movie, index) in movies"
            v-show="index === currentIndex"
            :key="movie.id"
            class="hero__bg-image"
            :style="{ backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})` }"
        />
      </TransitionGroup>
      <div class="hero__overlay"></div>
    </div>

    <div class="hero__container container">
      <div class="hero__content" v-if="currentMovie">
        <span class="hero__badge">À l'affiche</span>
        <h1 class="hero__title">{{ currentMovie.title }}</h1>
        <p class="hero__overview">{{ currentMovie.overview }}</p>

        <div class="hero__meta">
          <span class="hero__rating">
            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {{ rating }}/10
          </span>
          <span class="hero__year">{{ new Date(currentMovie.release_date).getFullYear() }}</span>
        </div>

        <div class="hero__actions">
          <RouterLink :to="`/reservation/${currentMovie.id}`" class="btn btn-primary btn-lg">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                  d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
              <path d="M13 5v2"/>
              <path d="M13 17v2"/>
              <path d="M13 11v2"/>
            </svg>
            Réserver
          </RouterLink>
          <RouterLink :to="`/film/${currentMovie.id}`" class="btn btn-secondary btn-lg">
            Plus d'infos
          </RouterLink>
        </div>
      </div>

      <div class="hero__nav" v-if="movies.length > 1">
        <button class="hero__arrow hero__arrow--prev" @click="prevSlide" aria-label="Précédent">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <div class="hero__dots">
          <button
              v-for="(movie, index) in movies"
              :key="movie.id"
              class="hero__dot"
              :class="{ 'is-active': index === currentIndex }"
              @click="goToSlide(index)"
              :aria-label="`Aller au film ${index + 1}`"
          />
        </div>
        <button class="hero__arrow hero__arrow--next" @click="nextSlide" aria-label="Suivant">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped src="@/styles/components/HeroSlider.css"></style>
