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
            :items="turmas.map(el=>el.descricao)"
            filled
            @change="carregarUsuarios"
            v-model="turmaSelecionada"
            label="Filtrar por turma" color="azul"
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
                :to="item.editar"
            >
              editar usuário
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <loading :dialog="loading" />
  </v-container>
</template>

<script>
import loading from '../../components/loading/Loading.vue';

export default {
  name: 'ListagemUsuario',
  components: { loading },

  data () {
    return {
      search: '',
      escolaSelecionada: '',
      turmaSelecionada: '',
      turmas: [],
      privilegioSelecionado: '',
      loading: false,
      escolas: [],
      headerUsuarios: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
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
          value: 'email-2',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulado Estadual',
          align: 'start',
          sortable: false,
          value: 'simulado',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Língua Estrangeira',
          align: 'start',
          sortable: false,
          value: 'lingua',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Início',
          align: 'start',
          sortable: false,
          value: 'inicio',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Fim',
          align: 'start',
          sortable: false,
          value: 'fim',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Situação',
          align: 'start',
          sortable: false,
          value: 'situacao',
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
        {
          nome: 'Manoelzin',
          email: 'lucas@gmail.com',
          'email-2': 'lucas@gmail.com22',
          simulado: 'Simulado 1',
          lingua: 'espanhol',
          inicio: '21/10/2020',
          fim: '21/10/2020',
          situacao: 'Iniciado',
          editar: '/editar-usuario-simulado',
        },
      ],
      pesquisar: '',
    };
  },

  methods: {
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
    async carregarUsuarios () {
      try {
        this.loading = true;
        const filterEscola = this.escolas.filter((e) => e.nome === this.escolaSelecionada);
        const filterTurma = this.turmas.filter((e) => e.descricao === this.turmaSelecionada);
        if (filterEscola.length > 0 && filterTurma.length > 0) {
          const objeto = { id_turma: filterTurma[0].id, id_escola: filterEscola[0].id };
          const usuarios = await this.$http.post('users/usuario/usuario/usuario/upar/',
            objeto, { headers: { Authorization: this.$store.state.token } });
          this.getUsers(usuarios.data.simulados);
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
        alert('Erro ao carrega as turmas');
      }
    },

    getUsers (simulados) {
      this.listaUsuarios = [];
      for (const sim of simulados) {
        const tuber = {
          nome: sim.User.name,
          email: sim.User.email,
          'email-2': sim.User.email2,
          simulado: sim.SimuladoEstado.titulo,
          lingua: sim.id_idioma === 10 ? 'Inglês' : 'Espanhol',
          inicio: sim.data_inicio,
          fim: sim.data_fim,
          situacao: sim.situacao,
          editar: `/editar-usuario-simulado/${sim.id}`,
        };
        this.listaUsuarios.push(tuber);
      }
    },
  },

  async created () {
    try {
      this.loading = true;
      const dados = await this.$http.get('users/usuario/usuario/usuario/cadastrar-usuario',
        { headers: { authorization: this.$store.state.token } });
      this.escolas = dados.data.escolas;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      console.log(e);
    }
  },

  mounted () {
    document.querySelector('.v-data-footer__select > div').style.marginLeft = '1rem';
  },

};
</script>

<style scoped>

</style>
