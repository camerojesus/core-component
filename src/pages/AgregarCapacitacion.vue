<template>
  <v-container class="mt-2 d-flex justify-center flex-column">
    <v-row class="mb-4" max-width="800">
      <v-btn
        style="margin-left: 10px; text-transform: none"
        color="rgb(91,110,225)"
        @click="CargarListaCapacitaciones"
        elevation="4"
      >
        Listar
      </v-btn>
    </v-row>

    <v-card class="pa-5" max-width="800" elevation="6">
      <!-- Título de CARD -->
      <v-card-title
        class="text-center mb-5"
        style="
          color: rgb(250, 252, 255);
          background-color: rgb(56, 58, 117);
          font-size: 14px;
        "
      >
        <h3>Gestionar capacitación</h3>
      </v-card-title>
      <!-- \Título de CARD -->

      <v-card-text>
        <!-- Selectores de fecha-hora -->
        <v-row>
          <v-col>
            <span class="mr-2">Fecha Inicial</span>
            <input
              type="date"
              name="cFechaInicial"
              id="fechaInicial"
              class="fontComprimida"
              v-model="fecinicap"
            />
          </v-col>
          <v-col>
            <span class="mr-2">Hora Inicial</span>
            <input
              type="time"
              name="cHoraInicial"
              id="horaInicial"
              class="fontComprimida"
              v-model="horinicap"
            />
          </v-col>
          <v-col>
            <span class="mr-2">Fecha Final</span>
            <input
              type="date"
              name="cFechaFinal"
              id="fechaFinal"
              class="fontComprimida"
              v-model="fecfincap"
            />
          </v-col>
          <v-col>
            <span class="mr-2">Hora Final</span>
            <input
              type="time"
              name="cHoraFinal"
              id="horaFinal"
              class="fontComprimida"
              v-model="horfincap"
            />
          </v-col>
        </v-row>
        <!-- \Selectores de fecha-hora -->

        <!-- Selección y vista previa de la imagen destacada-->
        <v-row>
          <v-file-input
            label="Imagen destacada"
            @change="previewImage"
            accept="image/*"
          ></v-file-input>
        </v-row>
        <v-row>
          <v-img v-if="imacap" :src="imacap" aspect-ratio="1" class="mt-3"></v-img>
        </v-row>
        <!-- \Selección y vista previa de la imagen destacada-->

        <!-- Título de la capacitación -->
        <v-row class="mb-2">
          <v-col>
            <span class="mr-2">Título de la capacitación</span>
            <v-textarea
              placeholder="Escribe el titulo que irá al inicio de la capacitación"
              rows="2"
              auto-grow
              v-model="titcap"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- \Título de la capacitación -->

        <!-- Descripción corta de la capacitación -->
        <v-row>
          <v-col>
            <span class="mr-2">Descripción corta</span>
            <v-textarea
              placeholder="Escribe una descripción corta que se usará como subtítulo"
              rows="2"
              auto-grow
              v-model="descorcap"
            ></v-textarea>
          </v-col>
        </v-row>
        <!-- \Descripción corta de la capacitación -->

        <!-- Contenido del POST -->
        <v-row>
          <span class="mr-2">Contenido largo</span>
        </v-row>
        <v-row class="mb-2">
          <QuillEditor
            theme="snow"
            style="width: 100%; height: 400px"
            v-model:content="concap"
            contentType="html"
          />
          <v-textarea
            placeholder="Contenido del post, se mostrará en la página de la capacitación"
            rows="10"
            auto-grow
            v-model="concap"
            v-if="false"
          ></v-textarea>
        </v-row>
        <!-- \Contenido del POST -->
      </v-card-text>

      <!-- Botones de acción -->
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="rgb(91,110,225)"
          style="text-transform: none"
          @click="GuardarCapacitacion"
        >
          Guardar Capacitación
        </v-btn>
      </v-card-actions>
      <!-- \Botones de acción -->
    </v-card>

    <!-- Notificaciones de errores al usuario -->
    <v-snackbar
      v-model="bNotificacionError"
      :timeout="2000"
      color="deep-purple-accent-4"
      elevation="24"
      @input="bNotificacionError = false"
    >
      <span style="color: white">{{ cMensajeError }}</span>
    </v-snackbar>
    <!-- \Notificaciones de errores al usuario -->

    <!-- Notificaciones al usuario -->
    <v-snackbar
      v-model="bNotificacion"
      :timeout="2000"
      color="light-green"
      elevation="24"
      @input="bNotificacion = false"
    >
      <span style="color: black">{{ cMensaje }}</span>
    </v-snackbar>
    <!-- \Notificaciones al usuario -->
  </v-container>
</template>

<script>
import axios from "axios";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "AgregarCapacitacion",
  components: {
    QuillEditor,
  },
  data() {
    return {
      cServidor: import.meta.env.VITE_API_URL,
      imacap: "", // Para almacenar la URL de la imagen para la vista previa
      fecinicap: "",
      fecfincap: "",
      horinicap: "",
      horfincap: "",
      titcap: "",
      descorcap: "",
      concap: "",
      bNotificacionError: false,
      cMensajeError: "",
      bNotificacion: false,
      cMensaje: "",
      bNueva: true, // Para indicar si se está creando una nueva capacitación o editando una existente
      imagenSeleccionada: null, // Almacenar la referencia a la imagen seleccionada
      cImagenOriginal: "",
    };
  },
  methods: {

    llenarValoresDePrueba() {
      // Asignar valores de prueba a cada propiedad
      this.fecinicap = "2024-01-01";                                        // Fecha inicial de prueba
      this.horinicap = "08:00";                                             // Hora inicial de prueba
      this.fecfincap = "2024-01-02";                                        // Fecha final de prueba
      this.horfincap = "17:00";                                             // Hora final de prueba
      this.titcap = "Capacitación de Prueba";                               // Título de la capacitación de prueba
      this.descorcap = "Descripción corta de la capacitación de prueba";    // Descripción corta de prueba
      this.concap = "Contenido detallado de la capacitación de prueba.";    // Contenido de la capacitación de prueba
      // Puedes agregar más campos si es necesario
    },

    bValidarCampos() {
      if (this.fecinicap == "") {
        this.cMensajeError = "Debes seleccionar una fecha inicial";
        this.bNotificacionError = true;
        return false;
      }
      if (this.horinicap == "") {
        this.cMensajeError = "Debes seleccionar una hora inicial";
        this.bNotificacionError = true;
        return false;
      }
      if (this.fecfincap == "") {
        this.cMensajeError = "Debes seleccionar una fecha final";
        this.bNotificacionError = true;
        return false;
      }
      if (this.horfincap == "") {
        this.cMensajeError = "Debes seleccionar una hora final";
        this.bNotificacionError = true;
        return false;
      }
      if (this.titcap == "") {
        this.cMensajeError = "Debes escribir un título para la capacitación";
        this.bNotificacionError = true;
        return false;
      }
      if (this.descorcap == "") {
        this.cMensajeError = "Debes escribir una descripción corta para la capacitación";
        this.bNotificacionError = true;
        return false;
      }
      if (this.concap == "") {
        this.cMensajeError = "Debes escribir el contenido de la capacitación";
        this.bNotificacionError = true;
        return false;
      }
      if (this.imacap == "") {
        this.cMensajeError = "Debes seleccionar una imagen destacada";
        this.bNotificacionError = true;

        return false;
      }
      return true;
    },

    async GuardarCapacitacion() {
      if (!this.bValidarCampos()) {
        return;
      }
      var cImagenJson = "";
      if (this.imagenSeleccionada && this.imagenSeleccionada.name) {
        cImagenJson = this.imagenSeleccionada.name;
      } else cImagenJson = this.cImagenOriginal;
      const capacitacionData = {
        numcap: this.numcap, // El número de la capacitación se asigna automáticamente en la API cuando este campo está vacio
        fecinicap: this.fecinicap,
        fecfincap: this.fecfincap,
        horinicap: this.horinicap,
        horfincap: this.horfincap,
        titcap: this.titcap,
        descorcap: this.descorcap,
        concap: this.concap,
        imacap: cImagenJson,
        // Agrega más propiedades según sea necesario
      };

      var cURL = this.cServidor + "/guardarcapacitacion";
      try {
        const response = await axios.post(cURL, capacitacionData);
        this.numcap = response.data.numcap;
        this.bNueva = false;

        if (this.imagenSeleccionada) {
          await this.uploadImage(this.imagenSeleccionada, this.numcap);
        }

        this.cMensaje = "Capacitación guardada con éxito";
        this.bNotificacion = true;
      } catch (error) {
        this.cMensajeError = "Error al guardar la capacitación. Inténtalo de nuevo.";
        this.bNotificacionError = true;
      }
    },

    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagenSeleccionada = file; // Almacenar la imagen seleccionada
        this.imacap = URL.createObjectURL(file);
      }
    },

    CargarListaCapacitaciones() {
      this.$router.push({ name: "listar-capacitaciones" });
    },

    async uploadImage(file) {
      try {
        const formData = new FormData();
        formData.append("image", file, file.name); // Usando solo file.name para el nombre del archivo

        var cURL = this.cServidor + "/upload";
        const response = await axios.post(cURL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Asegúrate de que el servidor devuelva la URL correcta de la imagen
        this.imacap = response.data.imageUrl; // Actualiza con la URL de la imagen
      } catch (error) {}
    },
  },

  // Métodos adicionales - cuando se necesiten
  mounted() {
    this.bNotificacion = false;
    this.bNotificacionError = false;
    const itemJson = localStorage.getItem("capacitacionSeleccionada");
    if (itemJson) {
      const item = JSON.parse(itemJson);
      // Ahora puedes usar el objeto 'item' como necesites
      this.numcap = item.numcap;
      this.fecinicap = item.fecinicap;
      this.fecfincap = item.fecfincap;
      this.horinicap = item.horinicap;
      this.horfincap = item.horfincap;
      this.titcap = item.titcap;
      this.descorcap = item.descorcap;
      this.concap = item.concap;
      this.cImagenOriginal = item.imacap;
      this.imacap = `${this.cServidor}/assets/images/${item.imacap}`;
      this.bNueva = false;
      localStorage.removeItem("capacitacionSeleccionada");
    }
  },
};
</script>

<style scoped>
.fontComprimida {
  font-size: 14px;
}
.borde {
  border: 1px solid black;
}
</style>
