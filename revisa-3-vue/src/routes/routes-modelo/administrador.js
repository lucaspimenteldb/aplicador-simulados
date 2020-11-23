const routes = [
  {
    path: '/home',
    name: 'ListagemUsuarios',
    ttl: 'Listagem de usuários',
    menu: true,
    icon: 'mdi-account-tie',
    component: () => import('../../pages-administrador/ListagemUsuario'),
    meta: {
      public: false,
    },
  },
  {
    path: '/adicionar-usuario',
    name: 'AdicionarUsuario',
    ttl: 'Adicionar Usuário',
    menu: true,
    icon: 'mdi-account-plus-outline',
    component: () => import('../../pages-administrador/AdicionarUsuario'),
    meta: {
      public: false,
    },
  },
  {
    path: '/gerar-codigo-acesso',
    name: 'GerarCodigos',
    ttl: 'Gerar códigos de acesso',
    menu: false,
    component: () => import('../../pages-administrador/codigo-acesso/GerarCodigoAcesso'),
    meta: {
      public: false,
    },
  },
  {
    path: '/listar-usuarios-simulado',
    name: 'ListagemUsuariosSimulado',
    ttl: 'Listagem de usuários para simulados',
    menu: true,
    icon: 'mdi-check-network-outline',
    component: () => import('../../pages-administrador/simulado/ListagemUsuarioSimulado'),
    meta: {
      public: false,
    },
  },
  {
    path: '/editar-usuario/:id',
    name: 'EditarUsuario',
    ttl: 'Editar Usuário',
    menu: false,
    component: () => import('../../pages-administrador/EditarUsuario'),
    meta: {
      public: false,
    },
  },
  {
    path: '/editar-usuario-simulado/:id',
    name: 'EditarUsuarioSimulado',
    ttl: 'Editar Simulado do Usuário ',
    menu: false,
    component: () => import('../../pages-administrador/simulado/EditarUsuarioSimulado'),
    meta: {
      public: false,
    },
  },
  // {
  //   path: '/adicionar-usuario',
  //   name: 'AdiconarUsuario',
  //   ttl: 'Adicionar Usuário',
  //   menu: false,
  //   component: () => import('../../pages-administrador/AdicionarUsuario'),
  //   meta: {
  //     public: false,
  //   },
  // },
  {
    path: '/redacoes',
    name: 'RedacaoInicio',
    component: () => import('../../pages/redacao/RedacaoInicio'),
  },
];

export default routes;
