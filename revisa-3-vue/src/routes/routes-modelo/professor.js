const routes = [
  {
    path: '/home',
    name: 'DesempenhoGeral',
    ttl: 'Desempenho geral',
    menu: true,
    icon: 'mdi-poll-box-outline',
    component: () => import('../../pages-professores/DesempenhoGeral'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacoes-professores',
    name: 'RedacaoInicio',
    ttl: 'Redações',
    icon: 'mdi-pencil-outline',
    menu: true,
    component: () => import('../../pages-professores/redacao/RedacaoInicio'),
    meta: {
      public: false,
    },
  },
  {
    path: '/ranking-professores',
    name: 'Ranking',
    ttl: 'Ranking Geral',
    menu: true,
    icon: 'mdi-trophy-variant-outline',
    component: () => import('../../pages-professores/Ranking'),
    meta: {
      public: false,
    },
  },
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
  },

  // coordenadores
  {
    path: '/ranking-coordenadores',
    name: 'Ranking',
    ttl: 'Ranking Geral',
    component: () => import('../../pages-coordenadores/Ranking'),
    meta: {
      public: false,
    },
  },
  {
    path: '/home-coordenadores',
    name: 'DesempenhoGeral',
    ttl: 'Desempenho geral',
    component: () => import('../../pages-coordenadores/DesempenhoGeral'),
    meta: {
      public: false,
    },
  },
];

export default routes;
