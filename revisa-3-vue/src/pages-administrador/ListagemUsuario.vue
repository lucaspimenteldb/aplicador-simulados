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
        <v-select
            :items="['Escola 1', 'Escola 2']"
            filled
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
            :items="['Turma 1', 'Turma 2']"
            filled
            v-model="turmaSelecionada"
            label="Filtrar por turma" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" sm="6"
          md="4"
      >
        <v-select
            :items="['Professor', 'Aluno', 'Gestor']"
            filled
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
            :search="pesquisar"
            class="clear-both text-no-wrap"
        >
          <template v-slot:item.editar="{ item }">
            <v-btn
                small
                color="azul" class="text-none white--text rounded__normal"
                :to="item.editar"
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

  </v-container>
</template>

<script>
export default {
  name: 'ListagemUsuario',

  data () {
    return {
      escolaSelecionada: '',
      turmaSelecionada: '',
      privilegioSelecionado: '',

      headerUsuarios: [
        {
          text: 'Foto',
          align: 'start',
          sortable: false,
          value: 'foto',
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
          value: 'usuario',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Privilégio',
          align: 'start',
          sortable: false,
          value: 'privilegio',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          align: 'start',
          sortable: false,
          value: 'escola',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'turma',
          align: 'start',
          sortable: false,
          value: 'turma',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Turno',
          align: 'start',
          sortable: false,
          value: 'turno',
          class: 'body-2 font-weight-bold',
        },
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
        {
          foto: 'oi',
          email: 'lucas@gmail.com',
          'email-2': 'lucas@gmail.com22',
          telefone: '(86) 98183.3894',
          usuario: 'jesus@gmail.com',
          privilegio: 'Deus',
          escola: 'Escola Maria das Dores',
          turma: '3ano B',
          turno: 'Vespertino',
          status: 'ativo',
          editar: '/editar-usuario',
        },
      ],
      pesquisar: '',
    };
  },

  mounted () {
    document.querySelector('.v-data-footer__select > div').style.marginLeft = '1rem';
  },
};
</script>

<style scoped>

</style>
