<template>
  <v-col cols="12">
    <subheader-secao class="mb-4">
      Você quer ver o ranking da sua escola ou do seu estado?
    </subheader-secao>

    <v-btn
        class="mt-2 border-3 border__azul azul--text font-weight-medium text-capitalize rounded__normal"
    >
      Ranking estadual
    </v-btn>

    <v-btn class="mt-2 ml-4 azul white--text font-weight-medium text-capitalize btn__shadow rounded__normal">
      Ranking escolar
    </v-btn>
  </v-col>
</template>

<script>
export default {
  name: 'SelecionarRanking',
};
</script>

<style scoped>

</style>
