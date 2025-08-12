<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="card">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ job.title }}</h1>
        <p class="text-gray-600 mb-4">{{ job.location }}</p>
        <p class="text-gray-600 mb-6">{{ job.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-primary-600">${{ job.salary_min }}-{{ job.salary_max }}/hour</span>
          <button class="btn-primary">Apply Now</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const job = ref({
  id: 1,
  title: 'Deckhand',
  location: 'Cairns, QLD',
  salary_min: 25,
  salary_max: 35,
  description: 'Join our experienced crew for exciting fishing adventures.'
})
</script>
