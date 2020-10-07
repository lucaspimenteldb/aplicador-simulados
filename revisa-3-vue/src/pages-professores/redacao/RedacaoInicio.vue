<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Redações
        </h1>
      </v-col>
    </v-row>

    <!--<v-row class="mt-8">
      <v-col cols="12">
        <header-secao>
          Redações sendo aplicadas
        </header-secao>
      </v-col>

      &lt;!&ndash; card das redacoes para fazer &ndash;&gt;
      <v-col
          cols="12" sm="6"
          md="4"
          v-for="redacao in redacoesFazer" :key="redacao.nome"
      >
        <v-card
            class="destaque__redacao transition rounded__normal cursor__pointer btn__shadow" to="/redacao-enviar"
        >
          <v-card-text>
            <article class="d-flex align-end justify-space-between">
              &lt;!&ndash; descricoes da redacao &ndash;&gt;
              <v-card-title class="pa-0 d-inline-block grey&#45;&#45;text text&#45;&#45;darken-3">
                {{ redacao.nome }}
              </v-card-title>

              <p class="caption font-weight-bold">
                sua nota <span class="font-weight-bold"> &#45;&#45; </span>
              </p>
            </article>

            <p class="grey&#45;&#45;text text&#45;&#45;darken-3">
              {{ redacao.tema }}
            </p>

            <article class="mt-4 relative">
              <p class="font-weight-bold grey&#45;&#45;text text&#45;&#45;darken-3">
                {{ `Acessar a sua ${redacao.nome}` }}
              </p>

              &lt;!&ndash; icone para acessar &ndash;&gt;
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>-->

    <v-row>
      <!-- card das redacoes corrigidas -->
      <v-col
          cols="12" class="mt-8"
      >
        <header-secao>
          Notas das redações
        </header-secao>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="redacao" filled
            label="Filtrar desempenho por redação" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="escola" filled
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            :items="turma" filled
            label="Filtrar por turma" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <!-- tabela com as notas da redacao -->
      <v-col
          cols="12"
          class="mt-4 mb-1"
      >
        <v-text-field
            label="Pesquisar..."
            filled
            append-icon="mdi-magnify"
            class="max-w-240 float-right"
            hide-details
        />

        <v-data-table
            :headers="headerRedacao" :items="notaRedacao"
            fixed-header hide-default-footer
            class="mt-2 relative top-2 clear-both"
        >
          <template v-slot:item.acoes>
            <v-btn
                small
                class="white--text rounded__normal text-capitalize mr-1"
                color="azul"
            >
              ver redação
            </v-btn>
          </template>
        </v-data-table>
      </v-col>

      <!-- medias por competencia -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Média por competência
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          lg="4"
          v-for="competencia in competencias" :key="competencia.competenciaNome"
      >
        <v-card class="h-full">
          <v-card-text class="d-flex align-center justify-space-between">
            <article class="max-w-3/4">
              <p class="caption grey--text text--darken-3">
                {{ competencia.competenciaNome }}
              </p>

              <p class="body-2 grey--text text--darken-3">
                {{ competencia.descricao }}
              </p>
            </article>

            <v-progress-circular
                size="60" width="6"
                :value="competencia.notaCompetencia / 2" :color="competencia.desempenho"
                class="flex-shrink-0"
            >
              <p class="text-h6 text-center">
                {{ competencia.notaCompetencia }}
              </p>
            </v-progress-circular>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Os melhores dos melhores - Ranking Estadual
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="melhor in melhores" :key="melhor.nome"
      >
        <v-card>
          <v-card-text>
            <!-- fotos e informacoes de posicao-->
            <section class="d-flex align-center">
              <v-avatar
                  class="d-inline-block"
                  width="60" height="60"
              >
                <v-img
                    src="@/assets/img/ranking/imagem-ranking.png"
                />
              </v-avatar>

              <div class="ml-4 d-flex align-center justify-center relative">
                <div class="ml-8 bolinha__ranking" />

                <v-icon
                    v-text="melhor.podio" color="black"
                    large class=""
                />
              </div>

              <p class="ml-6 text-h5 font-weight-medium grey--text text--darken-3">
                {{ `${melhor.colocacao} lugar` }}
              </p>
            </section>

            <!-- nome do aluno -->
            <p class="mt-4 body-1 font-weight-bold grey--text text--darken-3">
              {{ melhor.nome }}
            </p>

            <p class="h-30 relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__melhores absolute left-0 top-1" />
              <v-icon
                  v-text="'mdi-numeric-10-box-multiple-outline'" color="black"
                  class="text-h6"
              />

              {{ melhor.pontos }} pontos
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- desempenho das redacoes -->
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho nas redações
        </header-secao>
      </v-col>

      <!-- desempenho por escolas -->
      <v-col cols="12">
        <subheader-secao>
          Desempenho por Escolas
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            v-model="escolaSelecionada"
            :items="escola" filled
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12"
          md="8"
      >
        <div class="random">
          <trend-chart
              :datasets="datasetsEscola" :grid="grid"
              :labels="labels" :min="0"
              :interactive="true" @mouse-move="onMouseMove"
              class="random-chart-turma"
          />

          <div
              id="pop" role="tooltip"
              ref="tooltip" class="tooltip"
              :class="{'is-active': tooltipData}"
          >
            <div
                class="tooltip-container" v-if="tooltipData"
            >
              <strong>{{labels.xLabels[tooltipData.index]}}</strong>
              <section class="tooltip-data">
                <div class="tooltip-data-item tooltip-data-item--2">
                  <article>
                    {{ tooltipData.data[1] }}

                    <p class="caption">
                      {{ escolaSelecionada }}
                    </p>
                  </article>
                </div>
                <div class="tooltip-data-item tooltip-data-item--3">
                  <article>
                    {{ tooltipData.data[2] }}

                    <p class="caption">
                      Média Estadual
                    </p>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </div>
      </v-col>

      <!-- desempenho por turma -->
      <v-col
          cols="12"
          class="mt-8"
      >
        <subheader-secao>
          Desempenho por Turmas
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            v-model="turma1"
            :items="turmaComparar" filled
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            v-model="turma2"
            :items="turmaComparar" filled
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12"
          md="8"
      >
        <div class="random">
          <trend-chart
              :datasets="datasetsTurma" :grid="gridTurma"
              :labels="labelsTurma" :min="0"
              :interactive="true" @mouse-move="onMouseMoveTurma"
              class="random-chart"
          />

          <div
              id="popTurma" role="tooltip"
              ref="tooltipTurma" class="tooltip"
              :class="{'is-active': tooltipDataTurma}"
          >
            <div
                class="tooltip-container" v-if="tooltipDataTurma"
            >
              <strong>{{labels.xLabels[tooltipDataTurma.index]}}</strong>
              <section class="tooltip-data">
                <div class="tooltip-data-item tooltip-data-item--2">
                  <article>
                    {{ tooltipDataTurma.data[1] }}

                    <p class="caption">
                      {{ turma1 }}
                    </p>
                  </article>
                </div>
                <div class="tooltip-data-item tooltip-data-item--3">
                  <article>
                    {{ tooltipDataTurma.data[2] }}

                    <p class="caption">
                      {{ turma2 }}
                    </p>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../../sass/chart.css';

import Vue from 'vue';
import TrendChart from 'vue-trend-chart';
import Popper from 'popper.js';

Vue.use(TrendChart);

export default {

  name: 'RedacaoInicio',

  data () {
    return {
      escolaSelecionada: '',
      turma1: '',
      turma2: '',
      escola: ['Escola 1', 'Escola 2', 'Escola 3'],
      turma: ['Turma 1', 'Turma 2', 'Turma 3'],
      turmaComparar: ['Escola 1 - Turma 1', 'Escola 2 - Turma 1', 'Escola 3 -Turma 1'],
      redacao: ['Redação 1', 'Redação 2', 'Redação 3'],

      redacoesFazer: [
        {
          nome: 'Redação 3',
          entrega: '18/08',
          tema: 'Tema da redação é o seguinte assim e assado, mas que isso é aquilo',
        },
      ],

      headerRedacao: [
        {
          text: 'Aluno',
          align: 'start',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Situação',
          sortable: true,
          value: 'situacao',
          class: 'px-2 min-w-100 body-2 font-weight-bold',
        },
        {
          text: 'Tema',
          sortable: true,
          value: 'tema',
          class: 'px-2 min-w-100 body-2 font-weight-bold',
        },
        {
          text: 'Nota',
          sortable: false,
          value: 'nota',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Comp. 1',
          sortable: false,
          value: 'nota1',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 2',
          sortable: false,
          value: 'nota2',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 3',
          sortable: false,
          value: 'nota3',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 4',
          sortable: false,
          value: 'nota4',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 5',
          sortable: false,
          value: 'nota5',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'acoes',
        },
      ],

      notaRedacao: [
        {
          nome: 'Lucas',
          nota: 880,
          nota1: 160,
          nota2: 200,
          nota3: 160,
          nota4: 160,
          nota5: 200,
          situacao: 'Ok',
          tema: 'Bla bla tal 124',
        },
        {
          nome: 'Jose',
          nota: 800,
          nota1: 160,
          nota2: 200,
          nota3: 160,
          nota4: 160,
          nota5: 200,
          situacao: 'Ok',
          tema: 'Bla bla tal',
        },
      ],

      competencias: [
        {
          competenciaNome: 'Competência 1',
          descricao: 'Domínio de escrito da língua portuguesa.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 2',
          descricao: 'Compreender o tema e não fugir do que é proposto.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 3',
          descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 4',
          descricao: 'Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 5',
          descricao: 'Respeito aos direitos humanos.',
          notaCompetencia: '',
          desempenho: '',
        },
      ],

      melhores: [
        {
          img: 'imagem-ranking',
          colocacao: '1º',
          podio: 'mdi-podium-gold',
          nome: 'Santaninha Maria',
          pontos: 960,
        },
        {
          img: 'imagem-ranking',
          colocacao: '2º',
          podio: 'mdi-podium-silver',
          nome: 'Avexadinho Pelanquis',
          pontos: 920,
        },
        {
          img: 'imagem-ranking',
          colocacao: '3º',
          podio: 'mdi-podium-bronze',
          nome: 'Projetado Deum',
          pontos: 920,
        },
      ],

      // desempenho por escolas
      datasetsEscola: [
        {
          // o primeiro objeto serve apenas para definir o ponto máximo do gráfico
          data: [1000],
          className: 'curve1',
        },
        {
          // meu desempenho
          data: [400, 800, 840, 920],
          smooth: true,
          showPoints: true,
          className: 'curve2',
        },
        {
          // desempenho da turma
          data: [600, 720, 640, 1000],
          smooth: true,
          showPoints: true,
          className: 'curve3',
        },

      ],
      grid: {
        verticalLines: true,
        horizontalLines: true,
      },
      labels: {
        xLabels: ['Redação 1', 'Redação 2', 'Redação 3', 'Redação 4'],
        yLabels: 6,
        yLabelsTextFormatter: (val) => val,
      },
      tooltipData: null,
      tooltipDataTurma: null,
      popper: null,
      popperIsActive: false,
      popperTurma: null,
      popperIsActiveTurma: false,
      // fim do chart

      // desempenho por turmas
      datasetsTurma: [
        {
          // o primeiro objeto serve apenas para definir o ponto máximo do gráfico
          data: [1000],
          className: 'curve1',
        },
        {
          // meu desempenho
          data: [600, 880, 840, 800],
          smooth: true,
          showPoints: true,
          className: 'curve2',
        },
        {
          // desempenho da turma
          data: [680, 720, 640, 1000],
          smooth: true,
          showPoints: true,
          className: 'curve3',
        },

      ],

      gridTurma: {
        verticalLines: true,
        horizontalLines: true,
      },
      labelsTurma: {
        xLabels: ['Redação 1', 'Redação 2', 'Redação 3', 'Redação 4'],
        yLabels: 6,
        yLabelsTextFormatter: (val) => val,
      },
      // fim do chart

      redacoesCorrigidas: [
        {
          nome: 'Redação 1',
          enviada: '01/08',
          tema: 'Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae',
          nota: 800,
        },
      ],
    };
  },

  methods: {
    initPopper () {
      const chart = document.querySelector('.random-chart');
      const chart2 = document.querySelector('.random-chart-turma');
      const ref = document.querySelectorAll('.active-line');

      const linha = ref[0];
      const { tooltip } = this.$refs;
      this.popper = new Popper(linha, tooltip, {
        placement: 'right',
        modifiers: {
          offset: { offset: '0,10' },
          preventOverflow: {
            boundariesElement: chart,
          },
        },
      });

      const linha2 = ref[1];
      const { tooltipTurma } = this.$refs;
      this.popperTurma = new Popper(linha2, tooltipTurma, {
        placement: 'right',
        modifiers: {
          offset: { offset: '0,10' },
          preventOverflow: {
            boundariesElement: chart2,
          },
        },
      });
    },
    onMouseMove (params) {
      this.popperIsActive = !!params;
      this.popper.scheduleUpdate();
      this.tooltipData = params || null;
    },
    onMouseMoveTurma (params) {
      this.popperIsActiveTurma = !!params;
      this.popperTurma.scheduleUpdate();
      this.tooltipDataTurma = params || null;
    },
  },
  mounted () {
    this.initPopper();
  },

};
</script>

<style scoped>

</style>
