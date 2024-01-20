<template>
  <v-container class="v-container">
     <v-row class="d-flex justify-center">
        <h2 style="color:rgb(56,58,117)">Contáctanos en línea</h2>
     </v-row>
     <v-row>
        <!-- Nombre -->         
        <v-col md="6" class="columna" >
          <v-text-field label="Nombre" v-model="nomcon"></v-text-field>
        </v-col>
        <!-- Apellido -->
        <v-col md="6" class="columna">
          <v-text-field label="Apellido" v-model="apecon"></v-text-field>
        </v-col>
     </v-row>
     <v-row>
        <!-- Teléfono -->
        <v-col md="6" class="columna">
          <v-text-field label="Teléfono" v-model="telcon"></v-text-field>
        </v-col>
        <!-- Empresa -->
        <v-col md="6" class="columna" >
          <v-text-field label="Empresa" v-model="empcon"></v-text-field>
        </v-col>
     </v-row>
     <v-row>
        <!-- País -->
        <v-col md="6" class="columna">
          <v-select
            :items="paises"
            label="Selecciona un país"
            v-model="paicon"
            ref="ePais"            
          ></v-select>        
        </v-col>
        <!-- Correo Electrónico-->
        <v-col md="6" class="columna">
          <v-text-field
            hide-details="auto"
            label="Correo Electrónico"
            placeholder="participante@gmail.com"
            type="email"
            v-model="emacon"
          >
          </v-text-field>        
        </v-col>
     </v-row>
     <v-row>
         <!-- Mensaje -->
          <v-col >
            <v-textarea
              label="Comentarios"
              placeholder="Escribe tus comentarios aquí..."
              rows="4"
              auto-grow
              v-model="comcon"
            ></v-textarea>          
          </v-col>     
     </v-row>
     <v-row class="dflex justify-end mr-20px mb-2 ">
        <v-btn color="rgb(230,174,52)" class="mr-4" @click="EnviarContacto()">
          Enviar
        </v-btn>
     </v-row>
    <!-- Notificaciones de errores al usuario --> 
    <v-snackbar
      v-model="bNotificacionError"
      :timeout="2000"
      color="deep-purple-accent-4"
      elevation="24"
      @input="bNotificacionError = false"
    >
      <span style="color:white">{{ cMensajeError }}</span>
    </v-snackbar>     
    <!-- \Notificaciones de errores al usuario --> 

    <!-- Notificaciones al usuario --> 
    <v-snackbar
      v-model="bNotificacion"
      :timeout="2000"
      color="light-green"
      elevation="24"
      @input="bNotificacion = false"
    >
      <span style="color:black">{{ cMensaje }}</span>
    </v-snackbar>     
    <!-- \Notificaciones al usuario -->     

  </v-container>
</template>

<script>
import axios from 'axios' // Importación de Axios  
import { stringifyQuery } from 'vue-router';

export default {
  
  name: "Test",
  props: {
    numcapcon: String,    //  Número de capacitación
  },
  created() {},
  data() {
    return {
      cNombre: "",
      cApellido: "",
      cTelefono:  "",
      cEmpresa: "",
      cPais: "",
      cCorreo: "",
      cMensaje: "",
      paises: [ 
          "Chile",
          "Colombia",
          'Ecuador',
          "El Salvador",
          "México",
          "Panamá",
          "Perú",
          "Venezuela",
      ],
      emacon : "",                //  Email del contacto    
      nomcon: "",                 //  Nombre del contacto
      apecon: "",                 //  Apellido del contacto
      telcon: "",                 //  Teléfono del contacto
      comcon: "",                 //  Comentario del contacto
      paicon: "",                 //  País del contacto         
      empcon: "",                 //  Empresa del contacto      
      fechorcon: new Date(),      //  Fecha y hora del contacto
      cServidor: import.meta.env.VITE_API_URL,
      cEmailRepetido: "",         //  Email repetido
      cCapacitacionRepetida: "",  //  Capacitación repetida
      bNotificacionError: false,  //  Notificación de error 
      bNotificacion: false,       //  Notificación de éxito
      cMensajeError: "",          //  Mensaje de error
      cMensaje: "",               //  Mensaje de éxito
    };
  },
  methods: {
   
    bValidarDatos() {
      if(this.nomcon=="" || this.apecon=="" || this.telcon=="" || this.emacon=="" || this.comcon=="" || this.paicon=="" || this.empcon=="") {
        return false;
      }
      return true;
    },
    
    async EnviarContacto() {
      if(this.cEmailRepetido!="" && this.cCapacitacionRepetida!="") {
        if(this.cEmailRepetido==this.emacon && this.cCapacitacionRepetida==this.numcapcon) {     
          this.cMensajeError = "Estabas registrado previamente a ésta capacitación"
          this.bNotificacionError = true;     
          return;
        }
      }
      if (!this.bValidarDatos())
          {
            this.cMensajeError="Debe completar el formulario"
            this.bNotificacionError=true
            return;
          };       
      try {
          const objetoJSON = {
              emacon: this.emacon,
              numcapcon: this.numcapcon,
              nomcon: this.nomcon,
              apecon: this.apecon,
              telcon: this.telcon,
              empcon: this.empcon,
              paicon: this.paicon,
              comcon: this.comcon,
              fechorcon: this.fechorcon.toISOString(), // Convertimos el objeto Date a un string ISO
          };
          const url = this.cServidor + '/agregarcontactocliente/';
          const response = await axios.put(url, objetoJSON);
          console.log('Respuesta del servidor:', response.data);
          // Proceso exitoso - Notifico al usuario
          this.cMensaje               =  "Su mensaje ha sido enviado con éxito. ¡Gracias por contactarnos!"; // Personaliza este mensaje según sea necesario
          this.bNotificacion          =   true; // Muestra la notificación de éxito
          this.cEmailRepetido         =   this.emacon
          this.cCapacitacionRepetida  =   this.numcapcon
          this.bNotificacionError     =   false;

      } catch (error) {
          if (error.response && error.response.status === 400) {
              // Manejar el caso específico de registro existente
              this.bNotificacionError  =   true;
              this.cEmailRepetido         =   this.emacon
              this.cCapacitacionRepetida  =   this.numcapcon
              this.cMensajeError          =   "Estabas registrado previamente a ésta capacitación"      
              // Puedes mostrar un mensaje al usuario aquí, si es necesario
          } else {
              // Manejar otros tipos de errores
              console.error('Error al enviar datos:', error);
          }
      }
    }
 

  },
};
</script>

<style lang="scss" scoped>
.v-container {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width:98%;
  border-radius:8px;
}

@media (min-width: 1201px) {
  /* Estilos para pantallas de más de 1201px */
  .v-container {
    width:70%;
  }
}

@media (max-width: 700px) {
  /* Estilos para pantallas de menos de 400px */
  .columna {
    /* Por ejemplo, podrías hacer que las columnas ocupen el 100% del ancho */
    flex: 0 0 100%;
    max-width: 100%;
  }
}

</style>