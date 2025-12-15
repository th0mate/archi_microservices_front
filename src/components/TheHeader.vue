<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const { state: authState, logout } = useAuthStore()

const isMenuOpen = ref(false)

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Films', path: '/films' }
]

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}

function handleLogout() {
  logout()
  closeMenu()
}
</script>

<template>
  <header class="header">
    <div class="header__container container">
      <RouterLink to="/" class="header__logo" @click="closeMenu">
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

      <nav class="header__nav">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="header__nav-link"
          :class="{ 'is-active': route.path === link.path }"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <template v-if="authState.isAuthenticated">
          <span class="header__user">
            {{ authState.user?.firstName }}
          </span>
          <button class="btn btn-secondary" @click="handleLogout">
            Déconnexion
          </button>
        </template>
        <template v-else>
          <RouterLink to="/connexion" class="btn btn-secondary">
            Connexion
          </RouterLink>
          <RouterLink to="/inscription" class="btn btn-primary">
            Inscription
          </RouterLink>
        </template>
      </div>

      <button
        class="header__burger" 
        :class="{ 'is-open': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="header__mobile" :class="{ 'is-open': isMenuOpen }">
      <nav class="header__mobile-nav">
        <RouterLink
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="header__mobile-link"
          :class="{ 'is-active': route.path === link.path }"
          @click="closeMenu"
        >
          {{ link.name }}
        </RouterLink>
      </nav>

      <div class="header__mobile-actions">
        <template v-if="authState.isAuthenticated">
          <span class="header__mobile-user">
            Bonjour, {{ authState.user?.firstName }}
          </span>
          <button class="btn btn-secondary btn-lg" @click="handleLogout">
            Déconnexion
          </button>
        </template>
        <template v-else>
          <RouterLink to="/connexion" class="btn btn-secondary btn-lg" @click="closeMenu">
            Connexion
          </RouterLink>
          <RouterLink to="/inscription" class="btn btn-primary btn-lg" @click="closeMenu">
            Inscription
          </RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped src="@/styles/components/TheHeader.css"></style>
