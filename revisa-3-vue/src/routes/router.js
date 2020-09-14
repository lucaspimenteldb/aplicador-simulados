import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../pages/Home'),
  },
  {
    path: '/simulados-atividades-escolares',
    name: 'SimuladosAtividadesInicio',
    component: () => import('../pages/simulado-ativiades-escolares/SimuladosAtividadesInicio'),
  },
  {
    path: '/simulado-responder',
    name: 'QuestoesSimuladosAtividades',
    component: () => import('../components/QuestoesSimuladosAtividades'),
  },
  {
    path: '/simulado-escolar-desempenho',
    name: 'DesempenhoSimulado',
    component: () => import('../pages/simulado-ativiades-escolares/DesempenhoSimulado'),
  },
  {
    path: '/redacoes',
    name: 'RedacaoInicio',
    component: () => import('../pages/redacao/RedacaoInicio'),
  },
  {
    path: '/redacao-corrigida',
    name: 'RedacaoCorrigida',
    component: () => import('../pages/redacao/RedacaoCorrigida'),
  },
  {
    path: '/redacao-enviar',
    name: 'RedacaoEnviar',
    component: () => import('../pages/redacao/RedacaoEnviar'),
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('../pages/Ranking'),
  },
  {
    path: '/desempenho-geral',
    name: 'DesempenhoGeral',
    component: () => import('../pages/DesempenhoGeral'),
  },
  {
    path: '/suporte',
    name: 'Suporte',
    component: () => import('../pages/suporte/SuporteInicio'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
