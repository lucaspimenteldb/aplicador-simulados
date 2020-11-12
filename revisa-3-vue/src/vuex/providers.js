/* eslint-disable no-param-reassign */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

const estado = {
  token: '',
  usuario: {},
  autenticado: false,
};

const mutations = {
  DEFINIR_USUARIO_LOGADO (state, { token, usuario }) {
    state.token = token;
    state.usuario = usuario;
  },
};

const action = {
  efetuarLogin ({ commit }, usuario) {
    console.log(commit);
    console.log(usuario);
  },
};

export default new Vuex.Store({
  state: estado,
  mutations,
  actions: action,
});
