<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Ranking Geral
        </h1>

        <h3>
          Ranking de Escolas e Estados
        </h3>
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            label="Filtrar desempenho por escola" color="azul"
            filled
            hide-details
            @change="changeEscola"
            :items="escolas.map((el) => el.titulo)"
            v-model="escolaAtual"
        />
      </v-col>

      <v-col
          cols="12" sm="8"
          md="4"
      >
        <v-select
            label="Escolha qual o simulado" color="azul"
            filled
            hide-details
            @change="changeEscola"
            :items="simulados.map((el) => el.titulo)"
            v-model="simuladoAtual"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-8"
      >
        <header-secao>
          Sua colocação nos rankings
        </header-secao>
      </v-col>

      <v-col
          cols="6" sm="5"
          md="3"
          v-for="ranking in rankings" :key="ranking.tipo"
      >
        <subheader-secao>
          {{ `Ranking ${ranking.tipo}` }}
        </subheader-secao>

        <v-card class="mt-2 shadow">
          <v-card-text>
            <p class="h-34 relative font-weight-bold grey--text text--darken-3">
              <span class="bolinha__linguagens absolute left--1 top-0" />
              <v-icon
                  v-text="'mdi-podium'" color="black"
                  class="text-h6"
              />

              {{ `${ranking.colocacao}º lugar` }}
            </p>

            <p class="h-34 relative font-weight-bold grey--text text--darken-3">
              <span class="bolinha__humanas absolute left--1 top-0" />
              <v-icon
                  v-text="'mdi-numeric-10-box-multiple-outline'" color="black"
                  class="text-h6"
              />

              {{ `${ranking.pontos} pontos` }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- escolher qual ranking quer ver -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Rankings
        </header-secao>
      </v-col>

<!--      <SelecionarRanking />-->

      <!-- médias -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho Geral
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="desempenho in desempenhoGeral" :key="desempenho.ttl"
      >
        <v-card>
          <v-card-text>
            <p class="font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5 class="text-h4 font-weight-bold grey--text text--darken-3">
              {{  desempenho.nota }}
            </h5>

            <div
                class="w-1/3 absolute bottom-0 right-4 azul rounded__normal__top"
                :style="{ height: `${desempenho.altura}%` }"
            >
              <p class="mt-4 text-center font-weight-medium white--text">
                {{ desempenho.altura.toFixed() }}%
              </p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- médias -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Ranking por Área
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="4"
          md="3"
          v-for="desempenho in desempenhoArea" :key="desempenho.ttl"
      >
        <v-card>
          <v-card-text>
            <p class="font-weight-bold grey--text text--darken-3">
              {{ desempenho.ttl }}
            </p>

            <h5 class="text-h6 font-weight-bold grey--text text--darken-3">
              {{  desempenho.ranking }}º <span class="body-2">colocado</span>
            </h5>

            <div
                class="w-40 h-1/2 absolute bottom-0 right-4 text-center azul rounded__normal__top"
            >
              <v-icon
                  v-text="'mdi-seal-variant'" color="white"
                  class="mt-2"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- os 3 melhores do ranking -->
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
            <p class="h-30 relative font-weight-medium grey--text text--darken-3">
              <span class="bolinha__melhores absolute left-0 top-1" />
              <v-icon
                  v-text="'mdi-trophy-award'" color="black"
                  class="text-h6"
              />

              {{ melhor.conquistas }} conquistas
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- posicao do aluno e dos 20 melhores -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Os 10 melhores alunos - Ranking Estadual
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerRanking" :items="colocacoes"
            fixed-header
        >
          <template v-slot:item.posicao="{ item }">
            <p class="font-weight-bold">
              <v-icon
                  v-text="item.icon" color="black"
                  small
              />
              {{ item.posicao }}
            </p>
          </template>

          <template v-slot:item.perfil="{ item }">
            <v-dialog
                v-model="perfis[item.id]"
                max-width="80%"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    class="azul white--text rounded__normal text-capitalize mr-1"
                    color="primary"
                    v-bind="attrs" v-on="on"
                    @click.stop="$set(perfis, item.id, true)"
                >
                  ver perfil
                </v-btn>
              </template>

              <v-card class="relative w-full">
                <!-- nome e avatar-->
                <v-card-title>
                  <v-avatar>
                    <v-img :src="item.photo" />
                  </v-avatar>

                  <span class="ml-2 h6">
                    {{ item.nome }}
                  </span>
                </v-card-title>

                <v-card-text class="mt-4">
                  <header-secao class="pt-3">
                    Dados escolares
                  </header-secao>

                  <p class="mt-4">
                    <b>Escola:</b> {{ item.escola }}
                  </p>
                  <p>
                    <b>Turma</b>: {{item.turma}}
                  </p>
                  <p>
                    <b>Turno</b>: {{item.turno}}
                  </p>
                  <p>
                    <b>CRE</b>: {{ item.gre }}
                  </p>

                  <!-- dados gerais -->
                  <header-secao class="mt-6 pt-3">
                    Dados gerais
                  </header-secao>

                  <p class="mt-4">
                    <b>1 Simulado(s) realizado(s)</b>
                  </p>
                  <p>
                    <b>Média TRI:</b> {{ item.pontuacao }}
                  </p>
                  <p>
                    <b>Redação:</b> {{ item.redacao }}
                  </p>
                  <p>
                    <b>Ciências Humanas: </b> {{ item.Humanas }}
                  </p>

                  <p>
                    <b>Ciências da Natureza: </b> {{ item.Natureza }}
                  </p>

                  <p>
                    <b>Linguagens: </b> {{ item.Linguagens }}
                  </p>

                  <p>
                    <b>Matemática: </b> {{ item.Matematica }}
                  </p>

                  <!-- media geral -->
                  <!--<header-secao class="mt-6 pt-3">
                    Média geral
                  </header-secao>-->
                </v-card-text>

                <v-card-actions class="px-4">
                  <v-spacer />

                  <v-btn
                      color="green darken-1" text
                      @click="$set(perfis, item.id, false)"
                  >
                    Fechar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>

      <!-- ranking por escolas -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Ranking escolar
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerRankingEscolar" :items="colocacoesEscolar"
            fixed-header
        />
      </v-col>

      <!-- ranking por area -->
<!--      <v-col-->
<!--          cols="12" class="mt-8"-->
<!--      >-->
<!--        <subheader-secao>-->
<!--          Ranking escolar por área-->
<!--        </subheader-secao>-->
<!--      </v-col>-->

<!--      <v-col cols="12">-->
<!--        <v-data-table-->
<!--            :headers="headerRankingEscolarArea" :items="colocacoesEscolarArea"-->
<!--            fixed-header-->
<!--        >-->
<!--          <template v-slot:item.posicao="{ item }">-->
<!--            <p class="font-weight-bold">-->
<!--              <v-icon-->
<!--                  v-text="item.icon" color="black"-->
<!--                  small-->
<!--              />-->
<!--              {{ item.posicao }}-->
<!--            </p>-->
<!--          </template>-->
<!--        </v-data-table>-->
<!--      </v-col>-->
    </v-row>
    <Loading :dialog="dialog" />
    <TabsMobile />
  </v-container>
</template>

<script>
// import SelecionarRanking from '../components-professores/SelecionarRanking.vue';
import TabsMobile from '../components/TabsMobile.vue';
import data from '../mixis/ranking-professores/data';
import method from '../mixis/ranking-professores/method';
import Loading from '../components/loading/Loading.vue';

export default {
  name: 'Ranking',
  components: { TabsMobile, Loading },
  mixins: [data, method],

  created () {
    try {
      this.iniciar();
    } catch (e) {
      alert('Erro de conexão com o servidor');
    }
  },
};
</script>

<style scoped>

</style>
