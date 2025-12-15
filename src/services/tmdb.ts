const API_KEY = 'e18ddfeee897b0d7807fe9335285cefa'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export interface Movie {
  id: number
  title: string
  original_title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  adult: boolean
  original_language: string
}

export interface MovieDetails extends Movie {
  runtime: number
  genres: { id: number; name: string }[]
  production_companies: { id: number; name: string; logo_path: string | null }[]
  tagline: string
  status: string
  budget: number
  revenue: number
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface MovieCredits {
  cast: Cast[]
  crew: { id: number; name: string; job: string; department: string }[]
}

export interface Genre {
  id: number
  name: string
}

export interface ApiResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'
export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original'

export function getImageUrl(path: string | null, size: PosterSize | BackdropSize | ProfileSize = 'w500'): string {
  if (!path) {
    return '/placeholder-movie.jpg'
  }
  return `${IMAGE_BASE_URL}/${size}${path}`
}

async function fetchApi<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  url.searchParams.set('language', 'fr-FR')

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getNowPlaying(page = 1): Promise<ApiResponse<Movie>> {
  return fetchApi<ApiResponse<Movie>>('/movie/now_playing', { page: page.toString() })
}

export async function getUpcoming(page = 1): Promise<ApiResponse<Movie>> {
  return fetchApi<ApiResponse<Movie>>('/movie/upcoming', { page: page.toString() })
}

export async function getPopular(page = 1): Promise<ApiResponse<Movie>> {
  return fetchApi<ApiResponse<Movie>>('/movie/popular', { page: page.toString() })
}

export async function getTopRated(page = 1): Promise<ApiResponse<Movie>> {
  return fetchApi<ApiResponse<Movie>>('/movie/top_rated', { page: page.toString() })
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  return fetchApi<MovieDetails>(`/movie/${movieId}`)
}

export async function getMovieCredits(movieId: number): Promise<MovieCredits> {
  return fetchApi<MovieCredits>(`/movie/${movieId}/credits`)
}

export async function searchMovies(query: string, page = 1): Promise<ApiResponse<Movie>> {
  return fetchApi<ApiResponse<Movie>>('/search/movie', {
    query,
    page: page.toString(),
    include_adult: 'false'
  })
}

export async function getGenres(): Promise<{ genres: Genre[] }> {
  return fetchApi<{ genres: Genre[] }>('/genre/movie/list')
}

export async function discoverMovies(params: {
  page?: number
  with_genres?: string
  sort_by?: string
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
} = {}): Promise<ApiResponse<Movie>> {
  const queryParams: Record<string, string> = {}

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams[key] = value.toString()
    }
  })

  return fetchApi<ApiResponse<Movie>>('/discover/movie', queryParams)
}

export async function getSimilarMovies(movieId: number, page = 1): Promise<ApiResponse<Movie>> {
  return fetchApi<ApiResponse<Movie>>(`/movie/${movieId}/similar`, { page: page.toString() })
}

export interface MovieVideo {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
}

export interface MovieVideosResponse {
  id: number
  results: MovieVideo[]
}

export async function getMovieVideos(movieId: number): Promise<MovieVideosResponse> {
  return fetchApi<MovieVideosResponse>(`/movie/${movieId}/videos`)
}

export function getYouTubeTrailer(videos: MovieVideo[]): MovieVideo | null {
  const trailer = videos.find(v => v.site === 'YouTube' && v.type === 'Trailer' && v.official)
    || videos.find(v => v.site === 'YouTube' && v.type === 'Trailer')
    || videos.find(v => v.site === 'YouTube' && v.type === 'Teaser')
    || videos.find(v => v.site === 'YouTube')
  return trailer || null
}

export default {
  getNowPlaying,
  getUpcoming,
  getPopular,
  getTopRated,
  getMovieDetails,
  getMovieCredits,
  searchMovies,
  getGenres,
  discoverMovies,
  getSimilarMovies,
  getMovieVideos,
  getYouTubeTrailer,
  getImageUrl
}
