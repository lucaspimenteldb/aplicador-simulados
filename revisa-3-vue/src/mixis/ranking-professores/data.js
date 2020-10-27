const dados = {
  data () {
    return {
      nivel: 90,
      perfis: {},
      escolaAtual: '',
      escolas: [{ titulo: 'Sem dados' }],
      simulados: [{ titulo: 'Sem dados' }],
      simuladoAtual: '',
      rankings: [],
      dialog: false,

      desempenhoArea: [],

      desempenhoGeral: [],
      melhores: [],
      colocacoes: [],

      headerRanking: [
        {
          text: 'Ranking',
          align: 'start',
          sortable: false,
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Nome',
          sortable: false,
          value: 'nome',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: false,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média TRI',
          sortable: false,
          value: 'pontuacao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: '',
          sortable: false,
          value: 'perfil',
        },
      ],
      headerRankingEscolar: [
        {
          text: 'Ranking',
          align: 'start',
          sortable: false,
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          sortable: false,
          value: 'escola',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Município',
          sortable: false,
          value: 'municipio',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'CRE',
          sortable: false,
          value: 'cre',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média TRI',
          sortable: true,
          value: 'media',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          sortable: true,
          value: 'redacao',
          class: 'body-2 font-weight-bold',
        },
        // {
        //   text: 'Ciências Humanas',
        //   align: 'start',
        //   sortable: true,
        //   value: 'humanas',
        //   class: 'body-2 font-weight-bold',
        // },
        // {
        //   text: 'Ciências da Natureza',
        //   sortable: true,
        //   value: 'natureza',
        //   class: 'body-2 font-weight-bold',
        // },
        // {
        //   text: 'Liguagens e seus Códigos',
        //   sortable: true,
        //   value: 'linguagens',
        //   class: 'body-2 font-weight-bold',
        // },
        // {
        //   text: 'Matemática',
        //   sortable: true,
        //   value: 'matematica',
        //   class: 'body-2 font-weight-bold',
        // },
      ],
      headerRankingEscolarArea: [
        {
          text: 'Ranking',
          align: 'start',
          sortable: false,
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          align: 'start',
          sortable: false,
          value: 'escola',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências Humanas',
          align: 'start',
          sortable: true,
          value: 'humanas',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Ciências da Natureza',
          sortable: true,
          value: 'natureza',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Liguagens e seus Códigos',
          sortable: true,
          value: 'linguagens',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Matemática',
          sortable: true,
          value: 'matematica',
          class: 'body-2 font-weight-bold',
        },
      ],
      headerRankingAluno: [
        {
          text: 'Ranking',
          align: 'start',
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
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
          value: 'media',
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
      headerRankingCRE: [
        {
          text: 'Ranking',
          align: 'start',
          value: 'posicao',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'CRE',
          sortable: false,
          value: 'cre',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Alunos totais',
          sortable: false,
          value: 'alunos',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Média TRI',
          align: 'start',
          sortable: false,
          value: 'media',
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
      colocacoesEscolarArea: [],
      colocacoesEscolar: [],
    };
  },
};

export default dados;
