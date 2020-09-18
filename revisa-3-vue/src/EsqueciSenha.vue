<template>
  <v-container>
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
              v-model="login"
              label="E-mail para recuperar senha" filled
              color="azul"
              class="ml-2"
              type="email"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="entrar"
          />

          <v-btn
              :loading="loading"
              :disabled="loading"
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text max-w-180"
              @click="entrar"
          >
            Recuperar senha
          </v-btn>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'esqueci-senha',

  methods: {
    async entrar () {
      console.log('enviar');
    },
  },
};
</script>

<style scoped>

</style>
