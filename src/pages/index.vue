<template>
  <v-container>
    <!-- Contenedor para el buscador - Escritorio -->
    <v-container class="d-none d-lg-flex justify-center contenedor-buscador">
      <v-row class="fill-height">
        <v-col cols="7" class="borde d-flex align-center pt-0 pb-0">
          <v-text-field
            style="margin-top: 10px"
            clearable
            label="Palabras a buscar en capacitaciones"
            prepend-icon="mdi-magnify"
            v-model="cTextoBuscar"
            variant="outlined"
            @change="FiltrarCapacitaciones"
            @keydown.esc="LimpiarFiltrar"
            @click:clear="LimpiarFiltrar"
          />
        </v-col>
        <v-col cols="3" class="borde d-flex align-center col justify-center">
          <v-btn
            color="rgb(91,110,225)"
            style="text-transform: none"
            @click="FiltrarCapacitaciones()"
          >
            Buscar Capacitaciones
          </v-btn>
        </v-col>
        <v-col cols="2" class="borde d-flex align-center col justify-center">
          <v-btn-toggle
            v-model="cTipoBusqueda"
            rounded="5"
            color="grey lighten-8"
            group
            v-if="false"
          >
            <v-btn value="Lista" style="text-transform: none"> Lista </v-btn>

            <v-btn value="Día" style="text-transform: none"> Día </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-container>
    <!-- \Contenedor para el buscador - Escritorio -->

    <!-- Contenedor para el buscador - Móvil/Tableta (Visible en xs, sm y md) -->
    <v-container class="d-flex flex-column d-lg-none justify-center my-6">
      <v-row class="d-flex">
        <v-text-field
          style="margin-top: 10px"
          clearable
          label="Palabras a buscar en capacitaciones"
          prepend-icon="mdi-magnify"
          v-model="cTextoBuscar"
          variant="outlined"
          @change="FiltrarCapacitaciones"
          @keydown.esc="LimpiarFiltrar"
          @click:clear="LimpiarFiltrar"
        />
      </v-row>
    </v-container>
    <!-- \Contenedor para el buscador - Móvil -->

    <!-- Contenedor para seleccionar Fecha - Escritorio -->
    <v-container class="d-none d-lg-flex justify-center contenedor-buscador">
      <v-row>
        <v-col cols="2">
          <v-btn class="mt-4" style="margin-right: 40px" @click="ApuntarHoy()">
            Hoy
          </v-btn>
        </v-col>
        <v-col cols="10" class="borde d-flex align-center">
          <span style="margin-right: 10px">Desde: </span>
          <input
            type="date"
            id="fechaInicial"
            name="fecha"
            v-model="cFechaInicial"
            style="width: 120px"
          />
          <span style="margin-right: 10px; margin-left: 20px">Hasta: </span>
          <input
            type="date"
            id="fechaFinal"
            name="fecha"
            v-model="cFechaFinal"
            style="width: 120px"
          />
        </v-col>
      </v-row>
    </v-container>
    <!-- \Contenedor para seleccionar Fecha - Escritorio -->

    <!-- Contenedor para fechas - Movil o tabletas (Visible en xs, sm y md) -->
    <v-container
      class="d-flex flex-column d-lg-none justify-center contenedor-buscador mb-8"
    >
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
      <v-row class="justify-center my-2">
        <v-btn
          color="rgb(91,110,225)"
          style="text-transform: none"
          @click="FiltrarCapacitaciones()"
        >
          Buscar Capacitaciones
        </v-btn>
      </v-row>
    </v-container>
    <!-- \Contenedor para fechas - Movil o tabletas -->

    <!-- Separador con indicador de fecha-->
    <v-container class="mt-4 d-flex justify-center contenedor-buscador" my-2>
      <v-row class="borde mt-0">
        <v-col cols="2" xs="6" sm="6" class="borde"> {{ cMes }} {{ cAño }} </v-col>
        <v-col cols="10" xs="6" sm="6" class="borde d-flex align-center mt-0">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
    <!-- \Separador con indicador de fecha-->

    <!-- Renderizamos los card's de las capacitaciones -->
    <v-container class="mt-2 d-flex justify-center flex-column">
      <div v-for="(oItem, index) in aCapacitacionesFiltradas" :key="index">
        <v-card class="pb-3 pt-3">
          <v-row class="pa-0">
            <v-col class="d-flex flex-column custom-align-left">
              <p>{{ cObtenerDiaSemanaAbreviado(oItem.fecinicap) }}</p>
              <h3>{{ cObtenerDiaDeFecha(oItem.fecinicap) }}</h3>
            </v-col>
          </v-row>

          <v-card-subtitle class="pt-2">
            {{ obtenerNombreMesString(oItem.fecinicap) }}
            {{ cObtenerDiaDeFecha(oItem.fecinicap) }} @ {{ oItem.horinicap }} -
            {{ obtenerNombreMesString(oItem.fecfincap) }}
            {{ cObtenerDiaDeFecha(oItem.fecfincap) }} @ {{ oItem.horfincap }}
            {{ oItem.fecinicap }} {{ oItem.feccincap }}
          </v-card-subtitle>
          <v-row>
            <!-- Columna para el contenido textual -->
            <v-col cols="12" sm="7" md="7">
              <v-card-title
                class="card-title-wrap hover-underline"
                @click="CargarPost(oItem)"
              >
                {{ oItem.titcap }}
              </v-card-title>
              <v-card-text>
                {{ oItem.descorcap }}
              </v-card-text>
            </v-col>
            <!-- Columna para la imagen -->
            <v-col cols="12" sm="5" md="5">
              <v-img :src="oItem.cImagen" style="width: 100%; height: auto"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
    <!-- \Renderizamos los card's de las capacitaciones -->
  </v-container>
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
</template>

<script>
import { stringifyQuery } from "vue-router";
import axios from "axios";
import { useMessageStore } from "../stores/store.js";

export default {
  name: "componenteEventos",
  data() {
    return {
      // tus datos aquí
      cTipoBusqueda: "",
      cTextoBuscar: "",
      cAño: "",
      cMes: "",
      cFechaInicial: "",
      cFechaFinal: "",
      cFechaInicialOriginal: "",
      cFechaFinalOriginal: "",
      aCapacitaciones: [],
      aCapacitacionesFiltradas: [],
      oItem: {},
      oCapacitacion: null,
      cServidor: import.meta.env.VITE_API_URL,
      nWidth: 0,
      nHeight: 0,
      cPaginaPresentar: "Capacitaciones",
      oGescel: useMessageStore(),
      bMostrarNotificacion: false,
      cMensajeNotificacion: "",
      cColorNotificacion: "",
      nTimeout: 2000,
      bPrimeravez: true,
    };
  },
  computed: {
    // Acceder a los estados y getters de la tienda
    messages() {
      const messageStore = useMessageStore();
      return messageStore.messages;
    },
    unreadMessages() {
      const messageStore = useMessageStore();
      return messageStore.unreadMessages;
    },
  },
  methods: {
    obtenerNombreMesString(fecha) {
      const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      const fechaUTC = new Date(fecha + "T00:00:00Z");
      const mes = fechaUTC.getUTCMonth();
      return meses[mes];
    },

    cObtenerNombreMes(tFecha) {
      const opciones = { month: "long" };
      const nombreMes = new Intl.DateTimeFormat("es-ES", opciones).format(tFecha);
      return nombreMes;
    },
    cObtenerAñoFecha(tFecha) {
      return tFecha.getFullYear().toString();
    },
    ApuntarHoy() {
      var dFecha = new Date();
      this.cFechaInicial = this.cFormatoFecha(dFecha);
      this.cFechaFinal = this.cFormatoFecha(dFecha);
    },
    cFormatoFecha(dFecha) {
      const mes = `${dFecha.getMonth() + 1}`.padStart(2, "0"); // Añade un cero si es necesario
      const dia = `${dFecha.getDate()}`.padStart(2, "0");
      return `${dFecha.getFullYear()}-${mes}-${dia}`;
    },
    EditarCapacitacion() {
      this.$router.push({ name: "editar-capacitacion" });
    },

    // Método corregido: cObtenerDiaSemanaAbreviado
    cObtenerDiaSemanaAbreviado(cFecha) {
      const cDias = ["DOM", "LUN", "MAR", "MIER", "JUE", "VIE", "SAB"]; // Ajustado el orden para UTC
      const fechaUTC = new Date(cFecha + "T00:00:00Z");
      const diaSemana = fechaUTC.getUTCDay();
      return cDias[diaSemana];
    },

    cObtenerDiaDeFecha(cFecha) {
      const fechaUTC = new Date(cFecha + "T00:00:00Z"); // Asegurar que la fecha se interprete como UTC
      const dia = fechaUTC.getUTCDate(); // Obtener el día en UTC
      return dia.toString(); // Retornar el día como string
    },

    agregarPropiedadImagen(cServidor) {
      this.aCapacitaciones = this.aCapacitaciones.map((capacitacion) => {
        return {
          ...capacitacion,
          cImagen: cServidor + `/assets/images/${capacitacion.imacap}`,
        };
      });
    },

    LimpiarFiltrar() {
      this.cTextoBuscar = "";
      this.FiltrarCapacitaciones();
    },

    FiltrarCapacitaciones() {
      if (
        this.cFechaInicial != this.cFechaInicialOriginal ||
        this.cFechaFinal != this.cFechaFinalOriginal
      ) {
        this.cFechaInicialOriginal = this.cFechaInicial;
        this.cFechaFinalOriginal = this.cFechaFinal;
        this.CargarCapacitaciones(true);
      } else {
        this.FiltroInmediato();
      }
    },

    LimpiarEstado() {
      this.oGescel.oCapacitacionesFiltradas = [];
      this.oGescel.oCapacitaciones = [];
      this.oGescel.cFechaInicial = "";
      this.oGescel.cFechaFinal = "";
      this.oGescel.cFechaInicialOriginal = "";
      this.oGescel.cFechaFinalOriginal = "";
      this.oGescel.cTextoBuscar = "";
    },

    GuardarEstado() {
      this.oGescel.oCapacitacionesFiltradas = this.aCapacitacionesFiltradas;
      this.oGescel.oCapacitaciones = this.aCapacitaciones;
      this.oGescel.cFechaInicial = this.cFechaInicial;
      this.oGescel.cFechaFinal = this.cFechaFinal;
      this.oGescel.cFechaInicialOriginal = this.cFechaInicialOriginal;
      this.oGescel.cFechaFinalOriginal = this.cFechaFinalOriginal;
      this.oGescel.cTextoBuscar = this.cTextoBuscar;
    },

    CargarEstado() {
      this.aCapacitacionesFiltradas = this.oGescel.oCapacitacionesFiltradas;
      this.aCapacitaciones = this.oGescel.oCapacitaciones;
      this.cFechaInicial = this.oGescel.cFechaInicial;
      this.cFechaFinal = this.oGescel.cFechaFinal;
      this.cFechaInicialOriginal = this.oGescel.cFechaInicialOriginal;
      this.cFechaFinalOriginal = this.oGescel.cFechaFinalOriginal;
      this.cTextoBuscar = this.oGescel.cTextoBuscar;
    },

    FiltroInmediato() {
      if (!this.cTextoBuscar) {
        this.aCapacitacionesFiltradas = this.aCapacitaciones;
      } else {
        this.aCapacitacionesFiltradas = this.aCapacitaciones.filter((capacitacion) => {
          // Dividimos el texto a buscar en palabras individuales y las convertimos a minúsculas
          const palabrasBuscar = this.cTextoBuscar.toLowerCase().split(" ");

          // Verificamos si todas las palabras están en alguna de las propiedades, también en minúsculas
          return palabrasBuscar.every(
            (palabra) =>
              (capacitacion.concap &&
                capacitacion.concap.toLowerCase().includes(palabra)) ||
              (capacitacion.descorcap &&
                capacitacion.descorcap.toLowerCase().includes(palabra)) ||
              (capacitacion.titcap && capacitacion.titcap.toLowerCase().includes(palabra))
          );
        });
      }
      this.GuardarEstado();
    },

    obtenerUltimoDiaMesesDespues(fecha, nMeses = 4) {
      let fechaObj = new Date(fecha + "T00:00:00Z");
      if (isNaN(fechaObj.getTime())) {
        return "Fecha inválida";
      }
      fechaObj.setUTCMonth(fechaObj.getUTCMonth() + nMeses); // Añadir dos meses
      fechaObj.setUTCDate(0); // Último día del mes anterior (mes + 2 - 1)
      let año = fechaObj.getUTCFullYear();
      let mes = fechaObj.getUTCMonth() + 1;
      let dia = fechaObj.getUTCDate();
      mes = mes < 10 ? "0" + mes : mes;
      dia = dia < 10 ? "0" + dia : dia;
      return `${año}-${mes}-${dia}`;
    },

    CargarPost(oItem) {
      oItem.cCadenaFechaHora =
        this.obtenerNombreMesString(oItem.fecinicap) +
        " " +
        this.cObtenerDiaDeFecha(oItem.fecinicap) +
        " @ " +
        oItem.horinicap +
        " - " +
        this.obtenerNombreMesString(oItem.fecfincap) +
        " " +
        this.cObtenerDiaDeFecha(oItem.fecfincap) +
        " " +
        oItem.horfincap;
      localStorage.setItem("capacitacionState", JSON.stringify(oItem));
      this.GuardarEstado();
      this.$router.push({ name: "detalle-capacitacion", params: {} });
    },

    CargarCapacitaciones(bRealizarFiltro = false) {
      var oObjeto = this;
      var params = {
        fechaInicial: this.cFechaInicial,
        fechaFinal: this.cFechaFinal,
      };

      axios
        .get(this.cServidor + "/capacitaciones", { params })
        .then((response) => {
          this.aCapacitaciones = response.data;
          this.cTextoBuscar = "";
          this.agregarPropiedadImagen(this.cServidor);
          this.aCapacitacionesFiltradas = this.aCapacitaciones;
          if (bRealizarFiltro) {
            oObjeto.FiltroInmediato();
          } else {
            oObjeto.GuardarEstado();
          }
          if(this.aCapacitaciones.length > 0){
            this.cMensajeNotificacion = "Búsqueda realizada";
            this.cColorNotificacion = "#3cc252";
          } else {
            this.cMensajeNotificacion = "No se encontraron capacitaciones";
            this.cColorNotificacion = "#d957b0";
          }
          if(this.bPrimeravez){
            this.bPrimeravez = false;
          } else this.bMostrarNotificacion = true;          
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  created() {
    this.nWidth = screen.width;
    this.nHeight = screen.height;
    if (this.oGescel.oCapacitaciones && this.oGescel.oCapacitaciones.length > 0) {
      // Hay capacitaciones guardadas, cargarlas desde oGescel.oCapacitaciones
      this.CargarEstado();
      this.LimpiarEstado();
    } else {
      var dFecha = new Date();
      this.cMes = this.cObtenerNombreMes(dFecha);
      this.cAño = this.cObtenerAñoFecha(dFecha);
      this.cFechaInicial = this.cFormatoFecha(dFecha);
      this.cFechaFinal = this.obtenerUltimoDiaMesesDespues(this.cFechaInicial, 4);
      this.CargarCapacitaciones();
    }
  },

  computed: {},
  watch: {},
  components: {},
  props: {},
  mounted() {},
  beforeDestroy() {
    // código a ejecutar antes de que el componente sea destruido
  },
};
</script>

<style scoped>
.contenedor-buscador {
  width: 60%;
  height: 87px;
}

.custom-align-left {
  padding-left: 28px;
  /* Alineación por defecto para pantallas grandes */
  align-items: flex-start;
  /* Alinea los elementos a la izquierda */
}

.borde-contenedor {
  border: 0px solid rgb(228, 228, 288);
}

.borde {
  border: 0px solid #000;
}

.col {
  padding: 0px;
}

.card-title-wrap {
  white-space: normal;
}

.hover-underline:hover {
  text-decoration: underline;
  cursor: pointer;
}

/* Media query para pantallas PEQUEÑAS */
@media (max-width: 400px) {
  .contenedor-buscador {
    width: 98%;
  }

  .custom-align-left {
    align-items: center;
    /* Alinea los elementos a la derecha */
  }
}
</style>
