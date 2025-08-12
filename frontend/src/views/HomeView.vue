<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Reactive state
const searchForm = ref({
  location: '',
  date: '',
  capacity: ''
})

// Methods
const handleSearch = () => {
  const params: any = {}
  if (searchForm.value.location) params.location = searchForm.value.location
  if (searchForm.value.date) params.date = searchForm.value.date
  if (searchForm.value.capacity) params.capacity = searchForm.value.capacity
  
  router.push({
    path: '/charters',
    query: params
  })
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-ocean-600 to-ocean-800 text-white">
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect
            <span class="text-yellow-400">Fishing Adventure</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover Australia's finest fishing charters and connect with experienced crew members. 
            Book unforgettable fishing experiences across the country.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/charters"
              class="btn-secondary text-lg px-8 py-4"
            >
              Find Charters
            </router-link>
            <router-link
              to="/crew"
              class="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-ocean-600"
            >
              Find Crew Jobs
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Find Your Perfect Charter
          </h2>
          <form @submit.prevent="handleSearch" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="form-label">Location</label>
                <input
                  v-model="searchForm.location"
                  type="text"
                  placeholder="Where do you want to fish?"
                  class="input-field"
                />
              </div>
              <div>
                <label class="form-label">Date</label>
                <input
                  v-model="searchForm.date"
                  type="date"
                  class="input-field"
                />
              </div>
              <div>
                <label class="form-label">Guests</label>
                <select v-model="searchForm.capacity" class="input-field">
                  <option value="">Any size</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="4">4 people</option>
                  <option value="6">6 people</option>
                  <option value="8">8+ people</option>
                </select>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn-primary text-lg px-8 py-3">
                Search Charters
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started with FishCharter in three simple steps
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Search & Browse</h3>
            <p class="text-gray-600">
              Find fishing charters in your desired location with detailed information about boats, 
              captains, and fishing experiences.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Book & Pay</h3>
            <p class="text-gray-600">
              Reserve your spot with secure online booking and payment. 
              Get instant confirmation and all the details you need.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Fish & Enjoy</h3>
            <p class="text-gray-600">
              Head out on your fishing adventure! Connect with your captain, 
              enjoy the experience, and create unforgettable memories.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-ocean-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">
          Ready to Start Your Fishing Adventure?
        </h2>
        <p class="text-xl mb-8 opacity-90">
          Join thousands of anglers who have discovered their perfect fishing charter through FishCharter
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="btn-secondary text-lg px-8 py-4"
          >
            Get Started Today
          </router-link>
          <router-link
            to="/charters"
            class="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-ocean-600"
          >
            Browse Charters
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
