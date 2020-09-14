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
          Correção da Redação 1
        </header-secao>
      </v-col>

      <v-col
          cols="12" md="8"
          lg="7"
      >
        <v-img src="@/assets/img/redacao/folha-redacao.png" />
      </v-col>

      <v-col
          cols="12" md="4"
          lg="5"
      >
        <v-card>
          <v-card-title>
            Avaliação do Corretor
          </v-card-title>

          <v-card-text>
            <p class="font-weight-medium grey--text text--darken-3">
              {{ corretor }}
            </p>

            <p class="break__space grey--text text--darken-3">
              {{ avaliacao }}
            </p>
          </v-card-text>
        </v-card>

        <section class="d-inline-block">
          <p class="mt-4 body-2 text-center font-weight-medium grey--text text--darken-3">
            Minha nota
          </p>

          <v-progress-circular
              :size="90" :width="6"
              :value="notaRedacao / 10"
              :color="desempenhoTotal"
              class="mt-2"
              rotate="-90"
          >
            <p class="text-h6 font-weight-bold black--text">
              {{ notaRedacao }}
            </p>
          </v-progress-circular>
        </section>
      </v-col>
    </v-row>

    <v-row>
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Desempenho Geral
        </header-secao>
      </v-col>

      <v-col cols="12">
        <subheader-secao>
          Por Competência
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" md="9"
      >
        <!-- card de cada competencia -->
        <v-card
            v-for="(competencia, i) in competencias" :key="competencia.competenciaNome"
            :class="[i != 0 ? 'mt-3' : i]" class="d-sm-flex align-center grey--text text--darken-3"
        >
          <section class="w-sm-4/5">
            <v-card-title class="pb-1 text-body-2 font-weight-medium grey--text text--darken-3 text-break">
              {{ competencia.competenciaNome }}
            </v-card-title>

            <v-card-text class="d-flex justify-space-between align-center">
              <p class="d-inline-block caption grey--text text--darken-3 leading__supertight">
                {{ competencia.avaliacao }}
              </p>
            </v-card-text>
          </section>

          <section class="pl-2 pl-sm-0 pr-4 pb-4 pb-sm-0 d-flex align-center">
            <article class="mt-1 mr-2 mr-md-8 text-center w-40 h-40 relative z-1">
              <v-icon
                  v-text="'mdi-flag-outline'" color="black"
                  class="mt-2"
              />

              <div class="top-0 right--1 black--text bolinha__notificacao z--1">
                <p class="mt-1px">
                  1
                </p>
              </div>
            </article>

            <v-progress-circular
                :size="50" :width="4"
                :value="competencia.notaCompetencia / 2"
                :color="competencia.desempenho"
                rotate="-90"
            >
              <p class="text-body-2 font-weight-medium black--text">
                {{ competencia.notaCompetencia }}
              </p>
            </v-progress-circular>
          </section>
        </v-card>
      </v-col>

      <!-- nota da sua redacao -->
      <v-col
          cols="12" md="3"
      >
        <p class="mb-2 body-2 font-weight-medium grey--text text--darken-3">
          Minha nota
        </p>

        <v-progress-circular
            :size="120" :width="6"
            :value="notaRedacao / 10"
            :color="desempenhoTotal"
            rotate="-90"
        >
          <p class="text-h6 font-weight-bold black--text">
            {{ notaRedacao }}
          </p>
        </v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RedacaoCorrigida',

  data () {
    return {
      corretor: 'Profa. Maria Souza',
      avaliacao: 'A expressão Lorem ipsum em design gráfico e editoração é um texto padrão em latim utilizado na produção gráfica para preencher os espaços de texto em publicações para testar e ajustar aspectos visuais antes de utilizar conteúdo real. \n'
          + 'O Compadre Ipsum foi inspirado nos bordões do Compadre Washington, integrante da banda “É o Tchan!”. Os textos, que podem ter vários parágrafos, são gerados neste estilo: “Eiiitaaa Mainhaaa!! Esse Lorem ipsum é só na sacanageeem!! E que abundância meu irmão viuu!!”.',
      notaRedacao: 600,
      reescrita: false,
      desempenhoTotal: 'desempenhoExcelente',

      competencias: [
        {
          competenciaNome: 'C1 - Domínio de escrito da língua portuguesa',
          avaliacao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é denguis.',
          notaCompetencia: 200,
          desempenho: 'desempenhoExcelente',
        },
        {
          competenciaNome: 'C2 - Compreender o tema e não fugir do que é proposto',
          avaliacao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é denguis.',
          notaCompetencia: 120,
          desempenho: 'desempenhoBom',
        },
        {
          competenciaNome: 'C3 - Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista',
          avaliacao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é denguis.',
          notaCompetencia: 80,
          desempenho: 'desempenhoRuim',
        },
        {
          competenciaNome: 'C4 - Conhecimento dos mecanismos linguísticos necessários para a construção da argumentação',
          avaliacao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é denguis.',
          notaCompetencia: 40,
          desempenho: 'desempenhoMuitoRuim',
        },
        {
          competenciaNome: 'C5 - Respeito aos direitos humanos',
          avaliacao: 'Mussum Ipsum, cacilds vidis litro abertis. Manduma pindureta quium dia nois paga. Suco de cevadiss deixa as pessoas mais interessantis. Detraxit consequat et quo num tendi nada. Diuretics paradis num copo é denguis.',
          notaCompetencia: 160,
          desempenho: 'desempenhoOtimo',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
