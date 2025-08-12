<template>
  <div class="crew-search">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Find Crew Members</h2>
      
      <!-- Search Form -->
      <div class="card mb-8">
        <form @submit.prevent="handleSearch" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input v-model="filters.location" type="text" class="input-field" placeholder="Location" />
            <select v-model="filters.position_type" class="input-field">
              <option value="">All Positions</option>
              <option value="deckhand">Deckhand</option>
              <option value="first-mate">First Mate</option>
              <option value="skipper">Skipper</option>
            </select>
            <button type="submit" class="btn-primary">Search</button>
          </div>
        </form>
      </div>

      <!-- Results -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="crew in crewMembers" :key="crew.id" class="card">
          <img :src="crew.avatar" :alt="crew.name" class="w-full h-48 object-cover rounded-lg mb-4" />
          <h3 class="text-lg font-semibold">{{ crew.name }}</h3>
          <p class="text-gray-600">{{ crew.title }}</p>
          <p class="text-sm text-gray-500">{{ crew.location }}</p>
          <div class="flex justify-between items-center mt-4">
            <span class="font-bold">${{ crew.expected_rate }}/day</span>
            <button @click="viewProfile(crew.id)" class="btn-primary text-sm">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const filters = reactive({
  location: '',
  position_type: ''
})

const crewMembers = ref([
  {
    id: 1,
    name: 'John Smith',
    title: 'Experienced Deckhand',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    location: 'Sydney, NSW',
    expected_rate: 180
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    title: 'First Mate',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500',
    location: 'Melbourne, VIC',
    expected_rate: 220
  }
])

const handleSearch = () => {
  console.log('Searching with filters:', filters)
}

const viewProfile = (id: number) => {
  router.push(`/crew/${id}`)
}
</script>
