<template>
  <v-container
      fluid
      oncontextmenu="return false"
      onkeydown="return false;"
      onmousedown="return false;"
  >
    <v-dialog
        persistent
        max-width="500px"
        v-model="termos"
    >
      <v-card>
        <v-card-title>
          Termos de compromisso do Simulado
        </v-card-title>

        <v-card-text>
          <p>
            textão
          </p>
        </v-card-text>

        <v-card-actions class="pr-6">
          <v-spacer />

          <v-btn
              text
              color="errou"
              v-text="'Cancelar'"
              class="text-none"
              to="/simulados-atividades-escolares"
          />

          <v-btn
              filled
              color="azul"
              v-text="'Aceitar'"
              @click="termos = false"
              class="text-none white--text"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col
          cols="12" md="7"
      >
        <h1>
          {{ tituloPagina }}
        </h1>

        <h3>
          {{ tipoAtividadeDisciplina }}
        </h3>
      </v-col>

      <v-col
          cols="12" md="5"
      >
        <v-alert
            color="amarelo"
            class="mb-0 float-right"
            max-width="300px"
        >
          Tempo restante: {{ '4:30" horas' }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- alternativas -->
    <v-row>
      <v-col
          cols="12" md="8"
          class="d-flex align-center overflow-x-hidden order-0"
      >
        <div
            v-for="(tab, i) in tabs" :key="i"
            :id="`questao-${i + 1}`" class="container__questoes mr-3 w-full flex-shrink-0"
            :class="[ i != 0 ? 'hidden' : i ]"
        >

          <!-- enunciado das questoes -->
          <v-card>
            <v-card-text>
              <article
                  class="img__questoes pointer__events__none"
                  oncopy="return false"
                  oncut="return false"
                  onpaste="return false"
              >
                {{ tab.questoes.questaoOrigem }}

                <span class="body-1 font-weight-medium grey--text text--darken-3">
                          {{ tab.nome }}
                        </span>

                <p class="grey--text text--darken-3">
                  {{ tab.questoes.questaoEnunciado }}
                </p>
              </article>
            </v-card-text>
          </v-card>

          <section
              class="mt-6" :id="`alternativas${i}`"
              @click="marcar"
          >
            <v-hover
                v-for="(alternativa, questao) in tab.questoes.alternativas" :key="questao"
            >
              <article
                  class="pb-2 pt-2 d-flex align-center border__bottom cursor__pointer transition"
                  :id="`alternativa${questao}`" slot-scope="{ hover }"
                  :class="[ hover ? 'bg__azul__claro rounded__normal__top' : '' ]"
              >
                <!-- icone de marcado ou desmarcado-->
                <v-icon
                    v-text="desmarcado" class="pointer__events__none"
                />

                <!-- letra a,b etc.-->
                <p
                    class="ml-1 mr-3 text-h6 leading__tight pointer__events__none"
                    :class="[ questao === 'b' || questao === 'd' ? '' : 'mb-1' ]"
                >
                  {{ questao }}
                </p>

                <p class="body-2 grey--text text--darken-3 pointer__events__none">
                  {{ alternativa }}
                </p>
              </article>
            </v-hover>
          </section>
        </div>
      </v-col>

      <!-- paginacao em telas pequenas-->
      <v-col
          cols="12" md="8"
          class="pl-0 d-md-none"
      >
        <div class="d-md-none d-flex justify-sm-space-between">
          <v-pagination
              v-model="page" color="azul"
              :length="questoes" :total-visible="6"
              @input="mudarPagina"
          />
        </div>
      </v-col>

      <!-- gabarito e questoes respondidas -->
      <v-col
          cols="12" md="4"
          class="mb-8 md-lg-0"
      >
        <header-secao class="border__bottom__azul">
          Cartão Gabarito do Simulado
        </header-secao>

        <section class="d-flex">
          <article class="w-3/4">
            <v-btn
                v-for="gabarito in questoes" :key="gabarito + 'questao'"
                class="gabaritos pa-2 mt-4 mr-3 w-46 h-46"
                min-width="46" min-height="46"
                @click="page = gabarito"
            >
              <p
                  class="d-flex align-center"
                  :class="[ page === gabarito ? 'azul--text' : 'black--text']"
              >
                {{ gabarito }}

                <v-icon
                    v-text="'mdi-circle-outline'" small
                    v-if="!questoesMarcadasGabarito[gabarito - 1]"
                />
                <span v-else>
                  {{ questoesMarcadasGabarito[gabarito -1].alternativa[0] }}
                </span>
              </p>
            </v-btn>
          </article>

          <v-progress-circular
              :size="66" :width="3"
              :value="value" color="azul"
              class="mt-3"
          >
            {{ value+'%' }}
          </v-progress-circular>
        </section>

        <v-dialog
            v-model="dialog" persistent
            max-width="400"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="azul" class="mt-4 white--text text-none rounded__normal"
                dark v-bind="attrs"
                v-on="on"
                @click="questoesEmBranco"
            >
              Finalizar simulado
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Tem certeza que deseja finalizar e enviar o simulado?
            </v-card-title>

            <v-card-text>
              Após finalizado o simulado não pode ser feito novamente e você poderá ver o seu desempenho.
            </v-card-text>

            <v-card-actions class="px-6">
              <v-spacer />
              <v-btn
                  color="red" text
                  @click="dialog = false"
                  v-text="'Cancelar'"
                  class="text-none"
              />
              <v-btn
                  color="azul" class="text-none white--text"
                  @click="dialog = false"
                  v-text="'Enviar simulado'"
                  to="/simulado-escolar-desempenho"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" md="8"
          class="pl-0 d-none d-md-block"
      >
        <div class="d-flex justify-sm-space-between">
          <v-pagination
              v-model="page" color="azul"
              :length="questoes" :total-visible="6"
              @input="mudarPagina"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Questoes',
  data () {
    return {
      dialog: false,
      termos: false,
      tituloPagina: 'Simulados Escolares',
      tipoAtividadeDisciplina: 'Simulado de Linguagens e Humanas',
      desmarcado: 'mdi-checkbox-blank-circle-outline',
      marcado: 'mdi-checkbox-marked-circle-outline',
      page: 1,
      larguraQuestao: 0,
      questoes: 1,
      value: 0,
      questoesMarcadasGabarito: [],
      mixer: '',

      tabs: [
        {
          nome: 'Questão 1',
          completa: true,
          acerto: false,
          questoes: {
            questaoOrigem: 'ENEM - ',
            questaoEnunciado: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.?',
            alternativas: {
              a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
            },
          },
        },
        {
          nome: 'Questão 2',
          completa: true,
          acerto: true,
          questoes: {
            questaoOrigem: 'PUC - ',
            questaoEnunciado: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.?',
            alternativas: {
              a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
            },
          },
        },
        {
          nome: 'Questão 3',
          completa: false,
          acerto: false,
          questoes: {
            questaoOrigem: '',
            questaoEnunciado: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.?',
            alternativas: {
              a: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              b: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              c: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              d: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
              e: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed laboris nisi ut aliquip ex ea commodo consequat.?',
            },
          },
        },
      ],
    };
  },

  mounted () {
    this.larguraQuestao = document.querySelector('.container__questoes').offsetWidth;
    this.questoes = document.getElementsByClassName('container__questoes').length;
    this.termos = true;

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    }, false);

    document.addEventListener('copy', (e) => {
      // Change the copied text if you want
      e.clipboardData.setData('text/plain', 'Acho que não, viu?');

      // Prevent the default copy action
      e.preventDefault();
    }, false);

    document.addEventListener('keydown', (e) => {
      console.log(e.key);

      if (e.key === 'F12') {
        e.preventDefault();
      }

      if (e.shiftKey && e.ctrlKey && e.key === 'I') {
        alert('Pê pê ôôôÔôoo');
        e.preventDefault();
        return false;
      }
    });
  },

  methods: {
    marcar (el) {
      const opcao = el.target;
      const opcaoIcone = opcao.firstElementChild;
      const wrapper = el.target.parentNode;
      const desmarcado = 'mdi-checkbox-blank-circle-outline';
      const marcado = 'mdi-checkbox-marked-circle-outline';
      const questaoAtual = document.querySelector('.v-pagination__item--active').innerHTML;

      wrapper.childNodes.forEach((item) => {
        if (item === opcao && opcao.nodeName !== 'SECTION') {
          opcao.style.background = '#81D4FA';
          opcaoIcone.classList.remove(desmarcado);
          opcaoIcone.classList.add(marcado);

          const alternativaSelecionada = opcao.id.split('');
          this.questoesMarcadasGabarito[questaoAtual - 1] = ({
            questao: `${questaoAtual}`,
            alternativa: alternativaSelecionada.slice(-1),
          });
        } else {
          item.style.removeProperty('background');
          item.firstElementChild.classList.remove(marcado);
          item.firstElementChild.classList.add(desmarcado);
        }
      });

      const questoesTotais = Number(Object.keys(this.questoesMarcadasGabarito).length);
      this.value = Math.floor((questoesTotais / this.questoes) * 100);
    },

    mudarPagina: (paginaAtual) => {
      const questaoAtual = document.getElementById(`questao-${paginaAtual}`);
      const questoes = document.getElementsByClassName('container__questoes');

      questoes.forEach((questao) => {
        // eslint-disable-next-line no-unused-expressions
        questao === questaoAtual ? questaoAtual.classList.remove('hidden') : questao.classList.add('hidden');
      });
    },

    questoesEmBranco: () => {
      const gabaritos = document.querySelectorAll('.gabaritos');
      for (let i = 0; i < gabaritos.length; i++) {
        if (gabaritos[i].firstElementChild.firstElementChild.firstElementChild.nodeName === 'I') {
          gabaritos[i].classList.add('border-3', 'border__vermelha', 'errou--text');
        } else {
          gabaritos[i].classList.remove('border-3', 'border__vermelha');
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
