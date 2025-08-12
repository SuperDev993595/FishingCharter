<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Fishing Charters</h1>
        <p class="mt-2 text-gray-600">Find the perfect fishing adventure</p>
      </div>

      <!-- Advanced Search and Filters -->
      <div class="card mb-8">
        <form @submit.prevent="handleSearch" class="space-y-6">
          <!-- Primary Search Row -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label for="location" class="form-label">Location</label>
              <div class="relative">
                <input
                  id="location"
                  v-model="filters.location"
                  type="text"
                  class="input-field pr-10"
                  placeholder="Enter city or region"
                  @input="handleLocationSearch"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label for="date" class="form-label">Date</label>
              <input
                id="date"
                v-model="filters.date"
                type="date"
                class="input-field"
                :min="new Date().toISOString().split('T')[0]"
              />
            </div>
            <div>
              <label for="trip_type" class="form-label">Trip Type</label>
              <select id="trip_type" v-model="filters.trip_type" class="input-field">
                <option value="">All Types</option>
                <option value="half-day">Half Day</option>
                <option value="full-day">Full Day</option>
                <option value="overnight">Overnight</option>
                <option value="deep-sea">Deep Sea</option>
                <option value="reef">Reef Fishing</option>
              </select>
            </div>
            <div>
              <label for="capacity" class="form-label">Group Size</label>
              <select id="capacity" v-model="filters.capacity" class="input-field">
                <option value="">Any Size</option>
                <option value="1-4">1-4 people</option>
                <option value="5-8">5-8 people</option>
                <option value="9-12">9-12 people</option>
                <option value="12+">12+ people</option>
              </select>
            </div>
          </div>

          <!-- Advanced Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label for="price_min" class="form-label">Price Range</label>
              <div class="flex space-x-2">
                <input
                  id="price_min"
                  v-model="filters.price_min"
                  type="number"
                  class="input-field"
                  placeholder="Min"
                />
                <input
                  id="price_max"
                  v-model="filters.price_max"
                  type="number"
                  class="input-field"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label for="rating" class="form-label">Minimum Rating</label>
              <select id="rating" v-model="filters.rating" class="input-field">
                <option value="">Any Rating</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div>
              <label for="amenities" class="form-label">Amenities</label>
              <select id="amenities" v-model="filters.amenities" class="input-field">
                <option value="">Any Amenities</option>
                <option value="restroom">Restroom</option>
                <option value="shaded-deck">Shaded Deck</option>
                <option value="air-conditioning">Air Conditioning</option>
                <option value="catering">Catering</option>
                <option value="fishing-equipment">Fishing Equipment</option>
              </select>
            </div>
            <div class="flex items-end">
              <button type="submit" class="btn-primary w-full">Search Charters</button>
            </div>
          </div>

          <!-- Quick Filters -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="quickFilter in quickFilters"
              :key="quickFilter.value"
              type="button"
              @click="applyQuickFilter(quickFilter.value)"
              class="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              :class="{ 'bg-primary-100 border-primary-300 text-primary-700': activeQuickFilter === quickFilter.value }"
            >
              {{ quickFilter.label }}
            </button>
          </div>
        </form>
      </div>

      <!-- Search Results Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center space-x-4">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ charters.length }} Charters Found
          </h2>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Sort by:</span>
            <select v-model="sortBy" @change="handleSort" class="text-sm border-gray-300 rounded-md">
              <option value="relevance">Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="viewMode = 'grid'"
            class="p-2 rounded-md"
            :class="viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            @click="viewMode = 'list'"
            class="p-2 rounded-md"
            :class="viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="charter in charters" :key="charter.id" class="card hover:shadow-lg transition-shadow cursor-pointer" @click="viewCharter(charter.id)">
          <div class="relative">
            <img
              :src="charter.images?.[0] || '/placeholder-charter.jpg'"
              :alt="charter.name"
              class="w-full h-48 object-cover rounded-lg"
            />
            <div v-if="charter.is_featured" class="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
              Featured
            </div>
            <div class="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {{ charter.trip_type }}
            </div>
          </div>
          
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ charter.name }}</h3>
            <p class="text-gray-600 text-sm mb-3 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {{ charter.location }}
            </p>
            
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center">
                <div class="flex text-yellow-400">
                  <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= charter.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="ml-1 text-sm text-gray-600">({{ charter.review_count }})</span>
              </div>
              <span class="text-lg font-bold text-primary-600">${{ charter.price_per_person }}</span>
            </div>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{{ charter.duration_hours }} hours</span>
              <span>Up to {{ charter.capacity }} people</span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-1">
                <span v-for="amenity in charter.amenities?.slice(0, 2)" :key="amenity" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  {{ amenity }}
                </span>
                <span v-if="charter.amenities?.length > 2" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{{ charter.amenities.length - 2 }} more
                </span>
              </div>
              <button class="btn-primary text-sm">View Details</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Results List -->
      <div v-else class="space-y-4">
        <div v-for="charter in charters" :key="charter.id" class="card hover:shadow-md transition-shadow cursor-pointer" @click="viewCharter(charter.id)">
          <div class="flex">
            <img
              :src="charter.images?.[0] || '/placeholder-charter.jpg'"
              :alt="charter.name"
              class="w-32 h-24 object-cover rounded-lg"
            />
            <div class="ml-4 flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ charter.name }}</h3>
                  <p class="text-gray-600 text-sm">{{ charter.location }}</p>
                  <div class="flex items-center mt-1">
                    <div class="flex text-yellow-400">
                      <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= charter.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <span class="ml-1 text-sm text-gray-600">({{ charter.review_count }})</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xl font-bold text-primary-600">${{ charter.price_per_person }}</div>
                  <div class="text-sm text-gray-500">per person</div>
                </div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ charter.duration_hours }} hours</span>
                  <span>Up to {{ charter.capacity }} people</span>
                  <span>{{ charter.trip_type }}</span>
                </div>
                <button class="btn-primary text-sm">View Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Searching for charters...</p>
      </div>

      <!-- Empty State -->
      <div v-if="!loading && charters.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No charters found</h3>
        <p class="text-gray-600 mb-4">Try adjusting your search criteria or browse all charters</p>
        <button @click="clearFilters" class="btn-outline">Clear Filters</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCharterStore } from '@/stores/charters'

const router = useRouter()
const charterStore = useCharterStore()

const loading = ref(false)
const viewMode = ref('grid')
const sortBy = ref('relevance')
const activeQuickFilter = ref('')

const filters = reactive({
  location: '',
  date: '',
  trip_type: '',
  capacity: '',
  price_min: '',
  price_max: '',
  rating: '',
  amenities: ''
})

const quickFilters = [
  { label: 'Half Day', value: 'half-day' },
  { label: 'Full Day', value: 'full-day' },
  { label: 'Deep Sea', value: 'deep-sea' },
  { label: 'Under $100', value: 'under-100' },
  { label: '4+ Stars', value: '4-stars' },
  { label: 'Available Today', value: 'today' }
]

const charters = ref([
  {
    id: 1,
    name: 'Great Barrier Reef Adventure',
    location: 'Cairns, QLD',
    price_per_person: 150,
    duration_hours: 8,
    capacity: 6,
    rating: 4.8,
    review_count: 127,
    trip_type: 'Full Day',
    is_featured: true,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'],
    amenities: ['Restroom', 'Shaded Deck', 'Fishing Equipment']
  },
  {
    id: 2,
    name: 'Sydney Harbour Fishing',
    location: 'Sydney, NSW',
    price_per_person: 120,
    duration_hours: 6,
    capacity: 4,
    rating: 4.6,
    review_count: 89,
    trip_type: 'Half Day',
    is_featured: false,
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'],
    amenities: ['Restroom', 'Air Conditioning']
  },
  {
    id: 3,
    name: 'Port Phillip Bay Charter',
    location: 'Melbourne, VIC',
    price_per_person: 100,
    duration_hours: 5,
    capacity: 8,
    rating: 4.7,
    review_count: 156,
    trip_type: 'Full Day',
    is_featured: true,
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500'],
    amenities: ['Restroom', 'Catering', 'Fishing Equipment']
  }
])

const handleSearch = () => {
  loading.value = true
  // TODO: Implement API search with filters
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

const handleLocationSearch = () => {
  // TODO: Implement Google Places API integration
  console.log('Location search:', filters.location)
}

const applyQuickFilter = (filter: string) => {
  activeQuickFilter.value = filter
  // Apply quick filter logic
  switch (filter) {
    case 'half-day':
      filters.trip_type = 'half-day'
      break
    case 'full-day':
      filters.trip_type = 'full-day'
      break
    case 'deep-sea':
      filters.trip_type = 'deep-sea'
      break
    case 'under-100':
      filters.price_max = '100'
      break
    case '4-stars':
      filters.rating = '4'
      break
    case 'today':
      filters.date = new Date().toISOString().split('T')[0]
      break
  }
  handleSearch()
}

const handleSort = () => {
  // TODO: Implement sorting logic
  console.log('Sort by:', sortBy.value)
}

const viewCharter = (id: number) => {
  router.push(`/charters/${id}`)
}

const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    filters[key] = ''
  })
  activeQuickFilter.value = ''
  handleSearch()
}

// Watch for filter changes and trigger search
watch(filters, () => {
  // Debounced search could be implemented here
}, { deep: true })

onMounted(async () => {
  loading.value = true
  try {
    // TODO: Fetch initial charters from API
    // await charterStore.fetchCharters()
  } catch (error) {
    console.error('Error fetching charters:', error)
  } finally {
    loading.value = false
  }
})
</script>
