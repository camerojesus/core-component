<template>
  <v-layout style="width:380px;">
    <v-autocomplete
      label="Autocomplete"
      :items="aCursosFiltrados"
      clearable
      chips
      multiple
      v-model="selectedCurso"
      @keydown.esc="VaciarCursos"
      max-width="500"
      width="60%"
    ></v-autocomplete>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedCurso: null, // Inicializa con un valor null
      aCursos: [],
      aCursosFiltrados: [],
      cServidor: import.meta.env.VITE_API_URL,
    };
  },
  async mounted() {
    await this.cargarCursos();
  },
  methods: {
    VaciarCursos() {
      this.selectedCurso = [];
      console.log("VaciarCursos");
    },
    ExtraerNombreCurso(arrayCursos) {
      return arrayCursos.map((curso) => curso.nomcur);
    },
    async cargarCursos() {
      try {
        const cURL = this.cServidor + "/cargarcursos";
        const response = await axios.get(cURL);
        this.aCursos = response.data;
        this.aCursosFiltrados = this.ExtraerNombreCurso(this.aCursos);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
    },
    buscarCursos(valor) {
      if (valor && valor.length >= 3) {
        this.aCursosFiltrados = this.aCursos.filter((curso) =>
          curso.nomcur.toLowerCase().includes(valor.toLowerCase())
        );
      } else {
        this.aCursosFiltrados = this.aCursos;
      }
    },
  },
};
</script>
