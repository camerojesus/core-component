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
  <g-dialog v-if="bDialogoEliminar"
    :cTitulo="cTituloDialogo"
    :cMensaje="cTextoDialogo"
    :cBotonAceptar="cBotonAceptar"
    :cBotonCancelar="cBotonCancelar"  
    :oCapacitacion="oItemEliminar"
    @cerrarDialogo="MetodoCerrarDialogo">
  </g-dialog>
</template>

<script>
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import gDialogo from "../components/G-dialog.vue";
import oGescel from "../services/gescel";

export default {
  name: "Capacitaciones",
  components: {
    gDialogo: "g-dialog",
  },

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
      bDialogoEliminar: false,
      cTituloDialogo: "Eliminar Capacitación",
      cTextoDialogo: "¿Está seguro que desea eliminar la capacitación?",
      cBotonAceptar: "Aceptar",
      cBotonCancelar: "Cancelar",      
      oItemEliminar: {},
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
      this.oItemEliminar = item;
      this.bDialogoEliminar = true;
    },
    MetodoCerrarDialogo(bSeleccionUsuario,oCapacitacion) {
      this.bDialogoEliminar = false;
      console.log("Eliminar:", this.oItemEliminar);
      console.log("el usuario dijo : ", bSeleccionUsuario);
      if (bSeleccionUsuario) {
        // Implementar lógica para eliminar capacitación
          this.eliminarCapacitacionServidor(oCapacitacion.numcap)
      }
    },
    async eliminarCapacitacionServidor(cNumeroCapacitacion) {
      try {
        const cUrl = oGescel.cServidor + "/eliminarcapacitacion";
        const response = await axios.delete(cUrl, {
          params: {
            cNumeroCapacitacion: cNumeroCapacitacion
          }
        });
        console.log('Respuesta del servidor:', response.data);
        this.obtenerCapacitaciones();
      } catch (error) {
        console.error('Error al eliminar la capacitación:', error);
        // Manejar el error según tus necesidades
      }
    }    
  },
};
</script>

<style>
/* Estilos personalizados si necesarios */
</style>
