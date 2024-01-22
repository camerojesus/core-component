<template>
  <v-container class="mt-2 d-flex justify-center">
    <v-card class="pa-5" max-width="800" elevation="6">
      <v-card-title class="text-center mb-5"
        style="color:rgb(250, 252, 255);background-color:rgb(56,58,117);font-size:14px;">
        <h3>Agregar capacitación</h3>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <span class="mr-2">Fecha Inicial</span>
            <input type="date" name="cFechaInicial" id="fechaInicial" class="fontComprimida">
          </v-col>
          <v-col>
            <span class="mr-2">Hora Inicial</span>
            <input type="time" name="cHoraInicial" id="horaInicial" class="fontComprimida">
          </v-col>
          <v-col>
            <span class="mr-2">Fecha Final</span>
            <input type="date" name="cFechaFinal" id="fechaFinal" class="fontComprimida">
          </v-col>
          <v-col>
            <span class="mr-2">Hora Final</span>
            <input type="time" name="cHoraFinal" id="horaFinal" class="fontComprimida">
          </v-col>
        </v-row>
        <v-row>
          <v-file-input label="Imagen destacada" @change="onFileSelected" accept="image/*"></v-file-input>          
        </v-row>        
        <v-row>
          <v-img v-if="imageUrl" :src="imageUrl" aspect-ratio="1" class="mt-3"></v-img>        
        </v-row>
        <v-row class="mb-2">
          <v-col>
            <span class="mr-2">Título de la capacitación</span>
            <v-textarea placeholder="Escribe el titulo que irá al inicio de la capacitación" rows="2" auto-grow
              v-model="comcon"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span class="mr-2">Descripción corta</span>
            <v-textarea placeholder="Escribe una descripción corta que se usará como subtítulo" rows="2" auto-grow
              v-model="comcon"></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <span class="mr-2">Contenido largo</span>
        </v-row>
        <v-row class="mb-2">
          <v-textarea placeholder="Contenido del post, se mostrará en la página de la capacitación" rows="20" auto-grow
            v-model="comcon"></v-textarea>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="rgb(91,110,225)" style="text-transform:none;">
          Guardar Capacitación
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
  

<script>
import axios from 'axios';

export default {
  name: 'AgregarCapacitacion',
  data() {
    return {
      imageUrl: null, // Para almacenar la URL de la imagen para la vista previa
      // Aquí puedes agregar más datos según sea necesario
    };
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file); // Crear una URL temporal para la vista previa de la imagen
        this.uploadImage(file); // Llamar al método para subir la imagen
      }
    },
    async uploadImage(file) {
      try {
        const formData = new FormData();
        formData.append('image', file); // Agregar el archivo de imagen al objeto FormData

        // Realizar la solicitud POST para subir la imagen
        const response = await axios.post('http://localhost/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Actualizar la URL de la imagen con la URL proporcionada por el servidor
        this.imageUrl = response.data.imageUrl;
        console.log('Imagen subida:', this.imageUrl);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
      }
    },
  },
  // Aquí puedes agregar más métodos, propiedades computadas, watchers, etc.
};
</script>


<style scoped>
.fontComprimida {
  font-size: 14px;
}
</style>