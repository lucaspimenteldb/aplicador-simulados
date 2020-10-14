const dados = {
  methods: {
    async errorDefault (err) {
      if (err.response.status <= 0 || err.response.status >= 500 || err.response.status === 401) {
        this.objeto.dialog = true;
      }
      this.loadingBasl(false);
    },

    async changeSelectArea (event) {
      console.log(event);
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
      document.querySelector('.v-data-footer__pagination').innerHTML = `1 - ${this.questoesGabarito.length > 10 ? 10 : this.questoesGabarito.length} de ${this.questoesGabarito.length}`;
    },
   
    async puxandoSimulEscol () {
      try {
        this.showLoading = true;
        const escolas = await this.$http.get('desempenho-professor');
        this.escolas = escolas.data.escolas;
        this.simulados = escolas.data.simulados;
        this.showLoading = false;
      } catch (e) {
        this.showLoading = false;
      }
    },

    async changeEscola ($event) {
      try {
        this.showLoading = true;
        const filtrar = this.pesquisarSimulado($event, this.escolas);

        if (filtrar.length > 0) {
          const dados2 = await this.$http.get(`desempenho-professor/turma/${filtrar[0].id}`);
          this.turmas = dados2.data.turmas;
        }
        this.showLoading = false;
      } catch (e) {
        this.showLoading = false;
      }
    },

    async changeTurma ($event) {
      try {
        this.showLoading = true;
        const filtrar = this.pesquisarSimulado($event, this.turmas);
        const filtrar2 = this.pesquisarSimulado(this.escolaAtual, this.escolas);

        if (filtrar.length > 0 && filtrar2.length > 0) {
          const objeto = { turma: filtrar[0].id, escola: filtrar2[0].id };
          const dados2 = await this.$http.post('desempenho-professor/medias-gerais/', objeto);
          this.preencherDesempenho(dados2.data);
          // this.colocadasFunc(dados2.data.calculadas);
        }
        this.showLoading = false;
      } catch (e) {
        this.showLoading = false;
      }
    },

    pesquisarSimulado (simulado, pesquisa) {
      const filtrado = pesquisa.filter((el) => el.titulo === simulado);
      return filtrado;
    },

    desempenhoAreas (objeto, geral) {
      let vectorArea = [];
      let vectorEstado = [];

      const turma = objeto[0];
      const geralC = geral[0];

      if (objeto.length <= 0) {
        vectorArea = [0, 0, 0, 0, 0];
        vectorEstado = [0, 0, 0, 0, 0];
      } else {
        vectorArea = [turma.media_redacao, turma.media_linguagens, turma.media_humanas, turma.media_matematica, turma.media_natureza];
        vectorEstado = [geralC.media_redacao, geralC.media_linguagens, geralC.media_humanas, geralC.media_matematica, geralC.media_natureza];
        for (let i = 0; i < vectorEstado.length; i++) {

        }
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
      const mediaRedacaoTurma = dadosOb.media_redacao.media_redacao;
      const mediaRedacaoGeral = dadosOb.mediaGeral[0] ? dadosOb.mediaGeral[0].media_redacao : 0;

      const mediaTotalTurma = dadosOb.media_redacao.mediaGeral;
      const mediaGeral = dadosOb.mediaGeral[0] ? dadosOb.mediaGeral[0].media_geral : 0;

      const vetor = [mediaTotalTurma, mediaRedacaoTurma, mediaGeral, mediaRedacaoGeral];
      
      for (let i = 0; i < 2; i++) {
        this.desempenhoGeral[i].nota = vetor[i];
        this.desempenhoGeralEstado[i].nota = vetor[i + 2];
      }
    },
    
  },
};

export default dados;
