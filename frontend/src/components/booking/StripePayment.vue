<template>
  <div class="stripe-payment">
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
      <p class="text-sm text-gray-600">Your payment information is secure and encrypted</p>
    </div>

    <!-- Payment Method Selection -->
    <div class="mb-6">
      <label class="form-label">Payment Method</label>
      <div class="space-y-3">
        <div class="flex items-center">
          <input
            id="payment-card"
            v-model="paymentMethod"
            value="card"
            type="radio"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label for="payment-card" class="ml-3 flex items-center">
            <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
            </svg>
            <div>
              <div class="font-medium text-gray-900">Credit or Debit Card</div>
              <div class="text-sm text-gray-500">Visa, Mastercard, American Express</div>
            </div>
          </label>
        </div>
        
        <div class="flex items-center">
          <input
            id="payment-apple"
            v-model="paymentMethod"
            value="apple"
            type="radio"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label for="payment-apple" class="ml-3 flex items-center">
            <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div>
              <div class="font-medium text-gray-900">Apple Pay</div>
              <div class="text-sm text-gray-500">Pay with Apple Pay</div>
            </div>
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="payment-google"
            v-model="paymentMethod"
            value="google"
            type="radio"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <label for="payment-google" class="ml-3 flex items-center">
            <svg class="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div>
              <div class="font-medium text-gray-900">Google Pay</div>
              <div class="text-sm text-gray-500">Pay with Google Pay</div>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Card Payment Form -->
    <div v-if="paymentMethod === 'card'" class="space-y-4">
      <div>
        <label class="form-label">Card Number</label>
        <div id="card-number" class="input-field"></div>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="form-label">Expiry Date</label>
          <div id="card-expiry" class="input-field"></div>
        </div>
        <div>
          <label class="form-label">CVC</label>
          <div id="card-cvc" class="input-field"></div>
        </div>
      </div>

      <div>
        <label class="form-label">Name on Card</label>
        <input v-model="cardholderName" type="text" class="input-field" placeholder="Enter cardholder name" />
      </div>
    </div>

    <!-- Payment Summary -->
    <div class="mt-6 bg-gray-50 p-4 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-3">Payment Summary</h4>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span>Charter Booking</span>
          <span>${{ amount }}</span>
        </div>
        <div class="flex justify-between">
          <span>Processing Fee</span>
          <span>${{ processingFee }}</span>
        </div>
        <div class="border-t pt-2 flex justify-between font-medium">
          <span>Total</span>
          <span>${{ totalAmount }}</span>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
      <div class="flex">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-red-800">{{ error }}</span>
      </div>
    </div>

    <!-- Security Notice -->
    <div class="mt-4 flex items-center text-sm text-gray-600">
      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span>Your payment information is secure and encrypted by Stripe</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  amount: number
  currency?: string
}>()

const emit = defineEmits<{
  paymentSuccess: [paymentIntent: any]
  paymentError: [error: string]
}>()

const paymentMethod = ref('card')
const cardholderName = ref('')
const error = ref('')
const stripe = ref(null)
const elements = ref(null)
const cardNumber = ref(null)
const cardExpiry = ref(null)
const cardCvc = ref(null)

const processingFee = computed(() => {
  return Math.round(props.amount * 0.029 + 30) // 2.9% + 30 cents
})

const totalAmount = computed(() => {
  return props.amount + processingFee.value
})

const initializeStripe = async () => {
  try {
    // Load Stripe.js
    const { loadStripe } = await import('@stripe/stripe-js')
    stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    
    if (!stripe.value) {
      throw new Error('Failed to load Stripe')
    }

    // Create elements
    elements.value = stripe.value.elements({
      clientSecret: await getPaymentIntent()
    })

    // Create card elements
    cardNumber.value = elements.value.create('cardNumber', {
      style: {
        base: {
          fontSize: '16px',
          color: '#374151',
          '::placeholder': {
            color: '#9CA3AF'
          }
        }
      }
    })

    cardExpiry.value = elements.value.create('cardExpiry', {
      style: {
        base: {
          fontSize: '16px',
          color: '#374151',
          '::placeholder': {
            color: '#9CA3AF'
          }
        }
      }
    })

    cardCvc.value = elements.value.create('cardCvc', {
      style: {
        base: {
          fontSize: '16px',
          color: '#374151',
          '::placeholder': {
            color: '#9CA3AF'
          }
        }
      }
    })

    // Mount elements
    cardNumber.value.mount('#card-number')
    cardExpiry.value.mount('#card-expiry')
    cardCvc.value.mount('#card-cvc')

    // Handle validation errors
    cardNumber.value.on('change', handleCardChange)
    cardExpiry.value.on('change', handleCardChange)
    cardCvc.value.on('change', handleCardChange)

  } catch (err) {
    console.error('Stripe initialization error:', err)
    error.value = 'Failed to initialize payment system'
  }
}

const getPaymentIntent = async () => {
  try {
    // TODO: Create payment intent on backend
    const response = await fetch('/api/payments/create-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount.value,
        currency: props.currency || 'usd'
      })
    })

    const data = await response.json()
    return data.client_secret
  } catch (err) {
    console.error('Payment intent error:', err)
    throw new Error('Failed to create payment intent')
  }
}

const handleCardChange = (event) => {
  if (event.error) {
    error.value = event.error.message
  } else {
    error.value = ''
  }
}

const processPayment = async () => {
  if (!stripe.value || !elements.value) {
    error.value = 'Payment system not initialized'
    return
  }

  try {
    const { error: paymentError, paymentIntent } = await stripe.value.confirmPayment({
      elements: elements.value,
      confirmParams: {
        return_url: `${window.location.origin}/booking/confirmation`,
        payment_method_data: {
          billing_details: {
            name: cardholderName.value
          }
        }
      }
    })

    if (paymentError) {
      error.value = paymentError.message
      emit('paymentError', paymentError.message)
    } else {
      emit('paymentSuccess', paymentIntent)
    }
  } catch (err) {
    console.error('Payment error:', err)
    error.value = 'Payment failed. Please try again.'
    emit('paymentError', 'Payment failed')
  }
}

const cleanup = () => {
  if (cardNumber.value) cardNumber.value.destroy()
  if (cardExpiry.value) cardExpiry.value.destroy()
  if (cardCvc.value) cardCvc.value.destroy()
}

onMounted(() => {
  initializeStripe()
})

onUnmounted(() => {
  cleanup()
})

// Expose methods for parent component
defineExpose({
  processPayment
})
</script>
