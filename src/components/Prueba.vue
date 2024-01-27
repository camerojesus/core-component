<template>
  <v-layout style="width: 380px">
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
  props: {
    aCursosPrevios: Array,
  },
  data() {
    return {
      selectedCurso: [], // Inicializa como array vacío
      aCursos: [],
      aCursosFiltrados: [],
      cServidor: import.meta.env.VITE_API_URL,
    };
  },
  async mounted() {
    await this.cargarCursos();
  },

  created() {
    if (this.aCursosPrevios.length > 0) {
      this.construirSelectedCurso();
    }
  },

  methods: {
    construirSelectedCurso() {
      // Suponiendo que aCursosPrevios es una propiedad de datos o una prop del componente
      const selectedCurso = this.aCursosPrevios.map((curso) => curso.nomcur);

      // Aquí puedes hacer algo con selectedCurso, como actualizar un dato del componente
      // Por ejemplo:
      this.selectedCurso = selectedCurso;

      // O simplemente devolver el array si prefieres
      return selectedCurso;
    },

    VaciarCursos() {
      this.selectedCurso = [];
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
    emitirDatos() {
      this.$emit("datos-enviados", this.aCursos, this.selectedCurso);
    },
  },
  watch: {
    selectedCurso: {
      handler(newVal) {
        this.emitirDatos();
      },
      deep: true,
    },
    aCursosPrevios: {
      handler(newVal) {
        this.construirSelectedCurso();
      },
      deep: true,
    }
  },
};
</script>
