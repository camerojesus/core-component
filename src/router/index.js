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
    path: '/detalle-capacitacion',
    name: 'detalle-capacitacion',
    component: DetalleCapacitacion
  },  

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;