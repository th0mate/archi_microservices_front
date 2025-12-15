import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/films',
      name: 'movies',
      component: () => import('@/views/MoviesView.vue')
    },
    {
      path: '/film/:id',
      name: 'movie-detail',
      component: () => import('@/views/MovieDetailView.vue')
    },
    {
      path: '/reservation/:id',
      name: 'booking',
      component: () => import('@/views/BookingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/connexion',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/inscription',
      name: 'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path: '/cgu',
      name: 'cgu',
      component: () => import('@/views/CGUView.vue')
    },
    {
      path: '/mentions-legales',
      name: 'mentions-legales',
      component: () => import('@/views/MentionsLegalesView.vue')
    },
    {
      path: '/confidentialite',
      name: 'confidentialite',
      component: () => import('@/views/ConfidentialiteView.vue')
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: () => import('@/views/CookiesView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
