<template>
  <div class="job-posting-form">
    <div class="max-w-4xl mx-auto">
      <!-- Form Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900">Post Crew Vacancy</h2>
        <p class="text-gray-600">Create a job listing to find qualified crew members</p>
      </div>

      <form @submit.prevent="saveJobPosting" class="space-y-8">
        <!-- Job Details -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Job Title</label>
              <input v-model="jobPosting.title" type="text" class="input-field" placeholder="e.g., Experienced Deckhand, First Mate" required />
            </div>
            
            <div>
              <label class="form-label">Position Type</label>
              <select v-model="jobPosting.position_type" class="input-field" required>
                <option value="">Select position</option>
                <option value="deckhand">Deckhand</option>
                <option value="first-mate">First Mate</option>
                <option value="skipper">Skipper</option>
                <option value="cook">Cook</option>
                <option value="general">General Crew</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Employment Type</label>
              <select v-model="jobPosting.employment_type" class="input-field" required>
                <option value="">Select type</option>
                <option value="single-trip">Single Trip</option>
                <option value="seasonal">Seasonal</option>
                <option value="ongoing">Ongoing</option>
                <option value="part-time">Part-time</option>
                <option value="casual">Casual</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Start Date</label>
              <input v-model="jobPosting.start_date" type="date" class="input-field" required />
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">Job Description</label>
              <textarea v-model="jobPosting.description" rows="4" class="input-field" placeholder="Describe the role, responsibilities, and what you're looking for in a crew member..." required></textarea>
            </div>
          </div>
        </div>

        <!-- Location & Schedule -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Location & Schedule</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Location</label>
              <input v-model="jobPosting.location" type="text" class="input-field" placeholder="City, State" required />
            </div>
            
            <div>
              <label class="form-label">Trip Duration</label>
              <select v-model="jobPosting.trip_duration" class="input-field" required>
                <option value="">Select duration</option>
                <option value="half-day">Half Day (4-6 hours)</option>
                <option value="full-day">Full Day (8-10 hours)</option>
                <option value="overnight">Overnight (24+ hours)</option>
                <option value="multi-day">Multi-day</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Work Schedule</label>
              <select v-model="jobPosting.work_schedule" class="input-field" required>
                <option value="">Select schedule</option>
                <option value="weekdays">Weekdays only</option>
                <option value="weekends">Weekends only</option>
                <option value="flexible">Flexible</option>
                <option value="as-needed">As needed</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Expected Hours per Week</label>
              <input v-model="jobPosting.hours_per_week" type="number" class="input-field" placeholder="e.g., 40" />
            </div>
          </div>
        </div>

        <!-- Requirements & Qualifications -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Requirements & Qualifications</h3>
          <div class="space-y-6">
            <div>
              <label class="form-label">Required Licenses & Certifications</label>
              <div class="space-y-3">
                <div v-for="(cert, index) in jobPosting.required_certifications" :key="index" class="flex items-center space-x-3">
                  <input v-model="cert.name" type="text" class="input-field flex-1" placeholder="e.g., Marine Safety Certificate" />
                  <button type="button" @click="removeCertification(index)" class="text-red-600 hover:text-red-800">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <button type="button" @click="addCertification" class="btn-outline text-sm">
                  + Add Certification
                </button>
              </div>
            </div>
            
            <div>
              <label class="form-label">Required Skills</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label v-for="skill in availableSkills" :key="skill" class="flex items-center">
                  <input
                    v-model="jobPosting.required_skills"
                    :value="skill"
                    type="checkbox"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ skill }}</span>
                </label>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Minimum Experience</label>
                <select v-model="jobPosting.min_experience" class="input-field">
                  <option value="">Select years</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>
              
              <div>
                <label class="form-label">Physical Requirements</label>
                <select v-model="jobPosting.physical_requirements" class="input-field">
                  <option value="">Select requirements</option>
                  <option value="none">None</option>
                  <option value="moderate">Moderate (lifting up to 25kg)</option>
                  <option value="heavy">Heavy (lifting up to 50kg)</option>
                  <option value="very-heavy">Very Heavy (lifting 50kg+)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Compensation & Benefits -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Compensation & Benefits</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Compensation Type</label>
              <select v-model="jobPosting.compensation_type" class="input-field" required>
                <option value="">Select type</option>
                <option value="fixed-rate">Fixed Rate (per day/trip)</option>
                <option value="hourly">Hourly Rate</option>
                <option value="percentage">Percentage of Trip Revenue</option>
                <option value="salary">Salary</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Compensation Amount</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input v-model="jobPosting.compensation_amount" type="number" class="input-field pl-8" placeholder="200" required />
              </div>
            </div>
            
            <div>
              <label class="form-label">Additional Benefits</label>
              <div class="space-y-2">
                <label v-for="benefit in availableBenefits" :key="benefit" class="flex items-center">
                  <input
                    v-model="jobPosting.benefits"
                    :value="benefit"
                    type="checkbox"
                    class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 text-sm text-gray-700">{{ benefit }}</span>
                </label>
              </div>
            </div>
            
            <div>
              <label class="form-label">Accommodation Provided</label>
              <select v-model="jobPosting.accommodation" class="input-field">
                <option value="">Select option</option>
                <option value="none">None</option>
                <option value="shared">Shared accommodation</option>
                <option value="private">Private accommodation</option>
                <option value="allowance">Accommodation allowance</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Boat Information -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Boat Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Boat Name</label>
              <input v-model="jobPosting.boat_name" type="text" class="input-field" placeholder="e.g., Sea Adventure" />
            </div>
            
            <div>
              <label class="form-label">Boat Type</label>
              <select v-model="jobPosting.boat_type" class="input-field">
                <option value="">Select type</option>
                <option value="fishing-charter">Fishing Charter</option>
                <option value="sport-fishing">Sport Fishing</option>
                <option value="luxury-charter">Luxury Charter</option>
                <option value="commercial-fishing">Commercial Fishing</option>
                <option value="sailing-yacht">Sailing Yacht</option>
                <option value="motor-yacht">Motor Yacht</option>
              </select>
            </div>
            
            <div>
              <label class="form-label">Boat Length</label>
              <input v-model="jobPosting.boat_length" type="text" class="input-field" placeholder="e.g., 40 feet" />
            </div>
            
            <div>
              <label class="form-label">Passenger Capacity</label>
              <input v-model="jobPosting.passenger_capacity" type="number" class="input-field" placeholder="e.g., 12" />
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">Boat Photos</label>
              <div class="mt-1 flex items-center space-x-4">
                <div class="w-32 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <button type="button" @click="uploadBoatPhotos" class="btn-outline text-sm">Upload Photos</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Process -->
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Application Process</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">Application Deadline</label>
              <input v-model="jobPosting.application_deadline" type="date" class="input-field" />
            </div>
            
            <div>
              <label class="form-label">Start Date Flexibility</label>
              <select v-model="jobPosting.start_date_flexibility" class="input-field">
                <option value="">Select flexibility</option>
                <option value="fixed">Fixed start date</option>
                <option value="flexible">Flexible start date</option>
                <option value="immediate">Immediate start</option>
                <option value="negotiable">Negotiable</option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label class="form-label">Additional Application Requirements</label>
              <textarea v-model="jobPosting.additional_requirements" rows="3" class="input-field" placeholder="Any additional requirements, interview process, or special instructions..."></textarea>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4">
          <button type="button" @click="saveDraft" class="btn-outline">
            Save Draft
          </button>
          <button type="submit" :disabled="saving" class="btn-primary">
            {{ saving ? 'Publishing...' : 'Publish Job Posting' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

interface RequiredCertification {
  name: string
}

interface JobPosting {
  title: string
  position_type: string
  employment_type: string
  start_date: string
  description: string
  location: string
  trip_duration: string
  work_schedule: string
  hours_per_week: string
  required_certifications: RequiredCertification[]
  required_skills: string[]
  min_experience: string
  physical_requirements: string
  compensation_type: string
  compensation_amount: string
  benefits: string[]
  accommodation: string
  boat_name: string
  boat_type: string
  boat_length: string
  passenger_capacity: string
  application_deadline: string
  start_date_flexibility: string
  additional_requirements: string
}

const saving = ref(false)

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

const availableBenefits = [
  'Meals provided',
  'Transportation allowance',
  'Health insurance',
  'Paid time off',
  'Performance bonuses',
  'Training opportunities',
  'Equipment provided',
  'Uniform provided'
]

const jobPosting = reactive<JobPosting>({
  title: '',
  position_type: '',
  employment_type: '',
  start_date: '',
  description: '',
  location: '',
  trip_duration: '',
  work_schedule: '',
  hours_per_week: '',
  required_certifications: [],
  required_skills: [],
  min_experience: '',
  physical_requirements: '',
  compensation_type: '',
  compensation_amount: '',
  benefits: [],
  accommodation: '',
  boat_name: '',
  boat_type: '',
  boat_length: '',
  passenger_capacity: '',
  application_deadline: '',
  start_date_flexibility: '',
  additional_requirements: ''
})

const addCertification = () => {
  jobPosting.required_certifications.push({ name: '' })
}

const removeCertification = (index: number) => {
  jobPosting.required_certifications.splice(index, 1)
}

const uploadBoatPhotos = () => {
  // TODO: Implement file upload
  console.log('Upload boat photos')
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

const saveJobPosting = async () => {
  saving.value = true
  try {
    // TODO: Save job posting to backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Job posting saved:', jobPosting)
  } catch (error) {
    console.error('Error saving job posting:', error)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  // TODO: Load existing job posting data if editing
  console.log('Job posting form mounted')
})
</script>
