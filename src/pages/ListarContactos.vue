<template>
  <v-container class="justify-center">
    <!-- Contenedor buscador fechas - celular -->
    <v-container class="contenedor-filtro-fechas-movil mb-4">
      <v-row class="justify-center fill-height my-2">
        <!-- my-10 es un ejemplo, ajusta el valor según tus necesidades -->
        <v-btn @click="ApuntarHoy()"> Hoy </v-btn>
      </v-row>
      <v-row class="justify-start my-2">
        <span>Desde: </span>
        <input
          type="date"
          id="fechaInicial"
          name="fecha"
          v-model="cFechaInicial"
          style="width: 120px"
        />
      </v-row>
      <v-row class="justify-start my-2">
        <span>Hasta: </span>
        <input
          type="date"
          id="fechaFinal"
          name="fecha"
          v-model="cFechaFinal"
          style="width: 120px"
        />
      </v-row>
    </v-container>
    <!-- \Contenedor buscador fechas - celular -->

    <!-- Contenedor para filtro de fechas - Escritorio -->
    <v-row class="contenedor-filtro-fechas-desktop mb-4 mt-4">
      <v-btn class="mr-4" style="margin-right: 40px" @click="ApuntarHoy()"> Hoy </v-btn>
      <span style="margin-right: 10px">Desde: </span>
      <input
        type="date"
        id="fechaInicial"
        name="fecha"
        v-model="cFechaInicial"
        style="width: 130px"
        class="mr-4"
      />
      <span style="margin-right: 10px; margin-left: 20px">Hasta: </span>
      <input
        type="date"
        id="fechaFinal"
        name="fecha"
        v-model="cFechaFinal"
        style="width: 130px"
        class="mr-4"
      />
    </v-row>
    <!-- \Contenedor para filtro de fechas - Escritorio -->

    <!-- Boton para cargar los resultados -->
    <v-row class="d-flex justify-center align-center mt-4 mb-4">
      <v-btn
        style="text-transform: none; font-size: 12px; max-width: 190px"
        color="rgb(91,110,225)"
        width="60%"
        @click="cargarContactos(cFechaInicial, cFechaFinal)"
      >
        Cargar Resultados
      </v-btn>
    </v-row>
    <!-- Boton para cargar los resultados -->

    <!-- datatable con los resultados -->
    <v-data-table
      :headers="headers"
      dense
      :items="contactos"
      :items-per-page="20"
      class="elevation-4 mt-6 mb-8"
      color="blue-grey"
      height="800"
      density="compact"

    >
    </v-data-table>
    <!-- \datatable con los resultados -->
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
        { title: "Capacitación", value: "titcap", align: "start" },
        { title: "Fecha-Hora", key: "fechorcon", align: "end" },
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
.contenedor-filtro-fechas-movil {
  display: none;
}
.contenedor-filtro-fechas-desktop {
  display: none;
}
@media (max-width: 700px) {
  .contenedor-filtro-fechas-movil {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 701px) {
  .contenedor-filtro-fechas-desktop {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
