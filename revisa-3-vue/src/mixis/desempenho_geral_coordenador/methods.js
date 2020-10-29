import DesempenhoArea from '../../models/desempenho-geral-professor/desempenhoArea';
import { Busao } from '../../main';

const dados = {
  methods: {
    async errorDefault (err) {
      this.showLoading = false;
      if (err.response.status <= 0 || err.response.status >= 500 || err.response.status === 401) {
        this.showLoading = false;
      }
    },

    async changeSelectArea () {
      try {
        const filtrado = this.pesquisarSimulado(this.areaAtual, this.areas);
        const simuladoFiltrado = this.pesquisarSimulado(this.simuladoAtual, this.simulados);
        const usuario = this.alunos.filter(el => el.name === this.alunoGabarito);

        if (filtrado.length > 0 && simuladoFiltrado.length > 0 && usuario.length > 0) {
          this.showLoading = true;
          const questoes = await this.$http.get(`desempenho-professor/questao/${filtrado[0].id}/
          ${simuladoFiltrado[0].id}/${usuario[0].id}`, { headers: { Authorization: this.$store.state.token } });
          this.myQuestoes(questoes);
          this.showLoading = false;
        }
      } catch (err) {
        console.log(err);
        this.showLoading = false;
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
        console.log(beris.marcada);
      }

      document.querySelectorAll('.v-data-footer__select')[1].innerHTML = '';
      // eslint-disable-next-line max-len
      /* document.querySelectorAll('.v-data-footer__pagination')[1].innerHTML = `1 - ${this.questoesGabarito.length > 10 ? 10 : this.questoesGabarito.length} de ${this.questoesGabarito.length}`; */
    },

    async puxandoSimulEscol () {
      try {
        this.showLoading = true;
        const escolas = await this.$http.get('desempenho-professor', { headers: { Authorization: this.$store.state.token } });
        this.escolas = escolas.data.escolas;
        this.simulados = escolas.data.simulados;
        this.areas = escolas.data.areas;
        this.disciplinas = escolas.data.materias;
        this.showLoading = false;
      } catch (e) {
        console.log(e);
        this.showLoading = false;
      }
    },

    async changeAssuntos (event) {
      try {
        this.showLoading = true;
        const disciplFilter = this.pesquisarSimulado(event, this.disciplinas);
        const escolaFilter = this.pesquisarSimulado(this.escolaAtual, this.escolas);
        const simulFiltrar = this.pesquisarSimulado(this.simuladoAtual, this.simulados);
        
        this.showLoading = false;
      } catch (err) {
        this.showLoading = false;
        console.log(err);
        this.errorDefault(err);
      }
    },

    // async changeEscola ($event) {
    //   try {
    //     this.showLoading = true;
    //     const filtrar = this.pesquisarSimulado($event, this.escolas);
    //
    //     if (filtrar.length > 0) {
    //       const dados2 = await this.$http.get(`desempenho-professor/turma/${filtrar[0].id}`,
    //         { headers: { Authorization: this.$store.state.token } });
    //       this.turmas = dados2.data.turmas;
    //     }
    //     this.showLoading = false;
    //   } catch (e) {
    //     this.showLoading = false;
    //   }
    // },

    async changeEscolaGraf ($event) {
      try {
        this.showLoading = true;
        const filtrar = this.pesquisarSimulado($event, this.escolas);

        if (filtrar.length > 0) {
          const dados2 = await this.$http.get(`desempenho-professor/turma/${filtrar[0].id}`,
            { headers: { Authorization: this.$store.state.token } });
          this.turmasGraf = dados2.data.turmas;
        }
        this.showLoading = false;
      } catch (e) {
        this.showLoading = false;
      }
    },

    async changeTurmaGraf () {
      try {
        this.showLoading = true;
        const turma1 = this.pesquisarSimulado(this.turmaGraf1, this.turmasGraf);
        const turma2 = this.pesquisarSimulado(this.turmaGraf2, this.turmasGraf);
        const escolaAux = this.pesquisarSimulado(this.escolaAtualGraf, this.escolas);

        if (turma2.length > 0 && turma1.length > 0 && escolaAux.length > 0) {
          const dados2 = await this.$http.get(`desempenho-professor/comparar-turmas/${escolaAux[0].id}/${turma1[0].id}/${turma2[0].id}`,
            { headers: { Authorization: this.$store.state.token } });
          const color = ['#ffdd9e', '#a3ffa3'];
          const medias = [dados2.data.turma1[0].media_geral, dados2.data.turma2[0].media_geral];
          this.chartdata.datasets = [];
          this.chartdata.labels = [];
          const labels = [this.turmaGraf1, this.turmaGraf2];
          this.preencherTubalina(color, medias, this.chartdata, 2, labels, 'Média estadual');
        }
        this.showLoading = false;
      } catch (e) {
        this.showLoading = false;
      }
    },

    preencherTubalina (color, medias, chart, qtd, labels, titulo) {
      chart.labels.unshift(titulo);
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

    async changeEscola () {
      try {
        this.showLoading = true;
        const filtrar2 = this.pesquisarSimulado(this.escolaAtual, this.escolas);
        const simuladosFilter = this.pesquisarSimulado(this.simuladoAtual, this.simulados);

        if (filtrar2.length > 0 && simuladosFilter.length > 0) {
          const dados2 = await this.$http.get(`desempenho-geral-gre/${filtrar2[0].id}/${simuladosFilter[0].id}`,
            { headers: { Authorization: this.$store.state.token } });
          this.preencherDesempenho(dados2.data);
          this.trinchar(dados2.data);
          this.alunos = dados2.data.usuarios;
          this.preenchendoUsuarios(dados2.data.usuarios);
          this.redacaoGeral = dados2.data.mediaArea[0].media_redacao;

          // this.desempenhoAreas(dados2.data.mediasAreas, dados2.data.mediaGeral);
          // this.preenchendoUsuarios(dados2.data.usuarios);
          // this.alunos = dados2.data.usuarios;
          this.metodosMediaRed(dados2.data.redacao);
          // this.redacaoGeral = dados2.data.media_redacao ? dados2.data.media_redacao.media_redacao : 'Nota não disponível';
        }
        this.showLoading = false;
      } catch (e) {
        alert(JSON.stringify(e));
        console.log(e);
        this.showLoading = false;
      }
    },

    metodosMediaRed (dadosR) {
      const cond = [dadosR.competencia_1, dadosR.competencia_2, dadosR.competencia_3, dadosR.competencia_4, dadosR.competencia_5];

      for (let i = 0; i < cond.length; i++) {
        this.competencias[i].notaCompetencia = cond[i];
        this.competencias[i].desempenho = this.resultIdioma(cond[i]);
      }
    },

    resultIdioma (resultado) {
      let desempenho = '';
      if (resultado >= 0 && resultado <= 40) {
        desempenho = 'desempenhoMuitoRuim';
      } else if (resultado >= 41 && resultado <= 80) {
        desempenho = 'desempenhoRuim';
      } else if (resultado >= 81 && resultado <= 120) {
        desempenho = 'desempenhoBom';
      } else if (resultado >= 121 && resultado <= 160) {
        desempenho = 'desempenhoOtimo';
      } else {
        desempenho = 'desempenhoExcelente';
      }

      return desempenho;
    },

    pesquisarSimulado (simulado, pesquisa) {
      const filtrado = pesquisa.filter((el) => el.titulo === simulado);
      return filtrado;
    },

    desempenhoAreas (objeto, geral) {
      let vectorArea = [];
      let vectorEstado = [];
      this.desempenhoArea2 = [];

      if (objeto.length > 0) {
        const redacaoTurma = objeto[0].media_redacao;
        const lingTurma = objeto[0].media_linguagens;
        const matTurma = objeto[0].media_matematica;
        const natTurma = objeto[0].media_natureza;
        const humTurma = objeto[0].media_humana;

        const redacaoGeral = geral[0].media_redacao;
        const lingGeral = geral[0].media_linguagens;
        const matGeral = geral[0].media_matematica;
        const natGeral = geral[0].media_natureza;
        const humGeral = geral[0].media_humana;

        vectorArea = [lingTurma, humTurma, matTurma, natTurma, redacaoTurma];
        vectorEstado = [lingGeral, humGeral, matGeral, natGeral, redacaoGeral];
        const vectorName = ['Linguagens', 'Humanas', 'Matemática', 'Natureza', 'Redação'];
        for (let i = 0; i < vectorEstado.length; i++) {
          this.desempenhoArea2.push(new DesempenhoArea(vectorName[i], '', vectorArea[i], vectorEstado[i]));
        }
      }
    },

    preenchendoUsuarios (usuarios) {
      this.colocacoes = [];
      for (let i = 0; i < usuarios.length; i++) {
        const beris = {
          posicao: usuarios[i].DesempenhoSimuladoEstados[0].media || 'Não fez',
          nome: usuarios[i].name,
          humanas: usuarios[i].DesempenhoSimuladoEstados[0].Humanas || 'Não fez',
          natureza: usuarios[i].DesempenhoSimuladoEstados[0].Natureza || 'Não fez',
          linguagens: usuarios[i].DesempenhoSimuladoEstados[0].Linguagens || 'Não fez',
          matematica: usuarios[i].DesempenhoSimuladoEstados[0].Matematica || 'Não fez',
          redacao: usuarios[i].DesempenhoSimuladoEstados[0].redacao || 'Não fez',
          id: usuarios[i].id,
        };
        this.colocacoes.push(beris);
      }
    },

    // colocadasFunc (objeto) {
    //   const vetor = [objeto.qtd_men400, objeto.qtd_men600, objeto.qtd_men700, objeto.qtd_men800, objeto.qtd_men900];
    //
    //   for (let i = 0; i < vetor.length; i++) {
    //     this.mediasGerais[i].altura = vetor[i];
    //   }
    // },
    preencherDesempenho (dadosOb) {
      this.desempenhoGeral[0].nota = dadosOb.mediaArea[0].media_geral;
      this.desempenhoGeralEstado[0].nota = dadosOb.mediaGeral[0].media_geral;
      this.desempenhoGeral[1].nota = dadosOb.mediaArea[0].media_redacao;
      this.desempenhoGeralEstado[1].nota = dadosOb.mediaGeral[0].media_redacao;
    },

    trinchar (dadosOb) {
      const titulos = ['Redação', 'Matématica', 'Natureza', 'Humanas', 'Linguagens'];
      const notasEstaaduais = [dadosOb.mediaGeral[0].media_redacao, dadosOb.mediaGeral[0].media_matematica,
        dadosOb.mediaGeral[0].media_natureza, dadosOb.mediaGeral[0].media_humana, dadosOb.mediaGeral[0].media_linguagens];
      const notas = [dadosOb.mediaArea[0].media_redacao, dadosOb.mediaArea[0].media_matematica,
        dadosOb.mediaArea[0].media_natureza, dadosOb.mediaArea[0].media_humana, dadosOb.mediaArea[0].media_linguagens];

      for (let i = 0; i < titulos.length; i++) {
        const object = {
          ttl: titulos[i],
          nota: notas[i],
          notaEstado: notasEstaaduais[i],
        };

        this.desempenhoArea2.push(object);
      }
    },

    reiniciar () {
      Busao.$emit('reiniciar');
    },

  },
};

export default dados;