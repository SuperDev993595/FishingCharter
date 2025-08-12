<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <div class="w-24 h-24 bg-ocean-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg class="w-12 h-12 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </div>
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
        <p class="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
        </p>
      </div>

      <div class="space-y-4">
        <router-link
          to="/"
          class="btn-primary w-full"
        >
          Go Home
        </router-link>
        
        <div class="flex space-x-4">
          <router-link
            to="/charters"
            class="btn-outline flex-1"
          >
            Browse Charters
          </router-link>
          <router-link
            to="/contact"
            class="btn-outline flex-1"
          >
            Contact Support
          </router-link>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for 404 page
</script>
