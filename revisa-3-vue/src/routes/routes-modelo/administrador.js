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
];

export default routes;
