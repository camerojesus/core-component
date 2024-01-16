<template>
  <v-container class="v-container">
     <v-row class="d-flex justify-center">
        <h2 style="color:rgb(56,58,117)">Contáctanos en línea</h2>
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
          <v-select
            :items="paises"
            label="Selecciona un país"
            return-object
          ></v-select>        
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
     <v-row class="dflex justify-end mr-20px mb-2">
        <v-btn color="rgb(230,174,52)">
          Enviar
        </v-btn>
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
      cMensaje: "",
      paises: [ 
          "Afganistán",
          "Albania",
          "Alemania",
          "Andorra",
          "Angola",
          "Anguilla",
          "Antigua y Barbuda",
          "Antártida",
          "Arabia Saudita",
          "Argelia",
          "Argentina",
          "Armenia",
          "Aruba",
          "Australia",
          "Austria",
          "Azerbaiyán",
          "Bahamas",
          "Bahréin",
          "Bangladesh",
          "Barbados",
          "Belize",
          "Benín",
          "Bermudas",
          "Bhután",
          "Bielorrusia",
          "Birmania",
          "Bolivia",
          "Bonaire, San Eustaquio y Saba",
          "Bosnia-Herzegovina",
          "Botsuana",
          "Brasil",
          "Brunei Darussalam",
          "Bulgaria",
          "Burkina Faso",
          "Burundi",
          "Bélgica",
          "Cabo Verde",
          "Camboya",
          "Camerún",
          "Canadá",
          "Canary Islands",
          "Chad",
          "Chile",
          "China",
          "Chipre",
          "Colombia",
          "Comores",
          "Congo",
          "Corea del Norte",
          "Corea del Sur",
          "Costa Rica",
          "Costa de Marfil",
          "Croacia",
          "Cuba",
          "Curaçao",
          "Dinamarca",
          "Dominica",
          "EE.UU. Islas Exteriores Menores",
          "Ecuador",
          "Egipto",
          "El Salvador",
          "Emiratos Árabes Unidos",
          "Eritrea",
          "Eslovaquia",
          "Eslovenia",
          "España",
          "Estado de Palestina",
          "Estados Unidos",
          "Estonia",
          "Eswatini",
          "Etiopía",
          "Federación Rusa",
          "Fiji",
          "Filipinas",
          "Finlandia",
          "Francia",
          "Gabón",
          "Gambia",
          "Georgia",
          "Ghana",
          "Gibraltar",
          "Granada",
          "Grecia",
          "Groenlandia",
          "Guadalupe",
          "Guam",
          "Guatemala",
          "Guayana",
          "Guayana Francesa",
          "Guernsey",
          "Guinea",
          "Guinea Ecuatorial",
          "Guinea-Bisáu",
          "Haití",
          "Holanda",
          "Honduras",
          "Hong Kong",
          "Hungría",
          "India",
          "Indonesia",
          "Irak",
          "Irlanda",
          "Irán",
          "Isla Bouvet",
          "Isla Norfolk",
          "Isla de Man",
          "Isla de Navidad",
          "Islandia",
          "Islas Caimán",
          "Islas Cocos (Keeling)",
          "Islas Cook",
          "Islas Feroe",
          "Islas Georgia del sur y Sandwich del sur",
          "Islas Heard y McDonald",
          "Islas Malvinas",
          "Islas Marianas del Norte",
          "Islas Marshall",
          "Islas Pitcairn",
          "Islas Salomón",
          "Islas Turcas y Caicos",
          "Islas Vírgenes (Británicas)",
          "Islas Vírgenes (EE.UU.)",
          "Islas Åland",
          "Israel",
          "Italia",
          "Jamaica",
          "Japón",
          "Jersey",
          "Jordania",
          "Kazajstán",
          "Kenia",
          "Kirguistán",
          "Kiribati",
          "Kosovo",
          "Kuwait",
          "Laos",
          "Lesotho",
          "Letonia",
          "Liberia",
          "Libia",
          "Liechtenstein",
          "Lituania",
          "Luxemburgo",
          "Líbano",
          "Macao",
          "Macedonia del Norte",
          "Madagascar",
          "Malasia",
          "Malawi",
          "Maldivas",
          "Mali",
          "Malta",
          "Marruecos",
          "Martinica",
          "Mauricio",
          "Mauritania",
          "Mayotte",
          "Micronesia",
          "Moldavia",
          "Mongolia",
          "Montenegro",
          "Montserrat",
          "Mozambique",
          "México",
          "Mónaco",
          "Namibia",
          "Nauru",
          "Nepal",
          "Netherlands Antilles",
          "Neutral Zone",
          "Nicaragua",
          "Nigeria",
          "Niue",
          "Noruega",
          "Nueva Caledonia",
          "Nueva Zelanda",
          "Níger",
          "Omán",
          "Pakistán",
          "Palau",
          "Panamá",
          "Papúa Nueva Guinea",
          "Paraguay",
          "Perú",
          "Polinesia Francesa",
          "Polonia",
          "Portugal",
          "Puerto Rico",
          "Qatar",
          "Reino Unido",
          "República Centro Africana",
          "República Checa",
          "República Democrática del Congo",
          "República Dominicana",
          "Reunión",
          "Ruanda",
          "Rumania",
          "Samoa",
          "Samoa Americana",
          "San Bartolomé",
          "San Cristóbal y Nieves",
          "San Marino",
          "San Martín (parte holandesa)",
          "San Martín (zona francesa)",
          "San Pierre y Miquelon",
          "San Vicente y las Granadinas",
          "Santa Cruz de Tenerife",
          "Santa Elena, Ascensión y Tristán de Acuña",
          "Santa Lucía",
          "Santa Sede (Ciudad Estado del Vaticano)",
          "Santo Tomé y Príncipe",
          "Senegal",
          "Serbia",
          "Seychelles",
          "Sierra Leona",
          "Singapur",
          "Siria",
          "Somalia",
          "Somaliland",
          "Sri Lanka",
          "Sudáfrica",
          "Sudán",
          "Sudán del Sur",
          "Suecia",
          "Suiza",
          "Surinam",
          "Svalbard y Jan Mayen",
          "Sáhara occidental",
          "Tailandia",
          "Taiwán",
          "Tajikistán",
          "Tanzania",
          "Territorio británico del Océano Índico",
          "Territorios franceses del sur",
          "Timor Oriental",
          "Timor oriental",
          "Togo",
          "Tokelau",
          "Tonga",
          "Trinidad y Tobago",
          "Turkmekistán",
          "Turquía",
          "Tuvalu",
          "Túnez",
          "Ucrania",
          "Uganda",
          "Uruguay",
          "Uzbekistán",
          "Vanuatu",
          "Venezuela",
          "Vietnam",
          "Wallis y Futuna",
          "Yemen",
          "Yibuti",
          "Zambia",
          "Zimbabwe",
]      
    };
  },
  props: {},
  methods: {},
};
</script>

<style scoped>
.v-container {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width:98%
}
@media (min-width: 1201px) {
  /* Tus estilos aquí */
  .v-container {
    width:70%;
  }
}


</style>