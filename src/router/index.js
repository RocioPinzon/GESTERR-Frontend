import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'
import Users from '../views/Users.vue'
import Dashboard from '../views/user/Dashboard.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'
import VerCultivos from '../views/user/cultivos/VerCultivos.vue'
import EditarCampo from '../views/user/campos/EditarCampo.vue'
import CrearCampo from '../views/user/campos/CrearCampo.vue'
import CrearCultivo from '../views/user/cultivos/CrearCultivo.vue'
import EditarCultivo from '../views/user/cultivos/EditarCultivo.vue'
import VerProductos from '../views/user/productos/VerProductos.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/user/:campoId/cultivos',
    name: 'VerCultivos',
    component: VerCultivos
  },
  {
    path: '/admin/dashboardAdmin',
    name: 'DashboardAdmin',
    component: DashboardAdmin
  },
  {
    path: '/user/crearCampo',
    name: 'CrearCampo',
    component: CrearCampo
  },
  {
    path: '/user/:campoId/editarCampo',
    name: 'EditarCampo',
    component: EditarCampo
  },
  
  {
    path: '/user/:campoId/cultivos/crearCultivo',
    name: 'CrearCultivo',
    component: CrearCultivo
  },
  {
    path: '/user/:campoId/cultivos/:cultivoId/editarCultivo',
    name: 'EditarCultivo',
    component: EditarCultivo
  },
  {
    path: '/user/:campoId/cultivos/:cultivoId/productos',
    name: 'VerProductos',
    component: VerProductos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
