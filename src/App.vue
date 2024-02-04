<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      location="start"
      elevation="4"
      style="margin-top: 64px"
      temporary
    >
      <!-- Contenido del menú -->
      <v-list>
        <v-list-item @click="MostrarPagina('Capacitaciones')">
          <v-list-item-title>Capacitaciones</v-list-item-title>
        </v-list-item>
        <v-list-item @click="MostrarPagina('ListarContactos')">
          <v-list-item-title>Listar contactos</v-list-item-title>
        </v-list-item>
        <v-list-item @click="MostrarPagina('AgregarCapacitaciones')">
          <v-list-item-title>Gestionar Capacitaciones</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Event-Component</v-toolbar-title>
      <!-- Botón para dispositivos móviles -->
    </v-app-bar>

    <v-main>
      <PruebaComponente v-if="false"></PruebaComponente>
      <!-- Componente solo para fines de pruebas -->

      <v-container
        style="width: 70%"
        class="d-flex flex-column justify-start mt-4"
        v-if="false"
      >
        <v-btn-toggle
          v-model="cPaginaPresentar"
          rounded="5"
          color="grey lighten-8"
          group
          @click="MostrarPagina()"
        >
          <v-btn value="Capacitaciones" style="text-transform: none">
            Capacitaciones
          </v-btn>
          <v-btn value="ListarContactos" style="text-transform: none">
            Listar contactos
          </v-btn>
          <v-btn value="AgregarCapacitaciones" style="text-transform: none">
            Gestionar Capacitaciones
          </v-btn>
        </v-btn-toggle>
      </v-container>

      <v-container class="d-flex justify-center contenedor">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PruebaComponente from "./components/PruebaComponente.vue";
export default {
  name: "Principal", // Nombre del componente

  // Datos del componente
  data() {
    return {
      // Datos reactivos
      cPaginaPresentar: "Capacitaciones",
      date: new Date().toISOString().substr(0, 10),
      drawer: false,
      nWidth: 0,
      bMostrarAppBAR: true,
    };
  },

  // Propiedades (props) que el componente puede recibir
  props: {
    // Definición de props
  },

  created() {
    this.nWidth = window.innerWidth;
    if (this.nWidth < 400) {
      this.bMostrarAppBAR = true;
    }
  },

  // Métodos del componente
  methods: {
    // Definición de métodos
    MostrarPagina(cValorMenu) {
      switch (cValorMenu) {
        case "Capacitaciones":
          this.$router.push({ name: "home" });
          this.drawer = false;
          break;
        case "ListarContactos":
          this.$router.push({ name: "listar-contactos" });
          this.drawer = false;
          break;
        case "AgregarCapacitaciones":
          this.$router.push({ name: "agregar-capacitacion" }); // Asume que existe una ruta con este nombre
          this.drawer = false;
          break;
        default:
          // Opcional: Manejar un caso por defecto si ninguna opción coincide
          console.log("Opción no reconocida");
          break;
      }
    },
  },

  // Propiedades computadas
  computed: {
    // Definición de propiedades computadas
  },

  // Observadores (watchers)
  watch: {
    // Definición de observadores
  },

  // Ciclos de vida del componente
  mounted() {
    // Código para cuando el componente se monta
    this.$router.push({ name: "home" });
  },

  // Directivas personalizadas (opcional)
  directives: {
    // Definición de directivas personalizadas
  },

  // Componentes hijos (opcional)
  components: {
    PruebaComponente,
  },
};
</script>

<style scoped>
.contenedor {
  width: 80%;
  display: flex;
  justify-content: center;
  /* Centrar horizontalmente */
  /*align-items: center;
  /* Centrar verticalmente si es necesario */
}

/* Media query para pantallas con ancho superior a 1400px */
@media (min-width: 1400px) {
  .contenedor {
    width: 70%;
  }
}

/* Media query para pantallas de hasta 360px de ancho */
@media (max-width: 400px) {
  .contenedor {
    /* Aquí puedes ajustar los estilos para pantallas pequeñas */
    width: 98%;
    /* Ejemplo: usar el ancho completo de la pantalla */
    height: 100%;
    /* Otros estilos específicos para pantallas pequeñas */
  }

  /* Agrega aquí más estilos específicos para elementos en pantallas pequeñas */
}
</style>
