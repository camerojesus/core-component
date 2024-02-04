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

    <!-- Boton para cargar los resultados y exportar a excel - Desktop -->
    <v-row class="d-flex justify-center align-center mt-4 mb-4" v-if="!bMovil">
      <v-col class="borde"> </v-col>
      <v-col class="borde d-flex flex-column justify-center align-center">
        <v-btn
          style="text-transform: none; font-size: 12px; max-width: 190px"
          color="rgb(91,110,225)"
          width="60%"
          @click="cargarContactos(cFechaInicial, cFechaFinal)"
        >
          Cargar Resultados
        </v-btn>
      </v-col>
      <!-- Exportar a excel -->
      <v-col class="d-flex justify-end align-center borde">
        <v-btn color="success" @click="ExportarExcel" dark style="margin-right:4px; text-transform: none;font-size: 12px">
          <v-icon left>mdi-microsoft-excel</v-icon>
          Exportar a Excel
        </v-btn>
      </v-col>
    </v-row>
    <!-- Boton para cargar los resultados -->

    <!-- Boton para cargar los resultados y exportar a excel - Móvil -->
    <v-row class="d-flex justify-center align-center mt-4 mb-4" v-if="bMovil">
      <v-btn
        style="text-transform: none; max-width: 190px"
        color="rgb(91,110,225)"
        width="60%"
        @click="cargarContactos(cFechaInicial, cFechaFinal)"
      >
        Cargar Resultados
      </v-btn>
    </v-row>
    <v-row class="d-flex justify-center align-center mt-4 mb-4" v-if="bMovil">
      <v-btn color="success" @click="ExportarExcel" dark style="margin-right:4px; text-transform: none;">
        <v-icon left>mdi-microsoft-excel</v-icon>
        Exportar a Excel
      </v-btn>
    </v-row>
    <!-- \Boton para cargar los resultados y exportar a excel - Móvil -->

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

    <!-- Notificaciones al usuario -->
    <v-snackbar
      v-model="bMostrarNotificacion"
      :timeout="nTimeout"
      :color="cColorNotificacion"
      elevation="24"
      @input="bMostrarNotificacion = false"
    >
      <span style="color: black">{{ cMensajeNotificacion }}</span>
    </v-snackbar>
    <!-- \Notificaciones al usuario -->
  </v-container>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";

export default {
  name: "Test",
  data() {
    return {
      cServidor: import.meta.env.VITE_API_URL,
      cFechaInicial: "",
      cFechaFinal: "",
      contactos: [],
      ContactosExcel: [],
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
      bMostrarNotificacion: false,
      cMensajeNotificacion: "",
      cColorNotificacion: "",
      nTimeout: 2000,
      bMovil: false,
    };
  },
  methods: {
    ExportarExcel() {
      this.cambiarNombresPropiedades();
      const worksheet = XLSX.utils.json_to_sheet(this.ContactosExcel);
      // Crear un nuevo libro de trabajo y añadir la hoja de trabajo
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // Generar el archivo .xlsx y descargar
      XLSX.writeFile(workbook, "export.xlsx");
      this.cMensajeNotificacion = "Archivo exportado correctamente";
      this.cColorNotificacion = "#257fe6";
      this.bMostrarNotificacion = true;      
    },

    cambiarNombresPropiedades() {
      this.ContactosExcel = this.contactos.map((contacto) => {
        return {
          NumeroCapacitacion: contacto.numcapcon,
          Email: contacto.emacon,
          Nombre: contacto.nomcon,
          Apellido: contacto.apecon,
          Telefono: contacto.telcon,
          Empresa: contacto.empcon,
          Pais: contacto.paicon,
          Mensaje: contacto.comcon,
          FechaHora: contacto.fechorcon,
          NombreCapacitacion: contacto.titcap,
        };
      });
    },

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
        this.cMensajeNotificacion = "Contactos cargados correctamente";
        this.cColorNotificacion = "#4CAF50";
        this.bMostrarNotificacion = true;
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
    GestionarCambioAnchoPantalla() {
      this.nWidth = window.innerWidth;
      if (this.nWidth < 700) {
        this.bMovil = true;
      } else {
        this.bMovil = false;
      }
    },
  },
  created() {
    this.nWidth = window.innerWidth;
    if (this.nWidth < 700) {
      this.bMovil = true;
    } else {
      this.bMovil = false;
    }
  },
  mounted() {
    this.ApuntarHoy();
    this.cambiarTextoFooter();
    window.addEventListener("resize", this.GestionarCambioAnchoPantalla);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.GestionarCambioAnchoPantalla);
  },
};
</script>

<style lang="scss" scoped>
.contenedor-filtro-fechas-movil {
  display: none;
}
.contenedor-filtro-fechas-desktop {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
@media (min-width: 701px) {
  .movil {
    display: none;
  }
  .desktop {
    display: block;
  }
}
@media (max-width: 700px) {
  .contenedor-filtro-fechas-movil {
    display: flex;
    flex-direction: column;
  }
  .contenedor-filtro-fechas-desktop {
    display: none;
  }
  .movil {
    display: block;
  }
  .desktop {
    display: none;
  }
}

.borde {
  border: 0px solid red;
}
</style>
