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
          class="d-flex overflow-x-hidden order-0"
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

                <p
                  class="grey--text text--darken-3"
                  v-html="tab.questoes.questaoEnunciado"
                />
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
                  :style="tab.marcado == questao ? 'background: #81D4FA' : ''"
              >
                <!-- icone de marcado ou desmarcado-->
                <v-icon
                    v-text="tab.marcado == questao ? marcado : desmarcado " class="pointer__events__none"
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
        <v-btn
            class="ml-3 text-none azul--text border-3 border__azul"
            @click="paginaAnterior"
        >
          questão anterior
        </v-btn>

        <v-btn
            class="ml-2 text-none azul--text border-3 border__azul"
            @click="proximaPagina"
        >
          próxima questão
        </v-btn>

        <div class="d-md-none d-flex justify-sm-space-between opacity-0 pointer__events__none">
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

          <v-progress-circular
              :size="40" :width="3"
              :value="value"
              color="azul"
              class="ml-1 text-body-2"
              v-if="width <= 660"
          >
            {{ value+'%' }}
          </v-progress-circular>
        </header-secao>

        <section class="d-flex justify-space-between">
          <article class="gabarito">
            <!-- questão 1-45 -->
            <section class="mt-4">
              <button
                  class="pl-2 py-2 text-h6 azul--text border-3 border__azul shadow rounded cursor__pointer"
                  @click="accordeonGabarito"
              >
                Questões 1-45

                <v-icon
                    v-text="'mdi-chevron-up'"
                    class="mt-1 mr-2 ml-6 float-right pointer__events__none"
                    color="azul"
                />
              </button>

              <div class="pl-1 pb-1 transition">
                <v-btn
                    v-for="gabarito in questoes" :key="gabarito + 'questao'"
                    class="gabaritos pa-2 mt-4 mr-3 w-46 h-46"
                    :class="[{
                      'border-3 border__azul': questoesMarcadasGabarito[gabarito - 1],
                      'hidden': gabarito > 45
                    }]"
                    min-width="46" min-height="46"
                    @click="mudarQuestao"
                    :id="gabarito"
                >
                  <p
                      class="d-flex align-center pointer__events__none"
                      :class="[ page === gabarito ? 'azul--text' : 'black--text']"
                  >
                    {{ gabarito }}

                    <v-icon
                        v-text="'mdi-circle-outline'" small
                        v-if="!questoesMarcadasGabarito[gabarito - 1]"
                        class="pointer__events__none"
                    />
                    <span
                        v-else
                        class="pointer__events__none"
                    >
                  {{ questoesMarcadasGabarito[gabarito -1].alternativa[0] }}
                </span>
                  </p>
                </v-btn>
              </div>
            </section>

            <!-- questão 46-90 -->
            <section class="mt-2">
              <button
                  class="pl-2 py-2 text-h6 azul--text border-3 border__azul shadow rounded cursor__pointer"
                  @click="accordeonGabarito"
              >
                Questões 46-90

                <v-icon
                    v-text="'mdi-chevron-up'"
                    class="mt-1 mr-2 ml-6 float-right pointer__events__none"
                    color="azul"
                />
              </button>

              <div class="pl-1 pb-1 transition">
                <v-btn
                    v-for="gabarito in questoes" :key="gabarito + 'questao'"
                    class="gabaritos pa-2 mt-4 mr-3 w-46 h-46"
                    :class="[{
                    'border-3 border__azul': questoesMarcadasGabarito[gabarito - 1],
                    'hidden': gabarito < 46
                  }]"
                    min-width="46" min-height="46"
                    @click="mudarQuestao"
                    :id="gabarito"
                >
                  <p
                      class="d-flex align-center pointer__events__none"
                      :class="[ page === gabarito ? 'azul--text' : 'black--text']"
                  >
                    {{ gabarito }}

                    <v-icon
                        v-text="'mdi-circle-outline'" small
                        v-if="!questoesMarcadasGabarito[gabarito - 1]"
                        class="pointer__events__none"
                    />
                    <span
                        v-else
                        class="pointer__events__none"
                    >
                    {{ questoesMarcadasGabarito[gabarito -1].alternativa[0] }}
                  </span>
                  </p>
                </v-btn>
              </div>
            </section>
          </article>

          <v-progress-circular
              :size="66" :width="3"
              :value="value"
              color="azul"
              class="mt-3"
              v-if="width > 660"
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
                  @click="enviandoSimulado"
                  v-text="'Enviar simulado'"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row>
      <!-- botoes que vao funcionar de verdade-->
      <v-col cols="12">
        <v-btn
            class="d-none d-md-block text-none azul--text border-3 border__azul"
            @click="paginaAnterior"
        >
          questão anterior
        </v-btn>

        <v-btn
            class="d-none d-md-block ml-2 text-none azul--text border-3 border__azul"
            @click="proximaPagina"
        >
          próxima questão
        </v-btn>
      </v-col>

      <!-- botoes para que o gabarito funcione normalmente -->
      <v-col
          cols="12"
          class="pl-0 d-none d-md-block overflow-x-auto opacity-0"
      >
        <div class="paginacao d-flex justify-sm-space-between overflow-x-auto pointer__events__none">
          <v-pagination
              v-model="page" color="azul"
              :length="questoes" :total-visible="90"
              @input="mudarPagina"
          />
        </div>
      </v-col>
    </v-row>
    <loading :dialog="loading" />
  </v-container>
</template>

<script>
import loading from './loading/Loading.vue';

export default {
  name: 'Questoes',
  components: { loading },
  data () {
    return {
      dialog: false,
      termos: false,
      loading: false,
      width: 0,
      tituloPagina: 'Simulados Escolares',
      tipoAtividadeDisciplina: 'Simulado de Linguagens e Humanas',
      desmarcado: 'mdi-checkbox-blank-circle-outline',
      marcado: 'mdi-checkbox-marked-circle-outline',
      page: 1,
      larguraQuestao: 0,
      questoes: 90,
      value: 0,
      questoesMarcadasGabarito: [],
      mixer: '',

      tabs: [],
    };
  },

  async created () {
    try {
      this.loading = true;
      const questoes = await this.$http.get('questoes-simulado/1', { headers: { Authorization: this.$store.state.token } });
      this.preenchendoQuestoes(questoes.data.questao);
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.loading = false;
      alert('Erro ao se conectar com o servidor!');
    }
  },
  mounted () {
    this.width = window.innerWidth;
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });

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
    async enviandoSimulado () {
      try {
        const envio = [];
        for (const tab of this.tabs) {
          const colocado = {
            id_questao: tab.id,
            id_simulado: 1,
            id_user: tab.id_user,
            alternativa: tab.marcado,
          };
          envio.push(colocado);
        }
        const res = await this.$http.post('questoes-simulado', envio,
          { headers: { Authorization: this.$store.state.token } });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
      this.dialog = false;
    },
    preenchendoQuestoes (questoes) {
      this.tabs = [];
      const { id } = this.$store.state.usuario;
      for (let i = 0; i < questoes.length; i++) {
        const marcado = localStorage.getItem(`quest${questoes[i].id}user${id}`) || '';
        const beris = {
          nome: `Questão ${i + 1}`,
          completa: true,
          acerto: false,
          id: questoes[i].id,
          index: i + 1,
          id_user: id,
          marcado,
          questoes: {
            questaoOrigem: '',
            questaoEnunciado: questoes[i].descricao,
            alternativas: {
              a: questoes[i].ra,
              b: questoes[i].rb,
              c: questoes[i].rc,
              d: questoes[i].rd,
              e: questoes[i].re,
            },
          },
        };
        this.tabs.push(beris);
        if (marcado) this.atualizarQuestoes(i + 1, marcado);
      }
    },

    marcar (el) {
      const opcao = el.target;
      const alternativa = opcao.id.replace('alternativa', '');
      const opcaoIcone = opcao.firstElementChild;
      const wrapper = el.target.parentNode;
      const desmarcado = 'mdi-checkbox-blank-circle-outline';
      const marcado = 'mdi-checkbox-marked-circle-outline';
      const questaoAtual = document.querySelector('.v-pagination__item--active').innerHTML;

      const { id } = this.$store.state.usuario;
      const idQuestao = this.tabs[questaoAtual - 1].id;
      this.tabs[questaoAtual - 1].marcado = alternativa;
      // colocando no local storage as informações da alternativa
      localStorage.setItem(`quest${idQuestao}user${id}`, alternativa);
      wrapper.childNodes.forEach((item) => {
        if (item === opcao && opcao.nodeName !== 'SECTION') {
          opcao.style.background = '#81D4FA';
          opcaoIcone.classList.remove(desmarcado);
          opcaoIcone.classList.add(marcado);
          const alternativaSelecionada = opcao.id.split('');
          this.atualizarQuestoes(questaoAtual, alternativaSelecionada.slice(-1));
        } else {
          item.style.removeProperty('background');
          item.firstElementChild.classList.remove(marcado);
          item.firstElementChild.classList.add(desmarcado);
        }
      });
    },

    atualizarQuestoes (questaoAtual, alternativa) {
      this.questoesMarcadasGabarito[questaoAtual - 1] = ({
        questao: `${questaoAtual}`,
        alternativa,
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

    accordeonGabarito: (e) => {
      const gabarito = e.target.nextElementSibling;
      const setinha = e.target.lastElementChild;
      // console.log(gabarito);

      if (!gabarito.classList.contains('gabarito__fechado')) {
        gabarito.classList.add('gabarito__fechado');
        setinha.style.transform = 'rotate(180deg)';
      } else {
        gabarito.classList.remove('gabarito__fechado');
        setinha.style.transform = 'rotate(0)';
      }
    },

    mudarQuestao: (e) => {
      const paginas = document.querySelectorAll('.v-pagination__item');
      // console.log(paginas);
      let questaoSelecionada;

      if (e.target.nodeName === 'SPAN') {
        questaoSelecionada = e.target.parentElement;
        paginas.forEach((pagina) => {
          // eslint-disable-next-line no-unused-expressions
          pagina.innerText === questaoSelecionada.id ? pagina.click() : pagina;
        });
      } else {
        questaoSelecionada = e.target;
        paginas.forEach((pagina) => {
          // eslint-disable-next-line no-unused-expressions
          pagina.innerText === questaoSelecionada.id ? pagina.click() : pagina;
        });
      }
    },

    questoesEmBranco: () => {
      const gabaritos = document.querySelectorAll('.gabaritos');
      for (let i = 0; i < gabaritos.length; i++) {
        if (gabaritos[i].firstElementChild.firstElementChild.firstElementChild.nodeName === 'I') {
          gabaritos[i].classList.add('border-3', 'border__vermelha', 'errou--text');
        } else {
          gabaritos[i].classList.remove('border__vermelha');
        }
      }
    },

    paginaAnterior: () => {
      const paginaAnterior = document.querySelectorAll('.v-pagination__navigation')[2];
      paginaAnterior.click();
    },

    proximaPagina: () => {
      const proximaPagina = document.querySelectorAll('ul li button.v-pagination__navigation')[3];
      proximaPagina.click();
    },
  },
};
</script>

<style scoped>
  .MsoNormal span{
    text-align: left;
  }

  @media screen and (min-width: 661px) {
    .gabarito {
      max-width: calc(99% - 66px);
    }
  }

  .paginacao {
    width: 4200px;
  }
</style>
