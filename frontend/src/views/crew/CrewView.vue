<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Crew Jobs</h1>
        <p class="mt-2 text-gray-600">Find your next fishing adventure</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="job in jobs" :key="job.id" class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ job.title }}</h3>
          <p class="text-gray-600 mb-3">{{ job.location }}</p>
          <div class="flex justify-between items-center">
            <span class="text-primary-600 font-semibold">${{ job.salary_min }}-{{ job.salary_max }}</span>
            <router-link :to="`/crew/${job.id}`" class="btn-primary text-sm">View Details</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const jobs = ref([
  { id: 1, title: 'Deckhand', location: 'Cairns, QLD', salary_min: 25, salary_max: 35 },
  { id: 2, title: 'First Mate', location: 'Sydney, NSW', salary_min: 30, salary_max: 45 },
  { id: 3, title: 'Fishing Guide', location: 'Melbourne, VIC', salary_min: 28, salary_max: 40 }
])
</script>
