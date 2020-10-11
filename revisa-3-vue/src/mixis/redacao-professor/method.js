import Vue from 'vue';
import TrendChart from 'vue-trend-chart';
import Popper from 'popper.js';
import env from '../../env';
import { Busao } from '../../main';

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

    async changeEscola2 ($event) {
      try {
        this.loading = true;
        const filtrar = this.pesquisarSimulado($event, this.escolaPesquisa);

        if (filtrar.length > 0) {
          const dados = await this.$http.get(`redacao/turma/${filtrar[0].id}`);
          this.turma2s = this.extrariTitulo(dados.data.turmas);
          this.turmaPesquisa2 = dados.data.turmas;
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
          this.setRedacao(dados.data.usuario);
          this.OsMelhores(dados.data.melhores);
          this.metodosMedia(dados.data.mediaPComp);
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
        console.log(e);
      }
    },

    setRedacao (objeto) {
      for (let i = 0; i < objeto.length; i++) {
        const object = {
          nome: objeto[i].name,
          nota: objeto[i].total,
          nota1: objeto[i].notas.competencia_1,
          nota2: objeto[i].notas.competencia_2,
          nota3: objeto[i].notas.competencia_3,
          nota4: objeto[i].notas.competencia_4,
          nota5: objeto[i].notas.competencia_5,
          situacao: objeto[i].situacao,
          tema: this.redacaoSelecionada,
          id: objeto[i].id,
        };
        this.notaRedacao.push(object);
      }

      document.querySelector('.v-data-footer__select').innerHTML = '';
      document.querySelector('.v-data-footer__pagination').innerHTML = `1 - ${this.notaRedacao.length > 10 ? 10 : this.notaRedacao.length} de ${this.notaRedacao.length}`;
    },

    OsMelhores (dados) {
      const imgs = ['mdi-podium-gold', 'mdi-podium-silver', 'mdi-podium-bronze'];
      for (let i = 0; i < 3; i++) {
        const med = {
          img: dados[i].photo ? env.ROTA_DOMINIO + dados[i].photo : `${env.ROTA_DOMINIO}/vendor/crudbooster/avatar.jpg`,
          colocacao: `${(i + 1).toString()}º`,
          podio: imgs[i],
          nome: dados[i].name,
          pontos: dados[i].redacao,
        };

        this.melhores.push(med);
      }
    },

    metodosMedia (dados) {
      this.competencias[0].notaCompetencia = dados.competencia_1;
      this.competencias[1].notaCompetencia = dados.competencia_2;
      this.competencias[2].notaCompetencia = dados.competencia_3;
      this.competencias[3].notaCompetencia = dados.competencia_4;
      this.competencias[4].notaCompetencia = dados.competencia_5;
    },

    async changeSelectGra (event) {
      try {
        this.loading = true;
        const filtrar = this.pesquisarSimulado(event, this.escolaPesquisa);
        if (filtrar.length > 0) {
          const dados = await this.$http.get(`redacao/media-escola/${filtrar[0].id}`);
          const vetorData = [dados.data.media];
          const vetorCor = ['#ffdd9e'];
          this.chartdata.datasets = [];
          this.chartdata.labels = [];
          this.preencherTubalina(vetorCor, vetorData, this.chartdata, 1, [event]);
        }
        this.loading = false;
      } catch (e) {
        this.loading = false;
      }
    },

    preencherTubalina (color, medias, chart, qtd, labels) {
      chart.labels.push(this.redacaoPesquisa[0].titulo);
      for (let i = 0; i < qtd; i++) {
        const med = {
          label: labels[i],
          backgroundColor: [color[i]],
          borderWidth: 1,
          data: [medias[i]],
        };
        chart.datasets.push(med);
        this.reiniciar();
      }
    },

    async changeSelectGraComp () {
      try {
        const tur1 = this.pesquisarSimulado(this.turma1, this.turmaPesquisa2)
        const tur2 = this.pesquisarSimulado(this.turma2, this.turmaPesquisa2);
        const escola = this.pesquisarSimulado(this.escolaSelecionada3, this.escolaPesquisa);

        if (escola.length > 0 && tur2.length > 0 && tur1.length > 0) {
          const objeto = { turma: tur1[0].id, turma2: tur2[0].id, escola: escola[0].id };
          const dados = await this.$http.post('redacao/media-escola-compara', objeto);
          const color = ['#ffdd9e', '#a3ffa3'];
          const medias = [dados.data.media, dados.data.media2];
          this.chartdata2.datasets = [];
          this.chartdata2.labels = [];
          const labels = [this.turma1, this.turma2];
          this.preencherTubalina(color, medias, this.chartdata2, 2, labels);
        }
      } catch (e) {
        console.log(e);
      }
    },

    reiniciar () {
      Busao.$emit('reiniciar');
    },
  },

};

export default method;
