<template>
  <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
  >
    <v-card
        color="primary"
        dark
    >
      <v-card-text class="pt-2">
        Estamos carregando as informações...

        <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {

    };
  },

  props: {
    // eslint-disable-next-line vue/require-prop-type-constructor
    dialog: false,
  },
};
</script>

<style scoped>

</style>
