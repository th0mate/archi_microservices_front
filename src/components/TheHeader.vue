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

    <div 
      class="header__mobile" 
      :class="{ 'is-open': isMenuOpen }"
      :style="isMenuOpen ? 'display: flex; position: fixed; top: 72px; left: 0; right: 0; bottom: 0; height: calc(100vh - 72px); background: #0a0a0f; z-index: 9999; flex-direction: column; padding: 24px; gap: 32px;' : 'display: none;'"
    >
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

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: linear-gradient(to bottom, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.8) 100%);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.header__container {
  display: flex;
  align-items: center;
  height: 72px;
  gap: var(--spacing-xl);
}

.header__logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-family-display);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
  flex-shrink: 0;
}

.header__logo .logo-icon {
  width: 28px;
  height: 28px;
  color: var(--color-accent);
}

.header__logo .logo-accent {
  color: var(--color-accent);
}

.header__nav {
  display: none;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

@media (min-width: 768px) {
  .header__nav {
    display: flex;
  }
}

.header__nav-link {
  position: relative;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.header__nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s;
}

.header__nav-link:hover,
.header__nav-link.is-active {
  color: var(--color-text-primary);
}

.header__nav-link:hover::after,
.header__nav-link.is-active::after {
  width: 100%;
}

.header__nav-link.is-active {
  color: var(--color-accent);
}

.header__actions {
  display: none;
  align-items: center;
  gap: var(--spacing-md);
  margin-left: auto;
}

@media (min-width: 768px) {
  .header__actions {
    display: flex;
  }
}

.header__user {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.header__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
}

@media (min-width: 768px) {
  .header__burger {
    display: none;
  }
}

.header__burger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--color-text-primary);
  border-radius: 2px;
  transition: all 0.3s;
}

.header__burger.is-open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.header__burger.is-open span:nth-child(2) {
  opacity: 0;
}

.header__burger.is-open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.header__mobile {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background: #0a0a0f;
  padding: var(--spacing-xl);
  display: none;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.header__mobile.is-open {
  display: flex;
}

@media (min-width: 768px) {
  .header__mobile {
    display: none !important;
  }
}

.header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.header__mobile-link {
  font-family: var(--font-family-display);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  transition: color 0.2s;
}

.header__mobile-link:hover,
.header__mobile-link.is-active {
  color: var(--color-accent);
}

.header__mobile-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-top: auto;
}

.header__mobile-user {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
}
</style>
