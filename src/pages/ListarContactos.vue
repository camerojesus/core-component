<template>
  <v-container class="d-flex flex-column justify-center align-center">
    <v-row>
      <h3 style="color: rgb(21, 92, 190)">Listado de Contactos</h3>
    </v-row>
    <v-row>
      <!-- Contenedor para seleccionar Fecha - Escritorio -->
      <v-col cols="2">
        <v-btn class="mt-4" style="margin-right: 40px" @click="ApuntarHoy()"> Hoy </v-btn>
      </v-col>
      <v-col cols="6" class="borde d-flex align-center">
        <span style="margin-right: 10px">Desde: </span>
        <input
          type="date"
          id="fechaInicial"
          name="fecha"
          v-model="cFechaInicial"
          style="width: 130px"
        />
        <span style="margin-right: 10px; margin-left: 20px">Hasta: </span>
        <input
          type="date"
          id="fechaFinal"
          name="fecha"
          v-model="cFechaFinal"
          style="width: 130px"
        />
      </v-col>
      <v-col cols="4">
        <v-btn
          class="mt-4"
          style="margin-left: 40px; text-transform: none; font-size: 12px"
          color="rgb(91,110,225)"
          @click="cargarContactos(cFechaInicial, cFechaFinal)"
        >
          Cargar Resultados
        </v-btn>
      </v-col>
      <!-- \Contenedor para seleccionar Fecha - Escritorio -->
    </v-row>
    <v-data-table
      :headers="headers"
      dense
      :items="contactos"
      :items-per-page="20"
      class="elevation-4 mt-6"
      color="blue-grey"
      height="800"
      density="compact"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Test",
  data() {
    return {
      cServidor: import.meta.env.VITE_API_URL,
      cFechaInicial: "",
      cFechaFinal: "",
      contactos: [],
      headers: [
        { title: "Capacitación", value: "titcap", align: "start"},
        { title: "Fecha-Hora", key: "fechorcon", align: "end"},
        { title: "Nombre Usuario", key: "nomcon", align: "end" },
        { title: "Apellido Usuario", key: "apecon", align: "end" },
        { title: "Teléfono", key: "telcon", align: "end" },
        { title: "Email", key: "emacon", align: "end" },
        { title: "País", key: "paicon", align: "end" },
        { title: "Empresa", key: "empcon", align: "end" },
        { title: "Comentarios", key: "comcon", align: "end" },
      ],
    };
  },
  methods: {
    formatearFechas() {
      this.contactos.forEach((contacto) => {
        contacto.fechorcon = new Date(contacto.fechorcon).toLocaleString("es-MX", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      });
    },
    async cargarContactos(fechaInicial, fechaFinal) {
      var cURL = this.cServidor + "/cargarcontactos";
      try {
        const response = await axios.get(cURL, {
          params: { fechaInicial, fechaFinal },
        });
        this.contactos = response.data;
        this.formatearFechas();
      } catch (error) {
        console.error("Error al cargar los contactos:", error);
      }
    },
    cambiarTextoFooter() {
      const footerTextElement = document.querySelector(
        "#app > div > div > main > div.v-container.v-locale--is-ltr.d-flex.justify-center.contenedor > div > div.v-table.v-table--fixed-height.v-table--has-top.v-table--has-bottom.v-theme--light.v-table--density-compact.v-data-table.elevation-1.mt-6 > div.v-data-table-footer > div.v-data-table-footer__items-per-page > span"
      );
      if (footerTextElement) {
        footerTextElement.textContent = "Capacitaciones por página";
      }
    },
    ApuntarHoy() {
      var dFecha = new Date();
      this.cFechaInicial = this.cFormatoFecha(dFecha);
      this.cFechaFinal = this.cFormatoFecha(dFecha);
    },
    cFormatoFecha(dFecha) {
      const mes = `${dFecha.getMonth() + 1}`.padStart(2, "0");
      const dia = `${dFecha.getDate()}`.padStart(2, "0");
      return `${dFecha.getFullYear()}-${mes}-${dia}`;
    },
    EjecutarPrueba() {
      // push to router
      this.$router.push({ name: "listar-capacitaciones" });
    },
  },
  mounted() {
    this.ApuntarHoy();
    this.cambiarTextoFooter();
  },
};
</script>

<style lang="scss" scoped>
.columna-capacitacion{
  width:300px;
}
</style>
