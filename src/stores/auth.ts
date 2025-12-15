import { reactive, readonly } from 'vue'

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    createdAt: string
}

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

function init() {
    const savedUser = localStorage.getItem('cinelux_user')
    if (savedUser) {
        try {
            state.user = JSON.parse(savedUser)
            state.isAuthenticated = true
        } catch {
            localStorage.removeItem('cinelux_user')
        }
    }
}

async function register(data: {
    email: string
    password: string
    firstName: string
    lastName: string
}): Promise<boolean> {
    state.isLoading = true
    state.error = null

    try {
        await new Promise(resolve => setTimeout(resolve, 800))

        const users = JSON.parse(localStorage.getItem('cinelux_users') || '[]')
        if (users.some((u: User & { password: string }) => u.email === data.email)) {
            state.error = 'Cet email est déjà utilisé'
            return false
        }

        const newUser: User = {
            id: crypto.randomUUID(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            createdAt: new Date().toISOString()
        }

        users.push({ ...newUser, password: data.password })
        localStorage.setItem('cinelux_users', JSON.stringify(users))

        state.user = newUser
        state.isAuthenticated = true
        localStorage.setItem('cinelux_user', JSON.stringify(newUser))

        return true
    } catch (e) {
        state.error = 'Une erreur est survenue'
        return false
    } finally {
        state.isLoading = false
    }
}

async function login(email: string, password: string): Promise<boolean> {
    state.isLoading = true
    state.error = null

    try {
        await new Promise(resolve => setTimeout(resolve, 600))

        const users = JSON.parse(localStorage.getItem('cinelux_users') || '[]')
        const user = users.find((u: User & { password: string }) =>
            u.email === email && u.password === password
        )

        if (!user) {
            state.error = 'Email ou mot de passe incorrect'
            return false
        }

        const { password: _, ...userData } = user
        state.user = userData
        state.isAuthenticated = true
        localStorage.setItem('cinelux_user', JSON.stringify(userData))

        return true
    } catch (e) {
        state.error = 'Une erreur est survenue'
        return false
    } finally {
        state.isLoading = false
    }
}

function logout() {
    state.user = null
    state.isAuthenticated = false
    localStorage.removeItem('cinelux_user')
}

function clearError() {
    state.error = null
}

init()

export const useAuthStore = () => ({
    state: readonly(state),
    register,
    login,
    logout,
    clearError
})

export default useAuthStore
