<template>

  <!--MENU LATERAL-->
  <v-navigation-drawer
      app v-model="menuLateral"
      width="260" mobile-breakpoint="960"
      color="azulEscuro" floating
      dark class="transition z-1000"
      :permanent="width > 640" :expand-on-hover="width > 640"
      @transitionend="fecharMenu"
  >
    <!--avatar e nome-->
    <v-list
        dense nav
        class="pa-0" height="64px"
    >
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="photo">
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            {{nome}}
          </v-list-item-title>

          <v-list-item-subtitle>
            Nível 7
            <v-progress-linear
                color="white" rounded
                v-model="nivel" class="w-full"
            />
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!--fim do avatar e nome-->

    <v-divider />

    <v-list
        nav dense
        class="d-flex flex-column justify-space-between h-menu__lateral"
    >
      <section>
        <div
            v-for="(item, i) in itens" :key="i"
        >
          <v-list-item
              link :to="item.rota"
              v-if="!item.menu" class="mb-2"
          >
            <v-list-item-icon class="mr-4">
              <v-icon
                  class="mr-0" v-text="item.icon"
              />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.ttl }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group
              link :to="item.rota"
              class="ma-0 mb-2 w-full" v-if="item.menu"
              color="white"
          >
            <template v-slot:activator>
              <v-list-item-icon class="mr-4 white--text">
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-title
                  class="ma-0 white--text" v-text="item.ttl"
              />
            </template>

            <v-list-item
                v-for="(subMenu, i) in item.submenu" :key="i"
                :to="subMenu.rota" :disabled="subMenu.disabled"
            >
              <v-list-item-icon
                  v-text="subMenu.volume" class="ml-2 white--text"
              />

              <v-list-item-title
                  v-text="subMenu.volume" class="white--text"
              />

              <v-icon
                  v-text="subMenu.icon" small
                  class="white--text"
              />
            </v-list-item>
          </v-list-group>
        </div>
      </section>

      <v-list-item
          link @click="aparecerModal"
          class="h-40 max-h-40 mb-2"
      >
        <v-list-item-icon class="mr-4">
          <v-icon
              class="mr-0" v-text="'mdi-logout'"
          />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            Sair
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <ModalPadrao :dialog="dialog" @aparecerModal="sumirModal" />
  </v-navigation-drawer>
</template>

<script>
import { Busao } from '../main';
import storage from '../storage/storage';
import env from '../env';
import ModalPadrao from "./modal/ModalPadrao";

export default {
  name: 'MenuLateral',
  components : {
    ModalPadrao
  },
  data () {
    return {
      menuLateral: false,
      width: 0,
      nivel: 70,

      itens: [
        {
          icon: 'mdi-home-outline',
          ttl: 'Tela inicial',
          rota: '/home',
          menu: false,
        },
        {
          icon: 'mdi-check-box-multiple-outline',
          ttl: 'Simulados',
          rota: '/simulados-atividades-escolares',
          menu: false,
        },
        {
          icon: 'mdi-pencil-outline',
          ttl: 'Redação',
          rota: '/redacoes',
          menu: false,
        },
        {
          icon: 'mdi-poll-box-outline',
          ttl: 'Meu Desempenho',
          rota: '/desempenho-geral',
          menu: false,
        },
        {
          icon: 'mdi-trophy-variant-outline',
          ttl: 'Rankings',
          rota: '/ranking',
          menu: false,
        },
        {
          icon: 'mdi-face-agent',
          ttl: 'Fale conosco',
          rota: '/suporte',
          menu: false,
        },
      ],
      nome: '',
      photo: '',
      dialog: false,
    };
  },

  created () {
    const objeto = JSON.parse(storage.get('token'));
    this.width = window.innerWidth;
    this.photo = objeto.photo ? env.ROTA_DOMINIO + objeto.photo : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
    this.nome = objeto.name ? objeto.name : '';
  },

  mounted () {
    Busao.$on('estadoMenu', (data) => {
      this.menuLateral = data;
    });

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });
  },

  methods: {
    fecharMenu () {
      if (this.menuLateral === false) {
        Busao.$emit('fecharMenu', this.menuLateral);
      }
    },

    aparecerModal () {
      this.dialog = true;
    },
    sumirModal ($event) {
      this.dialog = $event;
    }
  },
};
</script>

<style scoped>

</style>
