import { API_CONFIG } from '@/config/api.config'
import ApiClient from './apiClient'
import type {
    Screening,
    CreateScreeningRequest,
    UpdateScreeningRequest,
    UserBooking
} from '@/types'

/**
 * Service API pour la gestion des séances (API Java - localhost:8002)
 * Gère les séances de cinéma et les réservations des utilisateurs
 */

const client = new ApiClient(API_CONFIG.SCREENING_API)

// ==================== Lecture (Public) ====================

/**
 * Récupère toutes les séances
 */
export async function getScreenings(): Promise<Screening[]> {
    return client.get<Screening[]>('/api/screenings')
}

/**
 * Récupère une séance par son ID
 */
export async function getScreeningById(id: number): Promise<Screening> {
    return client.get<Screening>(`/api/screenings/${id}`)
}

/**
 * Récupère les séances d'un film
 */
export async function getScreeningsByMovie(movieId: number): Promise<Screening[]> {
    return client.get<Screening[]>(`/api/screenings/movie/${movieId}`)
}

// ==================== Écriture (Admin) ====================

/**
 * Crée une nouvelle séance (Admin uniquement)
 * Le backend vérifie les permissions via l'API Symfony
 */
export async function createScreening(data: CreateScreeningRequest): Promise<Screening> {
    return client.post<Screening>('/api/screenings', data, true)
}

/**
 * Met à jour une séance (Admin uniquement)
 */
export async function updateScreening(id: number, data: Partial<CreateScreeningRequest>): Promise<Screening> {
    return client.put<Screening>(`/api/screenings/${id}`, data, true)
}

/**
 * Supprime une séance (Admin uniquement)
 */
export async function deleteScreening(id: number): Promise<void> {
    return client.delete(`/api/screenings/${id}`, true)
}

// ==================== Réservations (User) ====================

/**
 * Rejoindre une séance (réserver une place)
 */
export async function joinScreening(screeningId: number): Promise<Screening> {
    return client.post<Screening>(`/api/screenings/${screeningId}/join`, undefined, true)
}

/**
 * Quitter une séance (annuler la réservation)
 */
export async function leaveScreening(screeningId: number): Promise<Screening> {
    return client.delete<Screening>(`/api/screenings/${screeningId}/leave`, true)
}

/**
 * Récupère les réservations d'un utilisateur
 */
export async function getUserBookings(userId: number): Promise<UserBooking[]> {
    return client.get<UserBooking[]>(`/api/users/${userId}/bookings`, true)
}

// ==================== Utilitaires ====================

/**
 * Vérifie si une séance est complète
 */
export function isScreeningFull(screening: Screening): boolean {
    return screening.availableSeats <= 0
}

/**
 * Vérifie si un utilisateur a rejoint une séance
 */
export function hasUserJoined(screening: Screening, userId: number): boolean {
    return screening.attendees.includes(userId)
}

/**
 * Formate la date et l'heure d'une séance
 */
export function formatScreeningDateTime(screening: Screening): string {
    const date = new Date(screening.date)
    const formattedDate = date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    })
    return `${formattedDate} à ${screening.time}`
}

export default {
    getScreenings,
    getScreeningById,
    getScreeningsByMovie,
    createScreening,
    updateScreening,
    deleteScreening,
    joinScreening,
    leaveScreening,
    getUserBookings,
    isScreeningFull,
    hasUserJoined,
    formatScreeningDateTime,
}
