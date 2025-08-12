<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="card">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Profile</h1>
        <div class="space-y-4">
          <div>
            <label class="form-label">Name</label>
            <input v-model="profile.name" type="text" class="input-field" />
          </div>
          <div>
            <label class="form-label">Email</label>
            <input v-model="profile.email" type="email" class="input-field" />
          </div>
          <div>
            <label class="form-label">Phone</label>
            <input v-model="profile.phone" type="tel" class="input-field" />
          </div>
          <div>
            <label class="form-label">Location</label>
            <input v-model="profile.location" type="text" class="input-field" />
          </div>
          <button class="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const profile = ref({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+61 400 123 456',
  location: 'Sydney, NSW'
})
</script>
