<template>
  <v-snackbar :value="bMostrar" color="cColor" @input="cerrarSnackbar" :timeout="nTimeout">
    <span style="color: black">{{ cMensaje }}</span>
  </v-snackbar>
</template>

<script>
export default {
  name: "gsnakbar",
  props: {
    cMensaje: {
      type: String,
      default: "",
    },
    cColor: {
      type: String,
      default: "success",
    },
    bMostrar: {
      type: Boolean,
      default: false,
    },
    nTimeout: {
      type: Number,
      default: 2000,
    },
  },
  created() {
  },
  mounted() {
    console.log("bMostrar ",this.bMostrar)
  },
  data() {
    return {};
  },
  props: {},
  methods: {
    cerrarSnackbar() {
      this.$emit('update:bMostrar', false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
