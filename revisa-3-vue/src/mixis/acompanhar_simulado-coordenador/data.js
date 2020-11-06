const dados = {
  data () {
    return {
      simuladoSelecionado: '',
      pesquisarEscolas: '',
      pesquisarCRES: '',
      dialog: false,
      loading: false,
      alunos: {},
      assuntoEmail: '',
      escolaAtual: '',
      giroBtn: false,
      excel: false,
      email: '',
      tipoAtual: '',
      turmaAtual: '',
      mensagemEmail: '',
      privilegioCRE: true,
      envioEmail: false,
      envioEmailErro: false,
      camposBrancos: false,
      simulados: [{ titulo: 'Sem dados', SimuladoEstadoMaster: { titulo: '' } }],
      tipos: ['Iniciado', 'Entregue', 'Não entregue', 'Todos'],
      escolas: [{ nome: 'Sem dados' }],
      turmas: [{ descricao: 'Sem dados' }],

      search: '',
      headerInformacoes: [
        {
          text: 'Nome',
          value: 'nome',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Escola',
          value: 'escola',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        // {
        //   text: 'Turma/Turno',
        //   value: 'turma',
        //   sortable: false,
        //   align: 'start',
        //   class: 'body-2 font-weight-bold',
        // },
        {
          text: 'Simulado',
          value: 'simulado',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          value: 'redacao',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: '',
          value: 'email',
          sortable: false,
        },
      ],
      headerCoordenador: [
        {
          text: 'Escola',
          value: 'escola',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulados Iniciados',
          value: 'iniciados',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulados Entregues',
          value: 'entregues',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Total',
          value: 'total',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          value: 'redacao',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
      ],
      headerCRE: [
        {
          text: 'CRE',
          value: 'cre',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulados Iniciados',
          value: 'iniciados',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Simulados Entregues',
          value: 'entregues',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Total',
          value: 'total',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
        {
          text: 'Redação',
          value: 'redacao',
          sortable: false,
          align: 'start',
          class: 'body-2 font-weight-bold',
        },
      ],

      informacoes: [

      ],
      informacoesExcel: [

      ],
      informacoesCoordenador: [
        // {
        //   escola: 'escola x doidona amrivalda',
        //   iniciados: 485,
        //   entregues: 234,
        //   get total () {
        //     return this.iniciados + this.entregues;
        //   },
        //   redacao: '234 entregues',
        // },
      ],
      informacoesCRE: [
        // {
        //   cre: '1° CRE - Alta Floresta',
        //   iniciados: 0,
        //   entregues: 334,
        //   get total () {
        //     return this.iniciados + this.entregues;
        //   },
        //   redacao: '252 entregues',
        // },
        // {
        //   cre: '11° CRE - JI-PARANÁ',
        //   iniciados: 0,
        //   entregues: 537,
        //   get total () {
        //     return this.iniciados + this.entregues;
        //   },
        //   redacao: '294 entregues',
        // },
      ],
    };
  },
};

export default dados;
