const routes = [
  {
    path: '/listar-usuarios',
    name: 'ListagemUsuarios',
    ttl: 'Listagem de usuários',
    menu: true,
    component: () => import('../../pages-administrador/ListagemUsuario'),
    meta: {
      public: true,
    },
  },
  {
    path: '/listar-codigos',
    name: 'ListagemCodigos',
    ttl: 'Listagem de códigos de acesso',
    menu: true,
    component: () => import('../../pages-administrador/codigo-acesso/ListagemCodigo'),
    meta: {
      public: false,
    },
  },
  {
    path: '/gerar-codigo-acesso',
    name: 'GerarCodigos',
    ttl: 'Gerar códigos de acesso',
    menu: true,
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
    component: () => import('../../pages-administrador/simulado/ListagemUsuarioSimulado'),
    meta: {
      public: false,
    },
  },
  {
    path: '/editar-usuario',
    name: 'EditarUsuario',
    ttl: 'Editar Usuário',
    menu: true,
    component: () => import('../../pages-administrador/EditarUsuario'),
    meta: {
      public: false,
    },
  },
  {
    path: '/editar-usuario-simulado',
    name: 'EditarUsuarioSimulado',
    ttl: 'Editar Simulado do Usuário ',
    menu: true,
    component: () => import('../../pages-administrador/simulado/EditarUsuarioSimulado'),
    meta: {
      public: false,
    },
  },
  {
    path: '/adicionar-usuario',
    name: 'AdiconarUsuario',
    ttl: 'Adicionar Usuário',
    menu: true,
    component: () => import('../../pages-administrador/AdicionarUsuario'),
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
