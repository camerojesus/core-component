import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';
import EditarCapacitacion from '@/pages/EditarCapacitacion.vue';
import DetalleCapacitacion from '@/pages/DetalleCapacitacion.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/editar-capacitacion',
    name: 'editar-capacitacion',
    component: EditarCapacitacion
  },
  {
    path: '/core-component',
    name: 'core-component',
    component: Home
  },  
  {
    path: '/detalle-capacitacion',
    name: 'detalle-capacitacion',
    component: DetalleCapacitacion
  },
  // Ruta comodín para redirigir a Home si no se encuentra la ruta
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
