import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'

// API base configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API service class
export class ApiService {
  // Auth endpoints
  static async register(userData: any) {
    return api.post('/register', userData)
  }

  static async login(credentials: { email: string; password: string }) {
    return api.post('/login', credentials)
  }

  static async logout() {
    return api.post('/logout')
  }

  static async updateProfile(profileData: any) {
    return api.put('/user/profile', profileData)
  }

  static async getUser() {
    return api.get('/user')
  }

  // Charter endpoints
  static async getCharters(params?: any) {
    return api.get('/charters', { params })
  }

  static async getCharter(id: number) {
    return api.get(`/charters/${id}`)
  }

  static async createCharter(charterData: any) {
    return api.post('/charters', charterData)
  }

  static async updateCharter(id: number, charterData: any) {
    return api.put(`/charters/${id}`, charterData)
  }

  static async deleteCharter(id: number) {
    return api.delete(`/charters/${id}`)
  }

  static async searchCharters(params: any) {
    return api.get('/charters/search', { params })
  }

  static async getMyCharters() {
    return api.get('/my-charters')
  }

  // Booking endpoints
  static async createBooking(bookingData: any) {
    return api.post('/bookings', bookingData)
  }

  static async getMyBookings() {
    return api.get('/my-bookings')
  }

  static async cancelBooking(id: number) {
    return api.put(`/bookings/${id}/cancel`)
  }

  static async getOperatorBookings() {
    return api.get('/operator/bookings')
  }

  static async confirmBooking(id: number) {
    return api.put(`/bookings/${id}/confirm`)
  }

  static async completeBooking(id: number) {
    return api.put(`/bookings/${id}/complete`)
  }

  // Crew endpoints
  static async getCrewPosts(params?: any) {
    return api.get('/crew-posts', { params })
  }

  static async getCrewPost(id: number) {
    return api.get(`/crew-posts/${id}`)
  }

  static async createCrewPost(crewPostData: any) {
    return api.post('/crew-posts', crewPostData)
  }

  static async updateCrewPost(id: number, crewPostData: any) {
    return api.put(`/crew-posts/${id}`, crewPostData)
  }

  static async deleteCrewPost(id: number) {
    return api.delete(`/crew-posts/${id}`)
  }

  static async searchCrewPosts(params: any) {
    return api.get('/crew-posts/search', { params })
  }

  static async getMyCrewPosts() {
    return api.get('/my-crew-posts')
  }

  // Crew application endpoints
  static async applyForCrew(applicationData: any) {
    return api.post('/crew-applications', applicationData)
  }

  static async getMyApplications() {
    return api.get('/my-applications')
  }

  static async withdrawApplication(id: number) {
    return api.put(`/crew-applications/${id}/withdraw`)
  }

  static async getCrewPostApplications(crewPostId: number) {
    return api.get(`/crew-posts/${crewPostId}/applications`)
  }

  static async reviewApplication(id: number, reviewData: any) {
    return api.put(`/crew-applications/${id}/review`, reviewData)
  }

  static async acceptApplication(id: number) {
    return api.put(`/crew-applications/${id}/accept`)
  }

  static async rejectApplication(id: number, rejectionData: any) {
    return api.put(`/crew-applications/${id}/reject`, rejectionData)
  }

  // Message endpoints
  static async getMessages() {
    return api.get('/messages')
  }

  static async getConversation(userId: number) {
    return api.get(`/messages/${userId}`)
  }

  static async sendMessage(messageData: any) {
    return api.post('/messages', messageData)
  }

  static async markMessageAsRead(id: number) {
    return api.put(`/messages/${id}/read`)
  }

  // Review endpoints
  static async createReview(reviewData: any) {
    return api.post('/reviews', reviewData)
  }

  static async getMyReviews() {
    return api.get('/my-reviews')
  }

  static async updateReview(id: number, reviewData: any) {
    return api.put(`/reviews/${id}`, reviewData)
  }

  static async deleteReview(id: number) {
    return api.delete(`/reviews/${id}`)
  }

  // Payment endpoints
  static async createPaymentIntent(paymentData: any) {
    return api.post('/payments/create-intent', paymentData)
  }

  static async confirmPayment(paymentData: any) {
    return api.post('/payments/confirm', paymentData)
  }

  // Admin endpoints
  static async getAdminUsers() {
    return api.get('/admin/users')
  }

  static async getAdminCharters() {
    return api.get('/admin/charters')
  }

  static async getAdminBookings() {
    return api.get('/admin/bookings')
  }

  static async getAdminCrewPosts() {
    return api.get('/admin/crew-posts')
  }

  static async getAdminReviews() {
    return api.get('/admin/reviews')
  }

  static async verifyUser(id: number) {
    return api.put(`/admin/users/${id}/verify`)
  }

  static async toggleCharterFeature(id: number) {
    return api.put(`/admin/charters/${id}/feature`)
  }
}

export default api
