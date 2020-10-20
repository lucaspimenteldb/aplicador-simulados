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
          Desempenho do {{ simuladoSelecionado }} por Aluno
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-text-field
            label="Pesquisar..."
            filled
            color="azul"
            append-icon="mdi-magnify"
            class="max-w-240 float-right"
            hide-details
            v-model="search"
        />

        <v-data-table
            :headers="headerInformacoes"
            :items="informacoes"
            fixed-header
            :search="search"
            class="clear-both"
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

          <template v-slot:item.email="{ item }">
            <v-dialog
                persistent
                max-width="500px"
                v-model="alunos[item.id]"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    filled
                    color="azul"
                    v-text="item.email"
                    class=" white--text text-none"
                    v-bind="attrs"
                    v-on="on"
                    @click.stop="$set(alunos, item.id, true)"
                />
              </template>

              <v-card>
                <v-card-title class="mb-4">
                  Enviar email para {{ item.nome }}
                </v-card-title>

                <v-card-text>
                  <v-text-field
                      filled
                      color="azul"
                      label="Assunto"
                      hide-details
                      class="mb-2"
                  />

                  <v-textarea
                      label="Mensagem..."
                      filled
                      color="azul"
                      auto-grow
                      :value="assuntoEmail"
                  />
                </v-card-text>

                <v-card-actions class="px-6">
                  <v-spacer />

                  <v-btn
                      v-text="'cancelar'"
                      color="errou"
                      text
                      class="text-none"
                      @click.stop="$set(alunos, item.id, false)"
                  />

                  <v-btn
                      color="azul"
                      v-text="'Enviar email'"
                      class="text-none white--text"
                  />
                </v-card-actions>
              </v-card>

            </v-dialog>
          </template>
        </v-data-table>

        <v-btn
            filled
            color="azul"
            v-text="'Exportar dados dos alunos'"
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
          Desempenho do {{ simuladoSelecionado }} por Escola
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerCoordenador"
            :items="informacoesCoordenador"
            fixed-header
        />

        <v-btn
            filled
            color="azul"
            v-text="'Exportar dados das escolas'"
            class="mt-2 white--text text-none"
        />
      </v-col>
    </v-row>

    <!-- diretor das CRE -->
    <v-row v-show="privilegioCRE">
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Desempenho por CRE
        </header-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerCRE"
            :items="informacoesCRE"
            fixed-header
        />

        <v-btn
            filled
            color="azul"
            v-text="'Exportar dados das CREs'"
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
      assuntoEmail: '',
      dialog: false,
      alunos: {},
      privilegioCRE: true,

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
        {
          text: '',
          value: 'email',
          sortable: false,
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
      headerCRE: [
        {
          text: 'CRE',
          value: 'cre',
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
          nome: 'Lucas Pimente',
          escola: 'escola x doidona amrivalda',
          turma: '3 ano B / Tarde',
          simulado: 'Iniciado',
          redacao: 'Entregue',
          email: 'enviar email',
          id: 0,
        },
        {
          nome: 'José',
          escola: 'escola x doidona amrivalda',
          turma: '3 ano B / Tarde',
          simulado: 'Não entregue',
          redacao: 'Entregue',
          email: 'enviar email',
          id: 2,
        },
        {
          nome: 'Mariazinha',
          escola: 'escola x doidona amrivalda',
          turma: '3 ano B / Tarde',
          simulado: 'Entregue',
          redacao: 'Entregue',
          email: 'enviar email',
          id: 3,
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
      informacoesCRE: [
        {
          cre: 'CRE X',
          iniciados: 485,
          entregues: 234,
          get total () {
            return this.iniciados + this.entregues;
          },
          redacao: '234 entregues',
        },
        {
          cre: 'CRE XYZ',
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
