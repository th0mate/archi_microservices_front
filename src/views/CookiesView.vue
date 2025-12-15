<script setup lang="ts">
import { RouterLink } from 'vue-router'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <main class="legal-page">
    <div class="container">
      <header class="legal-header">
        <h1 class="legal-title">Politique Cookies</h1>
        <p class="legal-intro">
          Cette politique explique comment CinéLux utilise les cookies et technologies similaires 
          sur son site web, conformément à la réglementation européenne.
        </p>
      </header>

      <article class="legal-article">
        <h2>1. Qu'est-ce qu'un cookie ?</h2>
        
        <section>
          <p>
            Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, 
            smartphone) lors de votre visite sur un site web. Il permet au site de reconnaître 
            votre appareil et de mémoriser certaines informations.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>2. Types de cookies utilisés</h2>
        
        <section>
          <h3>2.1 Cookies strictement nécessaires</h3>
          <p>
            Ces cookies sont essentiels au fonctionnement du site et ne peuvent pas être désactivés. 
            Ils permettent notamment :
          </p>
          <ul>
            <li>La gestion de votre session utilisateur</li>
            <li>La mémorisation de vos préférences de consentement</li>
            <li>La sécurisation de votre navigation</li>
          </ul>
        </section>

        <section>
          <h3>2.2 Cookies de performance</h3>
          <p>
            Ces cookies nous permettent d'analyser l'utilisation du site pour en améliorer 
            les performances :
          </p>
          <ul>
            <li>Nombre de visiteurs</li>
            <li>Pages les plus consultées</li>
            <li>Temps passé sur le site</li>
            <li>Taux de rebond</li>
          </ul>
        </section>

        <section>
          <h3>2.3 Cookies de fonctionnalité</h3>
          <p>
            Ces cookies permettent de personnaliser votre expérience :
          </p>
          <ul>
            <li>Mémorisation de votre langue</li>
            <li>Préférences d'affichage</li>
            <li>Historique de navigation sur le site</li>
          </ul>
        </section>

        <section>
          <h3>2.4 Cookies publicitaires</h3>
          <p>
            Ces cookies permettent d'afficher des publicités pertinentes. Nous n'utilisons 
            actuellement pas de cookies publicitaires sur notre site.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>3. Durée de conservation</h2>
        
        <section>
          <p>
            Conformément à la réglementation, les cookies ont une durée de vie maximale de 
            13 mois après leur dépôt. Au-delà, votre consentement sera à nouveau demandé.
          </p>
          <div class="info-block">
            <table class="cookie-table">
              <thead>
                <tr>
                  <th>Type de cookie</th>
                  <th>Durée</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Cookie de session</td>
                  <td>Fin de session</td>
                </tr>
                <tr>
                  <td>Cookie de consentement</td>
                  <td>6 mois</td>
                </tr>
                <tr>
                  <td>Cookie d'analyse</td>
                  <td>13 mois</td>
                </tr>
                <tr>
                  <td>Cookie de préférences</td>
                  <td>12 mois</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>

      <article class="legal-article">
        <h2>4. Gestion de vos préférences</h2>
        
        <section>
          <h3>4.1 Bandeau de consentement</h3>
          <p>
            Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser 
            les cookies non essentiels. Vous pouvez modifier vos préférences à tout moment.
          </p>
        </section>

        <section>
          <h3>4.2 Paramètres du navigateur</h3>
          <p>
            Vous pouvez également configurer votre navigateur pour bloquer les cookies. 
            Voici comment procéder selon votre navigateur :
          </p>
          <ul>
            <li><strong>Chrome</strong> : Paramètres &gt; Confidentialité et sécurité &gt; Cookies</li>
            <li><strong>Firefox</strong> : Options &gt; Vie privée et sécurité &gt; Cookies</li>
            <li><strong>Safari</strong> : Préférences &gt; Confidentialité &gt; Cookies</li>
            <li><strong>Edge</strong> : Paramètres &gt; Confidentialité &gt; Cookies</li>
          </ul>
        </section>

        <section>
          <h3>4.3 Conséquences du refus</h3>
          <p>
            Le refus des cookies non essentiels peut limiter certaines fonctionnalités du site, 
            mais n'empêchera pas son utilisation pour la réservation de places.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>5. Cookies tiers</h2>
        
        <section>
          <p>
            Certains services tiers peuvent déposer des cookies lors de votre navigation :
          </p>
          <ul>
            <li><strong>Google Analytics</strong> : analyse d'audience (si activé)</li>
            <li><strong>Prestataire de paiement</strong> : sécurisation des transactions</li>
          </ul>
          <p>
            Ces tiers ont leurs propres politiques de confidentialité que nous vous invitons 
            à consulter.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>6. Vos droits</h2>
        
        <section>
          <p>
            Vous disposez d'un droit d'accès, de rectification et de suppression des données 
            collectées via les cookies. Pour exercer ces droits, contactez-nous à : 
            <strong>dpo@cinelux.fr</strong>
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>7. Modifications</h2>
        
        <section>
          <p>
            Cette politique cookies peut être modifiée à tout moment. Les modifications 
            prennent effet dès leur publication sur le site.
          </p>
        </section>
      </article>

      <div class="legal-footer">
        <button class="back-to-top" @click="scrollToTop">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="19" x2="12" y2="5"/>
            <polyline points="5 12 12 5 19 12"/>
          </svg>
          Retour en haut
        </button>
      </div>

      <div class="legal-info">
        <p><em>Dernière mise à jour : Décembre 2025</em></p>
        
        <div class="legal-links">
          <RouterLink to="/cgu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Conditions d'Utilisation
          </RouterLink>
          <RouterLink to="/mentions-legales">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
            </svg>
            Mentions Légales
          </RouterLink>
          <RouterLink to="/confidentialite">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Politique de Confidentialité
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="@/styles/views/LegalView.css"></style>
