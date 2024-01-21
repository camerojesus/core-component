<template>
  <v-container class="d-flex flex-column justify-center align-center">
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
      <v-col cols="6" class="borde d-flex align-center">
        <span style="margin-right:10px;">Desde: </span>
        <input type="date" id="fechaInicial" name="fecha" v-model="cFechaInicial" style="width:130px;">
        <span style="margin-right:10px;  margin-left:20px;">Hasta: </span>
        <input type="date" id="fechaFinal" name="fecha" v-model="cFechaFinal" style="width:130px;">
      </v-col>
      <v-col cols="4">
        <v-btn class="mt-4" style="margin-left:40px;text-transform:none; font-size:12px;" color="rgb(91,110,225)" @click="cargarContactos(cFechaInicial,cFechaFinal)">
          Cargar Resultados
        </v-btn>
      </v-col>
      <!-- \Contenedor para seleccionar Fecha - Escritorio -->        
    </v-row>
    <v-data-table
      :headers="headers"
      :items="contactos"
      :items-per-page="20"
      class="elevation-1 mt-6"
      color="blue-grey"
      width="100%"
      height="800"
      :elevation="6"
    ></v-data-table>    
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: "Test",
  data() {
    return {
      cServidor: import.meta.env.VITE_API_URL,
      cFechaInicial: "",
      cFechaFinal: "",
      contactos: [],
      headers: [
        { title: 'Capacitación', key: 'titcap', align: 'start', width: 400},
        { title: 'Fecha-Hora', key: 'fechorcon', align: 'end' },
        { title: 'Nombre Usuario', key: 'nomcon', align: 'end' },
        { title: 'Apellido Usuario', key: 'apecon', align: 'end' },
        { title: 'Teléfono', key: 'telcon', align: 'end' },
        { title: 'Email', key: 'emacon', align: 'end' },
        { title: 'País', key: 'paicon', align: 'end' },
        { title: 'Empresa', key: 'empcon', align: 'end' },
        { title: 'Comentarios', key: 'comcon', align: 'end' }
      ]
    };
  },
  methods: {
    async cargarContactos(fechaInicial, fechaFinal) {
      var cURL = this.cServidor + "/cargarcontactos";
      try {
        const response = await axios.get(cURL, {
          params: { fechaInicial, fechaFinal }
        });
        this.contactos = response.data;
      } catch (error) {
        console.error('Error al cargar los contactos:', error);
      }
    },
    ApuntarHoy() {
      var dFecha = new Date();
      this.cFechaInicial = this.cFormatoFecha(dFecha);
      this.cFechaFinal = this.cFormatoFecha(dFecha);
    },
    cFormatoFecha(dFecha) {
      const mes = `${dFecha.getMonth() + 1}`.padStart(2, '0');
      const dia = `${dFecha.getDate()}`.padStart(2, '0');
      return `${dFecha.getFullYear()}-${mes}-${dia}`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
