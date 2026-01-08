import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Auth
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import HomeView from '@/views/HomeView.vue'

// Farmer
import FarmerDashboard from '@/views/farmer/FarmerDashboard.vue'
import AddCrop from '@/views/farmer/AddCrop.vue'
import MyCrops from '@/views/farmer/MyCrops.vue'

// Buyer
import Marketplace from '@/views/buyer/Marketplace.vue'
import CropDetail from '@/views/buyer/CropDetail.vue'
import FarmerInterests from '@/views/farmer/Interests.vue'

const routes = [
  { path: '/', redirect: '/login' },

  { path: '/login', component: LoginView },
  { path: '/signup', component: SignupView },

  {
    path: '/home',
    component: HomeView,
    meta: { requiresAuth: true }
  },

  // Farmer routes
  {
    path: '/farmer',
    component: FarmerDashboard,
    meta: { requiresAuth: true, role: 'Farmer' }
  },
  {
    path: '/farmer/add-crop',
    component: AddCrop,
    meta: { requiresAuth: true, role: 'Farmer' }
  },
  {
    path: '/farmer/my-crops',
    component: MyCrops,
    meta: { requiresAuth: true, role: 'Farmer' }
  },

  // Buyer routes
  {
    path: '/marketplace',
    component: Marketplace,
    meta: { requiresAuth: true, role: 'Buyer' }
  },
  {
    path: '/crop/:id',
    component: CropDetail,
    meta: { requiresAuth: true }
  },
  {
  path: '/crops/:id',
  name: 'crop-detail',
  component: CropDetail
},
{
  path: '/farmer/interests',
  component: FarmerInterests
}

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Global guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login')
  }

  if (to.meta.role && authStore.user?.role !== to.meta.role) {
    return next('/home')
  }

  next()
})

export default router
