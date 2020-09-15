<template>
  <v-container>
    <v-row>
      <v-col
          cols="12" class="pa-0"
      >
        <article class="mx-auto max-w-300">
          <v-text-field
              v-model="login"
              label="Usuário" filled
              color="azul" class="ml-2"
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
              id="btn__entrar"
              class="ml-2 azul white--text w-140"
              @click="entrar"
              to="/home"
          >
            Entrar
          </v-btn>

          <v-btn
              text class="mt-8 pa-2 d-block text-lowercase"
          >
            esqueci minha senha
          </v-btn>
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
import { Busao } from './main';

export default {
  name: 'Login',

  data () {
    return {
      show: false,
      loader: false,
      senha: '',
      login: '',
    };
  },

  methods: {
    entrar () {
      console.log(this.senha, this.login);
      if (this.senha === '123' && this.login === 'Lucas') {
        document.getElementById('btn__entrar').click();

        Busao.$emit('autenticado', true);
      }
    },
  },
};
</script>

<style scoped>

</style>
