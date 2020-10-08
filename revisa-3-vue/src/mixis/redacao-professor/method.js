import Vue from 'vue';
import TrendChart from 'vue-trend-chart';
import Popper from 'popper.js';

Vue.use(TrendChart);

const method = {
  methods: {
    initPopper () {
      const chart = document.querySelector('.random-chart');
      const chart2 = document.querySelector('.random-chart-turma');
      const ref = document.querySelectorAll('.active-line');

      const linha = ref[0];
      const { tooltip } = this.$refs;
      this.popper = new Popper(linha, tooltip, {
        placement: 'right',
        modifiers: {
          offset: { offset: '0,10' },
          preventOverflow: {
            boundariesElement: chart,
          },
        },
      });

      const linha2 = ref[1];
      const { tooltipTurma } = this.$refs;
      this.popperTurma = new Popper(linha2, tooltipTurma, {
        placement: 'right',
        modifiers: {
          offset: { offset: '0,10' },
          preventOverflow: {
            boundariesElement: chart2,
          },
        },
      });
    },
    onMouseMove (params) {
      this.popperIsActive = !!params;
      this.popper.scheduleUpdate();
      this.tooltipData = params || null;
    },
    onMouseMoveTurma (params) {
      this.popperIsActiveTurma = !!params;
      this.popperTurma.scheduleUpdate();
      this.tooltipDataTurma = params || null;
    },
    pesquisarSimulado (simulado, pesquisa) {
      const filtrado = pesquisa.filter((el) => el.titulo === simulado);
      return filtrado;
    },
    async getRedacao () {
      try {
        this.loading = true;
        const dados = await this.$http.get('redacao');
        this.redacao = this.extrariTitulo(dados.data.redacao);
        this.escola = this.extrariTitulo(dados.data.escola);
        this.escolaPesquisa = dados.data.escola;
        this.redacaoPesquisa = dados.data.redacao;
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },

    extrariTitulo (objeto) {
      return objeto.map((el) => el.titulo);
    },

    async changeEscola ($event) {
      try {
        this.loading = true;
        const filtrar = this.pesquisarSimulado($event, this.escolaPesquisa);

        if (filtrar.length > 0) {
          const dados = await this.$http.get(`redacao/turma/${filtrar[0].id}`);
          this.turma = this.extrariTitulo(dados.data.turmas);
          this.turmaPesquisa = dados.data.turmas;
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },

    async changeTurma ($event) {
      try {
        this.loading = true;
        const filtrar = this.pesquisarSimulado($event, this.turmaPesquisa);
        const filtrar2 = this.pesquisarSimulado(this.escolaSelecionada2, this.escolaPesquisa);
        const redaFiltra = this.pesquisarSimulado(this.redacaoSelecionada, this.redacaoPesquisa);

        if (filtrar.length > 0) {
          const dados = await this.$http.get(`redacao/usuarios/${filtrar2[0].id}/${filtrar[0].id}/${redaFiltra[0].id}`);
          console.log(dados);
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },

  },

};

export default method;
