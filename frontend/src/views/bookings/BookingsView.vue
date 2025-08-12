<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p class="mt-2 text-gray-600">Manage your fishing adventures</p>
      </div>

      <!-- Booking Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Bookings</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Confirmed</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.confirmed }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Cancelled</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.cancelled }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              class="py-2 px-1 border-b-2 font-medium text-sm"
              :class="activeTab === tab.id ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="space-y-6">
        <div v-for="booking in filteredBookings" :key="booking.id" class="card">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <!-- Booking Info -->
            <div class="flex-1">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ booking.charter_name }}</h3>
                  <p class="text-gray-600">{{ booking.charter_location }}</p>
                </div>
                <div class="text-right">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(booking.status)">
                    {{ booking.status }}
                  </span>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Trip Date:</span>
                  <span class="ml-2 font-medium">{{ formatDate(booking.trip_date) }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Departure:</span>
                  <span class="ml-2 font-medium">{{ booking.departure_time }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Guests:</span>
                  <span class="ml-2 font-medium">{{ booking.number_of_people }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Duration:</span>
                  <span class="ml-2 font-medium">{{ booking.duration_hours }} hours</span>
                </div>
                <div>
                  <span class="text-gray-500">Total Paid:</span>
                  <span class="ml-2 font-medium">${{ booking.total_price }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Booking ID:</span>
                  <span class="ml-2 font-mono text-sm">#{{ booking.id }}</span>
                </div>
              </div>

              <!-- Special Requests -->
              <div v-if="booking.special_requests" class="mt-4">
                <span class="text-gray-500 text-sm">Special Requests:</span>
                <p class="mt-1 text-sm text-gray-700">{{ booking.special_requests }}</p>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 lg:mt-0 lg:ml-6 flex flex-col space-y-2">
              <button
                v-if="booking.status === 'confirmed'"
                @click="viewBookingDetails(booking.id)"
                class="btn-primary text-sm"
              >
                View Details
              </button>
              
              <button
                v-if="booking.status === 'confirmed' && canCancel(booking.trip_date)"
                @click="showCancelModal(booking)"
                class="btn-outline text-sm text-red-600 border-red-300 hover:bg-red-50"
              >
                Cancel Booking
              </button>

              <button
                v-if="booking.status === 'completed'"
                @click="writeReview(booking)"
                class="btn-outline text-sm"
              >
                Write Review
              </button>

              <button
                v-if="booking.status === 'confirmed'"
                @click="downloadTicket(booking.id)"
                class="btn-outline text-sm"
              >
                Download Ticket
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredBookings.length === 0" class="text-center py-12">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
          <p class="text-gray-600 mb-4">{{ getEmptyStateMessage() }}</p>
          <router-link to="/charters" class="btn-primary">Browse Charters</router-link>
        </div>
      </div>
    </div>

    <!-- Cancel Booking Modal -->
    <div v-if="showCancel" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Cancel Booking</h3>
        <p class="text-gray-600 mb-4">Are you sure you want to cancel this booking? This action cannot be undone.</p>
        
        <div class="mb-4">
          <label class="form-label">Cancellation Reason</label>
          <textarea
            v-model="cancellationReason"
            rows="3"
            class="input-field"
            placeholder="Please provide a reason for cancellation..."
          ></textarea>
        </div>

        <div class="flex space-x-3">
          <button @click="showCancel = false" class="btn-outline flex-1">Keep Booking</button>
          <button @click="confirmCancel" class="btn-primary flex-1 bg-red-600 hover:bg-red-700">Cancel Booking</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeTab = ref('all')
const showCancel = ref(false)
const cancellationReason = ref('')
const selectedBooking = ref(null)

const tabs = [
  { id: 'all', name: 'All Bookings' },
  { id: 'confirmed', name: 'Confirmed' },
  { id: 'pending', name: 'Pending' },
  { id: 'completed', name: 'Completed' },
  { id: 'cancelled', name: 'Cancelled' }
]

const stats = ref({
  total: 0,
  confirmed: 0,
  pending: 0,
  cancelled: 0
})

const bookings = ref([
  {
    id: 1,
    charter_name: 'Great Barrier Reef Adventure',
    charter_location: 'Cairns, QLD',
    trip_date: '2024-02-15',
    departure_time: '08:00',
    number_of_people: 4,
    duration_hours: 8,
    total_price: 600,
    status: 'confirmed',
    special_requests: 'Vegetarian meal options for 2 guests'
  },
  {
    id: 2,
    charter_name: 'Sydney Harbour Fishing',
    charter_location: 'Sydney, NSW',
    trip_date: '2024-02-20',
    departure_time: '07:00',
    number_of_people: 2,
    duration_hours: 6,
    total_price: 240,
    status: 'pending',
    special_requests: ''
  },
  {
    id: 3,
    charter_name: 'Port Phillip Bay Charter',
    charter_location: 'Melbourne, VIC',
    trip_date: '2024-01-10',
    departure_time: '09:00',
    number_of_people: 6,
    duration_hours: 5,
    total_price: 500,
    status: 'completed',
    special_requests: ''
  }
])

const filteredBookings = computed(() => {
  if (activeTab.value === 'all') {
    return bookings.value
  }
  return bookings.value.filter(booking => booking.status === activeTab.value)
})

const getStatusClasses = (status) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const canCancel = (tripDate) => {
  const trip = new Date(tripDate)
  const now = new Date()
  const hoursDiff = (trip.getTime() - now.getTime()) / (1000 * 60 * 60)
  return hoursDiff > 24 // Can cancel if more than 24 hours before trip
}

const getEmptyStateMessage = () => {
  switch (activeTab.value) {
    case 'confirmed':
      return "You don't have any confirmed bookings yet."
    case 'pending':
      return "You don't have any pending bookings."
    case 'completed':
      return "You don't have any completed trips yet."
    case 'cancelled':
      return "You don't have any cancelled bookings."
    default:
      return "You don't have any bookings yet."
  }
}

const viewBookingDetails = (bookingId) => {
  router.push(`/bookings/${bookingId}`)
}

const showCancelModal = (booking) => {
  selectedBooking.value = booking
  showCancel.value = true
}

const confirmCancel = async () => {
  if (!selectedBooking.value) return

  try {
    // TODO: Call API to cancel booking
    console.log('Cancelling booking:', selectedBooking.value.id, 'Reason:', cancellationReason.value)
    
    // Update local state
    const booking = bookings.value.find(b => b.id === selectedBooking.value.id)
    if (booking) {
      booking.status = 'cancelled'
    }

    showCancel.value = false
    cancellationReason.value = ''
    selectedBooking.value = null

    // Update stats
    updateStats()
  } catch (error) {
    console.error('Error cancelling booking:', error)
  }
}

const writeReview = (booking) => {
  router.push(`/reviews/new?booking=${booking.id}`)
}

const downloadTicket = (bookingId) => {
  // TODO: Generate and download ticket PDF
  console.log('Downloading ticket for booking:', bookingId)
}

const updateStats = () => {
  stats.value = {
    total: bookings.value.length,
    confirmed: bookings.value.filter(b => b.status === 'confirmed').length,
    pending: bookings.value.filter(b => b.status === 'pending').length,
    cancelled: bookings.value.filter(b => b.status === 'cancelled').length
  }
}

onMounted(() => {
  updateStats()
})
</script>
