<script setup lang="ts">
import { RouterLink } from 'vue-router'

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const articles = [
  {
    id: 1,
    title: 'Définitions',
    summary: 'Services, Utilisateur, Contenu Utilisateur : définitions et champ d\'application.'
  },
  {
    id: 2,
    title: 'Conditions d\'adhésion',
    summary: 'Majorité légale, conditions d\'utilisation et critères d\'inscription.'
  },
  {
    id: 3,
    title: 'Obligations',
    summary: 'Légalité du contenu, respect des lois, contenus interdits et garanties.'
  },
  {
    id: 4,
    title: 'Responsabilité',
    summary: 'Décharge pour le contenu, responsabilité limitée.'
  },
  {
    id: 5,
    title: 'Propriété intellectuelle',
    summary: 'Licence non exclusive, non transférable, révocable.'
  },
  {
    id: 6,
    title: 'Suspension & Résiliation',
    summary: 'Suspension sans préavis en cas de violation.'
  },
  {
    id: 7,
    title: 'Droit applicable',
    summary: 'Loi française applicable, juridiction compétente.'
  },
  {
    id: 8,
    title: 'Acceptation',
    summary: 'Acceptation des présentes conditions lors de l\'inscription.'
  }
]
</script>

<template>
  <main class="legal-page">
    <div class="container">
      <header class="legal-header">
        <h1 class="legal-title">Conditions d'Utilisation</h1>
        <p class="legal-intro">
          Les présentes conditions régissent l'accès et l'utilisation du présent site web, 
          édité par CinéLux S.A.S. L'utilisation des Services implique l'acceptation de ces conditions.
        </p>
      </header>

      <section class="articles-overview">
        <div class="articles-grid">
          <div v-for="article in articles" :key="article.id" class="article-card">
            <div class="article-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div class="article-content">
              <h3 class="article-title">Art. {{ article.id }} – {{ article.title }}</h3>
              <p class="article-summary">{{ article.summary }}</p>
            </div>
          </div>
        </div>
      </section>

      <article class="legal-article">
        <h2>Article 1 : Définitions</h2>
        
        <section>
          <h3>1.1 Les Services</h3>
          <p>
            Les « Services » désignent l'ensemble des fonctionnalités proposées par le site CinéLux, 
            incluant notamment la consultation des programmes, la réservation de places de cinéma, 
            la gestion de compte utilisateur et l'accès aux informations sur les films.
          </p>
        </section>

        <section>
          <h3>1.2 L'Utilisateur</h3>
          <p>
            L'« Utilisateur » désigne toute personne physique ou morale accédant au site et utilisant 
            les Services, qu'elle soit inscrite ou non.
          </p>
        </section>

        <section>
          <h3>1.3 Champ d'application</h3>
          <p>
            Les présentes Conditions Générales d'Utilisation s'appliquent à toute utilisation du site 
            et de ses Services. Elles sont accessibles à tout moment sur le site.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>Article 2 : Conditions d'Adhésion</h2>
        
        <section>
          <h3>2.1 Conditions d'Adhésion</h3>
          <p>Toute personne souhaitant utiliser les services de ce présent site internet doit :</p>
          <ul>
            <li>Être majeure et juridiquement capable.</li>
            <li>Fournir des informations exactes et à jour lors de l'inscription.</li>
            <li>Accepter sans réserve les présentes Conditions Générales d'Utilisation.</li>
            <li>Respecter la législation en vigueur.</li>
          </ul>
        </section>

        <section>
          <h3>2.2 Création de compte</h3>
          <p>
            L'accès à certaines fonctionnalités nécessite la création d'un compte utilisateur. 
            L'Utilisateur s'engage à fournir des informations exactes et à maintenir la 
            confidentialité de ses identifiants de connexion.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>Article 3 : Obligations de l'Utilisateur</h2>
        
        <section>
          <h3>3.1 Utilisation légale</h3>
          <p>
            L'Utilisateur s'engage à utiliser les Services conformément à la législation en vigueur 
            et aux présentes conditions. Il s'interdit notamment de :
          </p>
          <ul>
            <li>Porter atteinte aux droits de tiers.</li>
            <li>Diffuser des contenus illicites, diffamatoires ou contraires à l'ordre public.</li>
            <li>Tenter d'accéder de manière non autorisée aux systèmes informatiques.</li>
            <li>Utiliser les Services à des fins commerciales non autorisées.</li>
          </ul>
        </section>

        <section>
          <h3>3.2 Protection des données</h3>
          <p>
            L'Utilisateur s'engage à respecter la réglementation relative à la protection des données 
            personnelles et notamment le RGPD.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>Article 4 : Responsabilité</h2>
        
        <section>
          <h3>4.1 Limitation de responsabilité</h3>
          <p>
            CinéLux met en œuvre tous les moyens raisonnables pour assurer un accès de qualité 
            aux Services, sans obligation de résultat. CinéLux ne saurait être tenue responsable 
            des dysfonctionnements du réseau ou des serveurs.
          </p>
        </section>

        <section>
          <h3>4.2 Disponibilité</h3>
          <p>
            CinéLux se réserve le droit d'interrompre temporairement l'accès aux Services pour 
            des raisons de maintenance ou de mise à jour, sans que cela puisse engager sa responsabilité.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>Article 5 : Propriété Intellectuelle</h2>
        
        <section>
          <h3>5.1 Droits de propriété</h3>
          <p>
            L'ensemble des éléments du site (textes, images, logos, vidéos, etc.) sont protégés 
            par le droit de la propriété intellectuelle. Toute reproduction, représentation ou 
            exploitation non autorisée est interdite.
          </p>
        </section>

        <section>
          <h3>5.2 Licence d'utilisation</h3>
          <p>
            L'utilisation des Services confère à l'Utilisateur une licence d'utilisation 
            personnelle, non exclusive, non transférable et révocable.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>Article 6 : Suspension et Résiliation</h2>
        
        <section>
          <h3>6.1 Suspension</h3>
          <p>
            CinéLux se réserve le droit de suspendre ou de résilier l'accès aux Services de tout 
            Utilisateur ne respectant pas les présentes conditions, sans préavis ni indemnité.
          </p>
        </section>

        <section>
          <h3>6.2 Conséquences</h3>
          <p>
            En cas de résiliation, l'Utilisateur perd l'accès à son compte et aux fonctionnalités 
            associées. Les réservations en cours restent valables.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>Article 7 : Droit Applicable</h2>
        
        <p>
          Les présentes Conditions Générales d'Utilisation sont soumises au droit français. 
          En cas de litige, les tribunaux français seront seuls compétents, après tentative 
          de résolution amiable.
        </p>
      </article>

      <article class="legal-article">
        <h2>Article 8 : Acceptation des Conditions</h2>
        
        <p>
          L'Utilisateur reconnaît avoir lu, compris et accepté les présentes Conditions 
          Générales d'Utilisation en cochant la case prévue à cet effet lors de son 
          inscription ou de l'utilisation des Services.
        </p>
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
        <h3>Informations légales</h3>
        <p><strong><u>Éditeur</u> :</strong> CinéLux S.A.S., 123 Avenue du Cinéma, 75001 Paris</p>
        <p><strong><u>Directeur de publication</u> :</strong> M. Jean Dupont</p>
        <p><strong><u>RCS</u> :</strong> Paris B 123 456 789</p>
        <p><em>Dernière mise à jour : Décembre 2025</em></p>
        
        <div class="legal-links">
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
          <RouterLink to="/cookies">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="8" cy="9" r="1"/>
              <circle cx="15" cy="9" r="1"/>
              <circle cx="9" cy="14" r="1"/>
              <circle cx="14" cy="14" r="1"/>
            </svg>
            Politique Cookies
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="@/styles/views/LegalView.css"></style>
