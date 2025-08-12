<template>
  <div class="crew-profile-form">
    <div class="max-w-4xl mx-auto">
      <!-- Profile Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Crew Profile</h2>
        <p class="text-gray-600">Create your professional profile to attract charter operators</p>
      </div>

      <form @submit.prevent="saveProfile" class="space-y-8">
        <!-- Basic Information -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Profile Photo</label>
              <div class="mt-1 flex items-center space-x-4">
                <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  <img v-if="profile.avatar" :src="profile.avatar" alt="Profile" class="w-full h-full object-cover" />
                  <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <button type="button" @click="uploadPhoto" class="btn-outline text-sm">Upload Photo</button>
              </div>
            </div>
            
            <div>
              <label class="form-label">Professional Title</label>
              <input v-model="profile.title" type="text" class="input-field" placeholder="e.g., Experienced Deckhand, First Mate" />
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">Bio & Experience Summary</label>
              <textarea v-model="profile.bio" rows="4" class="input-field" placeholder="Tell operators about your experience, passion for fishing, and what makes you a great crew member..."></textarea>
            </div>
          </div>
        </div>

        <!-- Certifications & Licenses -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Certifications & Licenses</h3>
          <div class="space-y-4">
            <div v-for="(cert, index) in profile.certifications" :key="index" class="border border-gray-200 rounded-lg p-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="form-label">Certification Name</label>
                  <input v-model="cert.name" type="text" class="input-field" placeholder="e.g., Marine Safety Certificate" />
                </div>
                <div>
                  <label class="form-label">Issuing Authority</label>
                  <input v-model="cert.issuer" type="text" class="input-field" placeholder="e.g., Maritime Safety Authority" />
                </div>
                <div>
                  <label class="form-label">Expiry Date</label>
                  <input v-model="cert.expiry_date" type="date" class="input-field" />
                </div>
              </div>
              <div class="mt-3 flex justify-end">
                <button type="button" @click="removeCertification(index)" class="text-red-600 hover:text-red-800 text-sm">
                  Remove
                </button>
              </div>
            </div>
            <button type="button" @click="addCertification" class="btn-outline w-full">
              + Add Certification
            </button>
          </div>
        </div>

        <!-- Skills & Experience -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Skills & Experience</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Years of Experience</label>
              <select v-model="profile.years_experience" class="input-field">
                <option value="">Select years</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Preferred Trip Types</label>
              <div class="space-y-2">
                <label v-for="tripType in tripTypes" :key="tripType" class="flex items-center">
                  <input
                    v-model="profile.preferred_trip_types"
                    :value="tripType"
                    type="checkbox"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ tripType }}</span>
                </label>
              </div>
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">Key Skills</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label v-for="skill in availableSkills" :key="skill" class="flex items-center">
                  <input
                    v-model="profile.skills"
                    :value="skill"
                    type="checkbox"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ skill }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Availability & Location -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Availability & Location</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Location</label>
              <input v-model="profile.location" type="text" class="input-field" placeholder="City, State" />
            </div>
            
            <div>
              <label class="form-label">Willing to Travel</label>
              <select v-model="profile.travel_distance" class="input-field">
                <option value="">Select distance</option>
                <option value="local">Local only (within 50km)</option>
                <option value="regional">Regional (within 200km)</option>
                <option value="state">State-wide</option>
                <option value="national">National</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Availability Status</label>
              <select v-model="profile.availability_status" class="input-field">
                <option value="available">Available for work</option>
                <option value="part-time">Part-time availability</option>
                <option value="seasonal">Seasonal availability</option>
                <option value="unavailable">Currently unavailable</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Expected Rate (per day)</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input v-model="profile.expected_rate" type="number" class="input-field pl-8" placeholder="200" />
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Preferences -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Preferences</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Preferred Contact Method</label>
              <select v-model="profile.preferred_contact" class="input-field">
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="message">Platform Message</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Response Time</label>
              <select v-model="profile.response_time" class="input-field">
                <option value="immediate">Immediate</option>
                <option value="same-day">Same day</option>
                <option value="24-hours">Within 24 hours</option>
                <option value="48-hours">Within 48 hours</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="saveDraft" class="btn-outline">
            Save Draft
          </button>
          <button type="submit" :disabled="saving" class="btn-primary">
            {{ saving ? 'Saving...' : 'Publish Profile' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

interface Certification {
  name: string
  issuer: string
  expiry_date: string
}

interface CrewProfile {
  avatar: string
  title: string
  bio: string
  certifications: Certification[]
  years_experience: string
  preferred_trip_types: string[]
  skills: string[]
  location: string
  travel_distance: string
  availability_status: string
  expected_rate: string
  preferred_contact: string
  response_time: string
}

const saving = ref(false)

const tripTypes = [
  'Half-day trips',
  'Full-day trips',
  'Overnight trips',
  'Deep sea fishing',
  'Reef fishing',
  'Sport fishing',
  'Charter tours',
  'Corporate events'
]

const availableSkills = [
  'Navigation',
  'Knot tying',
  'Fish cleaning',
  'Bait preparation',
  'Guest service',
  'Safety procedures',
  'Engine maintenance',
  'Radio communication',
  'First aid',
  'Cooking',
  'Photography',
  'Multilingual'
]

const profile = reactive<CrewProfile>({
  avatar: '',
  title: '',
  bio: '',
  certifications: [],
  years_experience: '',
  preferred_trip_types: [],
  skills: [],
  location: '',
  travel_distance: '',
  availability_status: 'available',
  expected_rate: '',
  preferred_contact: 'email',
  response_time: '24-hours'
})

const addCertification = () => {
  profile.certifications.push({
    name: '',
    issuer: '',
    expiry_date: ''
  })
}

const removeCertification = (index: number) => {
  profile.certifications.splice(index, 1)
}

const uploadPhoto = () => {
  // TODO: Implement file upload
  console.log('Upload photo')
}

const saveDraft = async () => {
  saving.value = true
  try {
    // TODO: Save as draft to backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Draft saved')
  } catch (error) {
    console.error('Error saving draft:', error)
  } finally {
    saving.value = false
  }
}

const saveProfile = async () => {
  saving.value = true
  try {
    // TODO: Save profile to backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Profile saved:', profile)
  } catch (error) {
    console.error('Error saving profile:', error)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  // TODO: Load existing profile data
  console.log('Crew profile form mounted')
})
</script>
