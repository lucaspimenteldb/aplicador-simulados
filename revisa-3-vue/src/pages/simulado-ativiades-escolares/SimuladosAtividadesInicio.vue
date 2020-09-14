<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          Simulados disponíveis
        </h1>

        <h3>
          Todas as disciplinas
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <header-secao>
          Simulados Escolares - Dia 1
        </header-secao>
      </v-col>
    </v-row>

    <v-row
        :class="[ area.notificacao ? '' : 'd-none']"
        v-for="(area, areaNome, i) in areas" :key="areaNome"
    >
      <v-col
          cols="12" :class="i !== 0 ? 'mt-8' : i"
      >
        <subheader-secao>
          {{ `${areaNome.charAt(0).toUpperCase()}${areaNome.slice(1)}` }}
        </subheader-secao>
      </v-col>

      <!-- card da disciplina com nova atividade ou simulado-->
      <v-col
          cols="12" sm="6"
          md="4" lg="3"
          v-for="(disciplina, i) in area.disciplinas" :key="disciplina"
      >
        <v-card
            class="transition rounded__normal cursor__pointer btn__shadow" :class="`destaque__escolares__${areaNome}`"
            to="/simulado-responder"
        >
          <v-card-text>
            <article class="d-flex align-center relative z-1">
              <v-img
                  :src="require(`@/assets/icon/disciplinas/${disciplina}.png`)" width="30"
                  class="flex-grow-0"
              />

              <p class="ml-2 text-h6 leading__tight grey--text text--darken-3">
                {{ area.ttl[i] }}
              </p>

              <!-- sino de notificacao -->
              <div
                  class="bolinha__notificacao d-flex align-center justify-center absolute top--2 right--2 font-weight-bold
                  grey--text text--darken-3 z--1"
              >
                {{ area.quantidadeNotificacao}}
              </div>
              <v-icon
                  v-text="'mdi-bell'" class="w__icons__28 icone__backdrop absolute top-0 right-0 z-10"
              />
            </article>

            <!-- quantas notificacoes são -->
            <p class="mt-2 black--text">
              {{ area.textoNotificacao }}
            </p>

            <!-- texto para acessar as atividades novas-->
            <article class="mt-8 relative">
              <p class="font-weight-bold grey--text text--darken-3">
                {{ `Fazer ${area.textoNotificacao.split(' ')[4]} de  ${area.ttl}` }}
              </p>

              <!-- icone para acessar -->
              <v-icon
                  v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
              />
            </article>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

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
            <p>
              {{ item.dificuldade.split('-')[1] }}
            </p>
          </template>

          <!-- modal para ver a questão -->
          <template v-slot:item.url="{ item }">
            <v-dialog
                v-model="dialog[item.id]" width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    small
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
                  <span class="headline">Questão {{ item.name }}</span>
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

    <!-- gabaritos -->
    <!--<v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Gabaritos e Questões
        </header-secao>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
            :headers="headerQuestao" :items="desempenhoQuestao"
            fixed-header
        >
          <template
              v-slot:item.verQuestao="{ item }"
          >
            <p class="font-weight-bold">
              {{ item.verQuestao }}
              <v-icon
                  v-text="'mdi-arrow-right'" color="black"
                  small
              />
            </p>
          </template>
        </v-data-table>
      </v-col>
    </v-row>-->
  </v-container>
</template>

<script>
export default {
  name: 'SimuladosAtividadesInicio',

  data () {
    return {
      professorSelecionado: null,
      dialog: {},
      alternativas: {
        a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
        e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
      },

      questoesGabarito: [
        {
          name: '1',
          disciplina: 'português',
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
              return '12 pts.';
            }
            return '--';
          },
          mediaEscolar: '80% acerto',
          id: 0,
        },
        {
          name: '2',
          disciplina: 'português',
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
              return '12 pts.';
            }

            return '--';
          },
          mediaEscolar: '80% acerto',
          id: 1,
        },
        {
          name: '3',
          disciplina: 'português',
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
              return '12 pts.';
            }

            return '--';
          },
          mediaEscolar: '80% acerto',
          id: 2,
        },
        {
          name: '4',
          disciplina: 'português',
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
              return '12 pts.';
            }

            return '--';
          },
          mediaEscolar: '80% acerto',
          id: 3,
        },
        {
          name: '5',
          disciplina: 'português',
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
              return '12 pts.';
            }

            return '--';
          },
          mediaEscolar: '80% acerto',
          id: 4,
        },
        {
          name: '6',
          disciplina: 'português',
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
              return '12 pts.';
            }

            return '--';
          },
          mediaEscolar: '80% acerto',
          id: 5,
        },
      ],
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
          class: 'font-weight-bold',
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
          text: 'Média Escolar',
          value: 'mediaEscolar',
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

      areas: {
        linguagens: {
          notificacao: true,
          get quantidadeNotificacao () {
            return this.notificacao ? 1 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novo simulado` : '';
          },
          disciplinas: ['portugues'],
          ttl: ['Linguagens'],
        },
        humanas: {
          notificacao: true,
          get quantidadeNotificacao () {
            return this.notificacao ? 1 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novo simulado` : '';
          },
          disciplinas: ['geografia'],
          ttl: ['Humanas'],
        },
        natureza: {
          notificacao: false,
          get quantidadeNotificacao () {
            return this.notificacao ? 3 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novos simulados` : '';
          },
          disciplinas: [],
          ttl: [],
        },
        matematica: {
          notificacao: false,
          get quantidadeNotificacao () {
            return this.notificacao ? 3 : 0;
          },
          get textoNotificacao () {
            return this.notificacao ? `Você tem ${this.quantidadeNotificacao} novos simulados` : '';
          },
          disciplinas: [],
          ttl: [],
        },
      },

      professores: ['Carlos - Matemática', 'Maria - Português', 'Fernanda - Química', 'Bernardo - Biologia', 'João de Deus - Física', 'Mário - Sociologia', 'Jesus - Filosofia', 'História - Saldanha', 'Geografia - Paulo'],

      atividadesEntregar: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          entrega: 'Data de entrega: 18 de março',
          quantidadeQuestoes: 24,
          questoesFeitas: 4,
          get porcentagem () {
            return `${Math.round((this.questoesFeitas / this.quantidadeQuestoes) * 100)}%`;
          },
        },
        {
          nome: 'Atividade de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          entrega: 'Data de entrega: 30 de março',
          quantidadeQuestoes: 12,
          questoesFeitas: 8,
          get porcentagem () {
            return `${Math.round((this.questoesFeitas / this.quantidadeQuestoes) * 100)}%`;
          },
        },
      ],

      atividadesFinalizadas: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          resultado: 18,
          quantidadeQuestoes: 24,
          get porcentagemAcerto () {
            return `${Math.round((this.resultado / this.quantidadeQuestoes) * 100)}%`;
          },
          finalizado: '02 de abril',
        },
      ],

      atividadesExpiradas: [
        {
          nome: 'Simulado de português',
          area: 'linguagens',
          icon: 'portugues',
          disciplina: 'Português',
          quantidadeQuestoes: 24,
          expirado: '29 de março',
        },
      ],
    };
  },

  mounted () {
    document.querySelector('.v-data-footer__select').innerHTML = '';
    document.querySelector('.v-data-footer__pagination').innerHTML = `1 - ${this.questoesGabarito.length > 10 ? 10 : this.questoesGabarito.length} de ${this.questoesGabarito.length}`;
  },

  methods: {
    fecharModal () {
      const overlay = document.getElementsByClassName('v-overlay__scrim');
      overlay[0].click();
    },
  },
};
</script>

<style scoped>

</style>
