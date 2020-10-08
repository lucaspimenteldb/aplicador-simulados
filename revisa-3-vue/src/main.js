import Vue from 'vue';
import VueLoaders from 'vue-loaders';
import 'vue-loaders/dist/vue-loaders.css';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './routes/router';
import vuetify from './plugins/vuetify';
import env from './env';
import http from './services/index';

import './sass/main.scss';
import './sass/custom.scss';

Vue.config.productionTip = false;
Vue.prototype.$http = http;

/* loading  */
Vue.use(VueLoaders);

Vue.use(new VueSocketIO({
  debug: true,
  connection: env.ROOT_API,
}));

/* passar dados entre componentes irmãos */
// eslint-disable-next-line import/prefer-default-export
export const Busao = new Vue();

Vue.component('loaderzin', {
  props: ['tamanho'],
  template: '<vue-loaders-line-scale color="#146f8a" :scale="tamanho"></vue-loaders-line-scale>',
});
Vue.component('header-secao', {
  template: '<h5 class="titulo__secoes"> <slot></slot> </h5>',
});
Vue.component('subheader-secao', {
  template: '<h6 class="subtitulo__secoes"> <slot></slot> </h6>',
});
Vue.component('botao', {
  template: `<button class="botao px-4 py-2 rounded__normal transition"> 
              <p class="body-1 white--text"> <slot></slot> </p> 
            </button>`,
});
Vue.component('assunto', {
  props: ['assunto', 'acertos'],
  template: `<article class="d-flex align-center justify-space-between px-4 py-2 border__bottom__azul transition"> 
              <p class="body-1 font-weight-medium grey--text text--darken-3"> {{ assunto }} </p> 
              <p class="body1 font-weight-bold grey--text text--darken-3"> {{ acertos }} </p>
            </article>`,
});
Vue.component('historico-card', {
  props: ['titulo', 'descricao', 'icone'],
  template: `<v-card class="mr-4 d-inline-block">
  <v-card-text class="d-flex align-center justify-space-between grey--text text--darken-3">
    <article>
      <p class="font-weight-bold">
        {{ titulo }}
      </p>

      <p>
        {{ descricao }}
      </p>
    </article>

    <article class="ml-2 d-flex align-center justify-center flex-shrink-0 w-40 h-40 rounded-circle azul">
      <v-icon> {{ icone }} </v-icon>
    </article>
  </v-card-text>
  </v-card>`,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');

document.cookie = 'SameSite=Lax';
