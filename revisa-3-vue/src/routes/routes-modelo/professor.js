const routes = [{
  path: '/redacoes-professores',
  name: 'RedacaoInicio',
  ttl: 'Redações',
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
  component: () => import('../../pages-professores/Ranking'),
  meta: {
    public: false,
  },
},
{
  path: '/home',
  name: 'DesempenhoGeral',
  ttl: 'Desempenho geral',
  menu: true,
  component: () => import('../../pages-professores/DesempenhoGeral'),
  meta: {
    public: false,
  },
}];

export default routes;
