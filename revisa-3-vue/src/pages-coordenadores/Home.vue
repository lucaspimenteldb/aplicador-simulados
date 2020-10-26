<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <header-secao>
          Simulados e Redações disponíveis
        </header-secao>
      </v-col>

      <!-- linha das atividades escolares para entrega-->
      <v-col cols="12">
        <subheader-secao>
          Simulados do Dia 1
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
          v-for="(card, i) in atividadesEscolares" :key="card[i]"
      >
        <v-hover>
          <v-card
              class="transition destaque__acessar__vermelho rounded__normal cursor__pointer btn__shadow"
          >
            <v-card-text>
              <article class="relative">
                <p class="mr-8 text-h6 leading__tight grey--text text--darken-3">
                  {{ card.nomeAtividade}}
                </p>

                <p class="red--text font-weight-medium caption grey--text text--darken-3">
                 Prazo final: {{ card.entrega }}
                </p>

                <!-- icone do arquivo com relogio-->
                <div class="bolinha top-0 right-0" />
                <v-icon
                    v-text="'mdi-file-clock-outline'" class="w__icons__28 icone__backdrop absolute top-0 right-0"
                />
              </article>

              <!-- assunto da atividade -->
              <p class="mt-2 grey--text text--darken-3">
                {{ card.questoes }} questões
              </p>

              <article class="mt-8 relative">
                <p class="font-weight-bold grey--text text--darken-3">
                  {{ 'Acessar simulado de ' + card.disciplina }}
                </p>

                <!-- icone para acessar -->
                <v-icon
                    v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
                />
              </article>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>

      <!-- linha das outras coisas para entrega-->
      <v-col
          cols="12" class="mt-8"
      >
        <subheader-secao>
          Redação
        </subheader-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4"
      >
        <v-hover>
          <v-card
              class="transition destaque__acessar__verde rounded__normal cursor__pointer btn__shadow"
          >
            <v-card-text>
              <article class="relative">
                <p class="mr-8 text-h6 leading__tight grey--text text--darken-3">
                  Redação 1 - 08/10
                </p>

                <p class="red--text font-weight-medium caption grey--text text--darken-3">
                  Prazo final: 08/10 às 23:59
                </p>

                <!-- icone do arquivo com relogio-->
                <div class="bolinha top-0 right-0" />
                <v-icon
                    v-text="'mdi-file-clock-outline'" class="w__icons__28 icone__backdrop absolute top-0 right-0"
                />
              </article>

              <!-- assunto da atividade -->
              <p class="mt-2 grey--text text--darken-3">
                Tema da redação
              </p>

              <article class="mt-8 relative">
                <p class="font-weight-bold grey--text text--darken-3">
                  Acessar redação
                </p>

                <!-- icone para acessar -->
                <v-icon
                    v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
                />
              </article>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>

      <!--&lt;!&ndash; noticias recentes &ndash;&gt;
      <v-col
          cols="12"
          class="mt-12"
      >
        <header-secao>
          Noticias recentes
        </header-secao>
      </v-col>

      <v-col
          cols="12"
          sm="6" md="4"
          xl="3"
          v-for="(noticia, i) in noticias" :key="noticia[i]"
      >
        &lt;!&ndash;slot-scope="{ hover }"
        :class="`elevation-${ hover ? 8 : 4 }`"&ndash;&gt;
        <v-hover>
          <v-card
              class="transition destaque__acessar__amarelo cursor__pointer btn__shadow"
          >
            <v-img :src="require(`@/assets/img/noticias/${noticia.img}`)" />

            <article class="ma-4 mb-0 relative">
              <v-card-title class="pa-0 font-weight-bold grey&#45;&#45;text text&#45;&#45;darken-3">
                {{ noticia.ttl }}
              </v-card-title>

              <p class="caption grey&#45;&#45;text text&#45;&#45;darken-3">
                {{ noticia.data }}
              </p>

              <div class="bolinha top-0 right-0" />
              <v-icon
                  v-text="'mdi-newspaper-variant-outline'" class="w__icons__28 icone__backdrop absolute top-0 right-0"
              />
            </article>

            <v-card-text>
              <p class="texto__noticias grey&#45;&#45;text text&#45;&#45;darken-3">
                {{ noticia.lead }}
              </p>

              <article class="mt-8 relative">
                <p class="font-weight-bold grey&#45;&#45;text text&#45;&#45;darken-3">
                  Ler mais...
                </p>

                &lt;!&ndash; icone para acessar &ndash;&gt;
                <v-icon
                    v-text="'mdi-location-enter'" class="w__icons__28 absolute bottom-0 right-0"
                />
              </article>
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>-->

<!--      <v-col cols="12">-->
<!--        <botao>-->
<!--          Ver mais notícias-->
<!--        </botao>-->
<!--      </v-col>-->

      <!-- ranking -->
      <v-col
          cols="12" class="mt-12"
      >
        <header-secao>
          Ranking
        </header-secao>
      </v-col>

      <v-col
          cols="12" sm="6"
          md="4" xl="3"
          v-for="(pessoa, i) in rankings" :key="pessoa[i]"
      >
       <v-card
           :class="{ 'ranking-1': i === 0, 'ranking-2': i === 1, 'ranking-3': i === 2 }"
           class="pa-4 d-flex align-center"
       >
         <v-avatar
             size="30%" tile
             class="ma-4"
         >
           <v-img :src="require(`@/assets/img/ranking/${pessoa.img}`)" />
         </v-avatar>

         <section class="d-inline-block">
           <v-card-title class="pa-0 grey--text text--darken-3">
             {{ pessoa.nome }}
           </v-card-title>

           <p class="leading__tight font-weight-regular body-2 grey--text text--darken-3">
             {{ pessoa.escola }}
           </p>

           <p class="leading__tight font-weight-regular body-2 grey--text text--darken-3">
             Redação: {{ pessoa.redacoesNota }}
           </p>

           <p class="leading__tight font-weight-regular body-2 grey--text text--darken-3">
             {{ pessoa.simuladosNota }}
           </p>
         </section>
       </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
// css necessário para essa página
// import '../sass/main.scss';
// import '../sass/custom.scss';

export default {
  name: 'Home',

  data () {
    return {
      atividadesEscolares: [
        {
          get nomeAtividade () {
            return `Simulado de ${this.disciplina}`;
          },
          entrega: '18/08',
          questoes: '45',
          disciplina: 'Humanas',
        },
        {
          get nomeAtividade () {
            return `Simulado de ${this.disciplina}`;
          },
          entrega: '18/08',
          questoes: '45',
          disciplina: 'Linguagens',
        },
      ],

      // noticias
      noticias: [
        {
          ttl: 'ENEM',
          data: '8 de agosto',
          lead: 'Lorem ipsum dolor sit amet, consectaetur adipisicing elit. Aspernatur autem cum doloribus amaris saperis sapiens',
          img: 'noticia-img.png',
        },
        {
          ttl: 'ENEM',
          data: '5 de agosto',
          lead: 'Lorem ipsum dolor sit amet, consectaetur adipisicing elit. Aspernatur autem cum doloribus amaris saperis sapiens',
          img: 'noticia-img.png',
        },
        {
          ttl: 'ENEM',
          data: '1 de agosto',
          lead: 'Lorem ipsum dolor sit amet, consectaetur adipisicing elit. Aspernatur autem cum doloribus amaris saperis sapiens',
          img: 'noticia-img.png',
        },
      ],

      // ranking
      rankings: [
        {
          img: 'imagem-ranking.png',
          nome: 'Lucas Pereca',
          escola: 'Sabasabi Sabi',
          redacoesNota: '780',
          simuladosNota: '1000 acertos',
        },
        {
          img: 'imagem-ranking.png',
          nome: 'Lucas Pereca',
          escola: 'Sabasabi Sabi',
          redacoesNota: '780',
          simuladosNota: '1000 acertos',
        },
        {
          img: 'imagem-ranking.png',
          nome: 'Lucas Pereca',
          escola: 'Sabasabi Sabi',
          redacoesNota: '780',
          simuladosNota: '1000 acertos',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
