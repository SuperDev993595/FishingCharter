<template>
  <div class="crew-profile-view">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Header -->
      <div class="card mb-8">
        <div class="flex items-start space-x-6">
          <img
            :src="crew.avatar"
            :alt="crew.name"
            class="w-32 h-32 rounded-full object-cover"
          />
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ crew.name }}</h1>
            <p class="text-xl text-gray-600 mb-4">{{ crew.title }}</p>
            <div class="flex items-center space-x-6 text-sm text-gray-500">
              <span>{{ crew.location }}</span>
              <span>{{ crew.years_experience }} years experience</span>
              <span>{{ crew.availability_status }}</span>
            </div>
            <div class="flex items-center mt-4">
              <div class="flex text-yellow-400">
                <svg v-for="star in 5" :key="star" class="w-5 h-5" :class="star <= crew.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">({{ crew.review_count }} reviews)</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-3xl font-bold text-primary-600">${{ crew.expected_rate }}</div>
            <div class="text-sm text-gray-500">per day</div>
            <button @click="contactCrew" class="btn-primary mt-4">Contact Crew Member</button>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- About -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">About</h2>
            <p class="text-gray-700 leading-relaxed">{{ crew.bio }}</p>
          </div>

          <!-- Skills -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Skills & Expertise</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <span
                v-for="skill in crew.skills"
                :key="skill"
                class="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg text-center"
              >
                {{ skill }}
              </span>
            </div>
          </div>

          <!-- Certifications -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Certifications & Licenses</h2>
            <div class="space-y-4">
              <div v-for="cert in crew.certifications" :key="cert.name" class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ cert.name }}</h3>
                    <p class="text-sm text-gray-600">{{ cert.issuer }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">Expires</p>
                    <p class="text-sm font-medium text-gray-900">{{ formatDate(cert.expiry_date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews -->
          <div class="card">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Reviews</h2>
            <div class="space-y-4">
              <div v-for="review in crew.reviews" :key="review.id" class="border-b border-gray-200 pb-4 last:border-b-0">
                <div class="flex items-start space-x-3">
                  <img
                    :src="review.reviewer_avatar"
                    :alt="review.reviewer_name"
                    class="w-10 h-10 rounded-full object-cover"
                  />
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <h4 class="font-medium text-gray-900">{{ review.reviewer_name }}</h4>
                      <div class="flex text-yellow-400">
                        <svg v-for="star in 5" :key="star" class="w-4 h-4" :class="star <= review.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">{{ review.comment }}</p>
                    <p class="text-xs text-gray-500 mt-2">{{ formatDate(review.created_at) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Contact Info -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div class="space-y-3">
              <div>
                <span class="text-sm font-medium text-gray-500">Location</span>
                <p class="text-sm text-gray-900">{{ crew.location }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Willing to Travel</span>
                <p class="text-sm text-gray-900">{{ crew.travel_distance }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Response Time</span>
                <p class="text-sm text-gray-900">{{ crew.response_time }}</p>
              </div>
            </div>
          </div>

          <!-- Availability -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Availability</h3>
            <div class="space-y-3">
              <div>
                <span class="text-sm font-medium text-gray-500">Status</span>
                <p class="text-sm text-gray-900">{{ crew.availability_status }}</p>
              </div>
              <div>
                <span class="text-sm font-medium text-gray-500">Preferred Trip Types</span>
                <div class="mt-1">
                  <span
                    v-for="tripType in crew.preferred_trip_types"
                    :key="tripType"
                    class="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mr-1 mb-1"
                  >
                    {{ tripType }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="card">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button @click="inviteToJob" class="btn-primary w-full">Invite to Job</button>
              <button @click="messageCrew" class="btn-outline w-full">Send Message</button>
              <button @click="addToFavorites" class="btn-outline w-full">Add to Favorites</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Certification {
  name: string
  issuer: string
  expiry_date: string
}

interface Review {
  id: number
  reviewer_name: string
  reviewer_avatar: string
  rating: number
  comment: string
  created_at: string
}

interface CrewMember {
  id: number
  name: string
  title: string
  avatar: string
  bio: string
  location: string
  years_experience: string
  availability_status: string
  expected_rate: number
  rating: number
  review_count: number
  skills: string[]
  certifications: Certification[]
  preferred_trip_types: string[]
  travel_distance: string
  response_time: string
  reviews: Review[]
}

const route = useRoute()

const crew = ref<CrewMember>({
  id: 1,
  name: 'John Smith',
  title: 'Experienced Deckhand',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
  bio: 'I am a passionate and experienced deckhand with over 5 years of experience working on fishing charters. I specialize in providing excellent guest experiences and ensuring safety on board. I have worked on various vessel types and am comfortable with both day and overnight trips.',
  location: 'Sydney, NSW',
  years_experience: '5-10',
  availability_status: 'Available for work',
  expected_rate: 180,
  rating: 4.8,
  review_count: 23,
  skills: ['Navigation', 'Knot tying', 'Fish cleaning', 'Bait preparation', 'Guest service', 'Safety procedures'],
  certifications: [
    {
      name: 'Marine Safety Certificate',
      issuer: 'Maritime Safety Authority',
      expiry_date: '2025-12-31'
    },
    {
      name: 'First Aid Certificate',
      issuer: 'St John Ambulance',
      expiry_date: '2024-06-30'
    }
  ],
  preferred_trip_types: ['Half-day trips', 'Full-day trips', 'Deep sea fishing'],
  travel_distance: 'Regional (within 200km)',
  response_time: 'Within 24 hours',
  reviews: [
    {
      id: 1,
      reviewer_name: 'Captain Mike',
      reviewer_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500',
      rating: 5,
      comment: 'Excellent crew member. Very reliable and great with guests. Highly recommend!',
      created_at: '2024-01-10'
    },
    {
      id: 2,
      reviewer_name: 'Sarah Wilson',
      reviewer_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500',
      rating: 4,
      comment: 'Good worker, knows his stuff. Would hire again.',
      created_at: '2024-01-05'
    }
  ]
})

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString()
}

const contactCrew = () => {
  console.log('Contact crew member')
  // TODO: Open contact form or messaging
}

const inviteToJob = () => {
  console.log('Invite to job')
  // TODO: Open job invitation form
}

const messageCrew = () => {
  console.log('Message crew')
  // TODO: Open messaging interface
}

const addToFavorites = () => {
  console.log('Add to favorites')
  // TODO: Add to favorites list
}

onMounted(() => {
  const crewId = route.params.id
  console.log('Loading crew profile for ID:', crewId)
  // TODO: Load crew data from API
})
</script>
