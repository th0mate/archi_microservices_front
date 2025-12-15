import { reactive, readonly, computed } from 'vue'
import * as screeningApi from '@/services/screeningApi'
import type { Movie, Screening, ApiError } from '@/types'

export interface BookingState {
    movie: Movie | null
    screenings: Screening[]
    selectedScreening: Screening | null
    isLoading: boolean
    error: string | null
    bookingSuccess: boolean
}

const state = reactive<BookingState>({
    movie: null,
    screenings: [],
    selectedScreening: null,
    isLoading: false,
    error: null,
    bookingSuccess: false
})

/**
 * Nombre de places disponibles pour la séance sélectionnée
 */
const availableSeats = computed(() => {
    return state.selectedScreening?.availableSeats || 0
})

/**
 * Prix de la séance sélectionnée
 */
const price = computed(() => {
    return state.selectedScreening?.price || 0
})

/**
 * Définit le film pour la réservation et charge ses séances
 */
async function setMovie(movie: Movie): Promise<void> {
    state.movie = movie
    state.selectedScreening = null
    state.error = null
    state.bookingSuccess = false

    await loadScreenings(movie.id)
}

/**
 * Charge les séances disponibles pour un film
 */
async function loadScreenings(movieId: number): Promise<void> {
    state.isLoading = true
    state.error = null

    try {
        const screenings = await screeningApi.getScreeningsByMovie(movieId)
        state.screenings = screenings
    } catch (e) {
        const error = e as ApiError
        state.error = error.message || 'Impossible de charger les séances'
        state.screenings = []
    } finally {
        state.isLoading = false
    }
}

/**
 * Sélectionne une séance
 */
function selectScreening(screening: Screening): void {
    state.selectedScreening = screening
    state.error = null
}

/**
 * Rejoindre une séance (effectuer une réservation)
 */
async function joinScreening(userId: number): Promise<boolean> {
    if (!state.selectedScreening) {
        state.error = 'Veuillez sélectionner une séance'
        return false
    }

    // Vérifier si l'utilisateur a déjà rejoint cette séance
    if (screeningApi.hasUserJoined(state.selectedScreening, userId)) {
        state.error = 'Vous avez déjà réservé cette séance'
        return false
    }

    // Vérifier s'il reste des places
    if (screeningApi.isScreeningFull(state.selectedScreening)) {
        state.error = 'Cette séance est complète'
        return false
    }

    state.isLoading = true
    state.error = null

    try {
        const updatedScreening = await screeningApi.joinScreening(state.selectedScreening.id)

        // Mettre à jour la séance dans la liste
        const index = state.screenings.findIndex(s => s.id === updatedScreening.id)
        if (index !== -1) {
            state.screenings[index] = updatedScreening
        }
        state.selectedScreening = updatedScreening
        state.bookingSuccess = true

        return true
    } catch (e) {
        const error = e as ApiError
        state.error = error.message || 'Impossible de rejoindre cette séance'
        return false
    } finally {
        state.isLoading = false
    }
}

/**
 * Quitter une séance (annuler une réservation)
 */
async function leaveScreening(): Promise<boolean> {
    if (!state.selectedScreening) {
        state.error = 'Aucune séance sélectionnée'
        return false
    }

    state.isLoading = true
    state.error = null

    try {
        const updatedScreening = await screeningApi.leaveScreening(state.selectedScreening.id)

        // Mettre à jour la séance dans la liste
        const index = state.screenings.findIndex(s => s.id === updatedScreening.id)
        if (index !== -1) {
            state.screenings[index] = updatedScreening
        }
        state.selectedScreening = updatedScreening

        return true
    } catch (e) {
        const error = e as ApiError
        state.error = error.message || 'Impossible d\'annuler cette réservation'
        return false
    } finally {
        state.isLoading = false
    }
}

/**
 * Récupère les réservations d'un utilisateur
 */
async function getUserBookings(userId: number) {
    state.isLoading = true
    state.error = null

    try {
        return await screeningApi.getUserBookings(userId)
    } catch (e) {
        const error = e as ApiError
        state.error = error.message || 'Impossible de charger vos réservations'
        return []
    } finally {
        state.isLoading = false
    }
}

/**
 * Réinitialise l'état de réservation
 */
function reset(): void {
    state.movie = null
    state.screenings = []
    state.selectedScreening = null
    state.error = null
    state.bookingSuccess = false
}

/**
 * Efface les erreurs
 */
function clearError(): void {
    state.error = null
}

/**
 * Formate la date et l'heure d'une séance
 */
function formatScreeningDateTime(screening: Screening): string {
    return screeningApi.formatScreeningDateTime(screening)
}

/**
 * Vérifie si une séance est complète
 */
function isScreeningFull(screening: Screening): boolean {
    return screeningApi.isScreeningFull(screening)
}

/**
 * Vérifie si un utilisateur a rejoint une séance
 */
function hasUserJoined(screening: Screening, userId: number): boolean {
    return screeningApi.hasUserJoined(screening, userId)
}

export { Screening }

export const useBookingStore = () => ({
    state: readonly(state),
    availableSeats,
    price,
    setMovie,
    loadScreenings,
    selectScreening,
    joinScreening,
    leaveScreening,
    getUserBookings,
    reset,
    clearError,
    formatScreeningDateTime,
    isScreeningFull,
    hasUserJoined
})

export default useBookingStore
