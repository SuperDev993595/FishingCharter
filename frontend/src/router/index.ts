import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/charters',
      name: 'charters',
      component: () => import('@/views/charters/ChartersView.vue')
    },
    {
      path: '/charters/:id',
      name: 'charter-detail',
      component: () => import('@/views/charters/CharterDetailView.vue')
    },
    {
      path: '/crew',
      name: 'crew',
      component: () => import('@/views/crew/CrewView.vue')
    },
    {
      path: '/crew/:id',
      name: 'crew-detail',
      component: () => import('@/views/crew/CrewProfileView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/bookings',
      name: 'bookings',
      component: () => import('@/views/bookings/BookingsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/my-charters',
      name: 'my-charters',
      component: () => import('@/views/charters/MyChartersView.vue'),
      meta: { requiresAuth: true, requiresOperator: true }
    },
    {
      path: '/my-applications',
      name: 'my-applications',
      component: () => import('@/views/crew/MyApplicationsView.vue'),
      meta: { requiresAuth: true, requiresCrew: true }
    },
    {
      path: '/crew-applications',
      name: 'crew-applications',
      component: () => import('@/views/crew/CrewApplicationsView.vue'),
      meta: { requiresAuth: true, requiresOperator: true }
    },
    {
      path: '/post-job',
      name: 'post-job',
      component: () => import('@/views/crew/PostJobView.vue'),
      meta: { requiresAuth: true, requiresOperator: true }
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('@/views/crew/CreateProfileView.vue'),
      meta: { requiresAuth: true, requiresCrew: true }
    },
    {
      path: '/messages',
      name: 'messages',
      component: () => import('@/views/messages/MessagesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Check if route requires operator role
  if (to.meta.requiresOperator && !authStore.isOperator) {
    next('/dashboard')
    return
  }
  
  // Check if route requires crew role
  if (to.meta.requiresCrew && !authStore.isCrew) {
    next('/dashboard')
    return
  }
  
  // Check if route requires admin role
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/dashboard')
    return
  }
  
  // Check if route is for guests only (login/register)
  if (to.meta.guest && authStore.isAuthenticated) {
    next('/dashboard')
    return
  }
  
  next()
})

export default router
