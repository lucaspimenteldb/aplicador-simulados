const data = new Date();
let routes;

const routesPadrao = [
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
    path: '/acompanhar-simulados-professores',
    name: 'AcompanharSimulados',
    ttl: 'Acompanhamento de simulado',
    icon: 'mdi-access-point',
    menu: true,
    component: () => import('../../pages-professores/AcompanharSimulados'),
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
  {
    path: '/redacoes-coordenadores',
    name: 'RedacaoInicio',
    ttl: 'Desempenho geral',
    component: () => import('../../pages-coordenadores/redacao/RedacaoInicio'),
    meta: {
      public: false,
    },
  },
];

const routesSimulado = [
  {
    path: '/home',
    name: 'AcompanharSimulados',
    ttl: 'Acompanhamento de simulado',
    icon: 'mdi-access-point',
    menu: true,
    component: () => import('../../pages-professores/AcompanharSimulados'),
    meta: {
      public: false,
    },
  },
];

if (data.getDate() >= 23) {
  routes = routesSimulado;
} else {
  routes = routesPadrao;
}

export default routes;
