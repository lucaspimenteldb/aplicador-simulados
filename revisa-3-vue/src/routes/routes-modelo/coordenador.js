const routes = [
  {
    path: '/acompanhar-simulado',
    name: 'AcompanharSimulado',
    ttl: 'acompanhar simulado',
    icon: 'mdi-check-box-multiple-outline',
    menu: true,
    component: () => import('../../pages-coordenadores/AcompanharSimulados'),
    meta: {
      public: false,
    },
  },
  {
    path: '/home',
    name: 'DesempenhoCoordenador',
    ttl: 'Desempenho geral',
    icon: 'mdi-poll-box-outline',
    menu: true,
    component: () => import('../../pages-coordenadores/DesempenhoGeral'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacao',
    name: 'RedaçãoCoordenador',
    ttl: 'Redação',
    icon: 'mdi-pencil-outline',
    menu: true,
    component: () => import('../../pages-coordenadores/redacao/RedacaoInicio'),
    meta: {
      public: false,
    },
  },
  {
    path: '/ranking',
    name: 'RankingInicio',
    ttl: 'Ranking',
    icon: 'mdi-trophy-variant-outline',
    menu: true,
    component: () => import('../../pages-coordenadores/Ranking'),
    meta: {
      public: false,
    },
  },
];

export default routes;
