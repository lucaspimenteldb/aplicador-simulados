import Vue from 'vue';
import VueRouter from 'vue-router';
import middleware from './middlware/default';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login'),
    meta: {
      public: true,
    },
  },
  {
    path: '/esqueci-senha',
    name: 'EsqueciSenha',
    component: () => import('../pages/EsqueciSenha'),
    meta: {
      public: true,
    },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('../pages/cadastro/Cadastro'),
    meta: {
      public: true,
    },
  },
  {
    path: '/cadastro-informacoes',
    name: 'Cadastro',
    component: () => import('../pages/cadastro/CadastroInformacoes'),
    meta: {
      public: true,
    },
  },

  {
    path: '/alterar-senha',
    name: 'ChangePassword',
    component: () => import('../pages/ChangePassword/ChangePassword'),
    meta: {
      public: true,
    },
  },
  // {
  //   path: '/home',
  //   name: 'Home',
  //   component: () => import('../pages/Home'),
  // },
  // {
  //   path: '/simulados-atividades-escolares',
  //   name: 'SimuladosAtividadesInicio',
  //   component: () => import('../pages/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  // },
  // {
  //   path: '/simulado-responder',
  //   name: 'QuestoesSimuladosAtividades',
  //   component: () => import('../components/QuestoesSimuladosAtividades'),
  // },
  // {
  //   path: '/simulado-escolar-desempenho',
  //   name: 'DesempenhoSimulado',
  //   component: () => import('../pages/simulado-ativiades-escolares/DesempenhoSimulado'),
  // },
  // {
  //   path: '/redacoes',
  //   name: 'RedacaoInicio',
  //   component: () => import('../pages/redacao/RedacaoInicio'),
  // },
  // {
  //   path: '/redacao-corrigida',
  //   name: 'RedacaoCorrigida',
  //   component: () => import('../pages/redacao/RedacaoCorrigida'),
  // },
  // {
  //   path: '/redacao-enviar',
  //   name: 'RedacaoEnviar',
  //   component: () => import('../pages/redacao/RedacaoEnviar'),
  // },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../pages/Ranking'),
    meta: {
      public: false,
    },
  },
  {
    path: '/home',
    name: 'DesempenhoGeral',
    component: () => import('../pages/DesempenhoGeral'),
    meta: {
      public: false,
    },
  },
  {
    path: '/suporte',
    name: 'Suporte',
    component: () => import('../pages/suporte/SuporteInicio'),
    meta: {
      public: false,
    },
  },
  {
    path: '/aulas-gratuitas',
    name: 'AulasGratuitas',
    component: () => import('../pages/AulasGratuitas'),
    meta: {
      public: false,
    },
  },

  /* professores */
  {
    path: '/simulados-atividades-escolares-professores',
    name: 'SimuladosAtividadesInicio',
    component: () => import('../pages-professores/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
    meta: {
      public: false,
    },
  },
  {
    path: '/simulado-responder-professores',
    name: 'QuestoesSimuladosAtividades',
    component: () => import('../components-professores/QuestoesSimuladosAtividades'),
    meta: {
      public: false,
    },
  },
  {
    path: '/simulado-escolar-desempenho-professores',
    name: 'DesempenhoSimulado',
    component: () => import('../pages-professores/simulado-ativiades-escolares/DesempenhoSimulado'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacoes-professores',
    name: 'RedacaoInicio',
    component: () => import('../pages-professores/redacao/RedacaoInicio'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacao-corrigida-professores',
    name: 'RedacaoCorrigida',
    component: () => import('../pages-professores/redacao/RedacaoCorrigida'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacao-enviar-professores',
    name: 'RedacaoEnviar',
    component: () => import('../pages-professores/redacao/RedacaoEnviar'),
    meta: {
      public: false,
    },
  },
  {
    path: '/ranking-professores',
    name: 'Ranking',
    component: () => import('../pages-professores/Ranking'),
    meta: {
      public: false,
    },
  },
  {
    path: '/desempenho-geral-professores',
    name: 'DesempenhoGeral',
    component: () => import('../pages-professores/DesempenhoGeral'),
    meta: {
      public: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(middleware);

export default router;
