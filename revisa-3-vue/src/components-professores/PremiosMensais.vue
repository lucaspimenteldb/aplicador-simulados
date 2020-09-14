<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <subheader-secao>
          Prêmios do mês
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" :sm="i > 0 ? 6 : 10"
          :md="i > 0 ? 5 : 10"
          v-for="(premio, i) in premios" :key="premio.ttl"
      >
        <v-card
            class="d-flex align-center justify-center overflow-hidden" height="190px"
            flat
        >
          <v-img
              :src="require(`@/assets/img/desempenho-geral/${premio.img}`)" max-width="180px"
          />

          <article
              class="d-flex align-center justify-center w-40 h-40 absolute left--1 top-4 rounded-circle"
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
  </v-container>
</template>

<script>
export default {
  name: 'PremiosMensais',

  data () {
    return {
      premios: [
        {
          img: 'jbl.png',
          ttl: 'Caixa JBL Go 2 bluetooth',
          colocacao: 1,
        },
        {
          img: 'fone.png',
          ttl: 'Xiaomi mi dual',
          colocacao: 2,
        },
        {
          img: 'vale-50.png',
          ttl: 'Vale-compras: R$50 reais',
          colocacao: 3,
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
