import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/index.vue';
import EditarCapacitacion from '@/pages/EditarCapacitacion.vue';
import DetalleCapacitacion from '@/pages/DetalleCapacitacion.vue';
import ListarContactos from '@/pages/ListarContactos.vue';
import AgregarCapacitacion from '@/pages/AgregarCapacitacion.vue';
import ListarCapacitaciones from '@/pages/ListadoCapacitaciones.vue';

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
    path: '/agregar-capacitacion',
    name: 'agregar-capacitacion',
    component: AgregarCapacitacion
  },    
  {
    path: '/listar-capacitaciones',
    name: 'listar-capacitaciones',
    component: ListarCapacitaciones
  },      
  {
    path: '/detalle-capacitacion',
    name: 'detalle-capacitacion',
    component: DetalleCapacitacion
  },
  {
    path: '/listar-contactos',
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
  scrollBehavior(to, from, savedPosition) {
    // Siempre desplazar a la parte superior cuando se navega a una nueva ruta
    return { top: 0 };
  }  
});

export default router;
