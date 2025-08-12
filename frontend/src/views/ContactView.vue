<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Contact Us
        </h1>
        <p class="text-xl text-gray-600">
          Get in touch with our team for support or inquiries
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Form -->
        <div class="card">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="name" class="form-label">Full Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="input-field"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="input-field"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label for="subject" class="form-label">Subject</label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="input-field"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="partnership">Partnership</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="form-label">Message</label>
              <textarea
                id="message"
                v-model="form.message"
                rows="6"
                required
                class="input-field"
                placeholder="Enter your message"
              ></textarea>
            </div>
            
            <button
              type="submit"
              :disabled="loading"
              class="btn-primary w-full"
            >
              {{ loading ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <div class="card">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-gray-900">Address</h3>
                  <p class="text-gray-600">
                    Sydney, NSW, Australia<br>
                    (Virtual office - we're online!)
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-gray-900">Email</h3>
                  <p class="text-gray-600">
                    <a href="mailto:support@fishcharter.com" class="text-ocean-600 hover:text-ocean-500">
                      support@fishcharter.com
                    </a>
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <svg class="w-6 h-6 text-ocean-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-gray-900">Phone</h3>
                  <p class="text-gray-600">
                    <a href="tel:+61400000000" class="text-ocean-600 hover:text-ocean-500">
                      +61 400 000 000
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Monday - Friday</span>
                <span class="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Saturday</span>
                <span class="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Sunday</span>
                <span class="font-medium">Closed</span>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-4">
              * All times are in Australian Eastern Time (AET)
            </p>
          </div>

          <div class="card">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Follow Us</h2>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-ocean-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-ocean-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-ocean-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const handleSubmit = async () => {
  loading.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Here you would typically send the form data to your backend
  console.log('Form submitted:', form)
  
  // Reset form
  form.name = ''
  form.email = ''
  form.subject = ''
  form.message = ''
  
  loading.value = false
  
  // Show success message (you could use a toast notification here)
  alert('Thank you for your message! We\'ll get back to you soon.')
}
</script>
