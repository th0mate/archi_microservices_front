// Configuration des URLs des APIs microservices
export const API_CONFIG = {
    // API Symfony - Gestion des utilisateurs et authentification
    USER_API: import.meta.env.VITE_USER_API_URL || 'http://localhost:8000',

    // API Next.js - Gestion des films
    MOVIE_API: import.meta.env.VITE_MOVIE_API_URL || 'http://localhost:8001',

    // API Java - Gestion des séances
    SCREENING_API: import.meta.env.VITE_SCREENING_API_URL || 'http://localhost:8002',
}

// Clé de stockage pour le token JWT
export const JWT_STORAGE_KEY = 'cinelux_jwt_token'
export const USER_STORAGE_KEY = 'cinelux_user'
