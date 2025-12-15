import { reactive, readonly, computed } from 'vue'
import type { MovieDetails } from '@/services/tmdb'

export interface Showtime {
    id: string
    time: string
    date: string
    hall: string
    format: '2D' | '3D' | 'IMAX'
    price: number
}

export interface Seat {
    row: string
    number: number
    isAvailable: boolean
    isSelected: boolean
    price: number
}

export interface BookingState {
    movie: MovieDetails | null
    selectedShowtime: Showtime | null
    selectedSeats: Seat[]
    step: 'showtime' | 'seats' | 'confirmation'
}

const state = reactive<BookingState>({
    movie: null,
    selectedShowtime: null,
    selectedSeats: [],
    step: 'showtime'
})

function generateShowtimes(): Showtime[] {
    const times = ['14:00', '16:30', '19:00', '21:30']
    const formats: ('2D' | '3D' | 'IMAX')[] = ['2D', '2D', '3D', 'IMAX']
    const halls = ['Salle 1', 'Salle 2', 'Salle 3', 'Salle IMAX']
    const showtimes: Showtime[] = []

    for (let d = 0; d < 5; d++) {
        const date = new Date()
        date.setDate(date.getDate() + d)
        const dateStr = date.toISOString().split('T')[0]

        times.forEach((time, i) => {
            showtimes.push({
                id: `${dateStr}-${time}-${i}`,
                time,
                date: dateStr,
                hall: halls[i % halls.length],
                format: formats[i % formats.length],
                price: formats[i % formats.length] === 'IMAX' ? 16 : formats[i % formats.length] === '3D' ? 14 : 11
            })
        })
    }

    return showtimes
}

function generateSeats(): Seat[][] {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 12
    const grid: Seat[][] = []

    rows.forEach(row => {
        const rowSeats: Seat[] = []
        for (let i = 1; i <= seatsPerRow; i++) {
            // Random availability (80% available)
            const isAvailable = Math.random() > 0.2
            rowSeats.push({
                row,
                number: i,
                isAvailable,
                isSelected: false,
                price: state.selectedShowtime?.price || 11
            })
        }
        grid.push(rowSeats)
    })

    return grid
}

const total = computed(() => {
    return state.selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
})

function setMovie(movie: MovieDetails) {
    state.movie = movie
    state.selectedShowtime = null
    state.selectedSeats = []
    state.step = 'showtime'
}

function selectShowtime(showtime: Showtime) {
    state.selectedShowtime = showtime
    state.selectedSeats = []
    state.step = 'seats'
}

function toggleSeat(seat: Seat) {
    if (!seat.isAvailable) return

    const index = state.selectedSeats.findIndex(
        s => s.row === seat.row && s.number === seat.number
    )

    if (index > -1) {
        state.selectedSeats.splice(index, 1)
        seat.isSelected = false
    } else {
        state.selectedSeats.push(seat)
        seat.isSelected = true
    }
}

function goToConfirmation() {
    if (state.selectedSeats.length > 0) {
        state.step = 'confirmation'
    }
}

function goBack() {
    if (state.step === 'confirmation') {
        state.step = 'seats'
    } else if (state.step === 'seats') {
        state.step = 'showtime'
    }
}

function reset() {
    state.movie = null
    state.selectedShowtime = null
    state.selectedSeats = []
    state.step = 'showtime'
}

function confirmBooking(): string {
    const reference = `CLX-${Date.now().toString(36).toUpperCase()}`

    const bookings = JSON.parse(localStorage.getItem('cinelux_bookings') || '[]')
    bookings.push({
        reference,
        movieId: state.movie?.id,
        movieTitle: state.movie?.title,
        showtime: state.selectedShowtime,
        seats: state.selectedSeats.map(s => `${s.row}${s.number}`),
        total: total.value,
        createdAt: new Date().toISOString()
    })
    localStorage.setItem('cinelux_bookings', JSON.stringify(bookings))

    return reference
}

export const useBookingStore = () => ({
    state: readonly(state),
    total,
    generateShowtimes,
    generateSeats,
    setMovie,
    selectShowtime,
    toggleSeat,
    goToConfirmation,
    goBack,
    reset,
    confirmBooking
})

export default useBookingStore
