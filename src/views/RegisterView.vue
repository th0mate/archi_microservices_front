<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { state: authState, register, clearError } = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const localError = ref<string | null>(null)

async function handleSubmit() {
  clearError()
  localError.value = null
  
  if (password.value.length < 6) {
    localError.value = 'Le mot de passe doit contenir au moins 6 caractères'
    return
  }
  
  if (password.value !== confirmPassword.value) {
    localError.value = 'Les mots de passe ne correspondent pas'
    return
  }
  
  const success = await register({
    email: email.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value
  })
  
  if (success) {
    router.push('/')
  }
}

onMounted(() => {
  clearError()
  if (authState.isAuthenticated) {
    router.push('/')
  }
})
</script>

<template>
  <main class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <RouterLink to="/" class="auth-logo">
            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
              <line x1="7" y1="2" x2="7" y2="22"/>
              <line x1="17" y1="2" x2="17" y2="22"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <line x1="2" y1="7" x2="7" y2="7"/>
              <line x1="2" y1="17" x2="7" y2="17"/>
              <line x1="17" y1="17" x2="22" y2="17"/>
              <line x1="17" y1="7" x2="22" y2="7"/>
            </svg>
            <span class="logo-text">Ciné<span class="logo-accent">Lux</span></span>
          </RouterLink>
          <h1 class="auth-title">Créer un compte</h1>
          <p class="auth-subtitle">
            Rejoignez CinéLux et profitez d'avantages exclusifs
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName" class="form-label">Prénom</label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                class="form-input"
                placeholder="Jean"
                required
                autocomplete="given-name"
              />
            </div>

            <div class="form-group">
              <label for="lastName" class="form-label">Nom</label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                class="form-input"
                placeholder="Dupont"
                required
                autocomplete="family-name"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-input"
              placeholder="votre@email.com"
              required
              autocomplete="email"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="input-wrapper">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input form-input--with-icon"
                placeholder="••••••••"
                required
                autocomplete="new-password"
                minlength="6"
              />
              <button
                type="button"
                class="input-icon-btn"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            <span class="form-hint">Minimum 6 caractères</span>
          </div>

          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="••••••••"
              required
              autocomplete="new-password"
            />
          </div>

          <div v-if="authState.error || localError" class="form-error">
            {{ authState.error || localError }}
          </div>

          <button
            type="submit"
            class="btn btn-primary btn-lg auth-submit"
            :disabled="authState.isLoading"
          >
            {{ authState.isLoading ? 'Création...' : 'Créer mon compte' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>
            Déjà un compte ?
            <RouterLink to="/connexion" class="auth-link">
              Se connecter
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="@/styles/views/RegisterView.css"></style>
