const data = new Date();
let routes;

const routesPadrao = [
  {
    path: '/ranking',
    name: 'Ranking',
    ttl: 'Ranking',
    icon: 'mdi-trophy-variant-outline',
    menu: true,
    component: () => import('../../pages/Ranking'),
    meta: {
      public: false,
    },
  },
  {
    path: '/home',
    name: 'DesempenhoGeral',
    ttl: 'Meu Desempenho',
    icon: 'mdi-poll-box-outline',
    menu: true,
    component: () => import('../../pages/DesempenhoGeral'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacoes',
    name: 'RedacaoInicio',
    component: () => import('../../pages/redacao/RedacaoInicio'),
  },
  {
    path: '/redacao-corrigida',
    name: 'RedacaoCorrigida',
    component: () => import('../../pages/redacao/RedacaoCorrigida'),
  },
  {
    path: '/redacao-enviar/:redacao',
    name: 'RedacaoEnviar',
    component: () => import('../../pages/redacao/RedacaoEnviar'),
  },
  {
    path: '/redacao-enviar-pcd',
    name: 'RedacaoEnviarPCD',
    component: () => import('../../pages/redacao/RedacaoEnviarPCD'),
  },
  // {
  //   path: '/simulados-atividades-escolares/',
  //   ttl: 'Simulado estadual',
  //   icon: 'mdi-check-box-multiple-outline',
  //   menu: true,
  //   name: 'SimuladosAtividadesInicio',
  //   component: () => import('../../pages/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  // },

  // {
  //   path: '/simulados-atividades-escolares/:simulado?',
  //   ttl: 'Simulado estadual',
  //   icon: 'mdi-check-box-multiple-outline',
  //   menu: false,
  //   name: 'SimuladosAtividadesInicio',
  //   component: () => import('../../pages/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  // },
  // {
  //   path: '/simulado-responder/:simulado/:idioma?',
  //   name: 'QuestoesSimuladosAtividades',
  //   component: () => import('../../components/QuestoesSimuladosAtividades'),
  // },
  // {
  //   path: '/suporte',
  //   name: 'Suporte',
  //   ttl: 'Suporte',
  //   menu: true,
  //   component: () => import('../../pages/suporte/SuporteInicio'),
  //   meta: {
  //     public: false,
  //   },
  // },
  {
    path: '/aulas-gratuitas',
    name: 'AulasGratuitas',
    ttl: 'Aulas de Revisão',
    icon: 'mdi-youtube',
    menu: true,
    component: () => import('../../pages/AulasGratuitas'),
    meta: {
      public: false,
    },
  }];

const routesSimulado = [
  {
    path: '/redacao-corrigida',
    name: 'RedacaoCorrigida',
    component: () => import('../../pages/redacao/RedacaoCorrigida'),
  },
  {
    path: '/redacao-enviar/:redacao',
    name: 'RedacaoEnviar',
    component: () => import('../../pages/redacao/RedacaoEnviar'),
  },
  {
    path: '/redacao-enviar-pcd',
    name: 'RedacaoEnviarPCD',
    component: () => import('../../pages/redacao/RedacaoEnviarPCD'),
  },
  {
    path: '/home',
    ttl: 'Simulado estadual',
    icon: 'mdi-check-box-multiple-outline',
    menu: true,
    name: 'SimuladosAtividadesInicio',
    component: () => import('../../pages/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  },
  {
    path: '/simulados-atividades-escolares/:simulado?',
    ttl: 'Simulado estadual',
    icon: 'mdi-check-box-multiple-outline',
    menu: false,
    name: 'SimuladosAtividadesInicio',
    component: () => import('../../pages/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  },
  {
    path: '/simulado-responder/:simulado/:idioma?',
    name: 'QuestoesSimuladosAtividades',
    component: () => import('../../components/QuestoesSimuladosAtividades'),
  },
];

if (data.getDate() >= 23) {
  routes = routesSimulado;
} else {
  routes = routesPadrao;
}

export default routes;
