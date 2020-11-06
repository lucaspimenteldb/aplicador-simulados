<template>
  <v-row>
    <v-col cols="12">
      <v-btn
          @click="donwloadsPdf"
          color="azul"
          v-text="'Baixar instruções do próximo simulado'"
          class="mt-4 white--text text-none"
      />

      <!-- ARQUIVOS A SEREM BAIXADOS -->
      <a
          href="humanas.pdf"
          download="" v-show="false"
          class="download-simulado"
      >teste</a>

      <a
          href="matematica.pdf"
          download="" v-show="false"
          class="download-simulado"
      >teste</a>
    </v-col>
  </v-row>
</template>

<script>
import methods from '../../mixis/downloadPdf/downloadPdf';

export default {
  mixins: [methods],
  name: 'PDFs',
};
</script>

<style scoped>

</style>
