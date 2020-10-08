const dados = {
  data () {
    return {
      escolaSelecionada: '',
      escolaSelecionada2: '',
      turma1: 'Escola 1 - Turma 1',
      turma2: 'Escola 2 - Turma 1',
      escola: ['Escola 1', 'Escola 2', 'Escola 3'],
      escolaPesquisa: [],
      turma: ['Sem dados'],
      turmaPesquisa: [],
      turmaComparar: ['Escola 1 - Turma 1', 'Escola 2 - Turma 1', 'Escola 3 -Turma 1'],
      redacao: ['Sem dados'],
      redacaoSelecionada: '',
      redacaoPesquisa: [],

      redacoesFazer: [
        {
          nome: 'Redação 3',
          entrega: '18/08',
          tema: 'Tema da redação é o seguinte assim e assado, mas que isso é aquilo',
        },
      ],

      loading: false,

      headerRedacao: [
        {
          text: 'Aluno',
          align: 'start',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Situação',
          sortable: true,
          value: 'situacao',
          class: 'px-2 min-w-100 body-2 font-weight-bold',
        },
        {
          text: 'Tema',
          sortable: true,
          value: 'tema',
          class: 'px-2 min-w-100 body-2 font-weight-bold',
        },
        {
          text: 'Nota',
          sortable: false,
          value: 'nota',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Comp. 1',
          sortable: false,
          value: 'nota1',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 2',
          sortable: false,
          value: 'nota2',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 3',
          sortable: false,
          value: 'nota3',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 4',
          sortable: false,
          value: 'nota4',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: 'Comp. 5',
          sortable: false,
          value: 'nota5',
          class: 'min-w-90 body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'acoes',
        },
      ],

      notaRedacao: [
        {
          nome: 'Lucas',
          nota: 880,
          nota1: 160,
          nota2: 200,
          nota3: 160,
          nota4: 160,
          nota5: 200,
          situacao: 'Ok',
          tema: 'Bla bla tal 124',
        },
        {
          nome: 'Jose',
          nota: 800,
          nota1: 160,
          nota2: 200,
          nota3: 160,
          nota4: 160,
          nota5: 200,
          situacao: 'Ok',
          tema: 'Bla bla tal',
        },
      ],

      competencias: [
        {
          competenciaNome: 'Competência 1',
          descricao: 'Domínio de escrito da língua portuguesa.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 2',
          descricao: 'Compreender o tema e não fugir do que é proposto.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 3',
          descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 4',
          descricao: 'Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
          notaCompetencia: '',
          desempenho: '',
        },
        {
          competenciaNome: 'Competência 5',
          descricao: 'Respeito aos direitos humanos.',
          notaCompetencia: '',
          desempenho: '',
        },
      ],

      melhores: [
        {
          img: 'imagem-ranking',
          colocacao: '1º',
          podio: 'mdi-podium-gold',
          nome: 'Santaninha Maria',
          pontos: 960,
        },
        {
          img: 'imagem-ranking',
          colocacao: '2º',
          podio: 'mdi-podium-silver',
          nome: 'Avexadinho Pelanquis',
          pontos: 920,
        },
        {
          img: 'imagem-ranking',
          colocacao: '3º',
          podio: 'mdi-podium-bronze',
          nome: 'Projetado Deum',
          pontos: 920,
        },
      ],

      // desempenho por escolas
      datasetsEscola: [
        {
          // o primeiro objeto serve apenas para definir o ponto máximo do gráfico
          data: [1000],
          className: 'curve1',
        },
        {
          // meu desempenho
          data: [1000, 1000],
          smooth: true,
          showPoints: true,
          className: 'curve2',
        },
        {
          // desempenho da turma
          data: [1000, 1000],
          smooth: true,
          showPoints: true,
          className: 'curve3',
        },

      ],
      grid: {
        verticalLines: true,
        horizontalLines: true,
      },
      labels: {
        xLabels: [0, 'Redação 1'],
        yLabels: 6,
        yLabelsTextFormatter: (val) => val,
      },
      tooltipData: null,
      tooltipDataTurma: null,
      popper: null,
      popperIsActive: false,
      popperTurma: null,
      popperIsActiveTurma: false,
      // fim do chart

      // desempenho por turmas
      datasetsTurma: [
        {
          // o primeiro objeto serve apenas para definir o ponto máximo do gráfico
          data: [1000],
          className: 'curve1',
        },
        {
          // meu desempenho
          data: [600, 880, 840, 800],
          smooth: true,
          showPoints: true,
          className: 'curve2',
        },
        {
          // desempenho da turma
          data: [680, 720, 640, 1000],
          smooth: true,
          showPoints: true,
          className: 'curve3',
        },

      ],

      gridTurma: {
        verticalLines: true,
        horizontalLines: true,
      },
      labelsTurma: {
        xLabels: ['Redação 1', 'Redação 2', 'Redação 3', 'Redação 4'],
        yLabels: 6,
        yLabelsTextFormatter: (val) => val,
      },
      // fim do chart

      redacoesCorrigidas: [
        {
          nome: 'Redação 1',
          enviada: '01/08',
          tema: 'Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae',
          nota: 800,
        },
      ],
    };
  },
};

export default dados;
