import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ApiService } from '@/services/api'

export interface Charter {
  id: number
  operator_id: number
  name: string
  description: string
  boat_name: string
  boat_type: string
  capacity: number
  location: string
  latitude?: number
  longitude?: number
  price_per_person: number
  price_per_trip?: number
  duration_hours: number
  amenities?: string[]
  fishing_types?: string[]
  target_species?: string[]
  images?: string[]
  license_number?: string
  insurance_info?: string
  is_active: boolean
  is_featured: boolean
  rating: number
  review_count: number
  operator?: {
    id: number
    name: string
    avatar?: string
    location?: string
  }
  created_at: string
  updated_at: string
}

export interface CharterFilters {
  location?: string
  minPrice?: number
  maxPrice?: number
  capacity?: number
  fishingType?: string
  date?: string
  featured?: boolean
}

export const useCharterStore = defineStore('charters', () => {
  // State
  const charters = ref<Charter[]>([])
  const featuredCharters = ref<Charter[]>([])
  const currentCharter = ref<Charter | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<CharterFilters>({})
  const pagination = ref({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0
  })

  // Getters
  const getCharterById = computed(() => {
    return (id: number) => charters.value.find(charter => charter.id === id)
  })

  const filteredCharters = computed(() => {
    let filtered = charters.value

    if (filters.value.location) {
      filtered = filtered.filter(charter => 
        charter.location.toLowerCase().includes(filters.value.location!.toLowerCase())
      )
    }

    if (filters.value.minPrice) {
      filtered = filtered.filter(charter => 
        charter.price_per_person >= filters.value.minPrice!
      )
    }

    if (filters.value.maxPrice) {
      filtered = filtered.filter(charter => 
        charter.price_per_person <= filters.value.maxPrice!
      )
    }

    if (filters.value.capacity) {
      filtered = filtered.filter(charter => 
        charter.capacity >= filters.value.capacity!
      )
    }

    if (filters.value.fishingType) {
      filtered = filtered.filter(charter => 
        charter.fishing_types?.includes(filters.value.fishingType!)
      )
    }

    if (filters.value.featured) {
      filtered = filtered.filter(charter => charter.is_featured)
    }

    return filtered
  })

  // Actions
  const fetchCharters = async (params?: any) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.getCharters(params)
      charters.value = response.data.data || response.data
      
      if (response.data.pagination) {
        pagination.value = response.data.pagination
      }
      
      return charters.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch charters'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchFeaturedCharters = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.getCharters({ featured: true })
      featuredCharters.value = response.data.data || response.data
      return featuredCharters.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch featured charters'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCharter = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.getCharter(id)
      currentCharter.value = response.data
      return currentCharter.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch charter'
      throw err
    } finally {
      loading.value = false
    }
  }

  const searchCharters = async (searchParams: CharterFilters) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.searchCharters(searchParams)
      charters.value = response.data.data || response.data
      
      if (response.data.pagination) {
        pagination.value = response.data.pagination
      }
      
      return charters.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Search failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCharter = async (charterData: Partial<Charter>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.createCharter(charterData)
      const newCharter = response.data
      
      charters.value.unshift(newCharter)
      return newCharter
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create charter'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCharter = async (id: number, charterData: Partial<Charter>) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.updateCharter(id, charterData)
      const updatedCharter = response.data
      
      const index = charters.value.findIndex(charter => charter.id === id)
      if (index !== -1) {
        charters.value[index] = updatedCharter
      }
      
      if (currentCharter.value?.id === id) {
        currentCharter.value = updatedCharter
      }
      
      return updatedCharter
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to update charter'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCharter = async (id: number) => {
    loading.value = true
    error.value = null
    
    try {
      await ApiService.deleteCharter(id)
      
      charters.value = charters.value.filter(charter => charter.id !== id)
      
      if (currentCharter.value?.id === id) {
        currentCharter.value = null
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to delete charter'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchMyCharters = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await ApiService.getMyCharters()
      charters.value = response.data.data || response.data
      return charters.value
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch your charters'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: CharterFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    charters,
    featuredCharters,
    currentCharter,
    loading,
    error,
    filters,
    pagination,
    
    // Getters
    getCharterById,
    filteredCharters,
    
    // Actions
    fetchCharters,
    fetchFeaturedCharters,
    fetchCharter,
    searchCharters,
    createCharter,
    updateCharter,
    deleteCharter,
    fetchMyCharters,
    setFilters,
    clearFilters,
    clearError,
  }
})
