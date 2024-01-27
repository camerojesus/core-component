<template>
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
              {{ oItem.titcap }} {{ oItem.numcap }}
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

      const fechaObj = new Date(fecha);
      console.log("fecha generada", fechaObj);
      const mes = fechaObj.getMonth();

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
    cObtenerDiaSemanaAbreviado(cFecha) {
      const cDias = ["LUN", "MAR", "MIER", "JUE", "VIE", "SAB", "DOM"];
      const fechaObj = new Date(cFecha);
      const diaSemana = fechaObj.getDay();
      return cDias[diaSemana];
    },

    cObtenerDiaDeFecha(cFecha) {
      const fechaUTC = new Date(cFecha + "T00:00:00Z");   // Asegurar que la fecha se interprete como UTC
      const dia = fechaUTC.getUTCDate();                  // Obtener el día en UTC
      return dia.toString();                              // Retornar el día como string
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

    obtenerUltimoDiaDosMesesDespues(fecha) {
      // Convertir el string de fecha en un objeto Date
      let fechaObj = new Date(fecha);

      // Asegurarse de que la fecha es válida
      if (isNaN(fechaObj.getTime())) {
        return "Fecha inválida";
      }

      // Añadir dos meses a la fecha
      fechaObj.setMonth(fechaObj.getMonth() + 2);

      // Establecer la fecha al primer día del mes siguiente y restar un día
      fechaObj.setMonth(fechaObj.getMonth() + 1, 0);

      // Formatear la fecha de vuelta a yyyy-mm-dd
      let año = fechaObj.getFullYear();
      let mes = fechaObj.getMonth() + 1; // getMonth() devuelve un índice basado en 0
      let dia = fechaObj.getDate();

      // Asegurarse de que el mes y el día sean de dos dígitos
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
      console.log(oItem.cCadenaFechaHora);
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
      this.cFechaFinal = this.obtenerUltimoDiaDosMesesDespues(this.cFechaInicial);
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
