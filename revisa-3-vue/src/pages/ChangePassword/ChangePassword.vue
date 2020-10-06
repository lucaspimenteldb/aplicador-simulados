<template>
  <v-container>

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
          <p class="ml-2 mb-4 body-2">
            Informe o código para alterar sua senha
          </p>
        </article>
      </v-col>

      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-text-field
              v-model="codigo"
              label="Código" filled
              color="azul"
              class="ml-2"
              type="email"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="alterarSenha"
          />
        </article>
          </v-col>

      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-text-field
              v-model="password"
              label="SENHA" filled
              color="azul"
              class="ml-2"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="alterarSenha"
          />
        </article>
      </v-col>

      <v-col cols="12">
        <article class="mx-auto max-w-300">
          <v-text-field
              v-model="confirm_password"
              label="CONFIRMA SENHA" filled
              color="azul"
              class="ml-2"
              :type="confir_senha ? 'text' : 'password'"
              :append-icon="confir_senha ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="confir_senha = !confir_senha"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="alterarSenha"
          />
        </article>
      </v-col>
          <v-col cols="12">
            <article class="mx-auto max-w-300">
          <v-btn
              :loading="loading"
              :disabled="loading"
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text max-w-180"
              @click="alterarSenha"
          >
            Alterar senha
          </v-btn>
            </article>
          </v-col>
    </v-row>
  </v-container>
</template>

<script>
import senha from '../../services/alterarSenha/alterarSenha';

export default {
  name: 'ChangePassword',
  data () {
    return {
      codigo: '',
      message: '',
      showLocal: false,
      loading: false,
      password: '',
      confirm_password: '',
      show: false,
      confir_senha: false,
    };
  },

  methods: {
    async alterarSenha () {
      try {
        this.msgErro('', false);
        const retor = this.validar([this.codigo.trim(), this.confirm_password.trim(), this.password.trim()]);
        const compara = this.compararSenha(this.password, this.confirm_password);
        if (!retor || !compara) {
          return;
        }
        const body = { codigo: this.codigo, senha: this.password, confir_senha: this.confirm_password };
        await senha.AlterarSenha('alterar-senha', body);
        this.$router.push('/');
      } catch (e) {
        this.msgErro('Código e/ou usuário não encontrado', true);
      }
    },

    validar (objeto) {
      for (let i = 0; i < objeto.length; i++) {
        if (!objeto[i]) {
          this.msgErro('Preencha os campos necessários!', true);
          return false;
        }
      }

      return true;
    },
    compararSenha (senhaT, comparar) {
      if (senhaT !== comparar) {
        this.msgErro('Senha não são iguais!', true);
        return false;
      }
      return true;
    },

    preLoading (termino) {
      this.loading = termino;
    },

    msgErro (message, termino) {
      this.message = message;
      this.showLocal = termino;
    },
  },
};
</script>
