import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Signin from '../views/Signin.vue'
import Signup from '../views/Signup.vue'

import Dashboard from '../views/user/Dashboard.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'
import Perfil from '../views/user/Perfil'
import ListUser from '../views/admin/ListUser.vue'

import VerCampos from '../views/user/campos/VerCampos.vue'
import CrearCampo from '../views/user/campos/CrearCampo.vue'
import EditarCampo from '../views/user/campos/EditarCampo.vue'

import TodosCultivos from '../views/user/cultivos/TodosCultivos.vue'
import VerCultivos from '../views/user/cultivos/VerCultivos.vue'
import CrearCultivo from '../views/user/cultivos/CrearCultivo.vue'
import EditarCultivo from '../views/user/cultivos/EditarCultivo.vue'

import RegistroProducto from '../views/user/cultivos/RegistroProducto.vue'
import CrearRegistroProducto from '../views/user/cultivos/CrearRegistroProducto.vue'
import EditarRegistroProducto from '../views/user/cultivos/EditarRegistroProducto.vue'

import ProductoCultivo from '../views/user/productos/ProductoCultivo.vue'
import CrearProductoCultivo from '../views/user/productos/CrearProductoCultivo.vue'
import EditarProductoCultivo from '../views/user/productos/EditarProductoCultivo.vue'

import VerProductos from '../views/user/productos/VerProductos.vue'

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
    
  {
    path: '/user/perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/admin/users',
    name: 'ListUser',
    component: ListUser
  },
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
    path: '/user/cultivos',
    name: 'TodosCultivos',
    component: TodosCultivos
  },
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
    //  PRODUCTOS DE CULTIVO //
  {
    path: '/user/:campoId/cultivos/:cultivoId/registroproductos',
    name: 'RegistroProducto',
    component: RegistroProducto
  },
  {
    path: '/user/:campoId/cultivos/:cultivoId/registroproductos/crearregistro',
    name: 'CrearRegistroProducto',
    component: CrearRegistroProducto
  },
  {
    path: '/user/:campoId/cultivos/:cultivoId/registroproductos/:productoId/editarregistro',
    name: 'EditarProductosCultivo',
    component: EditarRegistroProducto
  },
    //  TODOS LOS PRODUCTOS  //
  {
    path: '/user/productos',
    name: 'VerProductos',
    component: VerProductos
  }/*,
  {
    path: '/user/productos/crearProducto',
    name: 'CrearProducto',
    component: CrearProducto
  },
  {
    path: '/user/productos/:productoId/editarProducto',
    name: 'EditarProducto',
    component: EditarProducto
  }*/,
  {
    path: '/user/:campoId/cultivos/:cultivoId/productos',
    name: 'ProductoCultivo',
    component: ProductoCultivo
  },
  {
    path: '/user/:campoId/cultivos/:cultivoId/productos/crearproducto',
    name: 'CrearProductoCultivo',
    component: CrearProductoCultivo
  },
  {
    path: '/user/:campoId/cultivos/:cultivoId/productos/:productoId/editarproducto',
    name: 'EditarProductoCultivo',
    component: EditarProductoCultivo
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
