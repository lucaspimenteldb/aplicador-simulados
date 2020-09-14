<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Desempenho do Simulado
        </h1>

        <h3>
          Simulado de Português
        </h3>
      </v-col>
    </v-row>

    <v-row class="d-flex align-end">
      <v-col
          cols="12" sm="6"
          md="4"
      >
        <!-- card principal -->
        <v-card class="shadow">
          <v-card-title class="relative">
            <v-icon
                v-text="'mdi-playlist-check'" color="black"
                class="mr-2"
            />

            Português

            <v-img
                :src="require(`@/assets/icon/disciplinas/${disciplina}.png`)" class="w-40 absolute top-4 right-4"
            />
          </v-card-title>

          <!-- resultados -->
          <v-card-text>
            <article class="d-flex align-center relative">
              <p class="font-weight-medium grey--text text--darken-3">
                {{ `Resultado: ${ resultadoAcertos } acertos`}}
              </p>

              <div class="bolinha__acertos top-0 left-37" />
              <v-icon
                  v-text="'mdi-checkbox-marked-circle-outline'" small
                  color="black" class="ml-2"
              />
            </article>

            <p class="mt-4 grey--text text--darken-3">
              Ranking deste simulado:
            </p>
            <p class="font-weight-medium grey--text text--darken-3">
              {{ `Parabéns! Você ficou em ${posicaoSimulado}º lugar` }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- cards pequenos secundarios -->
      <v-col
          cols="6" sm="4"
          :md="card.ttl === 'Pontuação' ? 2 : 3"
          v-for="card in informacoesAdicionais" :key="card.ttl"
      >
        <p class="body-1 font-weight-medium">
          {{ card.ttl }}
        </p>

        <v-card
            class="d-flex align-center overflow-hidden" flat
        >
          <!-- icones dos card pequenos -->
          <div class="my-4 pa-3 d-flex justify-center align-center relative left--2 rounded-circle bg__verde__desempenho">
            <v-icon
                v-text="card.icon" color="black"
            />
          </div>

          <article
              v-if="card.ttl != 'Pontuação'" class="mb-1 mr-2"
          >
            <v-icon
                v-text="'mdi-arrow-top-right'" color="black"
            />

            <p class="red--text body-2 leading__supertight">
              {{ card.posicaoAnterior }}
            </p>
          </article>

          <v-card-text class="py-0 px-1 mt-1">
            <p class="text-h5 leading__supertight font-weight-bold black--text">
              {{ card.info }}
            </p>

            <p
                :class="[ card.ttl === 'Pontuação' ? 'ml-3' : 'd-none' ]" class="leading__tight"
            >
              {{ card.legenda }}
            </p>

            <p
                :class="[ card.ttl === 'Pontuação' ? 'ml-4 d-none' : 'ml-1' ]" class="leading__tight"
            >
              {{ card.legenda }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- media de acertos -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Média de Acertos
        </header-secao>
      </v-col>

      <v-col
          cols="12" sm="10"
          md="5" lg="4"
      >
        <subheader-secao>
          O seu desempenho no simulado
        </subheader-secao>

        <v-card>
          <v-card-text class="d-flex align-center">
            <v-progress-circular
                :size="120" :width="7"
                :value="'70'"
                color="desempenhoOtimo"
                rotate="-90"
            >
              <p class="ml-1 text-h5 font-weight-bold grey--text text--darken-3">
                70%
              </p>
            </v-progress-circular>

            <!-- informaçoes do desempenho -->
            <section class="ml-4">
              <p class="h-30 relative font-weight-bold grey--text text--darken-3">
                <span class="bolinha__acertos absolute left-0 top-1" />
                <v-icon
                    v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                    class="text-h6"
                />

                22 questões <span class="acertou--text"> corretas</span>
              </p>
              <p class="h-30 relative font-weight-bold grey--text text--darken-3">
                <span class="bolinha__erro absolute left-0 top-1" />
                <v-icon
                    v-text="'mdi-close-circle-outline'" color="black"
                    class="text-h6"
                />

                8 questões <span class="errou--text"> incorretas</span>
              </p>
              <p class="h-30 relative grey--text text--darken-3">
                <v-icon
                    v-text="'mdi-format-list-checkbox'" color="black"
                    class="text-h6"
                />

                32 questões
              </p>
              <p class="h-30 relative grey--text text--darken-3">
                <v-icon
                    v-text="'mdi-plus-circle-outline'" color="black"
                    class="text-h6"
                />

                75 pontos
              </p>
            </section>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
          cols="12" sm="10"
          md="5" lg="4"
      >
        <subheader-secao>
          O desempenho da sua turma
        </subheader-secao>

        <v-card>
          <v-card-text class="d-flex align-center">
            <v-progress-circular
                :size="90" :width="6"
                :value="'50'"
                color="desempenhoBom"
                class="mt-2"
                rotate="-90"
            >
              50%
            </v-progress-circular>

            <!-- informaçoes do desempenho -->
            <section class="ml-4">
              <p class="h-30 relative font-weight-bold grey--text text--darken-3">
                <span class="bolinha__acertos absolute left-0 top-1" />
                <v-icon
                    v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                    class="text-h6"
                />

                16 questões <span class="acertou--text"> corretas</span>
              </p>
              <p class="h-30 relative font-weight-bold grey--text text--darken-3">
                <span class="bolinha__erro absolute left-0 top-1" />
                <v-icon
                    v-text="'mdi-close-circle-outline'" color="black"
                    class="text-h6"
                />

                16 questões <span class="errou--text"> incorretas</span>
              </p>
              <p class="h-30 relative grey--text text--darken-3">
                <v-icon
                    v-text="'mdi-format-list-checkbox'" color="black"
                    class="text-h6"
                />

                32 questões
              </p>
              <p class="h-30 relative grey--text text--darken-3">
                <v-icon
                    v-text="'mdi-plus-circle-outline'" color="black"
                    class="text-h6"
                />

                50 pontos
              </p>
            </section>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- gabarito do simulado -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Gabarito do simulado
        </header-secao>
      </v-col>

      <!-- tabela das questoes -->
      <v-col cols="12">
        <v-data-table
            :headers="headers" fixed-header
            :items="questoesGabarito"
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
            <v-img
                :src="require(`@/assets/img/simulado/${item.dificuldade}.png`)" width="40"
                :title="item.dificuldade.slice(12)"
            />
          </template>

          <!-- modal para ver a questão -->
          <template v-slot:item.url="{ item }">
            <v-dialog
                v-model="dialog[item.id]" width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="azul white--text rounded__normal text-capitalize"
                    color="primary"
                    v-bind="attrs" v-on="on"
                    :to="item.url"
                    @click.stop="$set(dialog, item.id, true)"
                >
                  ver questão
                </v-btn>
              </template>

              <v-card class="relative overflow-hidden">
                <v-icon
                    v-text="'mdi-close-circle-outline'" class="absolute top--8 right--8 pointer__events__none cursor__pointer z-1000"
                    color="errou" large
                />

                <v-card-title>
                  <span class="headline">{{ item.name }}</span>
                </v-card-title>

                <v-card-text>
                  <!-- anunciado da questão -->
                  <article>
                    <!-- eslint-disable max-len -->
                    Lorem ipsum dolor sit amet, semper quis, sapien id natoque elit. Nostra urna at, magna at neque sed sed ante imperdiet, dolor mauris cursus velit, velit non, sem nec. Volutpat sem ridiculus placerat leo, augue in, duis erat proin condimentum in a eget, sed fermentum sed vestibulum varius ac, vestibulum volutpat orci ut elit eget tortor.

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
                      v-for="(alternativa, questao) in alternativas" :key="questao"
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

                      <p class="body-2 pointer__events__none">
                        {{ alternativa }}
                      </p>

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

    <!-- ranking do simulado -->
    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Ranking do simulado
        </header-secao>
      </v-col>

      <v-col
          cols="12" :sm="pessoa.img ? 6 : 4"
          :md="pessoa.img ? 4 : 3"
          v-for="pessoa in ranking" :key="pessoa.nome"
      >
        <v-card>
          <v-card-text class="d-flex align-center">
            <v-avatar
                v-if="pessoa.img" class="mr-4"
            >
              <v-img
                  :src="require(`@/assets/img/simulado/${pessoa.img}.png`)" width="60"
              />
            </v-avatar>

            <article>
              <p
                  class="grey--text text--darken-3" :class="pessoa.img ?  'text-h6' : 'body-1'"
              >
                {{ `${pessoa.nome} - ${pessoa.lugar}` }}
              </p>

              <p class="h-24 relative font-weight-bold grey--text text--darken-3">
                <span class="bolinha__acertos absolute left-0 top-1" />
                <v-icon
                    v-text="'mdi-checkbox-marked-circle-outline'" color="black"
                    class="text-h6"
                />

                22 questões <span class="acertou--text"> corretas</span>
              </p>

              <p class="h-24 relative grey--text text--darken-3">
                <v-icon
                    v-text="'mdi-plus-circle-outline'" color="black"
                    class="text-h6"
                />

                50 pontos
              </p>
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'DesempenhoSimulado',

  data () {
    return {
      dialog: {},
      alternativas: {
        a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
      },
      resultadoAcertos: 18,
      questoes: 24,
      posicaoSimulado: 10,
      dataFinalizada: this.data(),
      disciplina: 'portugues',

      informacoesAdicionais: [
        {
          ttl: 'Pontuação',
          icon: 'mdi-podium',
          info: '+740',
          legenda: 'pontos',
        },
        {
          ttl: 'Ranking Escolar',
          icon: 'mdi-trophy-variant-outline',
          info: '10º',
          posicaoAnterior: '14º',
          legenda: 'posição',
        },
        {
          ttl: 'Ranking Estadual',
          icon: 'mdi-trophy-variant-outline',
          info: '16º',
          posicaoAnterior: '22º',
          legenda: 'posição',
        },
      ],

      questoesGabarito: [
        {
          name: 'Questão 1',
          marcada: 'A',
          gabarito: 'A',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          get pontuacao () {
            if (this.marcada === this.gabarito) {
              return '12 pontos';
            }
            return '--';
          },
          dificuldade: 'dificuldade-dificil',
          url: '',
          id: 0,
        },
        {
          name: 'Questão 2',
          marcada: 'B',
          gabarito: 'B',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          get pontuacao () {
            if (this.marcada === this.gabarito) {
              return '12 pontos';
            }

            return '--';
          },
          dificuldade: 'dificuldade-facil',
          url: '',
          id: 1,
        },
        {
          name: 'Questão 3',
          marcada: 'B',
          gabarito: 'B',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          get pontuacao () {
            if (this.marcada === this.gabarito) {
              return '12 pontos';
            }

            return '--';
          },
          dificuldade: 'dificuldade-muito-dificil',
          url: '',
          id: 2,
        },
        {
          name: 'Questão 4',
          marcada: 'D',
          gabarito: 'E',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          get pontuacao () {
            if (this.marcada === this.gabarito) {
              return '12 pontos';
            }

            return '--';
          },
          dificuldade: 'dificuldade-dificil',
          url: '',
          id: 3,
        },
        {
          name: 'Questão 5',
          marcada: 'D',
          gabarito: 'D',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          get pontuacao () {
            if (this.marcada === this.gabarito) {
              return '12 pontos';
            }

            return '--';
          },
          dificuldade: 'dificuldade-normal',
          url: '',
          id: 4,
        },
        {
          name: 'Questão 6',
          marcada: 'C',
          gabarito: 'B',
          get resultado () {
            if (this.marcada === this.gabarito) {
              return 'acertou';
            }
            return 'errou';
          },
          get pontuacao () {
            if (this.marcada === this.gabarito) {
              return '12 pontos';
            }

            return '--';
          },
          dificuldade: 'dificuldade-dificil',
          url: '',
          id: 5,
        },
      ],
      headers: [
        {
          text: 'Português',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Marcada',
          value: 'marcada',
          class: 'font-weight-bold',
        },
        {
          text: 'Gabarito',
          value: 'gabarito',
          class: 'font-weight-bold',
        },
        {
          text: 'Resultado',
          value: 'resultado',
          class: 'font-weight-bold',
        },
        {
          text: 'Pontuação',
          value: 'pontuacao',
          class: 'font-weight-bold',
        },
        {
          text: 'Dificuldade',
          value: 'dificuldade',
          class: 'font-weight-bold',
        },
        {
          text: 'Ver questão',
          value: 'url',
          sortable: false,
          class: 'font-weight-bold',
        },
      ],

      ranking: [
        {
          img: 'ranking-simulado2',
          nome: 'Marioson',
          lugar: '1º lugar',
          acertos: 30,
          pontos: 93,
        },
        {
          img: 'ranking-simulado1',
          nome: 'Lucas',
          lugar: '2º lugar',
          acertos: 30,
          pontos: 93,
        },
        {
          img: 'ranking-simulado',
          nome: 'Chavanel',
          lugar: '3º lugar',
          acertos: 30,
          pontos: 93,
        },
        {
          nome: 'Chavente',
          lugar: '4º lugar',
          acertos: 30,
          pontos: 93,
        },
        {
          nome: 'Leleco',
          lugar: '5º lugar',
          acertos: 30,
          pontos: 93,
        },
        {
          nome: 'Naja BR',
          lugar: '6º lugar',
          acertos: 30,
          pontos: 93,
        },
      ],
    };
  },

  mounted () {
    document.querySelector('.v-data-footer__select').innerHTML = '';
    document.querySelector('.v-data-footer__pagination').innerHTML = `1 - ${this.questoesGabarito.length > 10 ? 10 : this.questoesGabarito.length} de ${this.questoesGabarito.length}`;
  },

  methods: {
    data () {
      const datinha = new Date();
      return `${datinha.getDate()} do ${datinha.getMonth() + 1}`;
    },

    fecharModal () {
      const overlay = document.getElementsByClassName('v-overlay__scrim');
      overlay[0].click();
    },
  },

};
</script>

<style scoped>

</style>
