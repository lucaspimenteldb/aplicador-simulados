<template v-slot:item.url="{ item }">
  <v-dialog
      v-model="dialog[item.id]"
      max-width="80%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          class="desempenhoOtimo white--text rounded__normal text-none mr-1"
          color="primary"
          v-bind="attrs" v-on="on"
          :to="item.url"
          @click.stop="$set(dialog, item.id, true)"
      >
        Ver resolução
      </v-btn>
    </template>

    <!--              <Dialog :dialog="true" />-->

    <v-card class="relative w-full">
      <v-card-title>
        <span class="headline">Questão {{ item.name }}</span>
      </v-card-title>

      <v-card-text v-html="item.comentario" />

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
  name: 'Dialog',
  data () {
    return {
      textoAux: 'Texto',
      textoAux2: 'Texto',
      dialog: {},

    };
  },

  methods: {

  },

  props: {
    item: {},
  },
};
</script>

<style scoped>
  body {
    background: #7fdfd4;
  }
</style>
