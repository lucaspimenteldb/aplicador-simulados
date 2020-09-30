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
              label="E-mail para recuperar senha" filled
              color="azul"
              class="ml-2"
              type="email"
              aria-autocomplete="off"
              hide-details
              @keyup.enter="recuperarSenha"
          />

          <v-btn
              id="btn__entrar"
              class="mt-4 ml-2 azul white--text max-w-180"
              @click="recuperarSenha"
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
    async recuperarSenha () {
      console.log('enviar');
    },
  },
};
</script>

<style scoped>

</style>
