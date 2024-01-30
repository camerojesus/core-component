<template>
  <v-row justify="center">
    <v-dialog
      v-model="bCerrarDialogo"
      persistent
      width="auto"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ cTitulo }}
        </v-card-title>
        <v-card-text> {{ cMensaje }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="MetodoCerrarDialogo(false)"
          >
            {{cBotonCancelar}}
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="MetodoCerrarDialogo(true)"
          >
            {{  cBotonAceptar }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    props: {
      cTitulo: {
        type: String,
        default: "Título del diálogo",
      },
      cMensaje: {
        type: String,
        default: "Mensaje del diálogo",
      },
      cBotonAceptar: {
        type: String,
        default: "Aceptar",
      },
      cBotonCancelar: {
        type: String,
        default: "Cancelar",
      },
      oCapacitacion: {
        type: Object,
        default: {},
      },
    },
    data () {
      return {
        bCerrarDialogo: true,        
      }
    },
    methods: {
      MetodoCerrarDialogo(bSeleccionUsuario) {
        this.bCerrarDialogo = false;
        this.$emit("cerrarDialogo",bSeleccionUsuario,this.oCapacitacion);
      },
    },
    created() {
      console.log(this.oCapacitacion);
    },
  }
</script>