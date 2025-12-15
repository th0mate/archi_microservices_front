<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
  videoKey: string
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const isVisible = ref(false)
const isAnimating = ref(false)

watch(() => props.isOpen, (open) => {
  if (open) {
    isAnimating.value = true
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => {
      isVisible.value = true
    })
  } else {
    isVisible.value = false
    setTimeout(() => {
      isAnimating.value = false
      document.body.style.overflow = ''
    }, 300)
  }
})

function handleClose() {
  emit('close')
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    handleClose()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="isOpen || isAnimating"
      class="trailer-modal"
      :class="{ 'is-visible': isVisible }"
      @click="handleBackdropClick"
    >
      <div class="trailer-modal__backdrop"></div>
      
      <div class="trailer-modal__container">
        <div class="trailer-modal__content">
          <header class="trailer-modal__header">
            <h3 class="trailer-modal__title">{{ title }}</h3>
            <button class="trailer-modal__close" @click="handleClose" aria-label="Fermer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </header>
          
          <div class="trailer-modal__video">
            <iframe
              v-if="isVisible && videoKey"
              :src="`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <div v-else class="trailer-modal__loading">
              <div class="loading-spinner"></div>
              <span>Chargement...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.trailer-modal {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.trailer-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.trailer-modal.is-visible .trailer-modal__backdrop {
  opacity: 1;
}

.trailer-modal__container {
  position: relative;
  width: 100%;
  max-width: 1100px;
  transform: scale(0.9) translateY(20px);
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.trailer-modal.is-visible .trailer-modal__container {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.trailer-modal__content {
  background: var(--color-bg-secondary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.trailer-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-tertiary);
}

.trailer-modal__title {
  font-family: var(--font-family-display);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.trailer-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s ease;
}

.trailer-modal__close svg {
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  transition: color 0.2s ease;
}

.trailer-modal__close:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
}

.trailer-modal__close:hover svg {
  color: white;
}

.trailer-modal__video {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

.trailer-modal__video iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.trailer-modal__loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
  color: var(--color-text-muted);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .trailer-modal {
    padding: 0;
    align-items: flex-end;
  }
  
  .trailer-modal__container {
    max-width: 100%;
    transform: translateY(100%);
  }
  
  .trailer-modal.is-visible .trailer-modal__container {
    transform: translateY(0);
  }
  
  .trailer-modal__content {
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
  }
  
  .trailer-modal__header {
    padding: var(--spacing-md);
  }
  
  .trailer-modal__title {
    font-size: var(--font-size-base);
  }
}
</style>
