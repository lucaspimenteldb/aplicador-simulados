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
        const usuario = this.pesquisarSimulado(this.alunoGabarito, this.alunos);

        alert(JSON.stringify(this.simuladoAtual));

        if (filtrado.length > 0 && simuladoFiltrado.length > 0 && usuario.length > 0) {
          this.showLoading = true;
          const questoes = await this.$http.get(`desempenho-professor/questao/${filtrado[0].id}/
          ${simuladoFiltrado[0].id}/${usuario[0].id}`);
          this.myQuestoes(questoes.data.questoes);
          alert(JSON.stringify(questoes));
          this.showLoading = false;
        }
      } catch (err) {
        alert(JSON.stringify(err));
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
        alert(JSON.stringify(this.simulados));
        this.areas = escolas.data.areas;
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
          this.desempenhoAreas(dados2.data.mediasAreas, dados2.data.mediaGeral);
          this.preenchendoUsuarios(dados2.data.usuarios);
          this.alunos = dados2.data.usuarios;
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
        for (let i = 0; i < vectorEstado.length; i++) {
          this.desempenhoArea2[i].nota = vectorArea[i];
          this.desempenhoArea2[i].notaEstado = vectorEstado[i];
        }
      }
    },

    preenchendoUsuarios (usuarios) {
      this.colocacoes = [];
      for (let i = 0; i < usuarios.length; i++) {
        const beris = {
          posicao: usuarios[i].media,
          nome: usuarios[i].titulo,
          humanas: usuarios[i].Humanas,
          natureza: usuarios[i].Natureza,
          linguagens: usuarios[i].Linguagens,
          matematica: usuarios[i].Matematica,
          redacao: usuarios[i].redacao,
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
