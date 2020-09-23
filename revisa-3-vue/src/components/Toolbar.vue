<template>
  <!--NAVBAR-->
  <nav>
    <v-app-bar
        :class="{'ml-260': menuLateral}" class="transition flex align-center"
        app color="azulEscuro"
        height="64px"
    >
      <v-app-bar-nav-icon
          @click.stop="mudarMenu" fab
          class="text-lowercase text-caption"
          :class="{ 'd-none': width > 640 }"
          dark
      >
        <v-icon
            class="ml-8" v-text="'mdi-menu'"
        />
        menu
      </v-app-bar-nav-icon>

      <v-toolbar-title
          class="white--text" v-text="'RevisaENEM'"
          :class="{ 'd-none': width < 640 }"
      />
    </v-app-bar>
  </nav>
</template>

<script>
import { Busao } from '../main';

export default {
  name: 'Toolbar',

  components: {

  },

  data: () => ({
    menuLateral: false,
    width: 0,
    notificacoes: ['uma notificacao', 'duas notificacoes'],
  }),

  created () {
    this.width = window.innerWidth;
  },

  mounted () {
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });

    Busao.$on('fecharMenu', (data) => {
      this.menuLateral = data;
    });
  },

  methods: {
    mudarMenu () {
      this.menuLateral = !this.menuLateral;
      Busao.$emit('estadoMenu', this.menuLateral);
    },

    text () {
      console.log('jesus');
    },

  },

};
</script>

<style scoped>

</style>
