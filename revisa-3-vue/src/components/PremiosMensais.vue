<template>
  <v-row>
    <v-col cols="12">
      <subheader-secao>
        Prêmios do mês
      </subheader-secao>
    </v-col>

    <v-col
        cols="12" :sm="i > 0 ? 6 : 10"
        :md="i > 0 ? 5 : 10"
        :class="i === 0 ? 'h-300' : ''"
        v-for="(premio, i) in premios" :key="premio.ttl"
    >
      <v-card
          class="d-flex align-center justify-center overflow-hidden" :height="i === 0 ? '280px' : '190px'"
          flat
      >
        <v-img
            :src="require(`@/assets/img/ranking/${premio.img}`)" max-width="50%"
            class="h-2/3"
        />

        <article
            class="d-flex align-center justify-center w-60 h-60 absolute left--1 top-4 rounded-circle"
            :class="i === 0 ? 'azul' : 'amarelo'"
        >
          <p class="ml-1 text-h6 font-weight-bold">
            {{ premio.colocacao }}º
          </p>
        </article>

        <p
            v-if="i === 0" class="pa-4 py-2 w-160 absolute top-4 right-0 white--text font-weight-medium rounded__normal__left azul shadow"
        >
          {{ premio.ttl }}
        </p>

        <p
            v-else
            class="pb-4 d-block w-full absolute bottom-0 text-center font-weight-medium grey--text text--darken-3"
        >
          {{ premio.ttl }}
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PremiosMensais',

  data () {
    return {
      premios: [
        {
          img: 'flip5.png',
          ttl: 'Caixa JBL FLIP 5 bluetooth',
          colocacao: 1,
        },
        {
          img: 'fone2.png',
          ttl: 'Fone JBL bluetooth',
          colocacao: '2-3',
        },
        {
          img: 'go2.png',
          ttl: 'Caixa JBL GO 2 bluetooth',
          colocacao: '4-6',
        },
        {
          img: 'pirralho.png',
          ttl: 'Caixa JBL Jr Pop bluetooth',
          colocacao: '7-10',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
