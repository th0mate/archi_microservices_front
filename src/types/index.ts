// Types partagés pour les APIs microservices

// ==================== USER API (Symfony) ====================

export interface User {
    id: number
    email: string
    firstName: string
    lastName: string
    role: 'user' | 'admin'
    createdAt: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    email: string
    password: string
    firstName: string
    lastName: string
}

export interface LoginResponse {
    user: User
    token: string
}

export interface AuthResponse {
    user: User
    token: string
}

// ==================== MOVIE API (Next.js) ====================

export interface Genre {
    id: number
    name: string
}

export interface Movie {
    id: number
    title: string
    originalTitle: string
    overview: string
    posterUrl: string | null
    backdropUrl: string | null
    releaseDate: string
    runtime: number
    voteAverage: number
    voteCount: number
    genres: Genre[]
    status: 'now_playing' | 'upcoming'
}

export interface MovieListResponse {
    movies: Movie[]
    page: number
    totalPages: number
    totalResults: number
}

export interface CreateMovieRequest {
    title: string
    originalTitle: string
    overview: string
    posterUrl?: string
    backdropUrl?: string
    releaseDate: string
    runtime: number
    genreIds: number[]
    status: 'now_playing' | 'upcoming'
}

export interface UpdateMovieRequest extends Partial<CreateMovieRequest> {
    id: number
}

// ==================== SCREENING API (Java) ====================

export interface Screening {
    id: number
    movieId: number
    date: string
    time: string
    hall: string
    price: number
    maxCapacity: number
    attendees: number[]
    availableSeats: number
    createdAt: string
}

export interface CreateScreeningRequest {
    movieId: number
    date: string
    time: string
    hall: string
    price: number
    maxCapacity: number
}

export interface UpdateScreeningRequest extends Partial<CreateScreeningRequest> {
    id: number
}

export interface UserBooking {
    id: number
    screening: Screening
    movie?: Movie
    bookedAt: string
}

// ==================== API Error ====================

export interface ApiError {
    message: string
    code?: string
    status?: number
}
