<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <v-list-item
                v-for="comentario in comentarios" :key="comentario.pessoa"
                class="border__bottom__amarela" two-line
            >
              <!-- avatar -->
              <v-list-item-avatar>
                <v-avatar class="d-inline-block">
                  <v-img :src="require(`@/assets/img/videoaulas/${comentario.avatar}`)" />
                </v-avatar>
              </v-list-item-avatar>

              <!-- comentario e texto -->
              <v-list-item-content>
                <v-list-item-title
                    class="mb-1 font-weight-medium grey--text text--darken-3" v-text="comentario.ttl"
                />
                <v-list-item-subtitle>
                  <p class="body-2 grey--text text--darken-3">
                    <b>{{ comentario.pessoa }}</b> - {{ comentario.coment }}
                  </p>
                </v-list-item-subtitle>
              </v-list-item-content>

              <!-- ícones like, dislike e reportar-->
              <section>
                <v-btn
                    fab small
                    depressed class="mr-1 white"
                >
                  <v-icon v-text="'mdi-thumb-down-outline'" />
                </v-btn>
                <v-btn
                    fab small
                    depressed class="mr-5 white"
                >
                  <v-icon v-text="'mdi-thumb-up-outline'" />
                </v-btn>
                <v-btn
                    fab small
                    depressed class="mr-1 white"
                >
                  <div class="bolinha__erro top-0 right-2" />
                  <v-icon v-text="'mdi-alert-circle-outline'" />
                </v-btn>
              </section>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <botao>
          Mais comentários
        </botao>
      </v-col>
    </v-row>

    <v-row class="mt-8">
      <v-col cols="12">
        <v-text-field
            label="Enviar comentário" class="d-block w-3/4 border__bottom__amarela btn__shadow"
            single-line
            filled clearable
            color="azulRevisa" background-color="white"
            append-icon="mdi-send"
            @click:append="comentario"
            hide-details solo
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Comentarios',

  data () {
    return {
      comentario: () => {
        console.log('comentario da pessoa');
      },

      comentarios: [
        {
          avatar: 'avatar-comentario.png',
          ttl: 'Que barbaridade esses romanos',
          pessoa: 'Laurinhazinha',
          coment: 'Sangue para todos os lados. Prefiro os gregos',
        },
        {
          avatar: 'avatar-comentario2.png',
          ttl: 'Queria ir para roma',
          pessoa: 'Chavesca',
          coment: 'Comer pizza na torre da pizza deve dilicia',
        },
        {
          avatar: 'avatar-comentario.png',
          ttl: 'Eu gosto de guerra',
          pessoa: 'Sabilo',
          coment: 'O war império romano é massa e massa é a cara itália',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
