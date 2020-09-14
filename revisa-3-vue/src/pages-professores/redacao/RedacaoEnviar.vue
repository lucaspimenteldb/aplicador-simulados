<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          Redações
        </h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-8"
      >
        <header-secao>
          Tema da redação e texto motivador
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Tema da redação
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" class="max-h-400 relative overflow-hidden"
      >
        <v-img
            src="@/assets/img/redacao/enviar-redacao/texto-motivador.png" class="w-full"
        />

        <botao class="absolute top-1/2 right-1/2">
          Baixar texto motivador
        </botao>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Enviar Redação 1
        </header-secao>
      </v-col>

      <v-col
          cols="12" md="7"
          lg="9"
      >
        <subheader-secao>
          Aprenda como enviar a sua redação
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" md="5"
          lg="3"
      >
        <subheader-secao>
          <v-icon v-text="'mdi-playlist-edit'" />
          <p class="d-inline-block">
            Folha de Rascunho
          </p>
          <br>

          <botao class="mt-2">
            Baixar folha de rascunho
          </botao>
        </subheader-secao>

        <subheader-secao class="mt-8">
          <v-icon v-text="'mdi-file-send-outline'" />
          <p class="d-inline-block">
            Enviar redação
          </p>
          <br>

          <botao class="mt-2">
            Enviar foto da redação
          </botao>
        </subheader-secao>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RedacaoEnviar',
};
</script>

<style scoped>

</style>
