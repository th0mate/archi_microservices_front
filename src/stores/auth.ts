import { reactive, readonly } from 'vue'
import { JWT_STORAGE_KEY, USER_STORAGE_KEY } from '@/config/api.config'
import * as userApi from '@/services/userApi'
import type { User, ApiError } from '@/types'

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    error: string | null
}

const state = reactive<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
})

/**
 * Sauvegarde le token JWT dans le localStorage
 */
function saveToken(token: string): void {
    localStorage.setItem(JWT_STORAGE_KEY, token)
}

/**
 * Récupère le token JWT depuis le localStorage
 */
function getToken(): string | null {
    return localStorage.getItem(JWT_STORAGE_KEY)
}

/**
 * Supprime le token JWT du localStorage
 */
function removeToken(): void {
    localStorage.removeItem(JWT_STORAGE_KEY)
}

/**
 * Sauvegarde les données utilisateur dans le localStorage
 */
function saveUser(user: User): void {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

/**
 * Récupère les données utilisateur depuis le localStorage
 */
function getSavedUser(): User | null {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY)
    if (savedUser) {
        try {
            return JSON.parse(savedUser)
        } catch {
            return null
        }
    }
    return null
}

/**
 * Supprime les données utilisateur du localStorage
 */
function removeUser(): void {
    localStorage.removeItem(USER_STORAGE_KEY)
}

/**
 * Initialise l'état d'authentification au démarrage
 */
function init(): void {
    const token = getToken()
    const savedUser = getSavedUser()

    if (token && savedUser) {
        state.user = savedUser
        state.isAuthenticated = true
    } else {
        // Si l'un des deux manque, on nettoie tout
        removeToken()
        removeUser()
    }
}

/**
 * Inscription d'un nouvel utilisateur
 */
async function register(data: {
    email: string
    password: string
    firstName: string
    lastName: string
}): Promise<boolean> {
    state.isLoading = true
    state.error = null

    try {
        const response = await userApi.register(data)

        // Sauvegarde du token et des données utilisateur
        saveToken(response.token)
        saveUser(response.user)

        state.user = response.user
        state.isAuthenticated = true

        return true
    } catch (e) {
        const error = e as ApiError
        state.error = error.message || 'Une erreur est survenue lors de l\'inscription'
        return false
    } finally {
        state.isLoading = false
    }
}

/**
 * Connexion d'un utilisateur
 */
async function login(email: string, password: string): Promise<boolean> {
    state.isLoading = true
    state.error = null

    try {
        const response = await userApi.login({ email, password })

        // Sauvegarde du token et des données utilisateur
        saveToken(response.token)
        saveUser(response.user)

        state.user = response.user
        state.isAuthenticated = true

        return true
    } catch (e) {
        const error = e as ApiError
        state.error = error.message || 'Email ou mot de passe incorrect'
        return false
    } finally {
        state.isLoading = false
    }
}

/**
 * Déconnexion de l'utilisateur
 */
async function logout(): Promise<void> {
    try {
        // Appel API pour invalider le token côté serveur
        await userApi.logout()
    } catch {
        // Même si l'appel échoue, on déconnecte localement
        console.warn('Logout API call failed, cleaning up locally')
    } finally {
        // Nettoyage local
        removeToken()
        removeUser()
        state.user = null
        state.isAuthenticated = false
    }
}

/**
 * Rafraîchit les données de l'utilisateur connecté
 */
async function refreshUser(): Promise<boolean> {
    if (!getToken()) {
        return false
    }

    try {
        const user = await userApi.getMe()
        state.user = user
        saveUser(user)
        return true
    } catch {
        // Token invalide, on déconnecte
        await logout()
        return false
    }
}

/**
 * Vérifie si l'utilisateur est admin
 */
function isAdmin(): boolean {
    return state.user?.role === 'admin'
}

/**
 * Efface les erreurs
 */
function clearError(): void {
    state.error = null
}

// Initialisation au chargement du module
init()

export const useAuthStore = () => ({
    state: readonly(state),
    register,
    login,
    logout,
    refreshUser,
    isAdmin,
    clearError,
    getToken
})

export type { User }
export default useAuthStore
