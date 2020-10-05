<template>
  <v-container>
    <v-img
        src="@/assets/logo_mvc_avalia.png"
        class="mx-auto d-block w-290"
    />

    <v-row
        v-show="showLocal"
        class="mt-16"
    >
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-alert
              class="ml-2 errou white--text"
          >
            {{message}}
          </v-alert>
        </article>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <p class="ml-2 mb-4 text-h">
            Informe os dados de acesso cadastrados no RevisaENEM
          </p>
        </article>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="pa-0"
      >
        <article class="mx-auto max-w-300">
          <v-text-field
              v-model="login"
              label="Email ou login" filled
              color="azul"
              class="ml-2"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="entrar"
          />
        </article>
      </v-col>

      <v-col
          cols="12" class="mt-4 pa-0"
      >
        <section class="mx-auto max-w-300">
          <v-text-field
              v-model="senha"
              label="Senha" filled
              class="ml-2"
              autocomplete="new-password"
              color="azul"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              @keyup.enter="entrar"
          />

          <v-btn
              :loading="loading"
              :disabled="loading"
              id="btn__entrar"
              class="ml-2 azul white--text w-140"
              @click="entrar"
          >
            Entrar
          </v-btn>

<!--          <v-btn-->
<!--              text class="mt-8 pa-2 text-lowercase"-->
<!--              to="/esqueci-senha"-->
<!--          >-->
<!--            esqueci minha senha-->
<!--          </v-btn>-->
        </section>
      </v-col>
    </v-row>

    <div
        class="d-flex justify-center align-center w-full h-full absolute top-0 left-0
        grey lighten-4 transition pointer__events__none z-1000"
        :class="loader ? 'opacity-1' : 'opacity-0'"
    >
      <loaderzin tamanho="1.4" />
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
import env from '../env';
import { Busao } from '../main';
import storage from '../storage/storage';

export default {
  name: 'Login',

  data () {
    return {
      show: false,
      showLocal: false,
      loader: false,
      message: '',
      senha: '',
      login: '',
      loading: false,
    };
  },

  methods: {
    created () {
      Busao.$emit('autenticado', false);
    },
    async entrar () {
      this.preLoading(false);
      try {
        const resposta = await axios.post(`${env.ROOT_API}auth`, { login: this.login, senha: this.senha });
        Busao.$emit('autenticado', true, resposta.data.data.usuario.id);
        const cache = this.getCache(resposta.data.data);
        storage.set('token', JSON.stringify(cache));
        this.$destroy();
        this.$router.replace('/home');
      } catch (err) {
        this.preLoading(true);
        if (err.response.status === 403) {
          this.message = 'Já existe uma sessão aberta com esse login.';
        } else {
          this.message = 'Usuário ou senha errado. Por favor, tente novamente';
        }
      }
    },
    preLoading (terminar) {
      if (!terminar) {
        this.showLocal = false;
        this.loading = true;
      } else {
        this.showLocal = true;
        this.loading = false;
      }
    },
    getCache (dados) {
      const cache = {
        token: dados.token,
        menu: true,
        photo: dados.usuario.photo,
        name: dados.usuario.name,
        id: dados.usuario.id,
      };

      return cache;
    },
  },
};
</script>

<style scoped>

</style>
