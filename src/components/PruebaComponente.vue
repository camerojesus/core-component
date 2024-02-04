<template>
  <div>
    <!-- Botón para controlar la visibilidad del drawer -->
    <v-btn icon @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <!-- Navigation Drawer, vinculado a la variable 'drawer' para controlar su visibilidad -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <!-- Elemento clickeable que abre el menú, con referencia para medir altura -->
      <P>ASDADSADASDASDASD</P>
      <P>U U U U U U U U U</P>
      <p ref="menuItem" @click="toggleMenu($event)">Uno dos</p>
      <p>ASas AS sa SA</p>
      <!-- Menú con opciones, posicionado dinámicamente justo debajo del elemento <p> -->
      <v-menu v-model="menu" :position-x="x" :position-y="y" offset-y>
        <v-list>
          <v-list-item @click="selectOption('Primaria')">
            <v-list-item-title>Primaria</v-list-item-title>
          </v-list-item>
          <v-list-item @click="selectOption('Secundaria')">
            <v-list-item-title>Secundaria</v-list-item-title>
          </v-list-item>
          <v-list-item @click="selectOption('Terceria')">
            <v-list-item-title>Terceria</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menu: false,
      x: 0,
      y: 0,
    };
  },
  methods: {
    toggleMenu(event) {
      // Obtiene la posición del elemento y su altura para ajustar la posición del menú
      const rect = event.target.getBoundingClientRect();
      this.x = rect.left; // Posición X basada en el elemento, puedes ajustar según necesites
      this.y = rect.top + rect.height + window.scrollY; // Ajusta Y para que el menú aparezca debajo del elemento
      
      this.menu = !this.menu;
    },
    selectOption(option) {
      console.log(option); // Maneja la selección de opción
      this.menu = false; // Cierra el menú después de seleccionar una opción
    }
  }
};
</script>
