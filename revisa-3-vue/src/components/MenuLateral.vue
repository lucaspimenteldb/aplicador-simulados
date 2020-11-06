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

<!--          <v-list-item-subtitle>-->
<!--            Nível 7-->
<!--&lt;!&ndash;            <v-progress-linear&ndash;&gt;-->
<!--&lt;!&ndash;                color="white" rounded&ndash;&gt;-->
<!--&lt;!&ndash;                v-model="nivel" class="w-full"&ndash;&gt;-->
<!--&lt;!&ndash;            />&ndash;&gt;-->
<!--          </v-list-item-subtitle>-->
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
            v-for="(item, i) in routes" :key="i"
        >
          <v-list-item
              link :to="item.path"
              v-if="item.menu" class="mb-2"
              @click="goTop"
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

<!--          <v-list-group-->
<!--              link :to="item.path"-->
<!--              class="ma-0 mb-2 w-full" v-if="item.menu"-->
<!--              color="white"-->
<!--          >-->
<!--            <template v-slot:activator>-->
<!--              <v-list-item-icon class="mr-4 white&#45;&#45;text">-->
<!--                <v-icon v-text="item.icon" />-->
<!--              </v-list-item-icon>-->
<!--              <v-list-item-title-->
<!--                  class="ma-0 white&#45;&#45;text" v-text="item.ttl"-->
<!--              />-->
<!--            </template>-->

<!--&lt;!&ndash;            <v-list-item&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="(subMenu, i) in item.submenu" :key="i"&ndash;&gt;-->
<!--&lt;!&ndash;                :to="subMenu.rota" :disabled="subMenu.disabled"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <v-list-item-icon&ndash;&gt;-->
<!--&lt;!&ndash;                  v-text="subMenu.volume" class="ml-2 white&#45;&#45;text"&ndash;&gt;-->
<!--&lt;!&ndash;              />&ndash;&gt;-->

<!--&lt;!&ndash;              <v-list-item-title&ndash;&gt;-->
<!--&lt;!&ndash;                  v-text="subMenu.volume" class="white&#45;&#45;text"&ndash;&gt;-->
<!--&lt;!&ndash;              />&ndash;&gt;-->

<!--&lt;!&ndash;              <v-icon&ndash;&gt;-->
<!--&lt;!&ndash;                  v-text="subMenu.icon" small&ndash;&gt;-->
<!--&lt;!&ndash;                  class="white&#45;&#45;text"&ndash;&gt;-->
<!--&lt;!&ndash;              />&ndash;&gt;-->
<!--&lt;!&ndash;            </v-list-item>&ndash;&gt;-->
<!--          </v-list-group>-->
        </div>
      </section>

      <v-list-item
          link @click="aparecerModal"
          class="mb-12 mb-sm-0 h-40 max-h-40"
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

    <ModalPadrao
        :objeto="objeto" @aparecerModal="sumirModal"
    />
  </v-navigation-drawer>
</template>

<script>
import { Busao } from '../main';
import storage from '../storage/storage';
import env from '../env';
import ModalPadrao from './modal/ModalPadrao.vue';

export default {
  name: 'MenuLateral',
  components: {
    ModalPadrao,
  },
  data () {
    return {
      menuLateral: false,
      width: 0,
      nivel: 70,

      itens: [
        // {
        //   icon: 'mdi-home-outline',
        //   ttl: 'Tela inicial',
        //   rota: '/home',
        //   menu: false,
        // },
        // {
        //   icon: 'mdi-check-box-multiple-outline',
        //   ttl: 'Simulados',
        //   rota: '/simulados-atividades-escolares',
        //   menu: false,
        // },
        // {
        //   icon: 'mdi-pencil-outline',
        //   ttl: 'Redação',
        //   rota: '/redacoes',
        //   menu: false,
        // },
        {
          icon: 'mdi-poll-box-outline',
          ttl: 'Meu Desempenho',
          rota: '/home',
          menu: false,
        },
        {
          icon: 'mdi-trophy-variant-outline',
          ttl: 'Rankings',
          rota: '/ranking',
          menu: false,
        },
        {
          icon: 'mdi-youtube',
          ttl: 'Aulas de Revisão',
          rota: '/aulas-gratuitas',
          menu: false,
        },
        // {
        //   icon: 'mdi-face-agent',
        //   ttl: 'Fale conosco',
        //   rota: '/suporte',
        //   menu: false,
        // },
      ],
      nome: '',
      photo: '',
      objeto: {
        dialog: false,
        titulo: 'Tem certeza que deseja sair?',
        textConfirm: 'Sair',
        textButton: 'Cancelar',
        confirm: true,
      },
    };
  },

  props: {
    routes: [],
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
      this.objeto.dialog = true;
    },

    sumirModal ($event) {
      this.objeto.dialog = $event;
    },

    goTop () {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
  },
};
</script>

<style scoped>

</style>
