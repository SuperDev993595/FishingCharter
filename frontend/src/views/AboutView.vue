<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          About FishCharter
        </h1>
        <p class="text-xl text-gray-600">
          Australia's leading online marketplace for fishing charters
        </p>
      </div>

      <div class="prose prose-lg mx-auto">
        <div class="card mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p class="text-gray-600 mb-4">
            FishCharter is dedicated to connecting anglers with the best fishing experiences across Australia. 
            We provide a platform where charter operators can showcase their services and anglers can find 
            their perfect fishing adventure.
          </p>
          <p class="text-gray-600">
            Whether you're a seasoned angler looking for your next big catch or a charter operator wanting 
            to grow your business, FishCharter is here to make the connection seamless and enjoyable.
          </p>
        </div>

        <div class="card mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">For Anglers</h3>
              <ul class="text-gray-600 space-y-2">
                <li>• Browse and compare fishing charters</li>
                <li>• Read reviews and ratings</li>
                <li>• Secure online booking</li>
                <li>• Direct communication with operators</li>
                <li>• Trip planning and recommendations</li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">For Operators</h3>
              <ul class="text-gray-600 space-y-2">
                <li>• List and manage your charters</li>
                <li>• Reach a wider audience</li>
                <li>• Manage bookings and payments</li>
                <li>• Find qualified crew members</li>
                <li>• Build your online presence</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Quality</h3>
              <p class="text-gray-600 text-sm">
                We ensure all charters meet high standards of safety and service
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Trust</h3>
              <p class="text-gray-600 text-sm">
                Building trust through transparency and reliable service
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Community</h3>
              <p class="text-gray-600 text-sm">
                Fostering a community of passionate anglers and operators
              </p>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
          <p class="text-gray-600 mb-6">
            Ready to start your fishing adventure? Join thousands of anglers and operators who trust FishCharter.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/register"
              class="btn-primary text-lg px-8 py-3"
            >
              Create Account
            </router-link>
            <router-link
              to="/charters"
              class="btn-outline text-lg px-8 py-3"
            >
              Browse Charters
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for About page
</script>
