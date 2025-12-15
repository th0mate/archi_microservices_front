<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const footerLinks = {
  navigation: [
    { name: 'Accueil', path: '/' },
    { name: 'Films', path: '/films' },
    { name: 'Contact', path: '/contact' }
  ],
  legal: [
    { name: 'Conditions d\'utilisation', path: '/cgu' },
    { name: 'Mentions légales', path: '/mentions-legales' },
    { name: 'Politique de confidentialité', path: '/confidentialite' },
    { name: 'Politique cookies', path: '/cookies' }
  ]
}

const socialLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/GaumontPathe' },
  { name: 'Instagram', url: 'https://www.instagram.com/gaumontpathe/' },
  { name: 'Twitter', url: 'https://x.com/GaumontPathe' }
]
</script>

<template>
  <footer class="footer">
    <div class="footer__container container">
      <div class="footer__grid">
        <div class="footer__brand">
          <RouterLink to="/" class="footer__logo">
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
          <p class="footer__tagline">
            Votre cinéma premium pour une expérience cinématographique exceptionnelle.
          </p>
          <div class="footer__social">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="footer__social-link"
              :aria-label="social.name"
            >
              <svg v-if="social.name === 'Facebook'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              <svg v-else-if="social.name === 'Instagram'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer__section">
          <h4 class="footer__title">Navigation</h4>
          <nav class="footer__nav">
            <RouterLink
              v-for="link in footerLinks.navigation"
              :key="link.path"
              :to="link.path"
              class="footer__link"
            >
              {{ link.name }}
            </RouterLink>
          </nav>
        </div>

        <div class="footer__section">
          <h4 class="footer__title">Informations</h4>
          <nav class="footer__nav">
            <RouterLink
              v-for="link in footerLinks.legal"
              :key="link.path"
              :to="link.path"
              class="footer__link"
            >
              {{ link.name }}
            </RouterLink>
          </nav>
        </div>

        <div class="footer__section">
          <h4 class="footer__title">Contact</h4>
          <address class="footer__contact">
            <p>123 Avenue du Cinéma</p>
            <p>75001 Paris, France</p>
            <p>
              <a href="tel:+33123456789">01 23 45 67 89</a>
            </p>
            <p>
              <a href="mailto:contact@cinelux.fr">contact@cinelux.fr</a>
            </p>
          </address>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          © {{ currentYear }} CinéLux. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped src="@/styles/components/TheFooter.css"></style>
