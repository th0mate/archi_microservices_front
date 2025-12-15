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
        <h1 class="legal-title">Politique de Confidentialité</h1>
        <p class="legal-intro">
          CinéLux s'engage à protéger la vie privée des utilisateurs de son site. 
          Cette politique de confidentialité explique comment nous collectons, utilisons 
          et protégeons vos données personnelles.
        </p>
      </header>

      <article class="legal-article">
        <h2>1. Responsable du traitement</h2>
        
        <section>
          <p>Le responsable du traitement des données est :</p>
          <div class="info-block">
            <p><strong>CinéLux S.A.S.</strong></p>
            <p>123 Avenue du Cinéma, 75001 Paris, France</p>
            <p>Email : dpo@cinelux.fr</p>
          </div>
        </section>
      </article>

      <article class="legal-article">
        <h2>2. Données collectées</h2>
        
        <section>
          <h3>2.1 Données d'identification</h3>
          <p>Lors de la création de votre compte, nous collectons :</p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Mot de passe (chiffré)</li>
            <li>Numéro de téléphone (optionnel)</li>
          </ul>
        </section>

        <section>
          <h3>2.2 Données de réservation</h3>
          <p>Lors de vos réservations, nous collectons :</p>
          <ul>
            <li>Historique des réservations</li>
            <li>Préférences de places</li>
            <li>Données de paiement (traitées par notre prestataire de paiement sécurisé)</li>
          </ul>
        </section>

        <section>
          <h3>2.3 Données de navigation</h3>
          <p>Lors de votre navigation sur le site :</p>
          <ul>
            <li>Adresse IP</li>
            <li>Type de navigateur</li>
            <li>Pages visitées</li>
            <li>Durée de visite</li>
          </ul>
        </section>
      </article>

      <article class="legal-article">
        <h2>3. Finalités du traitement</h2>
        
        <section>
          <p>Vos données sont collectées pour :</p>
          <ul>
            <li>Gérer votre compte utilisateur</li>
            <li>Traiter vos réservations de places de cinéma</li>
            <li>Vous envoyer des confirmations de réservation</li>
            <li>Améliorer nos services et votre expérience utilisateur</li>
            <li>Répondre à vos demandes de support</li>
            <li>Respecter nos obligations légales</li>
            <li>Vous informer de nos offres (avec votre consentement)</li>
          </ul>
        </section>
      </article>

      <article class="legal-article">
        <h2>4. Base légale du traitement</h2>
        
        <section>
          <p>Le traitement de vos données repose sur :</p>
          <ul>
            <li><strong>L'exécution du contrat</strong> : pour la gestion de votre compte et de vos réservations</li>
            <li><strong>Votre consentement</strong> : pour les communications marketing</li>
            <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services</li>
            <li><strong>L'obligation légale</strong> : pour la conservation de certaines données</li>
          </ul>
        </section>
      </article>

      <article class="legal-article">
        <h2>5. Durée de conservation</h2>
        
        <section>
          <p>Vos données sont conservées pendant :</p>
          <ul>
            <li><strong>Données de compte</strong> : pendant la durée de votre inscription, puis 3 ans après votre dernière activité</li>
            <li><strong>Données de réservation</strong> : 5 ans à compter de la réservation (obligation comptable)</li>
            <li><strong>Données de navigation</strong> : 13 mois maximum</li>
            <li><strong>Cookies</strong> : 13 mois maximum</li>
          </ul>
        </section>
      </article>

      <article class="legal-article">
        <h2>6. Destinataires des données</h2>
        
        <section>
          <p>Vos données peuvent être transmises à :</p>
          <ul>
            <li>Nos équipes internes (service client, technique, marketing)</li>
            <li>Nos prestataires de paiement sécurisé</li>
            <li>Nos prestataires d'hébergement</li>
            <li>Les autorités compétentes sur demande légale</li>
          </ul>
          <p>
            Nous ne vendons jamais vos données personnelles à des tiers.
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>7. Sécurité des données</h2>
        
        <section>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
            protéger vos données, notamment :
          </p>
          <ul>
            <li>Chiffrement des données sensibles</li>
            <li>Connexions sécurisées (HTTPS)</li>
            <li>Accès restreint aux données</li>
            <li>Surveillance et audit réguliers</li>
          </ul>
        </section>
      </article>

      <article class="legal-article">
        <h2>8. Vos droits</h2>
        
        <section>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
            <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
            <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
            <li><strong>Droit à la limitation</strong> : limiter le traitement dans certains cas</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à : <strong>dpo@cinelux.fr</strong>
          </p>
          <p>
            En cas de désaccord, vous pouvez introduire une réclamation auprès de la CNIL 
            (www.cnil.fr).
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>9. Transferts internationaux</h2>
        
        <section>
          <p>
            Vos données sont hébergées au sein de l'Union Européenne. En cas de transfert 
            hors UE, nous nous assurons que des garanties appropriées sont mises en place 
            (clauses contractuelles types, décision d'adéquation).
          </p>
        </section>
      </article>

      <article class="legal-article">
        <h2>10. Modifications</h2>
        
        <section>
          <p>
            Cette politique de confidentialité peut être mise à jour. En cas de modification 
            substantielle, vous serez informé par email ou par une notification sur le site.
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
