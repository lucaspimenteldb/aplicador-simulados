<template>
  <v-container fluid>
    <loading :dialog="loading" />
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
            :disabled="loading"
            v-model="redacaoSelecionada"
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
            :disabled="loading"
            v-model="escolaSelecionada2"
            @change="changeEscola"
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
            @change="changeTurma"
            :disabled="loading"
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
            v-model="search"
        />

        <v-data-table
            :headers="headerRedacao" :items="notaRedacao"
            fixed-header
            :search="search"
            v-slot:item="{ item }"
            class="relative clear-both"
        >
          <tr>
            <td>
              {{ item.nome }}
            </td>
            <td>
              {{ item.situacao }}
            </td>
            <td>
              {{ item.tema }}
            </td>
            <td>
              {{ item.nota }}
            </td>
            <td>
              {{ item.nota1 }}
            </td>
            <td>
              {{ item.nota2 }}
            </td>
            <td>
              {{ item.nota3 }}
            </td>
            <td>
              {{ item.nota4 }}
            </td>
            <td>
              {{ item.nota5 }}
            </td>
            <td>
              <DialogRedacao
v-if="item.done"
:item="item"
/>
            </td>
          </tr>

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
                    :src="melhor.img"
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
            @change="changeSelectGra"
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
          <!--          <trend-chart-->
          <!--              :datasets="datasetsEscola" :grid="grid"-->
          <!--              :labels="labels" :min="0"-->
          <!--              :interactive="true" @mouse-move="onMouseMove"-->
          <!--              class="random-chart-turma"-->
          <!--          />-->

          <Bar
              :chartdata="chartdata"
              @reniciar="reiniciar"
          />

          <div
              id="pop" role="tooltip"
              ref="tooltip" class="tooltip"
              :class="{'is-active': tooltipData}"
          >
            <div
                class="tooltip-container" v-if="tooltipData"
            >
              <strong>{{ labels.xLabels[tooltipData.index] }}</strong>
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
          cols="12"
          md="4" sm="8"
      >
        <v-select
            @change="changeEscola2"
            v-model="escolaSelecionada3"
            :items="escola" filled
            label="Filtrar desempenho por escola" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" class="pa-0"
      />

      <v-col
          cols="12" sm="8"
          md="4"
          v-if="escolaSelecionada3 != ''"
      >
        <v-select
            v-model="turma1"
            @change="changeSelectGraComp"
            :items="turma2s" filled
            label="Comparar turmas" color="azul"
            hide-details
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
          v-if="escolaSelecionada3 != ''"
      >
        <v-select
            v-model="turma2"
            :items="turma2s" filled
            @change="changeSelectGraComp"
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
          <Bar
              :chartdata="chartdata2"
              @reniciar="reiniciar"
          />

          <div
              id="popTurma" role="tooltip"
              ref="tooltipTurma" class="tooltip"
              :class="{'is-active': tooltipDataTurma}"
          >
            <div
                class="tooltip-container" v-if="tooltipDataTurma"
            >
              <strong>{{ labels.xLabels[tooltipDataTurma.index] }}</strong>
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

    <TabsMobile />
  </v-container>
</template>

<script>
import '../../sass/chart.css';
import Bar from '../../components/Graficos/GraficoBar.vue';
// import Line2 from '../../components/Graficos/GraficoLine.vue';
import DialogRedacao from '../../components/dialog/DialogRedacao/DialogRedacao.vue';
import data from '../../mixis/redacao-professor/data';
import method from '../../mixis/redacao-professor/method';
import loading from '../../components/loading/Loading.vue';
import TabsMobile from '../../components/TabsMobile.vue';

export default {

  name: 'RedacaoInicio',
  mixins: [data, method],
  components: { loading, Bar, DialogRedacao, TabsMobile },

  mounted () {
    this.getRedacao();
    this.initPopper();
  },

};
</script>

<style scoped>

</style>
