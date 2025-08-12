<template>
  <div class="application-manager">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Crew Applications</h2>
      
      <!-- Application Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="card text-center">
          <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
          <div class="text-sm text-gray-600">Total Applications</div>
        </div>
        <div class="card text-center">
          <div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div>
          <div class="text-sm text-gray-600">Pending Review</div>
        </div>
        <div class="card text-center">
          <div class="text-2xl font-bold text-green-600">{{ stats.accepted }}</div>
          <div class="text-sm text-gray-600">Accepted</div>
        </div>
        <div class="card text-center">
          <div class="text-2xl font-bold text-red-600">{{ stats.rejected }}</div>
          <div class="text-sm text-gray-600">Rejected</div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex space-x-1 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="activeTab === tab.id ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:text-gray-700'"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Applications List -->
      <div class="space-y-4">
        <div v-for="application in filteredApplications" :key="application.id" class="card">
          <div class="flex items-start space-x-4">
            <!-- Applicant Photo -->
            <img
              :src="application.applicant.avatar"
              :alt="application.applicant.name"
              class="w-16 h-16 rounded-full object-cover"
            />
            
            <!-- Application Details -->
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ application.applicant.name }}</h3>
                  <p class="text-gray-600">{{ application.applicant.title }}</p>
                  <p class="text-sm text-gray-500">{{ application.applicant.location }}</p>
                </div>
                <div class="text-right">
                  <div class="text-lg font-bold text-primary-600">${{ application.applicant.expected_rate }}</div>
                  <div class="text-sm text-gray-500">per day</div>
                </div>
              </div>
              
              <!-- Application Info -->
              <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span class="text-sm font-medium text-gray-500">Applied for:</span>
                  <p class="text-sm text-gray-900">{{ application.job_title }}</p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Applied on:</span>
                  <p class="text-sm text-gray-900">{{ formatDate(application.applied_date) }}</p>
                </div>
                <div>
                  <span class="text-sm font-medium text-gray-500">Status:</span>
                  <span :class="getStatusClasses(application.status)" class="text-sm font-medium">
                    {{ application.status }}
                  </span>
                </div>
              </div>
              
              <!-- Applicant Skills -->
              <div class="mt-4">
                <span class="text-sm font-medium text-gray-500">Skills:</span>
                <div class="flex flex-wrap gap-2 mt-1">
                  <span
                    v-for="skill in application.applicant.skills"
                    :key="skill"
                    class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
              
              <!-- Cover Letter Preview -->
              <div class="mt-4">
                <span class="text-sm font-medium text-gray-500">Cover Letter:</span>
                <p class="text-sm text-gray-700 mt-1 line-clamp-2">{{ application.cover_letter }}</p>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="mt-6 flex justify-end space-x-3">
            <button @click="viewApplication(application.id)" class="btn-outline text-sm">
              View Full Application
            </button>
            <button @click="messageApplicant(application.id)" class="btn-outline text-sm">
              Message
            </button>
            <button
              v-if="application.status === 'pending'"
              @click="acceptApplication(application.id)"
              class="btn-primary text-sm"
            >
              Accept
            </button>
            <button
              v-if="application.status === 'pending'"
              @click="rejectApplication(application.id)"
              class="btn-danger text-sm"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredApplications.length === 0" class="text-center py-12">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
        <p class="text-gray-600">No applications match your current filter criteria.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Applicant {
  id: number
  name: string
  title: string
  avatar: string
  location: string
  expected_rate: number
  skills: string[]
}

interface Application {
  id: number
  applicant: Applicant
  job_title: string
  applied_date: string
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  cover_letter: string
}

const activeTab = ref('all')

const tabs = [
  { id: 'all', name: 'All Applications' },
  { id: 'pending', name: 'Pending Review' },
  { id: 'accepted', name: 'Accepted' },
  { id: 'rejected', name: 'Rejected' }
]

const stats = ref({
  total: 12,
  pending: 5,
  accepted: 4,
  rejected: 3
})

const applications = ref<Application[]>([
  {
    id: 1,
    applicant: {
      id: 1,
      name: 'John Smith',
      title: 'Experienced Deckhand',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
      location: 'Sydney, NSW',
      expected_rate: 180,
      skills: ['Navigation', 'Knot tying', 'Fish cleaning', 'Guest service']
    },
    job_title: 'Deckhand - Sea Adventure',
    applied_date: '2024-01-15',
    status: 'pending',
    cover_letter: 'I have over 5 years of experience working on fishing charters and am passionate about providing excellent guest experiences. I am available immediately and can start within a week.'
  },
  {
    id: 2,
    applicant: {
      id: 2,
      name: 'Sarah Johnson',
      title: 'First Mate',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500',
      location: 'Melbourne, VIC',
      expected_rate: 220,
      skills: ['Navigation', 'Safety procedures', 'Engine maintenance', 'First aid']
    },
    job_title: 'First Mate - Ocean Explorer',
    applied_date: '2024-01-14',
    status: 'accepted',
    cover_letter: 'I am a certified first mate with extensive experience in navigation and safety procedures. I have worked on various vessel types and am comfortable with both day and overnight trips.'
  }
])

const filteredApplications = computed(() => {
  if (activeTab.value === 'all') {
    return applications.value
  }
  return applications.value.filter(app => app.status === activeTab.value)
})

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString()
}

const getStatusClasses = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'text-yellow-600'
    case 'accepted':
      return 'text-green-600'
    case 'rejected':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

const viewApplication = (id: number) => {
  console.log('View application:', id)
  // TODO: Navigate to full application view
}

const messageApplicant = (id: number) => {
  console.log('Message applicant:', id)
  // TODO: Open messaging interface
}

const acceptApplication = async (id: number) => {
  try {
    // TODO: Call API to accept application
    const application = applications.value.find(app => app.id === id)
    if (application) {
      application.status = 'accepted'
    }
    console.log('Application accepted:', id)
  } catch (error) {
    console.error('Error accepting application:', error)
  }
}

const rejectApplication = async (id: number) => {
  try {
    // TODO: Call API to reject application
    const application = applications.value.find(app => app.id === id)
    if (application) {
      application.status = 'rejected'
    }
    console.log('Application rejected:', id)
  } catch (error) {
    console.error('Error rejecting application:', error)
  }
}
</script>
