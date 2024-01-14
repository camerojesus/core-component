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
  /* Media query para pantallas de hasta 360px de ancho */
  @media (max-width: 400px) {
    .contenedor {
      /* Aquí puedes ajustar los estilos para pantallas pequeñas */
      width: 98%; /* Ejemplo: usar el ancho completo de la pantalla */
      height:100%;
      /* Otros estilos específicos para pantallas pequeñas */
    }
    /* Agrega aquí más estilos específicos para elementos en pantallas pequeñas */
  }  
</style>
