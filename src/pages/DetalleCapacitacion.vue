<template>
  <v-container class="mt-2 d-flex justify-center flex-column" width="90%">
    <v-row class="mb-3">
      <h2>{{oCapacitacion.titcap}}</h2>
    </v-row>
    <v-row class="mb-2">
       <h3>
           {{oCapacitacion.cCadenaFechaHora}}
       </h3>          
    </v-row>
    <!-- Agregar información de la academia en forma de CHIP -->
    <v-row class="d-flex mt-2 mb-2" >
        <div v-for="(palabra, index) in aListaCapacitaciones" :key="index">
        <v-chip color="primary" class="mr-2">
          {{ palabra }}
        </v-chip>
    </div>    
    <!-- \Agregar información de la academia en forma de CHIP -->
    </v-row>    
    <v-row class="mb-3">
      <v-img :src="oCapacitacion.cImagen" style="width:80%; height:auto;"></v-img>
    </v-row>    
    <v-row class="dflex flex-column justify-start pl-8">
       <div v-html="oCapacitacion.concap" style="width:100%;">
       </div>
    </v-row>
  </v-container>
</template>

<script>
import { useMessageStore } from '../stores/store.js'
export default {
  name: "DetalleCapacitacion",
  created() {},
  data() {
    return {
      oCapacitacion: {"titcap":"","concap":"","fecini":"","fecfin":"","horini":"","horfin":"","cImagen":""},
      aListaCapacitaciones: [],
      bTieneAcademias: false
    };
  },
  props: {},
  methods: {},
  mounted() {
    console.log("Cargué capacitacion");
    const storedState = localStorage.getItem('capacitacionState');    
    if (storedState) {
        this.oCapacitacion = JSON.parse(storedState);
      } else {
        // Manejar el caso en que no hay datos en localStorage
        // Por ejemplo, cargar datos desde una API o redirigir
      }    
    if(this.oCapacitacion.acacap!='')   {
      this.aListaCapacitaciones = this.oCapacitacion.acacap.split(',').map(palabra => palabra.trim());      
      this.bTieneAcademias = true;
    }

  },
  created() {
  }
};
</script>

<style lang="scss" scoped></style>