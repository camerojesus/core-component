<template>
 <v-container class="mt-2 d-flex justify-center borde" style="height:100%;">
      <div class="custom-flex-container borde">
        <v-row class="d-flex flex-column justify-center align-items-center borde mb-4">
          <h3 class="text-center">Agregar Capacitación</h3>
        </v-row>
        <v-row class="borde mb-4">
          <v-col class="borde">
            <span class="mr-2">Fecha Inicial</span>
            <input type="date" name="cFechaInicial" id="fechaInicial" class="fontComprimida">
          </v-col>
          <v-col class="borde">
            <span class="mr-2" >Hora Inicial</span>
            <input type="time" name="cHoraInicial" id="horaInicial" class="fontComprimida">
          </v-col>
          <v-col class="borde">
            <span class="mr-2">Fecha Final</span>
            <input type="date" name="cFechaFinal" id="fechaFinal" class="fontComprimida">
          </v-col>
          <v-col class="borde">
            <span class="mr-2">Hora Final</span>
            <input type="time" name="cHoraFinal" id="horaFinal" class="fontComprimida">
          </v-col>
        </v-row>
        <v-row class="mb-4 borde">
            <v-col>
                <span class="mr-2">Título de la capacitación</span>
            </v-col>
            <v-col>
                <v-textarea
                  placeholder="Escribe el titulo que irá al inicio de la capacitación"
                  rows="2"
                  auto-grow
              v-model="comcon"
            ></v-textarea>          

            </v-col>
        </v-row>
        <v-row class="borde">
            <v-col>
                <span class="mr-2">Descripción corta</span>
            </v-col>
            <v-col>
                <v-textarea
                placeholder="Escribe una descripción corta que se usará como subtítulo"
                  rows="2"
                  auto-grow
              v-model="comcon"
            ></v-textarea>          
            </v-col>
        </v-row>
        <v-row>
            <span class="mr-2">Contenido largo</span>        
        </v-row>
        <v-row class="mb-4 borde">
            <v-textarea
                placeholder="Contenido del post, se mostrará en la página de la capacitación"
                rows="20"
                auto-grow
            v-model="comcon"
            ></v-textarea>          
        </v-row>
        <v-row class="mb4 d-flex flex-column justify-end borde" >
            <v-btn color="rgb(91,110,225)" style="text-transform:none;">
                Guardar Capacitación
            </v-btn>
        </v-row>
      </div>
    </v-container>
  </template>

<script>
export default {
    name: 'AgregarCapacitacion',
    data() {
        return {
            // Aquí van tus datos
        }
    },
    computed: {
        // Aquí van tus propiedades computadas
    },
    methods: {
        // Aquí van tus métodos
    },
    created() {
        // Aquí va el código que se ejecuta cuando se crea el componente
    },
    mounted() {
        // Aquí va el código que se ejecuta cuando se monta el componente
    },
    updated() {
        // Aquí va el código que se ejecuta cuando se actualiza el componente
    },
    destroyed() {
        // Aquí va el código que se ejecuta cuando se destruye el componente
    }
}
</script>

<style scoped>
.custom-flex-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.v-row {
    margin-bottom: 0; /* Ajusta según sea necesario */
    width:100%;
}

.v-col {
    padding: 0; /* Ajusta según sea necesario */
}
.borde {
    border:0px solid red;
}
.fontComprimida {
    font-size: 14px;
}
</style>