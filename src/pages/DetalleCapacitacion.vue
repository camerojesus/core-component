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
    <v-row class="mb-3 filaImagen">
      <v-img :src="oCapacitacion.cImagen" class="imagenCapacitacion" max-width="850" style="border-radius:8px 8px 8px 8px"></v-img>
    </v-row>    
    <v-row class="dflex flex-column justify-start pl-8">
       <div v-html="oCapacitacion.concap" style="width:100%;">
       </div>
    </v-row>
    <contacto-cliente :numcapcon="oCapacitacion.numcap" class="mt-4">
    </contacto-cliente>
  </v-container>
</template>

<script>
import { useMessageStore } from '../stores/store.js'
import ContactoCliente from "../components/ContactoCliente.vue";
import oGescel from "../services/gescel.js";

export default {
  name: "DetalleCapacitacion",
  components: {
    ContactoCliente: "contacto-cliente"
  },
  created() {},
  data() {
    return {
      oCapacitacion: {"titcap":"","concap":"","fecini":"","fecfin":"","horini":"","horfin":"","cImagen":""},
      aListaCapacitaciones: [],
      bTieneAcademias: false,
    };
  },
  props: {},
  methods: {
      bValidarDatos() {
        if(this.nomcon=="" || this.apecon=="" || this.telcon=="" || this.emacon=="" || this.comcon=="" || this.paicon=="" || this.empcon=="") {
          
          return false;
        }
      }
  },
async  mounted() {
    const storedState = localStorage.getItem('capacitacionState');    
    if (storedState) {
        this.oCapacitacion = JSON.parse(storedState);
      } else {
        // Manejar el caso en que no hay datos en localStorage
        // Por ejemplo, cargar datos desde una API o redirigir
      }    

    if(this.oCapacitacion.numcap!='')   {
      this.aListaCapacitaciones = await oGescel.obtenerCursosCapacitacion(this.oCapacitacion.numcap)
      this.aListaCapacitaciones = this.aListaCapacitaciones.map(item => item.nomcur);
      this.bTieneAcademias = true;
    }

  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
.filaImagen{
  display:flex;
  justify-content:center;
  align-items:center;  
}
</style>
