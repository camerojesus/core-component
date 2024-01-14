<template>
  <v-container>
    <!-- Fecha inicial de la capacitación -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Fecha inicial de la capacitación"
          type="date"
          v-model="fechaInicial"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Fecha final de la capacitación -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Fecha final de la capacitación"
          type="date"
          v-model="fechaFinal"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Título o descripción breve de la capacitación -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Título o descripción breve de la capacitación"
          maxlength="200"
          v-model="tituloCapacitacion"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Texto largo explicativo de la capacitación -->
    <v-row>
      <v-col cols="12">
        <v-textarea
          label="Texto largo explicativo de la capacitación"
          v-model="textoExplicativo"
        ></v-textarea>
      </v-col>
    </v-row>

    <!-- Botón Guardar Capacitación -->
    <v-row>
      <v-col cols="12">
        <v-btn
          color="primary"
          block
          @click="guardarCapacitacion"
        >
          Guardar Capacitación
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EditarCapacitacion",
  data() {
    return {
      fechaInicial: '',
      fechaFinal: '',
      tituloCapacitacion: '',
      textoExplicativo: ''
    };
  },
  methods: {
    guardarCapacitacion() {
      // Lógica para guardar la capacitación
    }
  }
};
</script>
