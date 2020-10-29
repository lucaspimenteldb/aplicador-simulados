const routes = [
  {
    path: '/listar-usuarios',
    name: 'ListagemUsuarios',
    ttl: 'Listagem de usuários',
    menu: false,
    component: () => import('../../pages-administrador/ListagemUsuario'),
    meta: {
      public: false,
    },
  },
  {
    path: '/editar-usuario',
    name: 'EditarUsuario',
    ttl: 'Editar Usuário',
    menu: false,
    component: () => import('../../pages-administrador/EditarUsuario'),
    meta: {
      public: false,
    },
  },
  {
    path: '/redacoes',
    name: 'RedacaoInicio',
    component: () => import('../../pages/redacao/RedacaoInicio'),
  },
];

export default routes;
