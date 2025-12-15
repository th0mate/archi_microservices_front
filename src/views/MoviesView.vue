<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MovieCard from '@/components/MovieCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import { getNowPlaying, getUpcoming, searchMovies, getGenres, discoverMovies, type Movie, type Genre } from '@/services/tmdb'

const route = useRoute()
const router = useRouter()

const movies = ref<Movie[]>([])
const genres = ref<Genre[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')
const selectedGenre = ref<string>('')
const selectedFilter = ref<string>('now_playing')

const filters = [
  { value: 'now_playing', label: 'À l\'affiche' },
  { value: 'upcoming', label: 'Prochainement' },
  { value: 'popular', label: 'Populaires' }
]

const pageTitle = computed(() => {
  if (searchQuery.value) {
    return `Résultats pour "${searchQuery.value}"`
  }
  const filter = filters.find(f => f.value === selectedFilter.value)
  return filter?.label || 'Films'
})

async function loadGenres() {
  try {
    const response = await getGenres()
    genres.value = response.genres
  } catch (e) {
    console.error('Error loading genres:', e)
  }
}

async function loadMovies() {
  try {
    isLoading.value = true
    error.value = null

    let response

    if (searchQuery.value) {
      response = await searchMovies(searchQuery.value, currentPage.value)
    } else if (selectedGenre.value) {
      response = await discoverMovies({
        page: currentPage.value,
        with_genres: selectedGenre.value
      })
    } else {
      switch (selectedFilter.value) {
        case 'upcoming':
          response = await getUpcoming(currentPage.value)
          break
        case 'now_playing':
        default:
          response = await getNowPlaying(currentPage.value)
      }
    }

    movies.value = response.results
    totalPages.value = Math.min(response.total_pages, 20)
  } catch (e) {
    error.value = 'Impossible de charger les films. Veuillez réessayer.'
    console.error('Error loading movies:', e)
  } finally {
    isLoading.value = false
  }
}

function handleSearch(query: string) {
  searchQuery.value = query
  currentPage.value = 1
  selectedGenre.value = ''
  router.push({ query: { q: query } })
  loadMovies()
}

function handleFilterChange(filter: string) {
  selectedFilter.value = filter
  currentPage.value = 1
  searchQuery.value = ''
  selectedGenre.value = ''
  router.push({ query: { filter } })
  loadMovies()
}

function handleGenreChange(event: Event) {
  const target = event.target as HTMLSelectElement
  selectedGenre.value = target.value
  currentPage.value = 1
  searchQuery.value = ''
  loadMovies()
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    loadMovies()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

watch(() => route.query, (query) => {
  if (query.q) {
    searchQuery.value = query.q as string
  }
  if (query.filter) {
    selectedFilter.value = query.filter as string
  }
  loadMovies()
}, { immediate: false })

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q as string
  }
  if (route.query.filter) {
    selectedFilter.value = route.query.filter as string
  }
  
  loadGenres()
  loadMovies()
})
</script>

<template>
  <main class="movies-page">
    <div class="container">
      <header class="movies-header">
        <h1 class="movies-title">{{ pageTitle }}</h1>
        <SearchBar @search="handleSearch" />
      </header>

      <div class="movies-filters">
        <div class="filter-tabs">
          <button
            v-for="filter in filters"
            :key="filter.value"
            class="filter-tab"
            :class="{ 'is-active': selectedFilter === filter.value && !searchQuery }"
            @click="handleFilterChange(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>

        <div class="filter-select">
          <select 
            :value="selectedGenre" 
            @change="handleGenreChange"
            class="genre-select"
          >
            <option value="">Tous les genres</option>
            <option 
              v-for="genre in genres" 
              :key="genre.id" 
              :value="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="error" class="movies-error">
        <p>{{ error }}</p>
        <button class="btn btn-primary" @click="loadMovies">Réessayer</button>
      </div>

      <div v-else-if="isLoading" class="movies-grid">
        <div v-for="i in 12" :key="i" class="skeleton movie-skeleton"></div>
      </div>

      <div v-else-if="movies.length === 0" class="movies-empty">
        <p>Aucun film trouvé.</p>
        <button class="btn btn-secondary" @click="handleFilterChange('now_playing')">
          Voir les films à l'affiche
        </button>
      </div>

      <div v-else class="movies-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>

      <nav v-if="totalPages > 1 && !isLoading" class="pagination">
        <button
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          ← Précédent
        </button>
        
        <div class="pagination-pages">
          <button
            v-for="page in Math.min(totalPages, 7)"
            :key="page"
            class="pagination-page"
            :class="{ 'is-active': page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span v-if="totalPages > 7" class="pagination-ellipsis">...</span>
        </div>

        <button
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          Suivant →
        </button>
      </nav>
    </div>
  </main>
</template>

<style scoped src="@/styles/views/MoviesView.css"></style>
