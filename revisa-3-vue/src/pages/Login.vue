<template>
  <v-container
      class="pt-0" fluid
  >
    <section class="mx-auto w-290 d-block">
      <v-img
          src="@/assets/agora-vai.svg"
          class="d-inline-block w-140"
      />
      <v-img
          src="@/assets/logo_mvc_avalia_azul.png"
          class="d-inline-block w-140"
      />
    </section>

    <v-row v-show="showLocal">
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
            Use os dados de acesso cadastrados no RevisaENEM
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
              class="ml-2 text-none"
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
              class="ml-2 azul white--text w-140 text-none"
              @click="entrar"
          >
            Entrar
          </v-btn>

          <VueRecaptcha
              ref="recaptcha"
              @verify="onCaptchaVerified"
              @expired="onCaptchaExpired"
              class="ml-2 azul white--text w-140 text-none capctha"
              :loadRecaptchaScript="true"
              :sitekey="site_key"
          />

          <v-btn
              text
              class="mt-8 pa-2 text-lowercase border__bottom__azul rounded-0"
              to="/esqueci-senha"
          >
            esqueci minha senha
          </v-btn>

<!--          <v-btn-->
<!--              outlined-->
<!--              color="azul"-->
<!--              class="mt-8 ml-2 max-w-300 text-none"-->
<!--              to="/cadastro"-->
<!--          >-->
<!--            Quero me cadastrar-->
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
import VueRecaptcha from 'vue-recaptcha';
import router from '../routes/router';
import env from '../env';
import { Busao } from '../main';
import storage from '../storage/storage';
import aluno from '../routes/routes-modelo/aluno';
import professor from '../routes/routes-modelo/professor';
import administrador from '../routes/routes-modelo/administrador';
import coordenador from '../routes/routes-modelo/coordenador';
import recaptcha from '../mixis/recaptcha/recaptcha';

export default {
  name: 'Login',
  mixins: [recaptcha],
  components: { VueRecaptcha },

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
      const verif = this.verificarCaptcha();
      if (!verif) return;
      const veriL = this.verificarBranco();
      if (!veriL) return;
      this.preLoading(false);
      try {
        const resposta = await axios.post(`${env.ROOT_API}auth`, {
          login: this.login.trim(),
          senha: this.senha.trim(),
          recaptchaToken: this.token,
        });
        Busao.$emit('autenticado', true, resposta.data.data.usuario.id);
        const cache = this.getCache(resposta.data.data);
        storage.set('token', JSON.stringify(cache));
        this.$store.commit('DEFINIR_USUARIO_LOGADO', {
          token: `Bearer ${cache.token}`,
          usuario: cache,
        });
        this.$router.replace('/home');
        this.$destroy();
      } catch (err) {
        this.$refs.recaptcha.reset();
        this.token = '';
        this.preLoading(true);
        console.log(err);
        if (err.response.status === 403) {
          this.message = err.response.data.message;
        } else {
          this.message = 'Usuário ou senha errado. Por favor, tente novamente';
        }
      }
    },

    verificarBranco () {
      if (!this.login.trim() || !this.senha.trim()) {
        this.message = 'Preencha os campos obrigatórios';
        this.showLocal = true;
        return false;
      }
      return true;
    },

    verificarCaptcha () {
      if (!this.token) {
        this.message = 'Marque a opção não sou robô';
        this.showLocal = true;
        return false;
      }

      return true;
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
        privilegio: dados.usuario.id_cms_privileges,
      };

      this.getPrivileges(dados.usuario.id_cms_privileges);
      return cache;
    },

    getPrivileges (privilegio) {
      switch (Number(privilegio)) {
        case 1: this.$router.addRoutes(administrador);
          for (const user of administrador) {
            this.$router.options.routes.push(user);
          }
          break;
        case 3: this.$router.addRoutes(coordenador);
          for (const user of coordenador) {
            this.$router.options.routes.push(user);
          }
          break;

        case 5: router.addRoutes(coordenador);
          for (const user of coordenador) {
            router.options.routes.push(user);
          }
          break;

        case 6: this.$router.addRoutes(professor);
          for (const user of professor) {
            this.$router.options.routes.push(user);
          }
          break;

        default: this.$router.addRoutes(aluno);
          for (const user of aluno) {
            this.$router.options.routes.push(user);
          }
      }
    },
  },
};
</script>

<style scoped>
  .capctha {
    margin-top: 1rem;
  }
</style>
