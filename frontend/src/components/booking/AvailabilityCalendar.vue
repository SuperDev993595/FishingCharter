<template>
  <div class="availability-calendar">
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Select Available Date</h3>
        <div class="flex items-center space-x-2">
          <button @click="previousMonth" class="p-2 hover:bg-gray-100 rounded-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="text-lg font-medium text-gray-900">{{ currentMonthYear }}</span>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 rounded-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-1">
      <!-- Day Headers -->
      <div v-for="day in dayHeaders" :key="day" class="p-2 text-center text-sm font-medium text-gray-500">
        {{ day }}
      </div>

      <!-- Calendar Days -->
      <div
        v-for="day in calendarDays"
        :key="day.date"
        @click="selectDate(day)"
        class="p-2 text-center cursor-pointer border border-gray-200 hover:border-primary-300 transition-colors"
        :class="getDayClasses(day)"
      >
        <div class="text-sm" :class="getDayTextClasses(day)">
          {{ day.dayNumber }}
        </div>
        <div v-if="day.availability" class="text-xs mt-1">
          <span v-if="day.availability === 'available'" class="text-green-600">Available</span>
          <span v-else-if="day.availability === 'limited'" class="text-yellow-600">Limited</span>
          <span v-else-if="day.availability === 'unavailable'" class="text-red-600">Full</span>
        </div>
        <div v-if="day.price" class="text-xs text-gray-500 mt-1">
          ${{ day.price }}
        </div>
      </div>
    </div>

    <!-- Availability Legend -->
    <div class="mt-4 flex items-center justify-center space-x-6 text-sm">
      <div class="flex items-center">
        <div class="w-3 h-3 bg-green-100 border border-green-300 rounded mr-2"></div>
        <span class="text-gray-600">Available</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded mr-2"></div>
        <span class="text-gray-600">Limited</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-red-100 border border-red-300 rounded mr-2"></div>
        <span class="text-gray-600">Unavailable</span>
      </div>
      <div class="flex items-center">
        <div class="w-3 h-3 bg-gray-100 border border-gray-300 rounded mr-2"></div>
        <span class="text-gray-600">Past Date</span>
      </div>
    </div>

    <!-- Selected Date Info -->
    <div v-if="selectedDate" class="mt-6 p-4 bg-primary-50 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-2">Selected Date: {{ formatSelectedDate }}</h4>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-gray-600">Availability:</span>
          <span class="ml-2 font-medium" :class="getAvailabilityColor(selectedDate.availability)">
            {{ getAvailabilityText(selectedDate.availability) }}
          </span>
        </div>
        <div>
          <span class="text-gray-600">Price:</span>
          <span class="ml-2 font-medium">${{ selectedDate.price || charter.price_per_person }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  charterId: number
  selectedDate?: string
}>()

const emit = defineEmits<{
  dateSelected: [date: string]
}>()

const currentDate = ref(new Date())
const selectedDate = ref(null)

const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const charter = ref({
  id: 1,
  price_per_person: 150
})

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
})

const formatSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  return new Date(selectedDate.value.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const dayNumber = date.getDate()
    const isCurrentMonth = date.getMonth() === month
    const isPast = date < today
    const isToday = date.getTime() === today.getTime()

    // Mock availability data - in real app, this would come from API
    let availability = null
    let price = null

    if (isCurrentMonth && !isPast) {
      const random = Math.random()
      if (random > 0.7) {
        availability = 'available'
        price = charter.value.price_per_person
      } else if (random > 0.4) {
        availability = 'limited'
        price = charter.value.price_per_person + 20
      } else {
        availability = 'unavailable'
      }
    }

    days.push({
      date: date.toISOString().split('T')[0],
      dayNumber,
      isCurrentMonth,
      isPast,
      isToday,
      availability,
      price
    })
  }

  return days
})

const getDayClasses = (day) => {
  const classes = ['min-h-[60px] flex flex-col justify-center']
  
  if (!day.isCurrentMonth) {
    classes.push('bg-gray-50 text-gray-400')
  } else if (day.isPast) {
    classes.push('bg-gray-100 text-gray-400')
  } else if (day.isToday) {
    classes.push('bg-primary-100 border-primary-400')
  } else if (day.availability === 'available') {
    classes.push('bg-green-50 hover:bg-green-100')
  } else if (day.availability === 'limited') {
    classes.push('bg-yellow-50 hover:bg-yellow-100')
  } else if (day.availability === 'unavailable') {
    classes.push('bg-red-50 text-gray-400')
  } else {
    classes.push('bg-white hover:bg-gray-50')
  }

  if (selectedDate.value && selectedDate.value.date === day.date) {
    classes.push('ring-2 ring-primary-500')
  }

  return classes.join(' ')
}

const getDayTextClasses = (day) => {
  if (day.isToday) {
    return 'font-bold text-primary-700'
  }
  if (day.availability === 'unavailable') {
    return 'text-gray-400'
  }
  return 'text-gray-900'
}

const getAvailabilityColor = (availability) => {
  switch (availability) {
    case 'available': return 'text-green-600'
    case 'limited': return 'text-yellow-600'
    case 'unavailable': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const getAvailabilityText = (availability) => {
  switch (availability) {
    case 'available': return 'Available'
    case 'limited': return 'Limited Availability'
    case 'unavailable': return 'Fully Booked'
    default: return 'Not Available'
  }
}

const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (day) => {
  if (!day.isCurrentMonth || day.isPast || day.availability === 'unavailable') {
    return
  }

  selectedDate.value = day
  emit('dateSelected', day.date)
}

onMounted(() => {
  // TODO: Fetch availability data from API
  console.log('Availability calendar mounted for charter:', props.charterId)
})
</script>
