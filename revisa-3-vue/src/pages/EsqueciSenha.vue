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
            Informe o e-mail para que possamos enviar as instruções de recuperação da senha
          </p>
        </article>
      </v-col>

      <v-col cols="12">
        <section class="mx-auto max-w-300">
          <v-text-field
              v-model="email"
              label="E-mail para recuperar senha" filled
              color="azul"
              class="ml-2"
              type="email"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="recuperarSenha"
          />

          <v-btn
              :loading="loading"
              :disabled="loading"
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text max-w-180"
              @click="recuperarSenha"
          >
            Recuperar senha
          </v-btn>
        </section>
      </v-col>
      <v-col cols="12">
        <section class="mx-auto max-w-300">
          <VueRecaptcha
                  ref="recaptcha"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  class="ml-2 azul white--text w-140 text-none capctha"
                  :loadRecaptchaScript="true"
                  :sitekey="site_key"
          />
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import senha from '../services/esqueceuSenha/esqueceuSenha';
import recaptcha from '../mixis/recaptcha/recaptcha';

export default {
  name: 'esqueci-senha',
  mixins: [recaptcha],
  components: { VueRecaptcha },
  
  data () {
    return {
      email: '',
      message: '',
      showLocal: false,
      loading: false,
    };
  },

  methods: {
    async recuperarSenha () {
      try {
        if (!this.email.trim()) {
          this.msgErro('Informe o E-mail', true);
          return;
        }
        
        if (!this.token) {
          this.msgErro('Marque a opção não sou robô', true);
          return;
        }
        this.preLoading(true);
        this.msgErro('', false);
        const body = { email: this.email };
        await senha.esqueciSenha('esqueci-senha', body);
        this.preLoading(false);
        this.$router.replace('alterar-senha');
      } catch (e) {
        console.log(e);
        this.$refs.recaptcha.reset();
        this.token = '';
        this.msgErro('Email não encontrado', true);
        this.preLoading(false);
      }
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

<style scoped>

</style>
