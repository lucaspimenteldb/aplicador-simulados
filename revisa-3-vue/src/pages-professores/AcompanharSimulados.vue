<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Acompanhar Simulados Estaduais
        </h1>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="5" lg="4"
          v-for="select of selects" :key="select.label"
      >
        <v-select
            filled
            hide-details
            color="azul"
            v-model="select.model"
            :items="select.items"
            :label="select.label"
            @change="mudarModal"
        />
      </v-col>
    </v-row>

    <!-- professor e coordenador -->
    <v-row>
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Desempenho do {{ simuladoSelecionado }}
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerInformacoes"
            :items="informacoes"
            fixed-header
            :search="search"
        >
          <template v-slot:item.simulado="{ item }">
            <p
                class="font-weight-bold"
                :class="{ 'acertou--text':item.simulado === 'Entregue', 'errou--text':item.simulado === 'Não entregue' }"
            >
              {{ item.simulado }}
            </p>
          </template>

          <template v-slot:item.redacao="{ item }">
            <p
                class="font-weight-bold acertou--text"
                :class="[ item.simulado === 'Entregue' ? 'acertou--text' : 'errou--text' ]"
            >
              {{ item.redacao }}
            </p>
          </template>
        </v-data-table>
        <v-btn
            filled
            color="azul"
            v-text="'Exportar todos os dados'"
            class="mt-2 white--text text-none"
        />
      </v-col>
    </v-row>

    <!-- só coordenador -->
    <v-row>
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Desempenho do {{ simuladoSelecionado }} por escola
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerCoordenador"
            :items="informacoesCoordenador"
            fixed-header
            :search="search"
        />

        <v-btn
            filled
            color="azul"
            v-text="'Exportar todos os dados'"
            class="mt-2 white--text text-none"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AcompanharSimulados',

  data () {
    return {
      simuladoSelecionado: '',

      selects: [
        {
          model: '',
          items: ['nada', 'algo'],
          label: 'Selecione qual simulado quer ver',
        },
        {
          model: '',
          items: ['nada'],
          label: 'Selecione qual escola quer ver',
        },
        {
          model: '',
          items: ['nada'],
          label: 'Selecione qual turma quer ver',
        },
        {
          model: '',
          items: ['Iniciados', 'Entregues', 'Não iniciados', 'Todos'],
          label: 'Selecione a situação do simulado',
        },
      ],

      search: '',
      headerInformacoes: [
        {
          text: 'Nome',
          value: 'nome',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          value: 'escola',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Turma/Turno',
          value: 'turma',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulado',
          value: 'simulado',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          value: 'redacao',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
      ],
      headerCoordenador: [
        {
          text: 'Escola',
          value: 'escola',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulados Iniciados',
          value: 'iniciados',
          sortable: true,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulados Entregues',
          value: 'entregues',
          sortable: true,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Total',
          value: 'total',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          value: 'redacao',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
      ],

      informacoes: [
        {
          nome: 'lucas',
          escola: 'escola x doidona amrivalda',
          turma: '3 ano B / Tarde',
          simulado: 'Iniciado',
          redacao: 'Entregue',
        },
        {
          nome: 'lucas',
          escola: 'escola x doidona amrivalda',
          turma: '3 ano B / Tarde',
          simulado: 'Não entregue',
          redacao: 'Entregue',
        },
        {
          nome: 'lucas',
          escola: 'escola x doidona amrivalda',
          turma: '3 ano B / Tarde',
          simulado: 'Entregue',
          redacao: 'Entregue',
        },
      ],
      informacoesCoordenador: [
        {
          escola: 'escola x doidona amrivalda',
          iniciados: 485,
          entregues: 234,
          get total () {
            return this.iniciados + this.entregues;
          },
          redacao: '234 entregues',
        },
      ],
    };
  },

  methods: {
    mudarModal () {
      this.simuladoSelecionado = this.selects[0].model;
    },
  },
};
</script>

<style scoped>

</style>
