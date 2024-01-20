<template>
  <v-container>
     <v-row>
       <h3>Listado de Contactos</h3>
     </v-row>
     <v-row>
    <!-- Contenedor para seleccionar Fecha - Escritorio -->
        <v-col cols="2">
          <v-btn class="mt-4" style="margin-right:40px;" @click="ApuntarHoy()">
            Hoy
          </v-btn>
        </v-col>
        <v-col cols="8" class="borde d-flex align-center">
          <span style="margin-right:10px;">Desde: </span>
          <input type="date" id="fechaInicial" name="fecha" v-model="cFechaInicial" style="width:120px;">
          <span style="margin-right:10px;  margin-left:20px;">Hasta: </span>
          <input type="date" id="fechaFinal" name="fecha" v-model="cFechaFinal" style="width:120px;">
        </v-col>
        <v-col>
          <v-btn class="mt-4" style="margin-left:40px;" @click="ApuntarRango()">
            Cargar Resultados
          </v-btn>
        </v-col>
    <!-- \Contenedor para seleccionar Fecha - Escritorio -->
        
     </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>