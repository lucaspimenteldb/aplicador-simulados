<template>
  <v-container
      fluid
      oncontextmenu="return false"
  >
    <v-alert
        :type="alert"
        class="mb-0 d-flex align-center top-2 right-6 right-sm-8 z-1000 fixed-ok"
        height="48px"
        max-width="300px"
    >
      Tempo restante: {{ crono }}
    </v-alert>

    <v-dialog
        persistent
        max-width="500px"
        v-model="termos"
    >
      <v-card>
        <v-alert
            class="pl-6 errou white--text rounded-0"
            v-show="!idiomaSelecionado"
        >
          Por favor, selecione o idioma desejado

          <v-icon
              color="white"
              v-text="'mdi-close-circle-outline'"
              small
              class="ml-2"
          />
        </v-alert>

        <v-card-title>
          Termos de compromisso do Simulado
        </v-card-title>

        <v-card-text>
          <v-col
              cols="12"
              class="pt-0 px-0"
          >
            <v-select
                v-if="this.$route.params.idioma"
                filled
                :items="['Inglês', 'Espanhol']"
                label="Escolha o idioma" color="azul"
                hide-details
                v-model="idiomaAtual"
            />
          </v-col>

          <v-img src="@/assets/termo-linguagens.png" />
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
              @click="aceitarTermo"
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
        <v-dialog
            v-model="dialog" persistent
            max-width="400"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="azul"
                class="float-right text-none white--text"
                dark v-bind="attrs"
                @click="questoesEmBranco"
            >
              Finalizar simulado
            </v-btn>
          </template>
          <v-card>
            <v-card-title
class="headline"
style="word-break: break-word"
>
              {{ mensagem }}
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
                  @click="pushDoSimulado"
                  v-text="'Enviar simulado'"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            continu="tab"
        >
          <div v-if="tab">
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
                    class="enunciado grey--text text--darken-3 body-2 font-weight-regular"
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

                <p
v-html="alternativa"
class="body-2 grey--text text--darken-3 pointer__events__none"
/>
              </article>
            </v-hover>
          </section>

          <!-- botoes que vao funcionar de verdade-->
          <section class="mt-4 d-block w-full">
            <v-btn
                class="d-none d-md-inline-block text-none azul--text border-3 border__azul"
                @click="paginaAnterior"
            >
              questão anterior
            </v-btn>

            <v-btn
                class="d-none d-md-inline-block ml-2 text-none azul--text border-3 border__azul"
                @click="proximaPagina"
            >
              próxima questão
            </v-btn>
          </section>
        </div>
        </div>
      </v-col>

      <!-- paginacao em telas pequenas-->
      <v-col
          cols="12"
          class="pl-0 d-md-none"
      >
        <v-btn
            class="ml-3 text-none azul--text border-3 border__azul"
            @click="paginaAnterior"
        >
          questão anterior
        </v-btn>

        <v-btn
            class="ml-1 text-none azul--text border-3 border__azul"
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
            {{ value + '%' }}
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
                  {{ questoesMarcadasGabarito[gabarito - 1].alternativa[0] }}
                </span>
                  </p>
                </v-btn>
              </div>
            </section>

            <!-- questão 46-90 -->
            <section class="mt-6">
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
                    {{ questoesMarcadasGabarito[gabarito - 1].alternativa[0] }}
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
            {{ value + '%' }}
          </v-progress-circular>
        </section>

        <!--<v-dialog
            v-model="dialog" persistent
            max-width="400"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="azul" class="mt-4 white&#45;&#45;text text-none"
                dark v-bind="attrs"
                @click="questoesEmBranco"
            >
              Finalizar simulado
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              {{ mensagem }}
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
                  color="azul" class="text-none white&#45;&#45;text"
                  @click="pushDoSimulado"
                  v-text="'Enviar simulado'"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>-->
      </v-col>
    </v-row>

    <v-row>
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
    <modal
        :objeto="objeto"
        @funcao="func"
    />
    <modal
        :objeto="objeto2"
        @funcao="func2"
    />
  </v-container>
</template>

<script>
import loading from './loading/Loading.vue';
import modal from './modal/ModalPadrao.vue';

export default {
  name: 'Questoes',
  components: { loading, modal },
  data () {
    return {
      horas: '',
      minutes: '',
      seconds: '',
      questoesAux: [],
      alert: 'success',
      idiomaSelecionado: true,
      contador: '',
      objeto: {
        dialog: false,
        titulo: 'Simulado entregue com sucesso!',
        textConfirm: 'Sair',
        textConfirm2: 'ok',
        textButton: '',
        confirm: false,
        confirm2: true,

      },
      objeto2: {
        dialog: false,
        titulo: 'Simulado entregue com sucesso!',
        textConfirm: 'Sair',
        textConfirm2: 'ok',
        textButton: '',
        confirm: false,
        confirm2: true,

      },
      idiomaAtual: '',
      dataInicio: '',
      mensagem: '',
      idioma: false,
      dialog: false,
      termos: false,
      loading: false,
      crono: '',
      width: 0,
      tituloPagina: 'Simulados Escolares',
      tipoAtividadeDisciplina: '',
      desmarcado: 'mdi-checkbox-blank-circle-outline',
      marcado: 'mdi-checkbox-marked-circle-outline',
      page: 1,
      questoes: 0,
      value: 0,
      questoesMarcadasGabarito: [],
      mixer: '',

      tabs: [],
    };
  },

  activated () {
    this.tabs = [];
    this.crono = '';
    clearInterval(this.contador);
    this.questoesMarcadasGabarito = [];
    // this.termos = (this.$route.params.situacao === '0');
    if (this.termos) return;
    const id = this.$route.params.simulado;
    this.getQuestoes(`questoes-simulado/${id}`);
  },

  mounted () {
    this.width = window.innerWidth;
    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });

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
        // e.preventDefault();
      }

      if (e.shiftKey && e.ctrlKey && e.key === 'I') {
        alert('Pê pê ôôôÔôoo');
        e.preventDefault();
        return false;
      }

      return e.key;
    });
  },

  methods: {
    cronometro () {
      // const countDownDate = new Date(this.dataInicio).getTime();
      let { horas } = this;
      let min = this.minutes;
      let sec = this.seconds;
      this.contador = setInterval(() => {
        // const now = new Date().getTime();
        // const distance = countDownDate - now;
        // // const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        // const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // const hoursAux = ((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        sec--;

        if (sec < 0) {
          sec = 59;
          min--;
          if (min < 0) {
            min = 59;
            horas--;
            if (horas < 0) {
              horas = 0;
            }
          }
        }

        this.crono = `${horas}:${min}:${sec}`;

        if (min === 30 && horas === 0 && this.alert !== 'error') {
          this.alert = 'error';
        }

        // if (hoursAux <= 1 && hours > 0.5 && alert !== 'warning') {
        //   this.alert = 'warning';
        // }

        if (horas === 0 && min === 0 && sec === 0) {
          this.crono = 'Encerrado';
          // this.enviandoSimulado();
          // this.$router.push('/simulados-atividades-escolares');
          clearInterval(this.contador);
        }
      }, 1000);
    },
    aceitarTermo () {
      if (this.$route.params.idioma && !this.idiomaAtual) {
        this.idiomaSelecionado = false;
        return;
      }
      this.termos = false;
      this.idiomaSelecionado = true;
      localStorage.setItem('termo', JSON.stringify(true));
      const id = this.$route.params.simulado;
      let idioma = this.idiomaAtual === 'Inglês' ? 10 : 11;
      if (this.idiomaAtual === '') idioma = '';
      this.getQuestoes(`questoes-simulado/${id}/${idioma}`);
    },

    pushDoSimulado () {
      this.enviandoSimulado();
      this.$router.push('/simulados-atividades-escolares/simulado');
    },

    async getQuestoes (url) {
      try {
        if (this.termos) return;
        this.loading = true;
        const questoes = await this.$http.get(url, { headers: { Authorization: this.$store.state.token } });
        this.questoesAux = questoes.data.questao;
        this.questoes = this.questoesAux.length;
        this.preenchendoQuestoes(questoes.data.questao, 1, 0);
        this.reiniciarCache();
        this.loading = false;
        this.dataInicio = questoes.data.data;
        const area1 = questoes.data.areas[0] ? questoes.data.areas[0].Area.name : '';
        const area2 = questoes.data.areas[1] ? questoes.data.areas[1].Area.name : '';
        this.tipoAtividadeDisciplina = `Simulado de ${area1} e ${area2}`;
        // this.tipoAtividadeDisciplina = areas[0];
        // this.dataInicio = this.dataInicio.replace('T', ' ');
        // this.dataInicio = this.dataInicio.replace('Z', '');
        this.horas = questoes.data.dataCompleta.hours;
        this.minutes = questoes.data.dataCompleta.minutes;
        this.seconds = questoes.data.dataCompleta.seconds;
        this.cronometro();
      } catch (e) {
        console.log(e);
        this.loading = false;
        const message = e.response ? e.response.data.message : 'Verifique a conexão com a sua internet e tente novamente mais tarde';
        alert(message);
      }
    },

    reiniciarCache () {
      const { id } = this.$store.state.usuario;
      for (let i = 0; i < this.questoesAux.length; i++) {
        const marcado = localStorage.getItem(`quest${this.questoesAux[i].id}user${id}`) || '';
        if (marcado) this.atualizarQuestoes(i + 1, marcado);
      }
    },
    func2 () {
      this.objeto2.dialog = false;
    },

    func () {
      this.objeto.dialog = false;
    },

    async enviandoSimulado () {
      try {
        const envio = [];
        const { id } = this.$store.state.usuario;
        for (const tab of this.questoesAux) {
          const colocado = {
            id_questao: tab.id,
            id_simulado: this.$route.params.simulado,
            id_user: id,
            alternativa: localStorage.getItem(`quest${tab.id}user${id}`) || '',
          };
          envio.push(colocado);
        }
        const res = await this.$http.post('questoes-simulado', envio,
          { headers: { Authorization: this.$store.state.token } });
        this.objeto2.dialog = true;
        this.objeto2.titulo = 'Simulado Entregue com Sucesso, seu resultado ficará disponível dia 10/12!!';
      } catch (e) {
        if (e.response.status === 403) {
          this.objeto.dialog = true;
          this.objeto.titulo = e.response.data.message;
        }
        console.log(e);
      }
      this.dialog = false;
    },
    preenchendoQuestoes (questoes, max, min) {
      const { id } = this.$store.state.usuario;
      for (let i = min; i < max; i++) {
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
        this.tabs[i] = beris;
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

    mudarQuestao (e) {
      const paginas = document.querySelectorAll('.v-pagination__item');
      // console.log(paginas);
      let questaoSelecionada;

      if (e.target.nodeName === 'SPAN') {
        questaoSelecionada = e.target.parentElement;
        for (let i = 0; i < paginas.length; i++) {
          const retorno = this.rodadasDaPagina(paginas[i], questaoSelecionada);
          if (retorno) return;
        }
      } else {
        questaoSelecionada = e.target;
        for (let i = 0; i < paginas.length; i++) {
          const retorno = this.rodadasDaPagina(paginas[i], questaoSelecionada);
          if (retorno) return;
        }
      }
    },

    rodadasDaPagina (pagina, questaoSelecionada) {
      if (pagina.innerText === questaoSelecionada.id) {
        if (!this.tabs[questaoSelecionada.id - 1]) {
          this.preenchendoQuestoes(this.questoesAux, questaoSelecionada.id, questaoSelecionada.id - 1);
          this.loading = true;
          setTimeout(() => { pagina.click(); this.loading = false; }, 2000);
        } else {
          pagina.click();
        }
        window.scrollTo(0, 0);
        return true;
      }

      return false;
    },

    questoesEmBranco () {
      this.mensagem = 'Tem certeza que deseja entregar o simulado?';
      const gabaritos = document.querySelectorAll('.gabaritos');
      const distance = (new Date(this.dataInicio).getTime() - new Date().getTime());
      const hours = ((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      // if (hours > 3.5) {
      //   this.objeto.dialog = true;
      //   this.objeto.titulo = 'Você só pode entregar seu simulado após 1h de prova.';
      //   return;
      // }

      this.dialog = true;

      const { id } = this.$store.state.usuario;
      const vetor = [];
      for (let i = 0; i < this.questoesAux.length; i++) {
        const que = localStorage.getItem(`quest${this.questoesAux[i].id}user${id}`);
        if (que) vetor.push(que);
      }

      const restantes = this.questoesAux.length - vetor.length;
      if (restantes > 0) this.mensagem = `Verificamos que você deixou ${restantes} questões em branco , deseja realmente entregar?`;
      for (let i = 0; i < gabaritos.length; i++) {
        if (gabaritos[i].firstElementChild.firstElementChild.firstElementChild.nodeName === 'I') {
          gabaritos[i].classList.add('border-3', 'border__vermelha', 'errou--text');
        } else {
          gabaritos[i].classList.remove('border__vermelha');
        }
      }
    },

    paginaAnterior () {
      const paginaAnterior = document.querySelectorAll('.v-pagination__navigation')[2];
      const antPag = this.page - 2 >= 0 ? this.page - 2 : this.page;
      if (!this.tabs[antPag]) {
        this.preenchendoQuestoes(this.questoesAux, antPag, this.page - 1);
        this.loading = true;
        setTimeout(() => { paginaAnterior.click(); this.loading = false; }, 2000);
      } else {
        paginaAnterior.click();
      }
      window.scrollTo(0, 0);
    },

    proximaPagina () {
      const proximaPagina = document.querySelectorAll('ul li button.v-pagination__navigation')[3];
      const proxPag = this.page + 1 <= this.questoesAux.length ? this.page + 1 : this.page;
      if (!this.tabs[this.page]) {
        this.preenchendoQuestoes(this.questoesAux, proxPag, this.page);
        this.loading = true;
        setTimeout(() => { proximaPagina.click(); this.loading = false; }, 2000);
      } else {
        proximaPagina.click();
      }

      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.MsoNormal span {
  text-align: left;
}

.fixed-ok {
  position: fixed !important;
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
