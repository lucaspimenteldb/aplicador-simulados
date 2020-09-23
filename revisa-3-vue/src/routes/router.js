import Vue from 'vue';
import VueRouter from 'vue-router';
import middleware from './middlware/default';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../pages/Login'),
  },
  {
    path: '/esqueci-senha',
    name: 'EsqueciSenha',
    component: () => import('../pages/EsqueciSenha'),
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
  },
  {
    path: '/home',
    name: 'DesempenhoGeral',
    component: () => import('../pages/DesempenhoGeral'),
  },
  {
    path: '/suporte',
    name: 'Suporte',
    component: () => import('../pages/suporte/SuporteInicio'),
  },

  /* professores */
  {
    path: '/simulados-atividades-escolares-professores',
    name: 'SimuladosAtividadesInicio',
    component: () => import('../pages-professores/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  },
  {
    path: '/simulado-responder-professores',
    name: 'QuestoesSimuladosAtividades',
    component: () => import('../components-professores/QuestoesSimuladosAtividades'),
  },
  {
    path: '/simulado-escolar-desempenho-professores',
    name: 'DesempenhoSimulado',
    component: () => import('../pages-professores/simulado-ativiades-escolares/DesempenhoSimulado'),
  },
  {
    path: '/redacoes-professores',
    name: 'RedacaoInicio',
    component: () => import('../pages-professores/redacao/RedacaoInicio'),
  },
  {
    path: '/redacao-corrigida-professores',
    name: 'RedacaoCorrigida',
    component: () => import('../pages-professores/redacao/RedacaoCorrigida'),
  },
  {
    path: '/redacao-enviar-professores',
    name: 'RedacaoEnviar',
    component: () => import('../pages-professores/redacao/RedacaoEnviar'),
  },
  {
    path: '/ranking-professores',
    name: 'Ranking',
    component: () => import('../pages-professores/Ranking'),
  },
  {
    path: '/desempenho-geral-professores',
    name: 'DesempenhoGeral',
    component: () => import('../pages-professores/DesempenhoGeral'),
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
