<template>
  <v-container fluid>
    <!--    <MenuLateral />-->
    <!--    <Toolbar />-->
    <loading :dialog="showDialog" />

    <v-row>
      <v-col cols="12">
        <h1>
          Desempenho Geral
        </h1>

        <h3>
          Seu desempenho está separado por tipo
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Seu Desempenho e Rankings
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Você quer ver o ver desempenho de qual simulado?
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          class="pt-0"
      >
        <v-select
            @change="changeSelect"
            v-model="simuladoCurret"
            :disabled="disabledSimulado"
            :items="simulados" filled
            label="Escolha o simulado para ver seu desempenho" color="azul"
            hide-details
        />
      </v-col>

      <!-- selecionar ranking -->
<!--      <SelecionarRanking class="mt-8" />-->

      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Minha nota
        </subheader-secao>
      </v-col>

      <v-col
          cols="6" sm="4"
          md="3" lg="2"
          v-for="card in informacoesAdicionais" :key="card.ttl"
          class="pt-0"
      >
        <!-- pontuacao e posicao no ranking selecionado -->
        <v-card
            class="d-flex align-center overflow-hidden"
        >
          <!-- icones dos card pequenos -->
          <div
              class="my-4 pa-3 d-flex justify-center align-center relative left--2 rounded-circle bg__verde__desempenho"
          >
            <v-icon
                v-text="card.icon" color="black"
            />
          </div>

          <v-card-text class="py-0 px-1 mt-1">
            <p class="text-h5 leading__supertight font-weight-bold black--text">
              {{ card.info }}
            </p>

            <p
                :class="[ card.ttl === 'Pontuação' ? '' : 'd-none' ]" class="leading__tight grey--text text--darken-3"
            >
              {{ card.legenda }}
            </p>

            <p
                :class="[ card.ttl === 'Pontuação' ? 'ml-4 d-none' : 'ml-1' ]"
                class="leading__tight grey--text text--darken-3"
            >
              {{ card.legenda }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- tabela com o desempenho por área do aluno -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Área no {{simuladoCurret}}
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
          class="pt-0"
      >
        <v-data-table
            :headers="headerArea" :items="desempenhoArea"
            fixed-header hide-default-footer
            class="text-no-wrap"
        >
          <template v-slot:item.media="{ item }">
            <p class="font-weight-bold">
              {{ item.media }}
            </p>
          </template>
        </v-data-table>
      </v-col>

      <!-- tabela com o desempenho por disciplina do aluno -->
      <!--<v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por Disciplina no Simulado 1
        </subheader-secao>
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headerDisciplina" :items="desempenhoDisciplina"
            fixed-header hide-default-footer
        >
          <template v-slot:item.media ="{ item }">
            <p class="font-weight-bold">
              {{ item.media }}
            </p>
          </template>
        </v-data-table>
      </v-col>-->

      <!-- tabela das questoes -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Ver Gabarito do {{simuladoCurret}}
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          class="pt-0"
      >
        <v-select
            @change="changeSelectArea"
            :items="areas"
            :disabled="disabledSimulado"
            filled color="azul"
            label="Escolha qual área deseja ver"
            hide-details
        />
      </v-col>

      <v-col cols="12">
        <v-data-table
            :headers="headers" fixed-header
            :items="questoesGabarito"
            class="text-no-wrap"
        >
          <template v-slot:item.resultado="{ item }">
            <p
                class="font-weight-medium"
                :class="`${item.resultado}--text`"
            >
              {{ item.resultado }}
            </p>
          </template>

          <template v-slot:item.dificuldade="{ item }">
            <p>
              {{ item.dificuldade }}
            </p>
          </template>

          <!-- modal para ver a questão -->
          <template v-slot:item.url="{ item }">
            <v-dialog
                v-model="dialog[item.id]"
                max-width="90%"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
                    class="azul white--text rounded__normal text-capitalize mr-1"
                    color="primary"
                    v-bind="attrs" v-on="on"
                    :to="item.url"
                    @click.stop="$set(dialog, item.id, true)"
                >
                  ver questão
                </v-btn>
              </template>

<!--              <Dialog :dialog="true" />-->

              <v-card class="relative w-full">
                <v-card-title>
                  <span class="headline">Questão {{ item.name }}</span>
                </v-card-title>

                <v-card-text>
                  <!-- anunciado da questão -->
                  <article v-html="item.descricao">
                    <!-- eslint-disable max-len -->
                  </article>

                  <h6
                      class="mt-4 body-1 acertou--text" v-if="item.marcada === item.gabarito"
                  >
                    Parabéns! Você arrasou na questão
                  </h6>

                  <h6
                      class="mt-4 body-1 errou--text" v-else
                  >
                    O mouse deve ter escorregado na hora de marcar...
                  </h6>

                  <br>
                  <!-- questões -->
                  <v-hover
                      v-for="(alternativa, questao) in item.alternativas" :key="questao"
                  >
                    <article
                        class="pb-2 pt-2 mt-2 d-flex align-center border__bottom"
                        :id="`alternativa${questao}`"
                        :class="{
                          'green lighten-3':item.gabarito === questao.toUpperCase(),
                          'red lighten-3': item.gabarito != questao.toUpperCase() && item.marcada === questao.toUpperCase()
                        }"
                    >
                      <!-- letra a,b etc.-->
                      <p
                          class="ml-1 mr-3 text-h6 leading__tight pointer__events__none"
                          :class="[ questao === 'b' || questao === 'd' ? '' : 'mb-1' ]"
                      >
                        {{ questao }}
                      </p>

                      <p
                          class="body-2 pointer__events__none"
                          v-html="alternativa"
                      />

                      <v-icon
                          v-if="item.gabarito === questao.toUpperCase()"
                          v-text="'mdi-checkbox-marked-circle-outline'" class="mr-2"
                      />

                      <v-icon
                          v-if="item.gabarito != questao.toUpperCase() && item.marcada === questao.toUpperCase()"
                          v-text="'mdi-close-circle-outline'" class="mr-2"
                      />
                    </article>
                  </v-hover>
                </v-card-text>

                <v-card-actions class="px-4">
                  <v-spacer />

                  <v-btn
                      color="green darken-1" text
                      @click="$set(dialog, item.id, false)"
                      class="text-none"
                  >
                    Fechar
                  </v-btn>

                  <Dialog :item="item" />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <!-- media por assunto -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Desempenho por assunto
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          class="pt-0"
      >
        <!-- select da disciplina -->
        <v-select
            @change="changeAssuntos"
            :items="disciplinas" filled
            label="Escolha o componente curricular" color="azul"
            hide-details
        />
      </v-col>
      <v-col
          cols="12" class="pa-0"
      />

<!--      <v-col>-->
<!--        <v-btn-->
<!--            @click="aula"-->
<!--            style="float: right"-->
<!--        >-->
<!--        Pratique mais-->
<!--        </v-btn>-->
<!--      </v-col>-->

      <v-col
          cols="12" sm="6"
          md="4" v-for="assunto in assuntos"
          :key="assunto.id"
      >
        <!-- display dos assuntos -->
        <assunto
            :assunto="`Assunto ${assunto.titulo}`" :acertos="assunto.totalFormat"
        />
      </v-col>
    </v-row>

    <!-- desempenho nas redações -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho nas Redações
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Nota da redação
        </subheader-secao>
      </v-col>

      <v-col
          cols="6" sm="3"
          md="2"
          class="pt-0"
      >
        <v-card>
          <v-card-title>
            <p class="d-block w-full text-h5 font-weight-bold text-center grey--text text--darken-3">
              {{nota_redacao}}
            </p>
          </v-card-title>
        </v-card>
      </v-col>

      <!-- avaliacao do corretor -->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Avaliação do corretor
        </subheader-secao>
      </v-col>

      <v-col
          cols="12"
          class="pt-0"
      >
        <v-card>
          <v-card-title>
            <p
              style="white-space: pre-wrap"
              v-html="avaliacaCorretor"
              class="d-block w-full body-2 grey--text text--darken-3"
            />
          </v-card-title>
        </v-card>
      </v-col>

      <!-- por competencia -->
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
          class="pt-0"
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
    </v-row>

    <TabsMobile />

    <ModalPadrao
        :objeto="objeto"
        @aparecerModal="sumirModal"
    />

<!--    <Dialog-->
<!--      @aparecerModal="ciclo2"-->
<!--      :dialog="dialog2"-->
<!--      :titulo="titulo"-->
<!--      :texto="texto"-->
<!--    />-->

  </v-container>
</template>

<script>
// import SelecionarRanking from '../components/SelecionarRanking.vue';
// import MenuLateral from '../components/MenuLateral.vue';
// import Toolbar from '../components/Toolbar.vue';
import ModalPadrao from '../components/modal/ModalPadrao.vue';
import TabsMobile from '../components/TabsMobile.vue';
import desempenho from '../services/desempenho/desempenho-service';
import Dialog from '../components/dialog/Dialog.vue';
// eslint-disable-next-line import/extensions
import loading from '../components/loading/Loading.vue';

export default {
  name: 'DesempenhoGeral',

  components: {
    TabsMobile, loading, ModalPadrao, Dialog,
  },

  async created () {
    try {
      this.loadingBasl(true);
      const desempenhoLocal = await desempenho.desempenhoAluno('desempenho/desempenho-aluno/1');
      this.meuDesempenho(desempenhoLocal);
      const simuladoT = this.extrairTitulo(desempenhoLocal.data.simuMaster);
      // this.meuDesempenho(dados.data.data);
      this.simulados = simuladoT;
      this.simuladoCurret = this.simulados[0] ? this.simulados[0] : 'Sem Dados';
      this.disciplinasPesquisa = desempenhoLocal.data.materias;
      this.disciplinas = this.extrairTitulo(desempenhoLocal.data.materias);
      this.simuladosPesquisa = desempenhoLocal.data.simuMaster;
      this.areas = this.extrairTitulo(desempenhoLocal.data.areas);
      this.areasPesquisa = desempenhoLocal.data.areas;
      this.redacoes(desempenhoLocal.data.redacoes);
      this.loadingBasl(false);
    } catch (err) {
      this.errorDefault(err);
    }
  },

  methods: {
    ciclo (comentario, texto) {
      this.titulo = comentario;
      this.texto = texto;
      this.dialog2 = true;
    },
    aula () {
      this.$router.push('/aulas-gratuitas');
    },
    ciclo2 ($event) {
      this.dialog2 = $event;
    },
    redacoes (redacoes) {
      this.nota_redacao = redacoes.redacao[0] ? redacoes.redacao[0].resultado : 'Nota indisponível';
      this.avaliacaCorretor = redacoes.redacao[0] ? redacoes.redacao[0].avaliacao : '';
      for (let i = 0; i < redacoes.competencias.length; i++) {
        this.competencias[i].notaCompetencia = redacoes.competencias[i].resultado;
        if (redacoes.competencias[i].resultado >= 0 && redacoes.competencias[i].resultado <= 40) {
          this.competencias[i].desempenho = 'desempenhoMuitoRuim';
        } else if (redacoes.competencias[i].resultado >= 41 && redacoes.competencias[i].resultado <= 80) {
          this.competencias[i].desempenho = 'desempenhoRuim';
        } else if (redacoes.competencias[i].resultado >= 81 && redacoes.competencias[i].resultado <= 120) {
          this.competencias[i].desempenho = 'desempenhoBom';
        } else if (redacoes.competencias[i].resultado >= 121 && redacoes.competencias[i].resultado <= 160) {
          this.competencias[i].desempenho = 'desempenhoOtimo';
        } else {
          this.competencias[i].desempenho = 'desempenhoExcelente';
        }
      }
    },

    extrairTitulo (objeto) {
      if (objeto.length > 0) {
        return objeto.map((el) => el.titulo);
      }

      return objeto;
    },

    sumirModal ($event) {
      this.objeto.dialog = $event;
    },

    meuDesempenho (dados) {
      if (dados.data.data.length <= 0) {
        this.informacoesAdicionais[0].info = 'Nota indisponível';
      } else {
        this.informacoesAdicionais[0].info = dados.data.data[0].media;
        // this.informacoesAdicionais[1].info = `${dados.data.position}º`;

        this.desempenhoArea[0].humanas = dados.data.data[0].Humanas;
        this.desempenhoArea[0].linguagens = dados.data.data[0].Linguagens;
        this.desempenhoArea[0].natureza = dados.data.data[0].Natureza;
        this.desempenhoArea[0].matematica = dados.data.data[0].Matematica;
        this.desempenhoArea[0].redacao = dados.data.data[0].redacao;

        this.desempenhoArea[1].humanas = dados.data.mediaEstadual[0].humanas;
        this.desempenhoArea[1].linguagens = dados.data.mediaEstadual[0].linguagens;
        this.desempenhoArea[1].natureza = dados.data.mediaEstadual[0].natureza;
        this.desempenhoArea[1].matematica = dados.data.mediaEstadual[0].matematica;
        this.desempenhoArea[1].redacao = dados.data.mediaEstadual[0].redacao;

        let contador = 0;
        for (let i = 2; i <= 4; i++) {
          this.desempenhoArea[i].humanas = `${dados.data.myPosition[contador].Humanas}º`;
          this.desempenhoArea[i].linguagens = `${dados.data.myPosition[contador].Linguagens}º`;
          this.desempenhoArea[i].natureza = `${dados.data.myPosition[contador].Natureza}º`;
          this.desempenhoArea[i].matematica = `${dados.data.myPosition[contador].Matematica}º`;
          this.desempenhoArea[i].redacao = `${dados.data.myPosition[contador].redacao}º`;
          contador += 1;
        }
      }
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
          const desempenhoLocal = await desempenho.desempenhoAluno(`desempenho/desempenho-aluno/${filtrado[0].id}`);
          this.meuDesempenho(desempenhoLocal);
          this.loadingBasl(false);
        }
      } catch (err) {
        this.errorDefault(err);
        this.informacoesAdicionais[0].info = 'Nota indisponível';
      }
    },

    async errorDefault (err) {
      if (err.response.status <= 0 || err.response.status >= 500 || err.response.status === 401) {
        this.objeto.dialog = true;
      }
      this.loadingBasl(false);
    },

    async changeSelectArea (event) {
      try {
        const filtrado = this.pesquisarSimulado(event, this.areasPesquisa);
        const simuladoFiltrado = this.pesquisarSimulado(this.simuladoCurret, this.simuladosPesquisa);

        if (filtrado.length > 0 && simuladoFiltrado.length > 0) {
          this.loadingBasl(true);
          const questoes = await desempenho.desempenhoAluno(`questao/${simuladoFiltrado[0].id}/area/${filtrado[0].id}`);
          this.myQuestoes(questoes);
          this.loadingBasl(false);
        }
      } catch (err) {
        this.errorDefault(err);
      }
    },

    myQuestoes (questoes) {
      this.questoesGabarito = [];
      const quest = questoes.data.questoes;
      for (let i = 0; i < quest.length; i++) {
        const beris = {
          name: i + 1,
          disciplina: quest[i].materia,
          marcada: quest[i].marcada,
          gabarito: quest[i].gabarito,
          descricao: quest[i].descricao,
          alternativas: {
            a: quest[i].ra,
            b: quest[i].rb,
            c: quest[i].rc,
            d: quest[i].rd,
            e: quest[i].re,
          },
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          dificuldade: quest[i].dificuldade,
          mediaEscolar: `${quest[i].media} %`,
          id: quest[i].id,
          comentario: quest[i].comentario,
        };

        this.questoesGabarito.push(beris);
      }

      document.querySelector('.v-data-footer__select').innerHTML = '';
      // eslint-disable-next-line max-len
      /* document.querySelector('.v-data-footer__pagination').innerHTML = `1 - ${this.questoesGabarito.length > 10 ? 10 : this.questoesGabarito.length} de ${this.questoesGabarito.length}`; */
    },

    loadingBasl (on) {
      this.disabledSimulado = on;
      this.showDialog = on;
    },

    async changeAssuntos (event) {
      try {
        this.loadingBasl(true);
        const filtrado = this.pesquisarSimulado(event, this.disciplinasPesquisa);
        const simulFiltrar = this.pesquisarSimulado(this.simuladoCurret, this.simuladosPesquisa);
        const retorno = await desempenho.desempenhoAluno(`desempenho/desempenho-assunto/${filtrado[0].id}/simulado/${simulFiltrar[0].id}`);
        this.assuntos = retorno.data.assuntos;
        this.loadingBasl(false);
      } catch (err) {
        this.errorDefault(err);
      }
    },

  },
  data () {
    return {
      play: 'mdi-play',
      comentario: false,
      dialog2: false,
      titulo: '',
      texto: '',
      avaliacaCorretor: '',
      nota_redacao: '',
      assuntos: [],
      objeto: {
        dialog: false,
        titulo: 'Sem conexão com servidor',
        textConfirm: 'Sair',
        textButton: 'Ok',
        confirm: false,
      },
      showDialog: true,
      dialog: {},
      gabarito: {},
      alternativas: {
        a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
      },

      questoesGabarito: [],
      headers: [
        {
          text: 'Questão',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Disciplina',
          value: 'disciplina',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Marcada',
          value: 'marcada',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Gabarito',
          value: 'gabarito',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Resultado',
          value: 'resultado',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Dificuldade',
          value: 'dificuldade',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Média de acertos estadual',
          value: 'mediaEscolar',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: '',
          value: 'url',
          sortable: false,
          class: 'font-weight-bold',
        },
      ],

      headerQuestao: [
        {
          text: 'Questão',
          align: 'start',
          sortable: false,
          value: 'questao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Disciplina',
          sortable: false,
          value: 'disciplina',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Gabarito',
          sortable: false,
          value: 'gabarito',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Questão Marcada',
          sortable: false,
          value: 'questaoMarcada',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média Escolar',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'verQuestao',
        },
      ],

      desempenhoArea: [
        {
          media: 'Meu desempenho',
          redacao: '',
          humanas: '',
          natureza: '',
          matematica: '',
          linguagens: '',
        },
        {
          media: 'Média Estadual',
          redacao: '',
          humanas: '',
          natureza: '',
          matematica: '',
          linguagens: '',
        },
        {
          media: 'Ranking Estadual',
          redacao: '',
          humanas: '',
          natureza: '',
          matematica: '',
          linguagens: '',
        },
        {
          media: 'Ranking Escolar',
          redacao: '',
          humanas: '',
          natureza: '',
          matematica: '',
          linguagens: '',
        },
        {
          media: 'Ranking na Turma',
          redacao: '',
          humanas: '',
          natureza: '',
          matematica: '',
          linguagens: '',
        },
      ],
      desempenhoDisciplina: [
        {
          media: 'Meu desempenho',
          geografia: 880,
          historia: 950,
          filosofia: 800,
          sociologia: 800,
          biologia: 900,
          fisica: 900,
          quimica: 900,
          portugues: 900,
          ingles: 900,
          artes: 900,
          edFisica: 900,
        },
        {
          media: 'Média Estadual',
          geografia: 880,
          historia: 950,
          filosofia: 800,
          sociologia: 800,
          biologia: 900,
          fisica: 900,
          quimica: 900,
          portugues: 900,
          ingles: 900,
          artes: 900,
          edFisica: 900,
        },
        {
          media: 'Ranking Estadual',
          geografia: '',
          historia: '',
          filosofia: '',
          sociologia: '',
          biologia: '',
          fisica: '',
          quimica: '14º colocado',
          portugues: '14º colocado',
          ingles: '14º colocado',
          artes: '14º colocado',
          edFisica: '14º colocado',
        },
        {
          media: 'Ranking Escolar',
          geografia: '12º posição',
          historia: '14º colocado',
          filosofia: '14º colocado',
          sociologia: '14º colocado',
          biologia: '14º colocado',
          fisica: '14º colocado',
          quimica: '14º colocado',
          portugues: '14º colocado',
          ingles: '14º colocado',
          artes: '14º colocado',
          edFisica: '14º colocado',
        },
        {
          media: 'Ranking na Turma',
          geografia: '12º posição',
          historia: '14º colocado',
          filosofia: '14º colocado',
          sociologia: '14º colocado',
          biologia: '14º colocado',
          fisica: '14º colocado',
          quimica: '14º colocado',
          portugues: '14º colocado',
          ingles: '14º colocado',
          artes: '14º colocado',
          edFisica: '14º colocado',
        },
      ],
      headerArea: [
        {
          text: 'Média',
          align: 'start',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências Humanas',
          align: 'start',
          sortable: false,
          value: 'humanas',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências da Natureza',
          sortable: false,
          value: 'natureza',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Linguagens e seus Códigos',
          sortable: false,
          value: 'linguagens',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Matemática',
          sortable: false,
          value: 'matematica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: false,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
      ],
      headerDisciplina: [
        {
          text: 'Média',
          align: 'start',
          sortable: false,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Geografia',
          align: 'start',
          sortable: false,
          value: 'geografia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'História',
          sortable: false,
          value: 'historia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Filosofia',
          sortable: false,
          value: 'filosofia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Sociologia',
          sortable: false,
          value: 'sociologia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Biologia',
          sortable: false,
          value: 'biologia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Física',
          sortable: false,
          value: 'fisica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Química',
          sortable: false,
          value: 'quimica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Português',
          sortable: false,
          value: 'portugues',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Inglês',
          sortable: false,
          value: 'ingles',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Artes',
          sortable: false,
          value: 'artes',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ed. Física',
          sortable: false,
          value: 'edFisica',
          class: 'body-2 font-weight-bold',
        },
      ],

      simulados: ['Sem dados'],
      simuladoCurret: '',
      simuladosPesquisa: [],
      disabledSimulado: false,
      disciplinas: ['Sem Dados'],
      disciplinasPesquisa: [],
      areas: ['Sem dados'],
      areasPesquisa: [],
      desempenhoEscolhido: null,
      informacoesAdicionais: [
        {
          ttl: 'Pontuação',
          icon: 'mdi-podium',
          info: '',
          legenda: 'Média Geral',
        },
        // {
        //   ttl: 'Ranking Escolar',
        //   icon: 'mdi-trophy-variant-outline',
        //   info: '',
        //   posicaoAnterior: '14º',
        //   legenda: 'Colocado',
        // },
      ],

      desempenhos: [
        {
          tipo: 'Simulados Escolares',
          descricao: 'Ver o meu desempenho das suas disciplinas e áreas nos simulados escolares',
          classe: 'destaque__simulados__desempenho',
        },
        {
          tipo: 'Redações',
          descricao: 'Ver a evolução do meu desempenho nas redações corrigidas',
          classe: 'destaque__redacao__desempenho',
        },
      ],

      simuladosEscolares: {
        questoesCorretas: 200,
        questoesErradas: 80,
        questoesTotais: 280,
        get desempenhoLinguagens () {
          let linguagensCorretas = 0;
          let linguagensErradas = 0;
          let linguagensTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'linguagens') {
              linguagensCorretas += disciplina.qCorretas;
              linguagensErradas += disciplina.qErradas;
              linguagensTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [linguagensCorretas, linguagensErradas, linguagensTotais];
        },
        get desempenhoMatematica () {
          let matematicaCorretas = 0;
          let matematicaErradas = 0;
          let matematicaTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'matematica') {
              matematicaCorretas += disciplina.qCorretas;
              matematicaErradas += disciplina.qErradas;
              matematicaTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [matematicaCorretas, matematicaErradas, matematicaTotais];
        },
        get desempenhoNatureza () {
          let naturezaCorretas = 0;
          let naturezaErradas = 0;
          let naturezaTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'natureza') {
              naturezaCorretas += disciplina.qCorretas;
              naturezaErradas += disciplina.qErradas;
              naturezaTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [naturezaCorretas, naturezaErradas, naturezaTotais];
        },
        get desempenhoHumanas () {
          let humanasCorretas = 0;
          let humanasErradas = 0;
          let humanasTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'humanas') {
              humanasCorretas += disciplina.qCorretas;
              humanasErradas += disciplina.qErradas;
              humanasTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [humanasCorretas, humanasErradas, humanasTotais];
        },

        disciplinas: [
          {
            disciplina: 'Português',
            qCorretas: 160,
            qErradas: 120,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Espanhol',
            qCorretas: 180,
            qErradas: 100,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Inglês',
            qCorretas: 240,
            qErradas: 40,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Matemática',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'matematica',
          },
          {
            disciplina: 'Biologia',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'natureza',
          },
          {
            disciplina: 'Física',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'natureza',
          },
          {
            disciplina: 'História',
            qCorretas: 100,
            qErradas: 60,
            qTotais: 160,
            area: 'humanas',
          },
          {
            disciplina: 'Geografia',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'humanas',
          },
        ],
      },

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
    };
  },

  mounted () {
    document.querySelector('.v-data-footer__select').innerHTML = '';
    // eslint-disable-next-line max-len
    /* document.querySelector('.v-data-footer__pagination').innerHTML = `1 - ${this.questoesGabarito.length > 10 ? 10 : this.questoesGabarito.length} de ${this.questoesGabarito.length}`; */
  },

};
</script>

<style scoped>

</style>
