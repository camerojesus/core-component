<template class="d-flex flex-column">
  <v-data-table
    :headers="headers"
    :items="capacitaciones"
    class="elevation-8"
    elevation="4"
  >
    <template v-slot:item.action="{ item }">
      <v-layout align-center justify-start>
        <!-- Botón Editar Capacitación -->
        <v-btn icon small color="primary" @click="editarCapacitacion(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>

        <!-- Botón Eliminar Capacitación -->
        <v-btn icon small color="red" @click="eliminarCapacitacion(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-layout>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "Capacitaciones",

  data() {
    return {
      headers: [
        { title: "Título", value: "titcap", align: "start" },
        { title: "Fecha Inicio", value: "fecinicap", align: "start" },
        { title: "Fecha Fin", value: "fecfincap", align: "start" },
        { title: "Descripción", value: "descorcap", align: "start" },
        { title: "Estatus", value: "estcap", align: "start" },
        { title: "Acciones", value: "action", sortable: false },
      ],
      capacitaciones: [],
      cServidor: import.meta.env.VITE_API_URL,
    };
  },
  mounted() {
    this.obtenerCapacitaciones();
  },
  methods: {
    async obtenerCapacitaciones() {
      try {
        var cURL = this.cServidor + "/listarcapacitaciones";
        const response = await axios.get(cURL);
        this.capacitaciones = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    editarCapacitacion(item) {
      // Implementar lógica para editar capacitación
      localStorage.setItem("capacitacionSeleccionada", JSON.stringify(item));
      // push del router para ejecutar el page agregar-capacitacion
      this.$router.push({ name: "agregar-capacitacion" });
    },
    eliminarCapacitacion(item) {
      // Implementar lógica para eliminar capacitación
      console.log("Eliminar:", item);
    },
  },
};
</script>

<style>
/* Estilos personalizados si necesarios */
</style>
