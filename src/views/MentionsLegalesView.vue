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
        <h1 class="legal-title">Mentions Légales</h1>
        <p class="legal-intro">
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance 
          dans l'économie numérique, voici les mentions légales du site CinéLux.
        </p>
      </header>

      <article class="legal-article">
        <h2>1. Éditeur du site</h2>
        
        <section>
          <p>Le présent site est édité par :</p>
          <div class="info-block">
            <p><strong>CinéLux S.A.S.</strong></p>
            <p>Société par Actions Simplifiée au capital de 50 000 €</p>
            <p>Siège social : 123 Avenue du Cinéma, 75001 Paris, France</p>
            <p>RCS Paris B 123 456 789</p>
            <p>N° TVA intracommunautaire : FR 12 123456789</p>
            <p>Téléphone : +33 1 23 45 67 89</p>
            <p>Email : contact@cinelux.fr</p>
          </div>
        </section>

        <section>
          <h3>Directeur de la publication</h3>
          <p>M. Jean Dupont, en qualité de Président de CinéLux S.A.S.</p>
        </section>
      </article>

      <article class="legal-article">
        <h2>2. Hébergeur</h2>
        
        <section>
          <p>Le site est hébergé par :</p>
          <div class="info-block">
            <p><strong>OVH SAS</strong></p>
            <p>2 rue Kellermann, 59100 Roubaix, France</p>
            <p>RCS Lille Métropole 424 761 419 00045</p>
            <p>Téléphone : 1007</p>
          </div>
        </section>
      </article>

      <article class="legal-article">
        <h2>3. Propriété intellectuelle</h2>
        
        <section>
          <p>
            L'ensemble du contenu du site CinéLux (structure, textes, logos, images, vidéos, 
            éléments graphiques, etc.) est protégé par le droit d'auteur et le droit des marques.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout 
            ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est 
            interdite sans l'autorisation écrite préalable de CinéLux.
          </p>
          <p>
            Toute exploitation non autorisée du site ou de son contenu sera considérée comme 
            constitutive d'une contrefaçon et poursuivie conformément aux dispositions des 
            articles L.335-2 et suivants du Code de Propriété Intellectuelle.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>4. Protection des données personnelles</h2>
        
        <section>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi 
            Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de 
            suppression et de portabilité des données vous concernant.
          </p>
          <p>
            Pour plus d'informations sur le traitement de vos données personnelles, veuillez 
            consulter notre <RouterLink to="/confidentialite">Politique de Confidentialité</RouterLink>.
          </p>
        </section>

        <section>
          <h3>Délégué à la Protection des Données (DPO)</h3>
          <p>
            Pour toute question relative à la protection de vos données personnelles, vous pouvez 
            contacter notre DPO à l'adresse : dpo@cinelux.fr
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>5. Cookies</h2>
        
        <section>
          <p>
            Le site CinéLux utilise des cookies pour améliorer l'expérience utilisateur et analyser 
            le trafic. Pour en savoir plus sur notre utilisation des cookies et gérer vos préférences, 
            consultez notre <RouterLink to="/cookies">Politique Cookies</RouterLink>.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>6. Limitation de responsabilité</h2>
        
        <section>
          <p>
            CinéLux s'efforce de fournir des informations exactes et à jour sur le site. Toutefois, 
            CinéLux ne peut garantir l'exactitude, la complétude ou l'actualité des informations 
            diffusées sur le site.
          </p>
          <p>
            En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité 
            exclusive. CinéLux décline toute responsabilité pour les dommages directs ou indirects 
            résultant de l'utilisation du site.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>7. Liens hypertextes</h2>
        
        <section>
          <p>
            Le site peut contenir des liens vers des sites tiers. CinéLux n'exerce aucun contrôle 
            sur le contenu de ces sites et décline toute responsabilité quant à leur contenu.
          </p>
          <p>
            La création de liens hypertextes vers le site CinéLux est soumise à l'accord préalable 
            et écrit de CinéLux.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>8. Droit applicable et juridiction</h2>
        
        <section>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige, 
            les tribunaux de Paris seront seuls compétents.
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
            </svg>
            Politique Cookies
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped src="@/styles/views/LegalView.css"></style>
