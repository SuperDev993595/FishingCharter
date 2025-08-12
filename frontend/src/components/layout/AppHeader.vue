<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Navigation -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-ocean-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">FishCharter</span>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex ml-10 space-x-8">
            <router-link
              to="/charters"
              class="text-gray-700 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-ocean-600"
            >
              Charters
            </router-link>
            <router-link
              to="/crew"
              class="text-gray-700 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-ocean-600"
            >
              Crew Jobs
            </router-link>
            <router-link
              to="/about"
              class="text-gray-700 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-ocean-600"
            >
              About
            </router-link>
          </nav>
        </div>

        <!-- Right side - Search, User Menu, etc. -->
        <div class="flex items-center space-x-4">
          <!-- Search Button (Mobile) -->
          <button
            @click="showSearch = true"
            class="md:hidden p-2 text-gray-400 hover:text-gray-500"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- User Menu -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button
              @click="userMenuOpen = !userMenuOpen"
              class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
            >
              <img
                v-if="authStore.user?.avatar"
                :src="authStore.user.avatar"
                :alt="authStore.user.name"
                class="w-8 h-8 rounded-full"
              />
              <div
                v-else
                class="w-8 h-8 bg-ocean-600 rounded-full flex items-center justify-center text-white font-medium"
              >
                {{ authStore.user?.name?.charAt(0)?.toUpperCase() }}
              </div>
              <span class="hidden md:block text-gray-700">{{ authStore.user?.name }}</span>
              <svg class="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="userMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <router-link
                to="/dashboard"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                Dashboard
              </router-link>
              <router-link
                to="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                Profile
              </router-link>
              <router-link
                to="/bookings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                My Bookings
              </router-link>
              <router-link
                v-if="authStore.isOperator"
                to="/my-charters"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                My Charters
              </router-link>
              <router-link
                v-if="authStore.isCrew"
                to="/my-applications"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                My Applications
              </router-link>
              <router-link
                to="/messages"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                @click="userMenuOpen = false"
              >
                Messages
              </router-link>
              <div class="border-t border-gray-100"></div>
              <button
                @click="handleLogout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>

          <!-- Auth Buttons -->
          <div v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="text-gray-700 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Sign in
            </router-link>
            <router-link
              to="/register"
              class="btn-primary text-sm"
            >
              Sign up
            </router-link>
          </div>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden p-2 text-gray-400 hover:text-gray-500"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/charters"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ocean-600 hover:bg-gray-50 rounded-md"
          @click="mobileMenuOpen = false"
        >
          Charters
        </router-link>
        <router-link
          to="/crew"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ocean-600 hover:bg-gray-50 rounded-md"
          @click="mobileMenuOpen = false"
        >
          Crew Jobs
        </router-link>
        <router-link
          to="/about"
          class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ocean-600 hover:bg-gray-50 rounded-md"
          @click="mobileMenuOpen = false"
        >
          About
        </router-link>
      </div>
    </div>

    <!-- Search Modal -->
    <div
      v-if="showSearch"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      @click="showSearch = false"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md" @click.stop>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Search Charters</h3>
        <div class="space-y-4">
          <div>
            <label class="form-label">Location</label>
            <input
              v-model="searchForm.location"
              type="text"
              placeholder="Enter location..."
              class="input-field"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="form-label">Min Price</label>
              <input
                v-model="searchForm.minPrice"
                type="number"
                placeholder="Min price"
                class="input-field"
              />
            </div>
            <div>
              <label class="form-label">Max Price</label>
              <input
                v-model="searchForm.maxPrice"
                type="number"
                placeholder="Max price"
                class="input-field"
              />
            </div>
          </div>
          <div class="flex space-x-2">
            <button
              @click="handleSearch"
              class="btn-primary flex-1"
            >
              Search
            </button>
            <button
              @click="showSearch = false"
              class="btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const userMenuOpen = ref(false)
const mobileMenuOpen = ref(false)
const showSearch = ref(false)
const searchForm = ref({
  location: '',
  minPrice: '',
  maxPrice: ''
})

// Methods
const handleLogout = async () => {
  try {
    await authStore.logout()
    userMenuOpen.value = false
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

const handleSearch = () => {
  const params: any = {}
  if (searchForm.value.location) params.location = searchForm.value.location
  if (searchForm.value.minPrice) params.minPrice = searchForm.value.minPrice
  if (searchForm.value.maxPrice) params.maxPrice = searchForm.value.maxPrice
  
  router.push({
    path: '/charters',
    query: params
  })
  showSearch.value = false
}

// Close dropdowns when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.relative')) {
    userMenuOpen.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
