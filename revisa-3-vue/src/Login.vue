<template>
  <v-container>
    <v-row>
      <v-col
          cols="12" class="pa-0"
      >
        <article class="mx-auto max-w-300">
          <v-text-field
              label="Usuário" filled
              color="azul" class="ml-2"
              aria-autocomplete="off"
              hide-details
          />
        </article>
      </v-col>

      <v-col
          cols="12" class="mt-4 pa-0"
      >
        <section class="mx-auto max-w-300">
          <v-text-field
              label="Senha" filled
              class="ml-2"
              autocomplete="new-password"
              color="azul"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
          />

          <v-btn
              class="ml-2 azul white--text w-140" to="/home"
              @click="entrar"
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
  </v-container>
</template>

<script>
import { Busao } from './main';

export default {
  name: 'Login',

  data () {
    return {
      show: false,
    };
  },

  methods: {
    entrar () {
      Busao.$emit('autenticado', true);
      console.log(this.autenticado);
    },
  },
};
</script>

<style scoped>

</style>
