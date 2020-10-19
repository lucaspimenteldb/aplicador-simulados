<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-btn
              color="azul"
              outlined
              v-text="1"
              class="ml-2 mr-1 pa-0 w-24 h-34 min-w-34"
              to="/cadastro"
          />

          <v-btn
              color="azul"
              v-text="2"
              class="ml-1 pa-0 w-24 h-34 min-w-34 white--text"
          />

          <v-text-field
              v-model="login"
              label="Escola" filled
              color="azul"
              class="mt-6 ml-2"
              aria-autocomplete="off"
              hide-details
          />

          <v-text-field
              v-model="senha"
              label="Turna" filled
              hide-details
              class="mt-2 ml-2"
              autocomplete="new-password"
              color="azul"
          />

          <v-text-field
              v-model="confirmarSenha"
              label="Alguma coisa" filled
              hide-details
              class="mt-2 ml-2"
              autocomplete="new-password"
              color="azul"
          />

          <v-btn
              :loading="loading"
              :disabled="loading"
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text text-none"
              @click="show"
          >
            Confirmar cadastro
          </v-btn>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CadastroInformacoes',

  data () {
    return {
      codigoAcesso: '',
      login: '',
      senha: '',
      confirmarSenha: '',
      show: false,
    };
  },
};
</script>

<style scoped>

</style>
