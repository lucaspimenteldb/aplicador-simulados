const dados = {
  data () {
    return {
      play: 'mdi-play',
      showLoading: false,
      escolaAtual: '',
      escolaAtualGraf: '',
      alunos: [{ titulo: 'Sem dados' }],
      alunoGabarito: '',
      gabarito: {},
      areas: [{ titulo: 'Sem dados' }],
      simulados: [{ titulo: 'Sem dados' }],
      escolas: [{ titulo: 'Sem dados' }],
      turmas: [{ titulo: 'Sem dados' }],
      turmasGraf: [{ titulo: 'Sem dados' }],
      turmaAtual: '',
      turmaGraf1: '',
      turmaGraf2: '',
      areaAtual: '',
      simuladoAtual: '',
      search: '',
      dialog: {},
      redacaoGeral: '',
      chartdata: {
        datasets: [

        ],
        labels: [],
      },

      mediasGerais: [
        {
          ttl: 'nota < 400',
          altura: 5,
          selecionado: false,
        },
        {
          ttl: '399 < nota < 600',
          altura: 30,
          selecionado: false,
        },
        {
          ttl: '599 < nota < 700',
          altura: 35,
          selecionado: false,
        },
        {
          ttl: '699 < nota < 800',
          altura: 20,
          selecionado: true,
        },
        {
          ttl: '799 < nota',
          altura: 10,
          selecionado: false,
        },

      ],

      desempenhoGeral: [
        {
          ttl: 'Média TRI',
          nota: '',
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Redação 1',
          nota: '',
          get altura () {
            return this.nota / 10;
          },
        },
      ],
      desempenhoGeralEstado: [
        {
          ttl: 'Média TRI - Estado',
          nota: '',
          get altura () {
            return this.nota / 10;
          },
        },
        {
          ttl: 'Redação 1 - Estado',
          nota: '',
          get altura () {
            return this.nota / 10;
          },
        },
      ],
      desempenhoArea2: [],
      desempenhoArea: [
        {
          redacao: 880,
          humanas: '950 - 42 acertos',
          natureza: '800 - 30 acertos',
          matematica: '730 - 30 acertos',
          linguagens: '506 - 30 acertos',
        },
      ],
      desempenhoDisciplina: [
        {
          geografia: 880,
          historia: 950,
          filosofia: 800,
          sociologia: 800,
          biologia: 900,
          fisica: 900,
          quimica: 900,
          portugues: 900,
          ingles: 900,
          artes: 900,
          edFisica: 900,
        },
      ],

      headerRanking: [
        {
          text: 'Nome',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          sortable: false,
          value: 'escola',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média TRI',
          align: 'start',
          sortable: false,
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências Humanas',
          align: 'start',
          sortable: false,
          value: 'humanas',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências da Natureza',
          sortable: false,
          value: 'natureza',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Liguagens e seus Códigos',
          sortable: false,
          value: 'linguagens',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Matemática',
          sortable: false,
          value: 'matematica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: false,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
        // {
        //   text: 'Gabarito Aluno',
        //   sortable: false,
        //   value: 'gabarito',
        //   class: 'body-2 font-weight-bold',
        // },
      ],

      perfis: {},

      colocacoes: [
      ],

      headerArea: [
        {
          text: 'Ciências Humanas',
          align: 'start',
          sortable: false,
          value: 'humanas',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências da Natureza',
          sortable: false,
          value: 'natureza',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Liguagens e seus Códigos',
          sortable: false,
          value: 'linguagens',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Matemática',
          sortable: false,
          value: 'matematica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: false,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
      ],
      headerDisciplina: [
        {
          text: 'Geografia',
          align: 'start',
          sortable: false,
          value: 'geografia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'História',
          sortable: false,
          value: 'historia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Filosofia',
          sortable: false,
          value: 'filosofia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Sociologia',
          sortable: false,
          value: 'sociologia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Biologia',
          sortable: false,
          value: 'biologia',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Física',
          sortable: false,
          value: 'fisica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Química',
          sortable: false,
          value: 'quimica',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Português',
          sortable: false,
          value: 'portugues',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Inglês',
          sortable: false,
          value: 'ingles',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Artes',
          sortable: false,
          value: 'artes',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ed. Física',
          sortable: false,
          value: 'edFisica',
          class: 'body-2 font-weight-bold',
        },
      ],

      assuntos: [],
      disciplinas: [{ titulo: 'Sem dados' }],
      desempenhoEscolhido: null,
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
      ],

      desempenhos: [
        {
          tipo: 'Simulados Escolares',
          descricao: 'Ver o meu desempenho das suas disciplinas e áreas nos simulados escolares',
          classe: 'destaque__simulados__desempenho',
        },
        {
          tipo: 'Redações',
          descricao: 'Ver a evolução do meu desempenho nas redações corrigidas',
          classe: 'destaque__redacao__desempenho',
        },
      ],

      simuladosEscolares: {
        questoesCorretas: 200,
        questoesErradas: 80,
        questoesTotais: 280,
        get desempenhoLinguagens () {
          let linguagensCorretas = 0;
          let linguagensErradas = 0;
          let linguagensTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'linguagens') {
              linguagensCorretas += disciplina.qCorretas;
              linguagensErradas += disciplina.qErradas;
              linguagensTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [linguagensCorretas, linguagensErradas, linguagensTotais];
        },
        get desempenhoMatematica () {
          let matematicaCorretas = 0;
          let matematicaErradas = 0;
          let matematicaTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'matematica') {
              matematicaCorretas += disciplina.qCorretas;
              matematicaErradas += disciplina.qErradas;
              matematicaTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [matematicaCorretas, matematicaErradas, matematicaTotais];
        },
        get desempenhoNatureza () {
          let naturezaCorretas = 0;
          let naturezaErradas = 0;
          let naturezaTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'natureza') {
              naturezaCorretas += disciplina.qCorretas;
              naturezaErradas += disciplina.qErradas;
              naturezaTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [naturezaCorretas, naturezaErradas, naturezaTotais];
        },
        get desempenhoHumanas () {
          let humanasCorretas = 0;
          let humanasErradas = 0;
          let humanasTotais = 0;

          this.disciplinas.forEach((disciplina) => {
            if (disciplina.area === 'humanas') {
              humanasCorretas += disciplina.qCorretas;
              humanasErradas += disciplina.qErradas;
              humanasTotais += disciplina.qErradas + disciplina.qCorretas;
            }
          });

          return [humanasCorretas, humanasErradas, humanasTotais];
        },

        disciplinas: [
          {
            disciplina: 'Português',
            qCorretas: 160,
            qErradas: 120,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Espanhol',
            qCorretas: 180,
            qErradas: 100,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Inglês',
            qCorretas: 240,
            qErradas: 40,
            qTotais: 280,
            area: 'linguagens',
          },
          {
            disciplina: 'Matemática',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'matematica',
          },
          {
            disciplina: 'Biologia',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'natureza',
          },
          {
            disciplina: 'Física',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'natureza',
          },
          {
            disciplina: 'História',
            qCorretas: 100,
            qErradas: 60,
            qTotais: 160,
            area: 'humanas',
          },
          {
            disciplina: 'Geografia',
            qCorretas: 180,
            qErradas: 20,
            qTotais: 200,
            area: 'humanas',
          },
        ],
      },

      competencias: [
        {
          competenciaNome: 'Competência 1',
          descricao: 'Domínio de escrito da língua portuguesa.',
          notaCompetencia: '',
          desempenho: 'desempenhoExcelente',
        },
        {
          competenciaNome: 'Competência 2',
          descricao: 'Compreender o tema e não fugir do que é proposto.',
          notaCompetencia: '',
          desempenho: 'desempenhoBom',
        },
        {
          competenciaNome: 'Competência 3',
          descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
          notaCompetencia: '',
          desempenho: 'desempenhoRuim',
        },
        {
          competenciaNome: 'Competência 4',
          descricao: 'Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
          notaCompetencia: '',
          desempenho: 'desempenhoMuitoRuim',
        },
        {
          competenciaNome: 'Competência 5',
          descricao: 'Respeito aos direitos humanos.',
          notaCompetencia: '',
          desempenho: 'desempenhoOtimo',
        },
      ],

      questoesGabarito: [],
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
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Gabarito',
          value: 'gabarito',
          sortable: false,
          class: 'font-weight-bold',
        },
        {
          text: 'Resultado',
          value: 'resultado',
          class: 'font-weight-bold',
        },
        {
          text: 'Dificuldade',
          value: 'dificuldade',
          class: 'font-weight-bold',
        },
        {
          text: 'Média de acertos',
          value: 'mediaEscolar',
          class: 'font-weight-bold',
        },
        {
          text: 'Resolução',
          value: 'url',
          sortable: false,
          class: 'font-weight-bold',
        },
      ],
    };
  },
};

export default dados;
