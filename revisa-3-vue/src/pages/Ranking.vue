<template>
  <v-container fluid>
    <loading :dialog="showDialog" />
<!--    <MenuLateral />-->
<!--    <Toolbar />-->
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
          cols="12"
      >
        <subheader-secao>
          Você quer ver o ver desempenho de qual simulado?
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
      >
        <v-select
            @change="changeSelect"
            :disabled="disabledSimulado"
            v-model="simuladosCurrent"
            :items="simulados" filled
            label="Escolha o simulado para ver seu desempenho" color="azul"
            hide-details
        />
      </v-col>

      <v-col cols="12" />

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
          <v-card-text style="height: 180px">
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
    </v-row>

    <!-- premios que a gente vai receber -->
    <PremiosMensais class="mt-8" />

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

            <p class="h-30 relative font-weight-medium grey--text text--darken-3 text-h6">
              <span class="bolinha__melhores absolute left-0 top-1" />

              <v-icon
                  v-text="'mdi-trophy-award'" color="black"
                  class="text-h6"
              />

              {{ melhor.conquistas }} Média TRI
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- posicao do aluno e dos 20 melhores -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Os 10 melhores - Ranking Estadual
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-avatar>
          <v-img :src="myData.photo" />
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
            #{{myData.posicao}}
          </p>

          <p class="ml-6 d-inline-block font-weight-medium grey--text text--darken-3">
            <v-icon
                v-text="'mdi-numeric-10-box-multiple-outline'" small
                color="black"
            />
            {{myData.pontuacao}} Média TRI
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
                    <v-img :src="item.foto" />
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
                    <b>Escola:</b> Escola teste
                  </p>
                  <p>
                    <b>Turma</b>: 3A
                  </p>
                  <p>
                    <b>Turno</b>: Integral
                  </p>
                  <p>
                    <b>CRE</b>: Porto Velho
                  </p>

                  <!-- dados gerais -->
                  <header-secao class="mt-6 pt-3">
                      Dados gerais
                  </header-secao>

                  <p class="mt-4">
                    <b>1 Simulado(s) realizado(s)</b>
                  </p>
                  <p>
                    <b>Melhor nota TRI:</b> 600
                  </p>
                  <p>
                    <b>Melhor nota Redação:</b> 800
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
    </v-row>

    <TabsMobile />
    <ModalPadrao
        :objeto="objeto"
        @aparecerModal="sumirModal"
    />
  </v-container>
</template>

<script>
// import SelecionarRanking from '../components/SelecionarRanking.vue';
import PremiosMensais from '../components/PremiosMensais.vue';
// import MenuLateral from '../components/MenuLateral.vue';
// import Toolbar from '../components/Toolbar.vue';
import TabsMobile from '../components/TabsMobile.vue';
import loading from '../components/loading/Loading.vue';
import ModalPadrao from '../components/modal/ModalPadrao.vue';
import ranking from '../services/ranking/ranking';
import env from '../env';

export default {
  name: 'Ranking',
  components: {
    TabsMobile,
    PremiosMensais,
    loading,
    ModalPadrao,
  },

  async created () {
    try {
      this.loadingBasl(true);
      const dados = await ranking.rankingAluno('desempenho/ranking/1');
      this.simuladosPesquisa = dados.data.simulados;
      this.simulados = this.extrairTitulo(this.simuladosPesquisa);
      this.simuladosCurrent = this.simulados[0] ? this.simulados[0] : 'Sem dados';
      this.preencherRanking(dados.data);
      this.preencherDesempenho(dados.data);
      this.preencherRankingArea(dados.data);
      this.preencherPrimeiros(dados.data);
      this.preencherMyData(dados.data);
      this.preencherRankingGeral(dados.data);
      this.loadingBasl(false);
    } catch (e) {
      this.loadingBasl(false);
      this.errorDefault(e);
    }
  },

  methods: {
    extrairTitulo (objeto) {
      if (objeto.length > 0) {
        return objeto.map((el) => el.titulo);
      }

      return objeto;
    },

    pesquisarSimulado (simulado, pesquisa) {
      const filtrado = pesquisa.filter((el) => el.titulo === simulado);
      return filtrado;
    },

    async changeSelect (event) {
      try {
        const filtrado = this.pesquisarSimulado(event, this.simuladosPesquisa);
        if (filtrado.length > 0) {
          this.loadingBasl(true);
          const dados = await ranking.rankingAluno(`desempenho/ranking/${filtrado[0].id}`);
          this.simuladosPesquisa = dados.data.simulados;
          this.simulados = this.extrairTitulo(this.simuladosPesquisa);
          this.simuladosCurrent = this.simulados[0] ? this.simulados[0] : 'Sem dados';
          this.preencherRanking(dados.data);
          this.preencherDesempenho(dados.data);
          this.preencherRankingArea(dados.data);
          this.preencherPrimeiros(dados.data);
          this.preencherMyData(dados.data);
          this.preencherRankingGeral(dados.data);
          this.loadingBasl(false);
        }
      } catch (err) {
        this.errorDefault(err);
      }
    },

    preencherRanking (rankingP) {
      this.rankings[0].colocacao = rankingP.position_total_turma;
      this.rankings[1].colocacao = rankingP.position_total;
      this.rankings[2].colocacao = rankingP.position_total_escola;

      for (let i = 0; i < 3; i++) {
        this.rankings[i].pontos = rankingP.myData[0].media;
      }
    },

    preencherDesempenho (rankingP) {
      this.desempenhoGeral[0].nota = rankingP.myData[0].media;
      this.desempenhoGeral[1].nota = rankingP.myData[0].redacao;
      // this.desempenhoGeral[2].nota = rankingP.acertos.resposta.length;
    },

    preencherRankingArea (rankingP) {
      this.desempenhoArea[0].ranking = rankingP.position_total_area.Linguagens;
      this.desempenhoArea[1].ranking = rankingP.position_total_area.Humanas;
      this.desempenhoArea[2].ranking = rankingP.position_total_area.Matematica;
      this.desempenhoArea[3].ranking = rankingP.position_total_area.Natureza;
      this.desempenhoArea[3].ranking = rankingP.position_total_area.redacao;
    },
    preencherPrimeiros (rankingP) {
      for (let i = 0; i < this.melhores.length; i++) {
        const photoGw = rankingP.ranking_geral[i].photo;
        const photo = photoGw ? env.ROTA_DOMINIO + photoGw : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
        this.melhores[i].nome = rankingP.ranking_geral[i].name;
        this.melhores[i].conquistas = rankingP.ranking_geral[i].media;
        this.melhores[i].img = photo;
      }
    },

    preencherMyData (rankingP) {
      const photoGw = rankingP.myData[0].photo;
      const photo = photoGw ? env.ROTA_DOMINIO + photoGw : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;

      this.myData.photo = photo;
      this.myData.pontuacao = rankingP.myData[0].media;
      this.myData.posicao = rankingP.position_total;
    },

    preencherRankingGeral (rankingP) {
      console.log(rankingP);
      for (let i = 0; i < 10; i++) {
        const icon = this.retornarIcon(i);
        console.log(icon);
        const photoGw = rankingP.ranking_geral[i].photo;
        const photo = photoGw ? env.ROTA_DOMINIO + photoGw : `${env.ROTA_DOMINIO}vendor/crudbooster/avatar.jpg`;
        const objeto = {
          icon,
          posicao: i + 1,
          id: rankingP.ranking_geral[i].id,
          nome: rankingP.ranking_geral[i].name,
          foto: photo,
          pontuacao: rankingP.ranking_geral[i].media,
          redacao: rankingP.ranking_geral[i].redacao,
          escola: rankingP.ranking_geral[i].escola,
        };

        this.colocacoes.push(objeto);
      }
    },

    retornarIcon (i) {
      let icon = '';
      if (i === 0) {
        icon = 'mdi-podium-gold';
      } else if (i === 1) {
        icon = 'mdi-podium-silver';
      } else if (i === 2) {
        icon = 'mdi-podium-bronze';
      } else {
        icon = 'mdi-seal-variant';
      }

      return icon;
    },

    loadingBasl (on) {
      this.disabledSimulado = on;
      this.showDialog = on;
    },
    async errorDefault (err) {
      console.log(err);
      if (err.response.status <= 0 || err.response.status >= 500 || err.response.status === 401) {
        this.objeto.dialog = true;
      }
      this.loadingBasl(false);
    },

    sumirModal ($event) {
      this.objeto.dialog = $event;
    },

  },

  data () {
    return {
      nivel: 90,
      perfis: {},
      myData: {
        pontuacao: '',
        posicao: '',
        photo: '',
      },
      rankings: [
        {
          tipo: 'Turma',
          colocacao: '',
          pontos: '',
        },
        {
          tipo: 'Estadual',
          colocacao: '',
          pontos: '',
        },
        {
          tipo: 'Escolar',
          colocacao: '',
          pontos: '',
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
          nota: '',
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Redação',
          nota: '',
          get altura () {
            return this.nota / 10;
          },
        },
        // {
        //   ttl: 'Acertos totais',
        //   nota: '',
        //   get altura () {
        //     return (this.nota / 180) * 100;
        //   },
        // },
      ],

      simulados: [],
      simuladosPesquisa: [],
      simuladosCurrent: '',
      showDialog: false,
      disabledSimulado: false,

      objeto: {
        dialog: false,
        titulo: 'Sem conexão com servidor',
        textConfirm: 'Sair',
        textButton: 'Ok',
        confirm: false,
      },

      melhores: [
        {
          img: 'imagem-ranking',
          colocacao: '1º',
          podio: 'mdi-podium-gold',
          nome: 'Santaninha Maria',
          conquistas: 800,
        },
        {
          img: 'imagem-ranking',
          colocacao: '2º',
          podio: 'mdi-podium-silver',
          nome: 'Avexadinho Pelanquis',
          conquistas: 800,
        },
        {
          img: 'imagem-ranking',
          colocacao: '3º',
          podio: 'mdi-podium-bronze',
          nome: 'Projetado Deum',
          conquistas: 800,
        },
      ],

      colocacoes: [

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
          text: 'Escola',
          sortable: false,
          value: 'escola',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média TRI',
          sortable: false,
          value: 'pontuacao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'perfil',
          class: 'body-2 font-weight-bold',
        },

      ],
    };
  },
};
</script>

<style scoped>

</style>
