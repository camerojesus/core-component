import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';
import EditarCapacitacion from '@/pages/EditarCapacitacion.vue';
import DetalleCapacitacion from '@/pages/DetalleCapacitacion.vue';
import ListarContactos from '@/pages/ListarContactos.vue';
import AgregarCapacitacion from '@/pages/AgregarCapacitacion.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/core-component/editar-capacitacion',
    name: 'editar-capacitacion',
    component: EditarCapacitacion
  },
  {
    path: '/core-component',
    name: 'core-component',
    component: Home
  },  
  {
    path: '/core-component/agregar-capacitacion',
    name: 'agregar-capacitacion',
    component: AgregarCapacitacion
  },    
  {
    path: '/core-component/detalle-capacitacion',
    name: 'detalle-capacitacion',
    component: DetalleCapacitacion
  },
  {
    path: '/core-component/listar-contactos',
    name: 'listar-contactos',
    component: ListarContactos
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
