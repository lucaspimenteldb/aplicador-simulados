<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Listagem de usuários
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Todos os usuários
        </header-secao>
      </v-col>

      <v-col
              cols="12" sm="5"
              md="5"
      >
        <v-select
                :items="['login', 'email', 'email2']"
                filled
                v-model="login"
                label="Escolha por onde começar" color="azul"
                hide-details
        />
      </v-col>

      <v-col
              cols="12" sm="5"
              md="5"
      >
        <v-text-field
                filled
                :label="'Filtrar por '+login" color="azul"
                hide-details
                v-model="pesquisar"
        />
      </v-col>

      <v-col
              cols="12" sm="2"
              md="2"
      >
        <v-btn
                small
                color="azul" class="text-none white--text rounded__normal"
                @click="getUsuarioByEmail"
        >
          Pesquisar por {{login}}
        </v-btn>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-autocomplete
            :items="escolas.map(el => el.nome)"
            filled
            @change="changeEscola"
            v-model="escolaSelecionada"
            label="Filtrar por escola" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="turmas.map(el => el.descricao)"
            filled
            @change="carregarUsuarios"
            v-model="turmaSelecionada"
            label="Filtrar por turma" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" sm="6"
          md="4"
      >
        <v-autocomplete
            :items="privilegios.map(el => el.name)"
            filled
            @change="carregarUsuarios"
            v-model="privilegioSelecionado"
            label="Filtrar por privilégio" color="azul"
            hide-details
        />
      </v-col>

      <v-col cols="12">
        <v-text-field
            label="Pesquisar usuario"
            filled
            color="azul"
            append-icon="mdi-magnify"
            class="max-w-240 float-right"
            hide-details
            v-model="search"
        />

        <v-data-table
            :headers="headerUsuarios" :items="listaUsuarios"
            fixed-header
            :footer-props="{itemsPerPageText: 'Usuários por página', itemsPerPageOptions: [ 10, 20, 25 ]}"
            :search="search"
            class="clear-both text-no-wrap"
        >
          <template v-slot:item.editar="{ item }">
            <v-btn
                small
                color="azul" class="text-none white--text rounded__normal"
                @click="passar(item.id)"
            >
              editar dados
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <v-col>
        <v-btn
            color="azul" class="text-none white--text rounded__normal"
            to="/adicionar-usuario"
        >
          Adicionar usuário
        </v-btn>
      </v-col>
    </v-row>
  <loading :dialog="loading" />
  </v-container>
</template>

<script>
import loading from '../components/loading/Loading.vue';

export default {
  name: 'ListagemUsuario',
  components: {
    loading,
  },

  data () {
    return {
      search: '',
      escolaSelecionada: '',
      turmaSelecionada: '',
      privilegioSelecionado: '',
      escolas: [],
      privilegios: [],
      turmas: [],
      loading: false,
      login: 'login',
      pesquisarLogin: '',

      headerUsuarios: [
        // {
        //   text: 'Foto',
        //   align: 'start',
        //   sortable: false,
        //   value: 'foto',
        //   class: 'body-2 font-weight-bold',
        // },
        {
          text: 'Email',
          align: 'start',
          sortable: false,
          value: 'email',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Email 2',
          align: 'start',
          sortable: false,
          value: 'email2',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Telefone',
          align: 'start',
          sortable: false,
          value: 'telefone',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Usuário',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Privilégio',
          align: 'start',
          sortable: false,
          value: 'Privilege.name',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          align: 'start',
          sortable: false,
          value: 'Escolas[0].nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'turma',
          align: 'start',
          sortable: false,
          value: 'Turmas[0].descricao',
          class: 'body-2 font-weight-bold',
        },
        // {
        //   text: 'Turno',
        //   align: 'start',
        //   sortable: false,
        //   value: 'turno',
        //   class: 'body-2 font-weight-bold',
        // },
        {
          text: 'Status',
          align: 'start',
          sortable: false,
          value: 'status',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Editar',
          align: 'start',
          sortable: false,
          value: 'editar',
          class: 'body-2 font-weight-bold',
        },
      ],
      listaUsuarios: [

      ],
      pesquisar: '',
    };
  },
  
  async created () {
    try {
      this.loading = true;
      const escolas = await this.$http.get('escola-atuais/escola', { headers: { Authorization: this.$store.state.token } });
      this.escolas = escolas.data.escolas;
      this.privilegios = escolas.data.privileges;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  },

  mounted () {
    document.querySelector('.v-data-footer__select > div').style.marginLeft = '1rem';
  },

  methods: {
    passar (id) {
      this.$router.push(`/editar-usuario/${id}`);
    },
    async changeEscola (event) {
      try {
        this.loading = true;
        const filterEscola = this.escolas.filter((e) => e.nome === event);
        if (filterEscola.length > 0) {
          const turmas = await this.$http.get(`turmas/${filterEscola[0].id}`, { headers: { Authorization: this.$store.state.token } });
          this.turmas = turmas.data.turmas;
        }
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
        alert('Erro ao carrega as turmas');
      }
    },

    async getUsuarioByEmail () {
      try {
        this.loading = true;
        if (this.login && this.pesquisar) {
          const objeto = { coluna: this.login, fied: this.pesquisar };
          const usuarios = await this.$http.post('users/listar-usuarios-login', objeto, { headers: { Authorization: this.$store.state.token } });
          this.listaUsuarios = usuarios.data.usuarios;
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
        alert('Erro ao carrega as turmas');
      }
    },

    async carregarUsuarios () {
      try {
        this.loading = true;
        const filterEscola = this.escolas.filter((e) => e.nome === this.escolaSelecionada);
        const filterPrivi = this.privilegios.filter((e) => e.name === this.privilegioSelecionado);
        const filterTurma = this.turmas.filter((e) => e.descricao === this.turmaSelecionada);
        if (filterEscola.length > 0 && filterPrivi.length > 0 && filterTurma.length > 0) {
          const objeto = { id_cms_privileges: filterPrivi[0].id, id_turma: filterTurma[0].id, id_escola: filterEscola[0].id };
          const usuarios = await this.$http.post('users/listar-usuarios', objeto, { headers: { Authorization: this.$store.state.token } });
          this.listaUsuarios = usuarios.data.usuarios;
          console.log((usuarios.data));
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
        alert('Erro ao carrega as turmas');
      }
    },
  },
};
</script>

<style scoped>

</style>
