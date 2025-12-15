<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { searchMovies, type Movie } from '@/services/tmdb'

const emit = defineEmits<{
  search: [query: string]
}>()

const router = useRouter()
const query = ref('')
const suggestions = ref<Movie[]>([])
const isOpen = ref(false)
const isLoading = ref(false)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(query, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  
  if (value.length < 2) {
    suggestions.value = []
    isOpen.value = false
    return
  }
  
  debounceTimer = setTimeout(async () => {
    isLoading.value = true
    try {
      const response = await searchMovies(value)
      suggestions.value = response.results.slice(0, 5)
      isOpen.value = suggestions.value.length > 0
    } catch (e) {
      console.error('Search error:', e)
      suggestions.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)
})

function handleSubmit() {
  if (query.value.length > 0) {
    emit('search', query.value)
    router.push({ path: '/films', query: { q: query.value } })
    isOpen.value = false
  }
}

function selectMovie(movie: Movie) {
  router.push(`/film/${movie.id}`)
  query.value = ''
  isOpen.value = false
}

function handleBlur() {
  setTimeout(() => {
    isOpen.value = false
  }, 200)
}
</script>

<template>
  <div class="search-bar">
    <form @submit.prevent="handleSubmit" class="search-bar__form">
      <svg class="search-bar__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        v-model="query"
        type="text"
        placeholder="Rechercher un film..."
        class="search-bar__input"
        @focus="isOpen = suggestions.length > 0"
        @blur="handleBlur"
      />
      <button 
        v-if="query.length > 0" 
        type="button" 
        class="search-bar__clear"
        @click="query = ''"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </form>

    <div v-if="isOpen" class="search-bar__dropdown">
      <div v-if="isLoading" class="search-bar__loading">
        Recherche...
      </div>
      <ul v-else class="search-bar__suggestions">
        <li
          v-for="movie in suggestions"
          :key="movie.id"
          class="search-bar__suggestion"
          @click="selectMovie(movie)"
        >
          <img
            v-if="movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
            :alt="movie.title"
            class="search-bar__thumb"
          />
          <div v-else class="search-bar__thumb search-bar__thumb--placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
            </svg>
          </div>
          <div class="search-bar__info">
            <span class="search-bar__title">{{ movie.title }}</span>
            <span class="search-bar__year">
              {{ movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A' }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped src="@/styles/components/SearchBar.css"></style>
