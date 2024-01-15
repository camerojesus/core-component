<template>
  <v-container>
     <v-row>
        <h2>Contáctanos en línea</h2>
     </v-row>
     <v-row>
        <!-- Nombre --> 
        <v-col>
          <v-text-field label="Nombre"></v-text-field>
        </v-col>
        <!-- Apellido -->
        <v-col>
          <v-text-field label="Apellido"></v-text-field>
        </v-col>
     </v-row>
     <v-row>
        <!-- Teléfono -->
        <v-col>
          <v-text-field label="Teléfono"></v-text-field>
        </v-col>
        <!-- Empresa -->
        <v-col>
          <v-text-field label="Empresa"></v-text-field>
        </v-col>
     </v-row>
     <v-row>
        <!-- País -->
        <v-col>
        </v-col>
        <!-- Correo Electrónico-->
        <v-col>
          <v-text-field
            hide-details="auto"
            label="Correo Electrónico"
            placeholder="participante@gmail.com"
            type="email"
          >
          </v-text-field>        
        </v-col>
     </v-row>
     <v-row>
         <!-- Mensaje -->
          <v-col>
            <v-textarea
              label="Comentarios"
              placeholder="Escribe tus comentarios aquí..."
              rows="3"
              auto-grow
            ></v-textarea>          
          </v-col>     
     </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Test",
  created() {},
  data() {
    return {
      cNombre: "",
      cApellido: "",
      cTelefono:  "",
      cEmpresa: "",
      cPais: "",
      cCorreo: "",
      cMensaje: ""
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>