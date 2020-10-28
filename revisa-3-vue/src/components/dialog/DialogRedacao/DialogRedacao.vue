<template v-slot:item.url="{ item }">
    <v-dialog
            v-model="dialog[item.id]"
            max-width="30%"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    small
                    class="desempenhoOtimo white--text rounded__normal text-none mr-1"
                    color="primary"
                    v-bind="attrs" v-on="on"
                    :to="item.url"
                    @click.stop="$set(dialog, item.id, true)"
            >
                ver redação
            </v-btn>
        </template>

        <!--              <Dialog :dialog="true" />-->

        <v-card class="relative w-full">
            <v-card-title>
                <span class="headline">{{ item.tema }}</span>
            </v-card-title>

<!--            <v-card-text v-html="item.comentario" />-->
          <v-img :src="item.arquivo" />

            <v-card-actions class="px-4">
                <v-spacer />

                <v-btn
                        color="green darken-1" text
                        @click="$set(dialog, item.id, false)"
                        class="text-none"
                >
                    Fechar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'DialogRedacao',
  data () {
    return {
      textoAux: 'Texto',
      textoAux2: 'Texto',
      dialog: {},

    };
  },

  created () {

  },

  methods: {

  },

  props: {
    item: {},
  },
};
</script>

<style scoped>

</style>
