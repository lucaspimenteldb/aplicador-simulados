const routes = [{
  path: '/ranking',
  name: 'Ranking',
  ttl: 'Ranking',
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
  menu: true,
  component: () => import('../../pages/DesempenhoGeral'),
  meta: {
    public: false,
  },
},
{
  path: '/suporte',
  name: 'Suporte',
  ttl: 'Suporte',
  menu: true,
  component: () => import('../../pages/suporte/SuporteInicio'),
  meta: {
    public: false,
  },
},
{
  path: '/aulas-gratuitas',
  name: 'AulasGratuitas',
  ttl: 'Aulas de Revisão',
  menu: true,
  component: () => import('../../pages/AulasGratuitas'),
  meta: {
    public: false,
  },
}];

export default routes;
