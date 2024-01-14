<template>
  <v-app>
    <v-main>    
     <v-container class="d-flex justify-center contenedor">
        <router-view />
     </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>

<style scoped>
  .contenedor {
    height: 100%; 
    width:80%;
    display: flex;
    justify-content: center; /* Centrar horizontalmente */
    align-items: center; /* Centrar verticalmente si es necesario */
  }
/* Media query para pantallas con ancho superior a 1400px */
  @media (min-width: 1400px) {
    .contenedor {
      width: 70%;
    } 
  } 
</style>
