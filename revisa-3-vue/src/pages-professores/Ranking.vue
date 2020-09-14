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

      <SelecionarRanking />

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
          Os 20 melhores - Ranking Estadual
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-avatar>
          <v-img src="@/assets/img/ranking/meu-ranking.png" />
        </v-avatar>

        <section class="pa-2 px-4 ml-4 d-inline-block border__bottom__azul">
          <p class="d-inline-block font-weight-bold grey--text text--darken-3">
            Minha posição
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-podium-gold'" small
                color="black" class="mb-1"
            />
            #10
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-trophy-award'" small
                color="black"
            />
            28 conquistas
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-numeric-10-box-multiple-outline'" small
                color="black"
            />
            840 pontos
          </p>
        </section>
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
        </v-data-table>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import SelecionarRanking from '../components-professores/SelecionarRanking.vue';

export default {
  name: 'Ranking',
  components: { SelecionarRanking },

  data () {
    return {
      nivel: 90,

      rankings: [
        {
          tipo: 'Estadual',
          colocacao: 10,
          pontos: 740,
        },
        {
          tipo: 'Escolar',
          colocacao: 16,
          pontos: 740,
        },
      ],

      desempenhoArea: [
        {
          ttl: 'Linguagens',
          ranking: 750,
        },
        {
          ttl: 'Humanas',
          ranking: 920,
        },
        {
          ttl: 'Matemática',
          ranking: 110,
        },
        {
          ttl: 'Natureza',
          ranking: 110,
        },
        {
          ttl: 'Redação',
          ranking: 110,
        },
      ],

      desempenhoGeral: [
        {
          ttl: 'Média TRI',
          nota: 750,
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Redação 1',
          nota: 920,
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Acertos totais',
          nota: 110,
          get altura () {
            return (this.nota / 180) * 100;
          },
        },
      ],

      melhores: [
        {
          img: 'imagem-ranking',
          colocacao: '1º',
          podio: 'mdi-podium-gold',
          nome: 'Santaninha Maria',
          pontos: 9012,
          conquistas: 32,
        },
        {
          img: 'imagem-ranking',
          colocacao: '2º',
          podio: 'mdi-podium-silver',
          nome: 'Avexadinho Pelanquis',
          pontos: 7812,
          conquistas: 26,
        },
        {
          img: 'imagem-ranking',
          colocacao: '3º',
          podio: 'mdi-podium-bronze',
          nome: 'Projetado Deum',
          pontos: 6062,
          conquistas: 24,
        },
      ],

      colocacoes: [
        {
          icon: 'mdi-podium-gold',
          posicao: '#1',
          nome: 'Sanitizado Philips',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-podium-silver',
          posicao: '#2',
          nome: 'Philips',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-podium-bronze',
          posicao: '#3',
          nome: 'Sanilips',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#4',
          nome: 'Sahilips',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#5',
          nome: 'Sanzados',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#6',
          nome: 'Phil',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#7',
          nome: 'Pips',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#8',
          nome: 'Sanitizaps',
          redacao: 880,
          pontuacao: 950,
        },
        {
          icon: 'mdi-seal-variant',
          posicao: '#9',
          nome: 'Sanitili',
          redacao: 880,
          pontuacao: 950,
        },
      ],
      headerRanking: [
        {
          text: 'Ranking',
          align: 'start',
          sortable: false,
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Nome',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: false,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média TRI',
          sortable: false,
          value: 'pontuacao',
          class: 'body-2 font-weight-bold',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
