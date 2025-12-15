import { JWT_STORAGE_KEY } from '@/config/api.config'
import type { ApiError } from '@/types'

/**
 * Client HTTP générique pour les appels aux APIs microservices
 * Gère automatiquement l'authentification JWT et les erreurs
 */

class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    /**
     * Récupère le token JWT depuis le localStorage
     */
    private getToken(): string | null {
        return localStorage.getItem(JWT_STORAGE_KEY)
    }

    /**
     * Construit les headers pour les requêtes
     */
    private getHeaders(includeAuth: boolean = false): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        }

        if (includeAuth) {
            const token = this.getToken()
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            }
        }

        return headers
    }

    /**
     * Gère les réponses d'erreur de l'API
     */
    private async handleError(response: Response): Promise<never> {
        let errorData: ApiError = {
            message: 'Une erreur est survenue',
            status: response.status,
        }

        try {
            const data = await response.json()
            errorData = {
                message: data.message || data.error || errorData.message,
                code: data.code,
                status: response.status,
            }
        } catch {
            // Si la réponse n'est pas du JSON, on utilise le message par défaut
        }

        // Messages d'erreur spécifiques selon le status
        if (response.status === 401) {
            errorData.message = 'Session expirée. Veuillez vous reconnecter.'
            // Optionnel: supprimer le token invalide
            localStorage.removeItem(JWT_STORAGE_KEY)
        } else if (response.status === 403) {
            errorData.message = 'Accès refusé. Vous n\'avez pas les permissions nécessaires.'
        } else if (response.status === 404) {
            errorData.message = 'Ressource non trouvée.'
        } else if (response.status >= 500) {
            errorData.message = 'Erreur serveur. Veuillez réessayer plus tard.'
        }

        throw errorData
    }

    /**
     * Effectue une requête GET
     */
    async get<T>(endpoint: string, auth: boolean = false): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: this.getHeaders(auth),
        })

        if (!response.ok) {
            await this.handleError(response)
        }

        return response.json()
    }

    /**
     * Effectue une requête POST
     */
    async post<T>(endpoint: string, data?: unknown, auth: boolean = false): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: this.getHeaders(auth),
            body: data ? JSON.stringify(data) : undefined,
        })

        if (!response.ok) {
            await this.handleError(response)
        }

        return response.json()
    }

    /**
     * Effectue une requête PUT
     */
    async put<T>(endpoint: string, data?: unknown, auth: boolean = false): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: this.getHeaders(auth),
            body: data ? JSON.stringify(data) : undefined,
        })

        if (!response.ok) {
            await this.handleError(response)
        }

        return response.json()
    }

    /**
     * Effectue une requête DELETE
     */
    async delete<T>(endpoint: string, auth: boolean = false): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: this.getHeaders(auth),
        })

        if (!response.ok) {
            await this.handleError(response)
        }

        // Certaines APIs DELETE retournent 204 No Content
        if (response.status === 204) {
            return {} as T
        }

        return response.json()
    }
}

export default ApiClient
