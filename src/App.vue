<template>
  <v-app>
    <v-app-bar app fixed v-if="false">
      <v-toolbar-title style="margin-left: 200px">Mi Aplicación</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout style="margin-right:300px;">
        <v-btn text>Link Uno</v-btn>
        <v-btn text>Link Dos</v-btn>
        <v-btn text>Link Tres</v-btn>
      </v-layout>
    </v-app-bar>
    <v-main>
     <PruebaComponente v-if="true">
     </PruebaComponente>
      <v-container style="width: 70%" class="d-flex flex-column justify-start mt-4">
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
    };
  },

  // Propiedades (props) que el componente puede recibir
  props: {
    // Definición de props
  },

  // Métodos del componente
  methods: {
    // Definición de métodos
    MostrarPagina() {
      switch (this.cPaginaPresentar) {
        case "Capacitaciones":
          this.$router.push({ name: "home" });
          break;
        case "ListarContactos":
          this.$router.push({ name: "listar-contactos" });
          break;
        case "AgregarCapacitaciones":
          this.$router.push({ name: "agregar-capacitacion" }); // Asume que existe una ruta con este nombre
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
