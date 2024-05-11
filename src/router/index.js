import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import ProductEdit from '@/views/Products/ProductEdit.vue'
import ProductNew from '@/views/Products/ProductNew.vue'
import Products from '@/views/Products/Products.vue'

import UserLogin from '@/views/Users/UserLogin.vue'
import UserNew from '@/views/Users/UserNew.vue'

const routes = [
  {path: '/user/register', name: 'registerUser',component: UserNew},
  {path: '/', name: 'login',component: UserLogin},

  {path: '/product/create', name: 'createProduct',component: ProductNew},
  {path: '/product/edit/:id', name: 'editProduct',component: ProductEdit},
  {path: '/products', name: 'products',component: Products}

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
