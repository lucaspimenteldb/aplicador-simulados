<template>
  <v-row :class="[width > 640 ? 'd-none' : 'd-block']">
    <v-footer
        padless :height="width > 640 ? '0px' : '64px'"
        app
    >
      <v-tabs
          height="64px"
          background-color="azulEscuro"
          centered
          dark
          app
          icons-and-text
          center-active
          grow
      >
        <v-tab to="/home">
          Desempenho

          <v-icon v-text="'mdi-poll-box-outline'" />
        </v-tab>

        <v-tab to="/ranking">
          Rankings

          <v-icon v-text="'mdi-trophy-variant-outline'" />
        </v-tab>

        <v-tab to="/aulas-gratuitas">
          Aulas de Revisão

          <v-icon v-text="'mdi-youtube'" />
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-row>
</template>

<script>
export default {
  name: 'TabsMobile',

  data () {
    return {
      width: 0,
    };
  },

  created () {
    this.width = window.innerWidth;
  },

  mounted () {
    const sliderInutil = document.querySelector('.v-slide-group__prev--disabled');
    sliderInutil.remove();

    window.addEventListener('resize', () => {
      this.width = window.innerWidth;
    });
  },
};
</script>

<style scoped>

</style>
