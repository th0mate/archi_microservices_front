import { API_CONFIG } from '@/config/api.config'
import ApiClient from './apiClient'
import type {
    Movie,
    Genre,
    MovieListResponse,
    CreateMovieRequest,
    UpdateMovieRequest
} from '@/types'

/**
 * Service API pour la gestion des films (API Next.js - localhost:8001)
 * Gère la liste, la recherche et les opérations CRUD sur les films
 */

const client = new ApiClient(API_CONFIG.MOVIE_API)

// ==================== Lecture (Public) ====================

/**
 * Récupère la liste des films avec pagination
 */
export async function getMovies(page: number = 1): Promise<MovieListResponse> {
    return client.get<MovieListResponse>(`/api/movies?page=${page}`)
}

/**
 * Récupère les films actuellement à l'affiche
 */
export async function getNowPlaying(page: number = 1): Promise<MovieListResponse> {
    return client.get<MovieListResponse>(`/api/movies/now-playing?page=${page}`)
}

/**
 * Récupère les films à venir
 */
export async function getUpcoming(page: number = 1): Promise<MovieListResponse> {
    return client.get<MovieListResponse>(`/api/movies/upcoming?page=${page}`)
}

/**
 * Récupère les détails d'un film
 */
export async function getMovieDetails(movieId: number): Promise<Movie> {
    return client.get<Movie>(`/api/movies/${movieId}`)
}

/**
 * Recherche des films
 */
export async function searchMovies(query: string, page: number = 1): Promise<MovieListResponse> {
    return client.get<MovieListResponse>(`/api/movies/search?q=${encodeURIComponent(query)}&page=${page}`)
}

/**
 * Récupère tous les genres
 */
export async function getGenres(): Promise<{ genres: Genre[] }> {
    return client.get<{ genres: Genre[] }>('/api/genres')
}

/**
 * Récupère les films par genre
 */
export async function getMoviesByGenre(genreId: number, page: number = 1): Promise<MovieListResponse> {
    return client.get<MovieListResponse>(`/api/movies?genre=${genreId}&page=${page}`)
}

// ==================== Écriture (Admin) ====================

/**
 * Crée un nouveau film (Admin uniquement)
 * Le backend vérifie les permissions via l'API Symfony
 */
export async function createMovie(data: CreateMovieRequest): Promise<Movie> {
    return client.post<Movie>('/api/movies', data, true)
}

/**
 * Met à jour un film (Admin uniquement)
 */
export async function updateMovie(id: number, data: Partial<CreateMovieRequest>): Promise<Movie> {
    return client.put<Movie>(`/api/movies/${id}`, data, true)
}

/**
 * Supprime un film (Admin uniquement)
 */
export async function deleteMovie(id: number): Promise<void> {
    return client.delete(`/api/movies/${id}`, true)
}

// ==================== Utilitaires ====================

/**
 * Génère l'URL d'une image de film
 * Utilise des URLs externes (pas de stockage local)
 */
export function getImageUrl(url: string | null, fallback: string = '/placeholder-movie.jpg'): string {
    if (!url) {
        return fallback
    }
    return url
}

export default {
    getMovies,
    getNowPlaying,
    getUpcoming,
    getMovieDetails,
    searchMovies,
    getGenres,
    getMoviesByGenre,
    createMovie,
    updateMovie,
    deleteMovie,
    getImageUrl,
}
