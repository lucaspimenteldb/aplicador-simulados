<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-btn
              color="azul"
              v-text="1"
              class="ml-2 mr-1 pa-0 w-24 h-34 min-w-34 white--text"
          />

          <v-btn
              outlined
              color="azul"
              v-text="2"
              class="ml-1 pa-0 w-24 h-34 min-w-34"
              to="/cadastro-informacoes"
          />

          <v-text-field
              v-model="codigoAcesso"
              label="Informe o seu código de acesso" filled
              color="azul"
              class="mt-6 ml-2"
              aria-autocomplete="off"
              hide-details
          />

          <v-text-field
              v-model="login"
              label="Email ou login" filled
              color="azul"
              class="mt-6 ml-2"
              aria-autocomplete="off"
              hide-details
          />

          <v-text-field
              v-model="senha"
              label="Senha" filled
              hide-details
              class="mt-2 ml-2"
              autocomplete="new-password"
              color="azul"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              @keyup.enter="show"
          />

          <v-text-field
              v-model="confirmarSenha"
              label="Confirme sua senha" filled
              hide-details
              class="mt-2 ml-2"
              autocomplete="new-password"
              color="azul"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              @keyup.enter="show"
          />

          <v-btn
              :loading="loading"
              :disabled="loading"
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text text-none"
              @click="show"
              to="cadastro-informacoes"
          >
            Próximo passo
          </v-btn>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Cadastro',

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
