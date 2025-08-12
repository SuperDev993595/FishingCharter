<template>
  <div class="booking-form">
    <!-- Step Indicator -->
    <div class="mb-8">
      <div class="flex items-center justify-center">
        <div v-for="(step, index) in steps" :key="step.id" class="flex items-center">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
            :class="currentStep >= index ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'"
          >
            {{ index + 1 }}
          </div>
          <span class="ml-2 text-sm font-medium" :class="currentStep >= index ? 'text-primary-600' : 'text-gray-500'">
            {{ step.title }}
          </span>
          <div v-if="index < steps.length - 1" class="w-16 h-0.5 mx-4" :class="currentStep > index ? 'bg-primary-600' : 'bg-gray-200'"></div>
        </div>
      </div>
    </div>

    <!-- Step 1: Trip Details -->
    <div v-if="currentStep === 0" class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900">Select Trip Details</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="form-label">Trip Date</label>
          <input
            v-model="bookingData.trip_date"
            type="date"
            required
            class="input-field"
            :min="new Date().toISOString().split('T')[0]"
          />
        </div>
        
        <div>
          <label class="form-label">Departure Time</label>
          <select v-model="bookingData.departure_time" required class="input-field">
            <option value="">Select time</option>
            <option value="06:00">6:00 AM</option>
            <option value="07:00">7:00 AM</option>
            <option value="08:00">8:00 AM</option>
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
          </select>
        </div>
        
        <div>
          <label class="form-label">Number of People</label>
          <select v-model="bookingData.number_of_people" required class="input-field">
            <option value="">Select number</option>
            <option v-for="n in charter.capacity" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
        
        <div>
          <label class="form-label">Trip Duration</label>
          <div class="text-gray-600">{{ charter.duration_hours }} hours</div>
        </div>
      </div>

      <!-- Add-ons -->
      <div>
        <h4 class="text-md font-medium text-gray-900 mb-3">Optional Add-ons</h4>
        <div class="space-y-3">
          <div v-for="addon in availableAddons" :key="addon.id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div class="flex items-center">
              <input
                :id="'addon-' + addon.id"
                v-model="selectedAddons"
                :value="addon.id"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label :for="'addon-' + addon.id" class="ml-3">
                <div class="font-medium text-gray-900">{{ addon.name }}</div>
                <div class="text-sm text-gray-500">{{ addon.description }}</div>
              </label>
            </div>
            <div class="text-right">
              <div class="font-medium text-gray-900">${{ addon.price }}</div>
              <div class="text-sm text-gray-500">per person</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Guest Information -->
    <div v-if="currentStep === 1" class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900">Guest Information</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="form-label">Full Name</label>
          <input v-model="bookingData.guest_name" type="text" required class="input-field" />
        </div>
        
        <div>
          <label class="form-label">Email Address</label>
          <input v-model="bookingData.guest_email" type="email" required class="input-field" />
        </div>
        
        <div>
          <label class="form-label">Phone Number</label>
          <input v-model="bookingData.guest_phone" type="tel" required class="input-field" />
        </div>
        
        <div>
          <label class="form-label">Special Requirements</label>
          <textarea v-model="bookingData.special_requests" rows="3" class="input-field" placeholder="Any dietary restrictions, accessibility needs, etc."></textarea>
        </div>
      </div>
    </div>

    <!-- Step 3: Payment -->
    <div v-if="currentStep === 2" class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900">Payment Information</h3>
      
      <!-- Price Breakdown -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-3">Price Breakdown</h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span>Base price ({{ bookingData.number_of_people }} people)</span>
            <span>${{ basePrice }}</span>
          </div>
          <div v-for="addon in selectedAddonDetails" :key="addon.id" class="flex justify-between text-sm text-gray-600">
            <span>{{ addon.name }} ({{ bookingData.number_of_people }} people)</span>
            <span>${{ addon.totalPrice }}</span>
          </div>
          <div class="border-t pt-2 flex justify-between font-medium">
            <span>Total</span>
            <span>${{ totalPrice }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Method -->
      <div>
        <label class="form-label">Payment Method</label>
        <div class="space-y-3">
          <div class="flex items-center">
            <input
              id="payment-full"
              v-model="bookingData.payment_type"
              value="full"
              type="radio"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label for="payment-full" class="ml-3">
              <div class="font-medium text-gray-900">Pay in Full</div>
              <div class="text-sm text-gray-500">${{ totalPrice }}</div>
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="payment-deposit"
              v-model="bookingData.payment_type"
              value="deposit"
              type="radio"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
            />
            <label for="payment-deposit" class="ml-3">
              <div class="font-medium text-gray-900">Pay Deposit</div>
              <div class="text-sm text-gray-500">${{ depositAmount }} (30% deposit)</div>
            </label>
          </div>
        </div>
      </div>

      <!-- Stripe Payment Element will be inserted here -->
      <div id="card-element" class="input-field"></div>
      <div id="card-errors" class="text-red-600 text-sm mt-1"></div>
    </div>

    <!-- Step 4: Confirmation -->
    <div v-if="currentStep === 3" class="space-y-6">
      <div class="text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-900">Booking Confirmed!</h3>
        <p class="text-gray-600">Your fishing adventure is confirmed. Check your email for details.</p>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-3">Booking Summary</h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Charter:</span>
            <span>{{ charter.name }}</span>
          </div>
          <div class="flex justify-between">
            <span>Date:</span>
            <span>{{ formatDate(bookingData.trip_date) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Time:</span>
            <span>{{ bookingData.departure_time }}</span>
          </div>
          <div class="flex justify-between">
            <span>Guests:</span>
            <span>{{ bookingData.number_of_people }}</span>
          </div>
          <div class="flex justify-between font-medium">
            <span>Total Paid:</span>
            <span>${{ totalPrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between mt-8">
      <button
        v-if="currentStep > 0 && currentStep < 3"
        @click="previousStep"
        class="btn-outline"
      >
        Previous
      </button>
      <div v-else></div>

      <button
        v-if="currentStep < 2"
        @click="nextStep"
        :disabled="!canProceed"
        class="btn-primary"
      >
        Next
      </button>
      <button
        v-else-if="currentStep === 2"
        @click="processPayment"
        :disabled="processing"
        class="btn-primary"
      >
        {{ processing ? 'Processing...' : 'Confirm Booking' }}
      </button>
      <button
        v-else
        @click="finishBooking"
        class="btn-primary"
      >
        View My Bookings
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Step {
  id: string
  title: string
}

interface Charter {
  id: number
  name: string
  capacity: number
  duration_hours: number
  price_per_person: number
}

interface Addon {
  id: number
  name: string
  description: string
  price: number
}

interface BookingData {
  trip_date: string
  departure_time: string
  number_of_people: string
  guest_name: string
  guest_email: string
  guest_phone: string
  special_requests: string
  payment_type: 'full' | 'deposit'
}

const router = useRouter()

const currentStep = ref(0)
const processing = ref(false)
const selectedAddons = ref<number[]>([])

const steps: Step[] = [
  { id: 'details', title: 'Trip Details' },
  { id: 'guests', title: 'Guest Info' },
  { id: 'payment', title: 'Payment' },
  { id: 'confirmation', title: 'Confirmation' }
]

const charter = ref<Charter>({
  id: 1,
  name: 'Great Barrier Reef Adventure',
  capacity: 6,
  duration_hours: 8,
  price_per_person: 150
})

const availableAddons = ref<Addon[]>([
  { id: 1, name: 'Catering', description: 'Lunch and refreshments included', price: 25 },
  { id: 2, name: 'Fishing Equipment', description: 'Premium fishing gear rental', price: 15 },
  { id: 3, name: 'Photography Package', description: 'Professional photos of your catch', price: 30 }
])

const bookingData = reactive<BookingData>({
  trip_date: '',
  departure_time: '',
  number_of_people: '',
  guest_name: '',
  guest_email: '',
  guest_phone: '',
  special_requests: '',
  payment_type: 'full'
})

const basePrice = computed(() => {
  return charter.value.price_per_person * parseInt(bookingData.number_of_people || '0')
})

const selectedAddonDetails = computed(() => {
  return availableAddons.value
    .filter(addon => selectedAddons.value.includes(addon.id))
    .map(addon => ({
      ...addon,
      totalPrice: addon.price * parseInt(bookingData.number_of_people || '0')
    }))
})

const addonTotal = computed(() => {
  return selectedAddonDetails.value.reduce((sum, addon) => sum + addon.totalPrice, 0)
})

const totalPrice = computed(() => {
  return basePrice.value + addonTotal.value
})

const depositAmount = computed(() => {
  return Math.round(totalPrice.value * 0.3)
})

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0:
      return bookingData.trip_date && bookingData.departure_time && bookingData.number_of_people
    case 1:
      return bookingData.guest_name && bookingData.guest_email && bookingData.guest_phone
    default:
      return true
  }
})

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

const processPayment = async () => {
  processing.value = true
  try {
    // TODO: Integrate with Stripe payment processing
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate payment processing
    nextStep()
  } catch (error) {
    console.error('Payment error:', error)
  } finally {
    processing.value = false
  }
}

const finishBooking = () => {
  router.push('/bookings')
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  // TODO: Initialize Stripe payment element
  console.log('Booking form mounted')
})
</script>
