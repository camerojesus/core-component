<template>
  <v-container class="mt-2 d-flex justify-center">
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
          <v-textarea
            placeholder="Contenido del post, se mostrará en la página de la capacitación"
            rows="10"
            auto-grow
            v-model="concap"
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

export default {
  name: "AgregarCapacitacion",
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
      bNuevo: true, // Para indicar si se está creando una nueva capacitación o editando una existente
      // Aquí puedes agregar más datos según sea necesario
    };
  },
  methods: {
    llenarValoresDePrueba() {
      // Asignar valores de prueba a cada propiedad
      this.fecinicap = "2024-01-01"; // Fecha inicial de prueba
      this.horinicap = "08:00"; // Hora inicial de prueba
      this.fecfincap = "2024-01-02"; // Fecha final de prueba
      this.horfincap = "17:00"; // Hora final de prueba
      this.titcap = "Capacitación de Prueba"; // Título de la capacitación de prueba
      this.descorcap = "Descripción corta de la capacitación de prueba"; // Descripción corta de prueba
      this.concap = "Contenido detallado de la capacitación de prueba."; // Contenido de la capacitación de prueba

      // Puedes agregar más campos si es necesario
    },

    bValidarCampos() {
      console.log("Validando campos");
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
        console.log("entré en la condición ampliada");
        return false;
      }
      return true;
    },

    GuardarCapacitacion() {
      if (!this.bValidarCampos()) {
        console.log("Campos inválidos");
        return;
      }
      // Construir un objeto JSON con los datos ingresados
      console.log("Guardando capacitación");
      const capacitacionData = {
        numcap: "", // El número de la capacitación se asigna automáticamente en la API cuando este campo está vacio
        fecinicap: this.fecinicap,
        fecfincap: this.fecfincap,
        horinicap: this.horinicap,
        horfincap: this.horfincap,
        titcap: this.titcap,
        descorcap: this.descorcap,
        concap: this.concap,
        // Agrega más propiedades según sea necesario
      };

      // Realizar una solicitud POST a la API para guardar la capacitación
      var cURL = this.cServidor + "/guardarcapacitacion";
      axios
        .post(cURL, capacitacionData)
        .then((response) => {
          // Procesar la respuesta de la API si es necesario
          console.log("Capacitación guardada con éxito:", response.data);
          this.numcap = response.data.numcap;

          // Mostrar una notificación al usuario
          this.cMensaje = "Capacitación guardada con éxito";
          this.bNotificacion = true;
        })
        .catch((error) => {
          // Manejar errores si la solicitud falla
          console.error("Error al guardar la capacitación:", error);

          // Mostrar una notificación de error al usuario
          this.cMensajeError = "Error al guardar la capacitación. Inténtalo de nuevo.";
          this.bNotificacionError = true;
        });
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imacap = URL.createObjectURL(file);
      }
    },
    onFileSelected(cArchivo) {
      const file = cArchivo;
      if (file) {
        this.uploadImage(file); // Llamar al método para subir la imagen
      }
    },
    async uploadImage(file) {
      try {
        const formData = new FormData();
        formData.append("image", file); // Agregar el archivo de imagen al objeto FormData

        // Realizar la solicitud POST para subir la imagen
        const response = await axios.post("http://localhost/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Actualizar la URL de la imagen con la URL proporcionada por el servidor
        this.imacap = response.data.imacap;
        console.log("Imagen subida:", this.imacap);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
      }
    },
  },
  // Métodos adicionales - cuando se necesiten
  mounted() {
    this.bNotificacion = false;
    this.bNotificacionError = false;
    this.llenarValoresDePrueba();
  },
};
</script>

<style scoped>
.fontComprimida {
  font-size: 14px;
}
</style>
