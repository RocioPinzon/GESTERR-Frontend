import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'

//import Perfil from '../views/user/Perfil.vue'

import Dashboard from '../views/user/Dashboard.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'

import VerCampos from '../views/user/campos/VerCampos.vue'
import CrearCampo from '../views/user/campos/CrearCampo.vue'
import EditarCampo from '../views/user/campos/EditarCampo.vue'

import VerCultivos from '../views/user/cultivos/VerCultivos.vue'
import CrearCultivo from '../views/user/cultivos/CrearCultivo.vue'
import EditarCultivo from '../views/user/cultivos/EditarCultivo.vue'

import VerProductos from '../views/user/productos/VerProductos.vue'
import CrearProducto from '../views/user/productos/CrearProducto.vue'
import EditarProducto from '../views/user/productos/EditarProducto.vue'

import ErrorPage from '../views/ErrorPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
    //  LOGIN Y REGISTRO  //
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
    //  DASHBOARD  //
  {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/admin/dashboardAdmin',
    name: 'DashboardAdmin',
    component: DashboardAdmin
  },
    //  PERFIL  // 
    /*
  {
    path: '/user/perfil',
    name: 'Perfil',
    component: Perfil
  },*/
      //  CAMPOS  //
  {
    path: '/user/campos',
    name: 'VerCampos',
    component: VerCampos
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
    //  CULTIVOS  //
  {
    path: '/user/:campoId/cultivos',
    name: 'VerCultivos',
    component: VerCultivos
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
    //  PRODUCTOS  //
  {
    path: '/user/productos',
    name: 'VerProductos',
    component: VerProductos
  },
  {
    path: '/user/productos/crearProducto',
    name: 'CrearProducto',
    component: CrearProducto
  },
  {
    path: '/user/productos/:productoId/editarProducto',
    name: 'EditarProducto',
    component: EditarProducto
  },
  {
    path: '/:catchAll(.*)',
    name: 'ErrorPage',
    component: ErrorPage
 }/*
 ,
  {
    path: '/:pathMatch(.*)*',
    name: 'ErrorPage',
    component: ErrorPage
 }**/
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
