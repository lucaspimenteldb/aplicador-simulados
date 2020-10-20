<template>
  <v-app>

    <MenuLateral v-if="autenticado" />
    <Toolbar v-if="autenticado" />

    <v-main class="pa-sm-16 mr-0 grey lighten-4">
      <keep-alive class="pa-sm-16 mr-0 grey lighten-4">
      <router-view
              class="pa-4 mx-0" :class="'mr-0 ml-0'"
      />
      </keep-alive>

    </v-main>
  </v-app>
</template>

<script>

import MenuLateral from './components/MenuLateral.vue';
import Toolbar from './components/Toolbar.vue';
// eslint-disable-next-line import/no-cycle
import { Busao } from './main';
import storage from './storage/storage';

export default {
  name: 'App',

  components: {
    MenuLateral, Toolbar,
  },

  data () {
    return {
      autenticado: false,
    };
  },

  created () {
    const objeto = storage.get('token');
    if (objeto) {
      const menu = JSON.parse(objeto);
      this.$store.commit('DEFINIR_USUARIO_LOGADO', {
        token: `Bearer ${menu.token}`,
      });
      this.autenticado = menu.menu;
      this.emitWebSocket(menu.id);
    }
  },

  methods: {
    emitWebSocket (usuarioId) {
      this.$socket.emit('Autentication', { data: usuarioId });
    },
  },

  mounted () {
    Busao.$on('autenticado', (d, id = 0) => {
      this.autenticado = d;
      this.emitWebSocket(id);
    });
  },
};
</script>
