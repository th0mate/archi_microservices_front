import { API_CONFIG } from '@/config/api.config'
import ApiClient from './apiClient'
import type {
    User,
    LoginRequest,
    RegisterRequest,
    AuthResponse
} from '@/types'

/**
 * Service API pour la gestion des utilisateurs (API Symfony - localhost:8000)
 * Gère l'authentification, l'inscription et les opérations sur les utilisateurs
 */

const client = new ApiClient(API_CONFIG.USER_API)

/**
 * Connexion d'un utilisateur
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    return client.post<AuthResponse>('/api/auth/login', credentials)
}

/**
 * Inscription d'un nouvel utilisateur
 */
export async function register(data: RegisterRequest): Promise<AuthResponse> {
    return client.post<AuthResponse>('/api/auth/register', data)
}

/**
 * Déconnexion de l'utilisateur
 */
export async function logout(): Promise<void> {
    return client.post('/api/auth/logout', undefined, true)
}

/**
 * Récupère le profil de l'utilisateur connecté
 */
export async function getMe(): Promise<User> {
    return client.get<User>('/api/auth/me', true)
}

/**
 * Met à jour un utilisateur
 */
export async function updateUser(id: number, data: Partial<User>): Promise<User> {
    return client.put<User>(`/api/users/${id}`, data, true)
}

/**
 * Supprime un utilisateur
 */
export async function deleteUser(id: number): Promise<void> {
    return client.delete(`/api/users/${id}`, true)
}

/**
 * Vérifie si un utilisateur est admin (utilisé par les autres APIs)
 */
export async function checkIsAdmin(userId: number): Promise<{ isAdmin: boolean }> {
    return client.get<{ isAdmin: boolean }>(`/api/users/${userId}/is-admin`, true)
}

export default {
    login,
    register,
    logout,
    getMe,
    updateUser,
    deleteUser,
    checkIsAdmin,
}
