<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="charter" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <div class="card mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ charter.name }}</h1>
            <p class="text-gray-600 mb-4">{{ charter.location }}</p>
            <p class="text-gray-600">{{ charter.description }}</p>
          </div>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Book this charter</h3>
            <div class="text-2xl font-bold text-primary-600 mb-4">${{ charter.price_per_person }}/person</div>
            <button class="btn-primary w-full">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const charter = ref({
  id: 1,
  name: 'Great Barrier Reef Adventure',
  location: 'Cairns, QLD',
  price_per_person: 150,
  description: 'Experience the world-famous Great Barrier Reef with our expert crew.'
})

onMounted(() => {
  const charterId = parseInt(route.params.id as string)
  // TODO: Fetch charter details from API
})
</script>
