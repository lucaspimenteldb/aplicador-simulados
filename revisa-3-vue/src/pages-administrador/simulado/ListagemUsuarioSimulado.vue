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
              editar usuário
            </v-btn>
          </template>
        </v-data-table>
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

  mounted () {
    document.querySelector('.v-data-footer__select > div').style.marginLeft = '1rem';
  },

};
</script>

<style scoped>

</style>
