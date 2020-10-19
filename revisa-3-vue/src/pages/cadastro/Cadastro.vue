<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-alert
              class="ml-2 errou white--text"
          >
            mensagem de erro
          </v-alert>
        </article>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-btn
              color="azul"
              v-text="1"
              class="ml-2 pa-0 w-24 h-34 min-w-34 white--text"
          />
          <v-icon
              v-text="'mdi-checkbox-marked-outline'"
              color="azul"
              :class="[completo ? 'mr-2' : 'd-none']"
          />
          <v-icon
              v-text="'mdi-checkbox-blank-outline'"
              :class="[completo ? 'd-none' : 'mr-2']"
          />

          <v-btn
              outlined
              color="azul"
              v-text="2"
              class="ml-1 pa-0 w-24 h-34 min-w-34"
              to="/cadastro-informacoes"
          />
          <v-icon
              v-text="'mdi-checkbox-marked-outline'"
              color="azul"
              :class="[completo2 ? 'mr-2' : 'd-none']"
          />
          <v-icon
              v-text="'mdi-checkbox-blank-outline'"
              :class="[completo2 ? 'd-none' : 'mr-2']"
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
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text text-none"
              @click="infosIniciais"
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
import { Busao } from '../../main';

export default {
  name: 'Cadastro',

  data () {
    return {
      completo: false,
      completo2: false,
      codigoAcesso: '',
      login: '',
      senha: '',
      confirmarSenha: '',
      show: false,
    };
  },

  methods: {
    completoPrimeiro () {
      Busao.$emit('completo', this.completo);
    },

    infosIniciais () {
      if
      (
        this.codigoAcesso !== null && this.codigoAcesso !== ''
        && this.login !== null && this.login !== ''
        && this.senha !== null && this.senha !== ''
        && this.confirmarSenha !== null && this.confirmarSenha !== ''
        && this.senha === this.confirmarSenha
      ) {
        this.completo = true;
        this.completoPrimeiro();
        console.log('emiti');
      }
    },
  },

  mounted () {
    Busao.$on('completo2', (data) => {
      this.completo2 = data;
    });
  },
};
</script>

<style scoped>

</style>
