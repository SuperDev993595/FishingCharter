<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Fishing Charters</h1>
        <p class="mt-2 text-gray-600">Find the perfect fishing adventure</p>
      </div>

      <!-- Search and Filters -->
      <div class="card mb-8">
        <form @submit.prevent="handleSearch" class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label for="location" class="form-label">Location</label>
            <input
              id="location"
              v-model="filters.location"
              type="text"
              class="input-field"
              placeholder="Enter location"
            />
          </div>
          <div>
            <label for="date" class="form-label">Date</label>
            <input
              id="date"
              v-model="filters.date"
              type="date"
              class="input-field"
            />
          </div>
          <div>
            <label for="capacity" class="form-label">Capacity</label>
            <select id="capacity" v-model="filters.capacity" class="input-field">
              <option value="">Any</option>
              <option value="1-4">1-4 people</option>
              <option value="5-8">5-8 people</option>
              <option value="9+">9+ people</option>
            </select>
          </div>
          <div class="flex items-end">
            <button type="submit" class="btn-primary w-full">Search</button>
          </div>
        </form>
      </div>

      <!-- Results -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="charter in charters" :key="charter.id" class="card hover:shadow-lg transition-shadow">
          <div class="aspect-w-16 aspect-h-9 mb-4">
            <img
              :src="charter.images?.[0] || '/placeholder-charter.jpg'"
              :alt="charter.name"
              class="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ charter.name }}</h3>
          <p class="text-gray-600 text-sm mb-3">{{ charter.location }}</p>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center">
              <span class="text-yellow-400">★</span>
              <span class="ml-1 text-sm text-gray-600">{{ charter.rating || 'No ratings' }}</span>
            </div>
            <span class="text-lg font-bold text-primary-600">${{ charter.price_per_person }}/person</span>
          </div>
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>{{ charter.duration_hours }} hours</span>
            <span>Capacity: {{ charter.capacity }}</span>
          </div>
          <router-link
            :to="`/charters/${charter.id}`"
            class="btn-primary w-full text-center"
          >
            View Details
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading charters...</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && charters.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No charters found</h3>
        <p class="text-gray-600">Try adjusting your search criteria</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useCharterStore } from '@/stores/charters'

const charterStore = useCharterStore()

const loading = ref(false)
const filters = reactive({
  location: '',
  date: '',
  capacity: ''
})

const charters = ref([
  {
    id: 1,
    name: 'Great Barrier Reef Adventure',
    location: 'Cairns, QLD',
    price_per_person: 150,
    duration_hours: 8,
    capacity: 6,
    rating: 4.8,
    images: ['https://tourismportdouglas.com.au/fileadmin/user_upload/Businesses/G/Great-Adventure-7.jpg']
  },
  {
    id: 2,
    name: 'Sydney Harbour Fishing',
    location: 'Sydney, NSW',
    price_per_person: 120,
    duration_hours: 6,
    capacity: 4,
    rating: 4.6,
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa7oIljy1xolO3VFQ2vTDCirrLEn8_Ou_bBg&s']
  },
  {
    id: 3,
    name: 'Port Phillip Bay Charter',
    location: 'Melbourne, VIC',
    price_per_person: 100,
    duration_hours: 5,
    capacity: 8,
    rating: 4.7,
    images: ['https://ripcharters.fishing/wp-content/uploads/2015/08/20141011_122301.jpg']
  }
])

const handleSearch = () => {
  // TODO: Implement search functionality
  console.log('Search filters:', filters)
}

onMounted(async () => {
  loading.value = true
  try {
    // TODO: Fetch charters from API
    // await charterStore.fetchCharters()
  } catch (error) {
    console.error('Error fetching charters:', error)
  } finally {
    loading.value = false
  }
})
</script>
