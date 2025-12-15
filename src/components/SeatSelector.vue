<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Seat } from '@/stores/booking'

const props = defineProps<{
  price: number
}>()

const emit = defineEmits<{
  'update:selected': [seats: Seat[]]
}>()

const rows = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A']
const seatsPerRow = 12

const seatGrid = ref<Seat[][]>([])

function generateSeats() {
  const grid: Seat[][] = []
  
  rows.forEach(row => {
    const rowSeats: Seat[] = []
    for (let i = 1; i <= seatsPerRow; i++) {
      const skip = (row === 'A' && (i <= 2 || i >= 11)) ||
                   (row === 'B' && (i === 1 || i === 12)) ||
                   (row === 'H' && (i <= 1 || i >= 12))
      
      if (skip) {
        rowSeats.push({
          row,
          number: i,
          isAvailable: false,
          isSelected: false,
          price: 0
        })
      } else {
        const isAvailable = Math.random() > 0.25
        rowSeats.push({
          row,
          number: i,
          isAvailable,
          isSelected: false,
          price: props.price
        })
      }
    }
    grid.push(rowSeats)
  })
  
  seatGrid.value = grid
}

const selectedSeats = computed(() => {
  return seatGrid.value.flat().filter(seat => seat.isSelected)
})

const total = computed(() => {
  return selectedSeats.value.reduce((sum, seat) => sum + seat.price, 0)
})

function toggleSeat(seat: Seat) {
  if (!seat.isAvailable || seat.price === 0) return
  seat.isSelected = !seat.isSelected
  emit('update:selected', selectedSeats.value)
}

function getSeatClass(seat: Seat) {
  if (seat.price === 0) return 'seat seat--empty'
  if (!seat.isAvailable) return 'seat seat--taken'
  if (seat.isSelected) return 'seat seat--selected'
  return 'seat seat--available'
}

onMounted(() => {
  generateSeats()
})
</script>

<template>
  <div class="seat-selector">
    <div class="screen-section">
      <div class="screen-curve"></div>
      <span class="screen-label">ÉCRAN</span>
    </div>

    <div class="seats-grid">
      <div 
        v-for="(row, rowIndex) in seatGrid" 
        :key="rows[rowIndex]" 
        class="seats-row"
      >
        <span class="row-label">{{ rows[rowIndex] }}</span>
        
        <div class="seats-container">
          <button
            v-for="seat in row"
            :key="`${seat.row}${seat.number}`"
            :class="getSeatClass(seat)"
            :disabled="!seat.isAvailable || seat.price === 0"
            @click="toggleSeat(seat)"
            :aria-label="`Siège ${seat.row}${seat.number}`"
          >
            <span v-if="seat.price > 0" class="seat-number">{{ seat.number }}</span>
          </button>
        </div>
        
        <span class="row-label">{{ rows[rowIndex] }}</span>
      </div>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="legend-seat legend-seat--available"></span>
        <span>Disponible</span>
      </div>
      <div class="legend-item">
        <span class="legend-seat legend-seat--selected"></span>
        <span>Sélectionné</span>
      </div>
      <div class="legend-item">
        <span class="legend-seat legend-seat--taken"></span>
        <span>Occupé</span>
      </div>
    </div>

    <div v-if="selectedSeats.length > 0" class="summary">
      <div class="summary-seats">
        <span class="summary-label">Places sélectionnées:</span>
        <div class="summary-tags">
          <span 
            v-for="seat in selectedSeats" 
            :key="`${seat.row}${seat.number}`"
            class="summary-tag"
          >
            {{ seat.row }}{{ seat.number }}
          </span>
        </div>
      </div>
      <div class="summary-total">
        <span class="summary-label">Total:</span>
        <span class="summary-price">{{ total.toFixed(2) }} €</span>
      </div>
    </div>
  </div>
</template>

<style scoped src="@/styles/components/SeatSelector.css"></style>
